import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { AlertsPanel } from './components/AlertsPanel';
import { InventoryGrid } from './components/InventoryGrid';
import './App.css';

const API_BASE_URL = 'https://special-fishstick-r47pxqp694q7fpqqv-5266.app.github.dev/api';

function App() {
  const [inventory, setInventory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory`);
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setInventory(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError('Failed to load inventory. Is the backend running?');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleImageSelect = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/inventory/scan`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Scan failed');

      const data = await response.json();

      // Update inventory with results
      if (data.current_stock) {
        setInventory(data.current_stock);
      }

      // Update alerts
      if (data.active_alerts && data.active_alerts.length > 0) {
        setAlerts(data.active_alerts);
      } else {
        setAlerts([]);
      }

      // Show success message
      if (data.message) {
        console.log('Scan result:', data.message);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to scan image. Please try again.');
      setAlerts(['⚠️ SCAN FAILED: Could not process image']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-alert-crimson/20 border border-alert-crimson/50 rounded-lg text-alert-crimson text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Upload Section */}
          <UploadSection onImageSelect={handleImageSelect} loading={loading} />

          {/* Alerts Panel */}
          {!initialLoading && <AlertsPanel alerts={alerts} />}

          {/* Inventory Grid */}
          {!initialLoading && <InventoryGrid inventory={inventory} />}

          {/* Loading State */}
          {initialLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-neon-green animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300 font-semibold">Initializing PantryVision...</p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-20 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
            <p>
              PantryVision™ • AI-Powered Smart Warehouse Management •{' '}
              <span className="text-neon-green">System Online</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
