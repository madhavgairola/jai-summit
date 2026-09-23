import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="relative flex items-center justify-between w-[72px] h-9 p-1 rounded-full bg-slate-200/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-700/80 shadow-inner transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40 backdrop-blur-md cursor-pointer group"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      {/* Background Icons */}
      <span className="flex items-center justify-center w-7 h-7 text-amber-500 transition-opacity duration-200">
        <Sun className="w-4 h-4" />
      </span>
      <span className="flex items-center justify-center w-7 h-7 text-cyan-300 transition-opacity duration-200">
        <Moon className="w-4 h-4" />
      </span>

      {/* Sliding Knob */}
      <span
        className={`absolute top-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
          darkMode
            ? 'left-[38px] bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-cyan-500/30'
            : 'left-1 bg-white text-amber-500 shadow-slate-400/30'
        }`}
      >
        {darkMode ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
        )}
      </span>
    </button>
  );
}
