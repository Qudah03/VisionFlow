import React, { useRef, useState } from 'react';
import { Upload, Camera, Loader } from 'lucide-react';

export const UploadSection = ({ onImageSelect, loading }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative group mt-8 mb-12 transition-all duration-300 ${
        dragActive ? 'scale-105' : 'scale-100'
      }`}
    >
      {/* Glassmorphism Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
          dragActive
            ? 'border-neon-cyan ring-2 ring-neon-cyan/50 shadow-lg shadow-neon-cyan/20'
            : 'border-slate-700/50 hover:border-slate-600'
        }`}
      ></div>

      {/* Content */}
      <div className="relative p-12 flex flex-col items-center justify-center cursor-pointer">
        {loading ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader className="w-16 h-16 text-neon-cyan animate-spin" strokeWidth={1.5} />
            </div>
            <p className="text-lg font-semibold text-slate-200">AI Scanning image...</p>
            <p className="text-sm text-slate-400">Please wait, analyzing pantry contents</p>
          </div>
        ) : (
          <>
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-neon-green opacity-10 blur-2xl rounded-full"></div>
              <Camera className="w-20 h-20 text-neon-green relative" strokeWidth={1} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Snap Pantry Photo
            </h2>

            <p className="text-slate-300 text-center mb-6 max-w-md">
              Upload a clear photo of your pantry to instantly analyze stock levels and get real-time alerts
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" strokeWidth={2.5} />
              Select Image
            </button>

            <p className="text-xs text-slate-500 mt-4 font-mono">
              or drag and drop your image here
            </p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
