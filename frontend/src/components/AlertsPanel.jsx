import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const AlertsPanel = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
      {/* Alert Container */}
      <div className="bg-gradient-to-r from-alert-crimson/20 to-alert-crimson/10 backdrop-blur-xl border border-alert-crimson/50 rounded-xl p-6 shadow-lg shadow-alert-crimson/10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-alert-crimson/20 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-alert-crimson animate-pulse" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold text-white">System Alerts</h3>
          <span className="ml-auto text-xs font-mono text-alert-crimson/80 bg-alert-crimson/10 px-3 py-1 rounded">
            {alerts.length} {alerts.length === 1 ? 'Alert' : 'Alerts'}
          </span>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-alert-crimson/20 hover:border-alert-crimson/40 transition-colors"
            >
              <div className="mt-1">
                <div className="w-2 h-2 bg-alert-crimson rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-200 font-medium">{alert}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-alert-crimson/60 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-4 border-t border-alert-crimson/20">
          <button className="text-sm text-alert-crimson hover:text-alert-crimson/80 font-semibold transition-colors">
            → View Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};
