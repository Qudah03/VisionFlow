# PantryVision Frontend - Terminal Commands Reference

## 📋 Setup Commands (One-Time Only)

If you need to recreate the project from scratch, here are the exact commands:

### 1. Create Vite React Project
```bash
npm create vite@latest frontend -- --template react
cd frontend
```

### 2. Install Dependencies
```bash
npm install
npm install -D tailwindcss postcss autoprefixer lucide-react
npx tailwindcss init -p
```

### 3. Install Lucide React Icons
```bash
npm install lucide-react
```

---

## 🚀 Development Commands

### Start Development Server
```bash
cd /workspaces/VisionFlow/frontend
npm run dev
```
The app will be available at: **http://localhost:5174/**

### Build for Production
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Format Code with Prettier
```bash
npm run format
```

---

## 📦 Your Vite Config

Located in: `/workspaces/VisionFlow/frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## 🎨 Your Tailwind Config

Located in: `/workspaces/VisionFlow/frontend/tailwind.config.js`

Includes custom color extensions:
- `neon.green`: #39ff14 (Primary action color)
- `neon.cyan`: #00d9ff (Secondary accent)
- `alert.crimson`: #dc143c (Warning/alert color)
- `slate.900` & `slate.950`: Dark mode backgrounds

---

## 🔧 Your PostCSS Config

Located in: `/workspaces/VisionFlow/frontend/postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Automatically processes Tailwind directives and adds vendor prefixes.

---

## 📊 API Base URL

All API calls use: `http://localhost:5266/api`

Endpoints:
- `GET  /api/inventory` - Fetch all items
- `POST /api/inventory/scan` - Upload image for analysis

---

## 🐛 Debugging Tips

### Check if Dev Server is Running
```bash
curl http://localhost:5174/
```

### Check if Backend is Running
```bash
curl http://localhost:5266/api/inventory
```

### View Package Versions
```bash
npm list react tailwindcss lucide-react vite
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Project Files Created

- ✅ `/src/App.jsx` - Main application component with API logic
- ✅ `/src/components/Header.jsx` - Premium header with status indicator
- ✅ `/src/components/UploadSection.jsx` - Drag-and-drop image upload
- ✅ `/src/components/AlertsPanel.jsx` - System alerts display
- ✅ `/src/components/InventoryGrid.jsx` - Inventory grid display
- ✅ `/src/index.css` - Tailwind base + animations
- ✅ `/src/App.css` - App-specific styles (clean)
- ✅ `/tailwind.config.js` - Custom theme configuration
- ✅ `/postcss.config.js` - PostCSS configuration
- ✅ `/vite.config.js` - Vite configuration

---

## 🖼️ UI Components Breakdown

### Header Component
- Shows "PantryVision" branding
- Pulsing "System Online" indicator
- Real-time status display

### Upload Section
- Drag-and-drop zone
- Click to select image
- Loading spinner during upload
- Glassmorphic design

### Alerts Panel
- Shows only when alerts exist
- Displays each alert with animation
- Color-coded for urgency

### Inventory Grid
- Responsive 3-column layout
- Card-based display
- Stock level indicators
- Color-coded health status (green/yellow/red)

---

## 🔐 CORS Setup for C# Backend

**CRITICAL: You MUST configure CORS in your C# backend!**

Add this to your `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("PantryVisionPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5174")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();
app.UseCors("PantryVisionPolicy");
```

See `CORS_AND_SETUP_GUIDE.md` for detailed instructions.

---

## 📝 Notes

- Node.js version: 18+ required
- npm version: 9+ recommended
- Vite version: 8.x
- React version: 18.x
- Tailwind CSS: 3.x

---

**All commands should be run from: `/workspaces/VisionFlow/frontend/`**
