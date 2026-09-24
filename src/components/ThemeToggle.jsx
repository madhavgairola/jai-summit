import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="relative flex items-center justify-between w-[72px] h-[36px] p-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-slate-700/70 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none backdrop-blur-md cursor-pointer group shrink-0"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      {/* Background Sun (left) and Moon (right) */}
      <span className="flex items-center justify-center w-6 h-6 text-amber-500 transition-opacity duration-200">
        <Sun className="w-3.5 h-3.5" />
      </span>
      <span className="flex items-center justify-center w-6 h-6 text-cyan-400 transition-opacity duration-200">
        <Moon className="w-3.5 h-3.5" />
      </span>

      {/* Sliding Highlight Knob */}
      <span
        className={`absolute top-[3px] w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
          darkMode
            ? 'left-[38px] bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-cyan-500/20'
            : 'left-[3px] bg-white text-amber-500 shadow-slate-300/80'
        }`}
      >
        {darkMode ? (
          <Moon className="w-3.5 h-3.5 text-cyan-300" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
        )}
      </span>
    </button>
  );
}
