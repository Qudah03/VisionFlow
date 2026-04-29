import React from 'react';
import { Package, TrendingUp } from 'lucide-react';

export const InventoryGrid = ({ inventory }) => {
  if (!inventory || inventory.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 animate-pulse"
          >
            <div className="h-8 bg-slate-700 rounded mb-4 w-3/4"></div>
            <div className="h-12 bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Package className="w-5 h-5 text-neon-green" strokeWidth={2.5} />
        <h2 className="text-2xl font-bold text-white">Live Inventory</h2>
        <span className="text-sm text-slate-400 ml-auto">
          {inventory.length} items tracked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
          >
            {/* Glassmorphism Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-900/40 to-slate-950/50 backdrop-blur-xl border border-slate-700/50 group-hover:border-neon-cyan/30 transition-colors"></div>

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="relative p-6 flex flex-col h-full">
              {/* Icon */}
              <div className="mb-4 flex justify-between items-start">
                <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                  <Package className="w-6 h-6 text-neon-green" strokeWidth={2} />
                </div>
                <TrendingUp className="w-5 h-5 text-neon-cyan/60" strokeWidth={2} />
              </div>

              {/* Item Name */}
              <h3 className="text-lg font-bold text-white mb-2 capitalize">
                {item.name}
              </h3>

              {/* Stock Count */}
              <div className="mt-auto">
                <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest font-mono">
                  Current Stock
                </p>
                <p className="text-4xl font-black text-transparent bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text">
                  {item.count}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                {item.count > 10 ? (
                  <span className="text-xs text-neon-green font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                    Healthy Stock
                  </span>
                ) : item.count > 3 ? (
                  <span className="text-xs text-yellow-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    Low Stock Alert
                  </span>
                ) : (
                  <span className="text-xs text-alert-crimson font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-alert-crimson rounded-full animate-pulse"></span>
                    Critical Level
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
