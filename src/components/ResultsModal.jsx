import React, { useEffect } from 'react';
import { X, ExternalLink, Download, Trophy, Sparkles } from 'lucide-react';

export default function ResultsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-8 bg-slate-950/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Shortlisted Teams for Round 2"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[94vh] bg-white dark:bg-[#070d1e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-7 py-3.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-display">
                  Agentic AI Hackathon JAI'26
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <Sparkles className="w-2.5 h-2.5" /> Results Declared
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-0.5">
                Shortlisted Teams for Round 2
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/imgs/shortlisted-teams-round2.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 text-xs font-bold font-display hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              title="Open full size image in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </a>
            <a
              href="/imgs/shortlisted-teams-round2.jpg"
              download="shortlisted-teams-round2.jpg"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold font-display hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Download results poster"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Image Viewport */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-100/70 dark:bg-slate-950/80 flex flex-col items-center justify-start">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 w-full max-w-2xl">
            <img 
              src="/imgs/shortlisted-teams-round2.jpg" 
              alt="Shortlisted Teams for Round 2 - Agentic AI Hackathon JAI 2026" 
              className="w-full h-auto object-contain block"
            />
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-4 sm:px-7 py-3 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0b1329]/95 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400 shrink-0">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Selected teams moving forward to the Round 2 Development Sprint at JIIT Sector 128.
          </span>
          <div className="flex items-center gap-3">
            <a
              href="/imgs/shortlisted-teams-round2.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 sm:hidden"
            >
              <ExternalLink className="w-3 h-3" /> Full View
            </a>
            <a
              href="/imgs/shortlisted-teams-round2.jpg"
              download="shortlisted-teams-round2.jpg"
              className="font-bold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Save Image
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
