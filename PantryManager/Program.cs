using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add our HTTP Client AND new In-Memory Database
builder.Services.AddHttpClient(); 
builder.Services.AddDbContext<PantryDb>(opt => opt.UseInMemoryDatabase("Pantry"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("PantryVisionPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();
app.UseCors("PantryVisionPolicy");

// 2. NEW ENDPOINT: Check what is currently in the database
app.MapGet("/api/inventory", async (PantryDb db) =>
{
    var items = await db.Items.ToListAsync();
    return Results.Ok(items);
});

// 3. Scan image, save to database, and trigger alerts!
app.MapPost("/api/inventory/scan", async (IFormFile image, IHttpClientFactory httpClientFactory, PantryDb db) =>
{
    if (image == null || image.Length == 0) return Results.BadRequest("No image provided.");

    var client = httpClientFactory.CreateClient();
    using var content = new MultipartFormDataContent();
    using var stream = image.OpenReadStream();
    var streamContent = new StreamContent(stream);
    streamContent.Headers.ContentType = new MediaTypeHeaderValue(image.ContentType);
    content.Add(streamContent, "file", image.FileName);

    var response = await client.PostAsync("http://localhost:8000/predict", content);
    if (!response.IsSuccessStatusCode) return Results.StatusCode(500);

    var jsonResponse = await response.Content.ReadAsStringAsync();
    var yoloData = JsonDocument.Parse(jsonResponse);
    var inventoryElement = yoloData.RootElement.GetProperty("inventory");
    
    // --- Create a list to hold our Low Stock Alerts ---
    var alerts = new List<string>();
    int lowStockThreshold = 3; 

    foreach (var item in inventoryElement.EnumerateObject())
    {
        var itemName = item.Name;
        var itemCount = item.Value.GetInt32();
        
        var existingItem = await db.Items.FirstOrDefaultAsync(i => i.Name == itemName);
        if (existingItem != null)
        {
            existingItem.Count = itemCount; 
        }
        else
        {
            existingItem = new PantryItem { Name = itemName, Count = itemCount };
            db.Items.Add(existingItem); 
        }

        // --- ALERT LOGIC ---
        // If the item drops below our threshold, sound the alarm!
        if (existingItem.Count < lowStockThreshold)
        {
            var warningMessage = $"⚠️ ALERT: {existingItem.Name} is running low! Only {existingItem.Count} left.";
            Console.WriteLine($"\n{warningMessage}\n"); // Print to the server console
            alerts.Add(warningMessage); // Send back to the user
        }
    }
    
    await db.SaveChangesAsync();

    // Return the updated state AND any alerts we generated
    return Results.Ok(new { 
        message = "Database updated!", 
        current_stock = await db.Items.ToListAsync(),
        active_alerts = alerts 
    });
}).DisableAntiforgery();

app.Run();


// --- DATABASE MODELS ---
// This defines what a "Row" in our database looks like
class PantryItem
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Count { get; set; }
}

// This represents the Database itself
class PantryDb : DbContext
{
    public PantryDb(DbContextOptions<PantryDb> options) : base(options) { }
    public DbSet<PantryItem> Items { get; set; }
}