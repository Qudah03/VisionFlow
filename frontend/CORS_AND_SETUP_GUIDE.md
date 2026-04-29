# PantryVision Frontend - Setup & CORS Configuration Guide

## ✅ Frontend Setup Complete!

Your PantryVision React frontend is fully built and running with:
- **React** + **Vite** for optimal development experience
- **Tailwind CSS** for premium dark mode styling
- **Lucide React** for beautiful icons
- Full **API integration** with your C# backend

### Frontend URL
```
http://localhost:5174/
```

---

## 🔧 Required CORS Configuration for Your C# Backend

Your frontend is running on `http://localhost:5174` and needs to communicate with your backend on `http://localhost:5266`. You must configure CORS to allow cross-origin requests.

### Option 1: CORS in Startup.cs or Program.cs (RECOMMENDED)

Add this code to your C# backend's `Program.cs` file:

```csharp
// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("PantryVisionPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5174")  // Frontend URL
              .AllowAnyMethod()                       // GET, POST, PUT, DELETE, etc.
              .AllowAnyHeader()                       // All headers
              .AllowCredentials();                    // Include cookies if needed
    });
});

// Add this BEFORE app.Build()
var app = builder.Build();

// Use the CORS policy
app.UseCors("PantryVisionPolicy");
```

### Option 2: EnableCors Attribute (Alternative)

If you prefer attribute-based configuration, use this on your controller:

```csharp
using Microsoft.AspNetCore.Cors;

[EnableCors("PantryVisionPolicy")]
[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    // Your endpoints here
}
```

### Option 3: Use Wildcard (Development Only - NOT Recommended for Production)

```csharp
policy.WithOrigins("http://localhost:*")
      .AllowAnyMethod()
      .AllowAnyHeader();
```

---

## 📋 Expected Backend Endpoints

The frontend expects these endpoints at `http://localhost:5266`:

### 1. GET /api/inventory
**Purpose:** Fetch all inventory items on app load

**Response:**
```json
[
  { "id": 1, "name": "bottle", "count": 6 },
  { "id": 2, "name": "can", "count": 15 },
  { "id": 3, "name": "jar", "count": 3 }
]
```

### 2. POST /api/inventory/scan
**Purpose:** Upload an image for AI analysis

**Request:**
- Content-Type: `multipart/form-data`
- Body: Single file field named `image`

**Response:**
```json
{
  "message": "Scan completed successfully",
  "current_stock": [
    { "id": 1, "name": "bottle", "count": 8 },
    { "id": 2, "name": "can", "count": 12 }
  ],
  "active_alerts": [
    "⚠️ ALERT: jar is running low!",
    "⚠️ ALERT: box is critically low!"
  ]
}
```

---

## 🚀 Quick Start Commands

### Start Frontend (from /workspaces/VisionFlow/frontend)
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📦 Project Structure

```
frontend/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Premium header with status indicator
│   │   ├── UploadSection.jsx       # Drag-and-drop image upload
│   │   ├── AlertsPanel.jsx         # System alerts display
│   │   └── InventoryGrid.jsx       # Inventory items grid
│   ├── App.jsx                     # Main app with API logic
│   ├── main.jsx                    # React entry point
│   ├── index.css                   # Tailwind + base styles
│   └── App.css                     # App-specific styles
├── public/
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── package.json                    # Dependencies
```

---

## 🎨 Design Features

- **Dark Mode Premium UI** with glassmorphism effects
- **Vibrant Accents**: Neon green (#39ff14) and cyan (#00d9ff)
- **Alert System**: Crimson red (#dc143c) for warnings
- **Responsive Grid**: Auto-adapts to different screen sizes
- **Real-time Status**: Pulsing "System Online" indicator
- **Smooth Animations**: Fade-ins, slides, and hover effects

---

## 🔌 API Integration Details

The frontend automatically:
1. Fetches all inventory items when the app loads
2. Shows a loading spinner while fetching
3. Displays errors if the backend is unreachable
4. Handles image uploads with multipart/form-data
5. Updates inventory and alerts based on scan results
6. Shows a "System Alerts" panel only when there are active alerts

---

## ⚠️ Troubleshooting

### "Failed to load inventory. Is the backend running?"
- Ensure your C# backend is running on `http://localhost:5266`
- Check if CORS is properly configured
- Verify the `/api/inventory` endpoint exists and returns valid JSON

### Requests blocked by CORS error
- Double-check your C# CORS configuration matches the frontend origin exactly
- Ensure `UseCors()` is called BEFORE other middleware that handles requests
- Check browser console (F12) for detailed CORS error messages

### Image upload fails
- Verify `POST /api/inventory/scan` accepts multipart/form-data
- Ensure the file field is named `image`
- Check if your backend is processing images correctly

---

## 📞 Support

For React/Vite issues: https://vitejs.dev/
For Tailwind CSS: https://tailwindcss.com/
For Lucide Icons: https://lucide.dev/

---

**PantryVision™ - AI-Powered Smart Warehouse Management**
