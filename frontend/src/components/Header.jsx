import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export const Header = () => {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-green opacity-20 blur-lg rounded-lg"></div>
            <div className="relative bg-slate-900 p-2 rounded-lg border border-neon-green/50">
              <Zap className="w-6 h-6 text-neon-green" strokeWidth={3} />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Pantry<span className="text-neon-green">Vision</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">AI-Powered Inventory</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-slate-300">System Status</p>
            <p className="text-xs text-slate-500">Real-time Monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                pulse
                  ? 'bg-neon-green shadow-lg shadow-neon-green/50'
                  : 'bg-neon-green/50'
              }`}
            ></div>
            <span className="text-sm font-semibold text-neon-green animate-pulse">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
