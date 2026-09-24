import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  ArrowUpRight, 
  Trophy, 
  Rocket, 
  ShieldCheck, 
  Activity, 
  MessageSquare, 
  Lightbulb, 
  Globe, 
  BarChart3, 
  Users, 
  Store, 
  MessagesSquare, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Clock,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import TeamPage from './components/TeamPage';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const registrationLink = "https://forms.gle/E1x9CT8mF5z1R4YC8";

  // Light / Dark mode management
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jai_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('jai_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('jai_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Sync route with URL hash for deep linking (#team / #home)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#team') {
        setCurrentPage('team');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page, sectionId = null) => {
    setMobileMenuOpen(false);
    if (page === 'team') {
      setCurrentPage('team');
      window.location.hash = '#team';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Animated number counter ticker for stats
  const [animatedStats, setAnimatedStats] = useState({
    themes: 0,
    events: 0,
    prize: "0.0",
    preSeed: 0
  });

  useEffect(() => {
    let startTime = null;
    const duration = 2800;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        themes: Math.round(ease * 4),
        events: Math.round(ease * 7),
        prize: (ease * 1.5).toFixed(1),
        preSeed: Math.round(ease * 10)
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(step);
    }, 200);

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-[#050811] text-slate-100' : 'bg-[#f4f7fb] text-slate-800'} font-sans selection:bg-blue-600 selection:text-white`}>
      
      {/* =========================================================================
          VIEW ROUTER: Home Page vs Dedicated Faculty Team Webpage
          ========================================================================= */}
      {currentPage === 'team' ? (
        <div className="w-full">
          {/* Top Navbar for Team Page */}
          <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-300 bg-white/95 dark:bg-[#070b16]/95 border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-3 flex items-center justify-between gap-4">
              
              {/* JIIT Logo + Text */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <button 
                  onClick={() => navigateTo('home')}
                  className="flex items-center gap-3 sm:gap-3.5 transition-transform hover:scale-105 cursor-pointer text-left focus:outline-none"
                  title="Jaypee Institute of Information Technology"
                >
                  <img 
                    src="/imgs/jiit.png" 
                    alt="JIIT Logo" 
                    className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain logo-clean-drop shrink-0"
                  />
                  <div className="flex flex-col select-none">
                    <span className="font-display font-black text-[11px] sm:text-xs md:text-sm tracking-wider text-[#0a1945] dark:text-white uppercase leading-tight">
                      Jaypee Institute of
                    </span>
                    <span className="font-display font-black text-[11px] sm:text-xs md:text-sm tracking-wider text-[#0a1945] dark:text-white uppercase leading-tight">
                      Information Technology
                    </span>
                    <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-blue-700 dark:text-cyan-300 tracking-wider mt-0.5 font-hindi">
                      विद्या तत्व ज्योतिसम
                    </span>
                  </div>
                </button>
              </div>

              {/* Center Pill Nav + Theme Toggle */}
              <div className="hidden xl:flex items-center gap-3">
                <nav className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/60 shadow-sm">
                  <button onClick={() => navigateTo('home')} className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">Home</button>
                  <button onClick={() => navigateTo('home', 'about')} className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">About</button>
                  <button onClick={() => navigateTo('home', 'highlights')} className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">Highlights</button>
                  <button onClick={() => navigateTo('home', 'thematic-areas')} className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">Themes</button>
                  <button onClick={() => navigateTo('home', 'hackathon')} className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">Hackathon</button>
                  <button onClick={() => navigateTo('home', 'schedule')} className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">Schedule</button>
                  <button onClick={() => navigateTo('home', 'directions')} className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">Venue</button>
                  <button onClick={() => navigateTo('team')} className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-600 text-white shadow-sm cursor-pointer">Team</button>
                </nav>
                <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </div>

              {/* RIDE Logo */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <div className="xl:hidden">
                  <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </div>

                <div 
                  onClick={() => navigateTo('home', 'about')}
                  className="flex items-center transition-transform hover:scale-105 cursor-pointer"
                  title="RIDE Initiative"
                >
                  <img 
                    src="/imgs/ride.png" 
                    alt="RIDE Logo" 
                    className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain logo-clean-drop"
                  />
                </div>

                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </header>

          <TeamPage onNavigateHome={() => navigateTo('home')} darkMode={darkMode} />
        </div>
      ) : (
        <div className="w-full">
          
          {/* =====================================================================
              1. FULL SCREEN WIDTH RECTANGLE COLLEGE BANNER WITH OVERLAID NAVBAR
              COVERS WHOLE WIDTH OF DEVICE (EDGE-TO-EDGE), NOT FULL LENGTH OF DEVICE
              ===================================================================== */}
          {/* =====================================================================
              1. FULL WIDTH COLLEGE BANNER WITH ROUNDED BOTTOM CORNERS
              & INTEGRATED HEADER AND BOTTOM-LEFT HERO TYPOGRAPHY
              ===================================================================== */}
          <div className="relative w-full overflow-hidden bg-slate-950 rounded-b-[36px] sm:rounded-b-[48px] md:rounded-b-[56px] lg:rounded-b-[64px] shadow-2xl">
            
            {/* Campus Background Image */}
            <img 
              src="/imgs/jiit128.jpeg" 
              alt="Jaypee Institute of Information Technology - Sector 128 Noida" 
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
            />

            {/* Soft sky-glass gradient across the top behind navbar & logos */}
            <div className="absolute top-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-b from-white/75 via-white/35 to-transparent dark:from-slate-950/85 dark:via-slate-950/45 dark:to-transparent pointer-events-none" />

            {/* Smooth dark blue/slate gradient covering the left half for hero typography */}
            <div className="absolute inset-y-0 left-0 w-full md:w-[72%] lg:w-[62%] xl:w-[55%] bg-gradient-to-r from-slate-950/95 via-slate-950/80 sm:via-slate-950/65 to-transparent pointer-events-none" />

            {/* Subtle bottom shadow along the rounded boundary */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />

            {/* Content Container inside the Banner */}
            <div className="relative z-10 w-full min-h-[480px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] xl:min-h-[640px] flex flex-col justify-between p-4 sm:p-6 lg:p-8 xl:px-14">
              
              {/* TOP HEADER ROW */}
              <header className="w-full flex items-center justify-between gap-4">
                
                {/* Extreme Left: Enlarged JIIT Logo + Text (No background box) */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <button 
                    onClick={() => navigateTo('home')}
                    className="flex items-center gap-3 sm:gap-4 transition-transform hover:scale-105 cursor-pointer text-left focus:outline-none"
                    title="Jaypee Institute of Information Technology"
                  >
                    <img 
                      src="/imgs/jiit.png" 
                      alt="JIIT Logo" 
                      className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain logo-clean-drop shrink-0"
                    />
                    <div className="flex flex-col select-none">
                      <span className="font-display font-black text-[11px] sm:text-xs md:text-sm tracking-wider text-[#0a1945] dark:text-white uppercase leading-tight">
                        Jaypee Institute of
                      </span>
                      <span className="font-display font-black text-[11px] sm:text-xs md:text-sm tracking-wider text-[#0a1945] dark:text-white uppercase leading-tight">
                        Information Technology
                      </span>
                      <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-blue-700 dark:text-cyan-300 tracking-wider mt-0.5 font-hindi">
                        विद्या तत्व ज्योतिसम
                      </span>
                    </div>
                  </button>
                </div>

                {/* Center: Frosted Capsule Pill Navbar + Theme Toggle Pill */}
                <div className="hidden xl:flex items-center gap-3">
                  
                  {/* Floating Frosted Pill Nav */}
                  <nav className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/70 dark:border-slate-700/60 shadow-md">
                    <button 
                      onClick={() => navigateTo('home')}
                      className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer bg-blue-600 text-white shadow-sm"
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => navigateTo('home', 'about')}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      About
                    </button>
                    <button 
                      onClick={() => navigateTo('home', 'highlights')}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Highlights
                    </button>
                    <button 
                      onClick={() => navigateTo('home', 'thematic-areas')}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Themes
                    </button>
                    <button 
                      onClick={() => navigateTo('home', 'hackathon')}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Hackathon
                    </button>
                    <button 
                      onClick={() => navigateTo('home', 'schedule')}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Schedule
                    </button>
                    <button 
                      onClick={() => navigateTo('home', 'directions')}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Venue
                    </button>
                    <button 
                      onClick={() => navigateTo('team')}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Team
                    </button>
                  </nav>

                  {/* Theme Toggle Pill */}
                  <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                </div>

                {/* Extreme Right: Enlarged RIDE Logo (No background box) */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <div className="xl:hidden">
                    <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                  </div>

                  <div 
                    onClick={() => navigateTo('home', 'about')}
                    className="flex items-center transition-transform hover:scale-105 cursor-pointer"
                    title="RIDE Initiative (Research, Innovation, Development, Entrepreneurship)"
                  >
                    <img 
                      src="/imgs/ride.png" 
                      alt="RIDE Logo" 
                      className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain logo-clean-drop"
                    />
                  </div>

                  {/* Mobile Hamburger Menu Button */}
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="xl:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-900/80 text-slate-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Toggle Menu"
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>

              </header>

              {/* BOTTOM-LEFT HERO TYPOGRAPHY & DETAILS */}
              <div className="w-full max-w-3xl pb-4 sm:pb-8 lg:pb-10 pt-10 sm:pt-16 text-left">
                <p className="font-display font-bold text-[11px] sm:text-xs md:text-sm tracking-[0.22em] text-slate-300 uppercase mb-2 sm:mb-2.5">
                  JAYPEE INSTITUTE OF INFORMATION TECHNOLOGY
                </p>

                <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-white tracking-tight leading-[1.08]">
                  Where Innovation <br />
                  <span className="text-[#38bdf8] drop-shadow-[0_2px_14px_rgba(56,189,248,0.45)]">
                    Meets Impact
                  </span>
                </h1>

                <p className="text-slate-200 text-xs sm:text-sm md:text-base font-normal max-w-xl leading-relaxed mt-2.5 sm:mt-3.5">
                  Bringing together curious minds, cutting-edge ideas and real-world solutions for a smarter tomorrow.
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-200 mt-4 sm:mt-6 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white shrink-0" />
                    <span>JIIT Sector 128, Wish Town, Noida</span>
                  </div>
                  <span className="hidden sm:inline text-slate-400">|</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white shrink-0" />
                    <span>October 30 – 31, 2026</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="xl:hidden fixed inset-x-4 top-24 z-50 border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl flex flex-col gap-2.5 font-display animate-fadeIn">
              <button onClick={() => navigateTo('home')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/50">Home</button>
              <button onClick={() => navigateTo('home', 'about')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400">About</button>
              <button onClick={() => navigateTo('home', 'highlights')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400">Highlights</button>
              <button onClick={() => navigateTo('home', 'thematic-areas')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400">Themes</button>
              <button onClick={() => navigateTo('home', 'hackathon')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400">Hackathon</button>
              <button onClick={() => navigateTo('home', 'schedule')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400">Schedule</button>
              <button onClick={() => navigateTo('home', 'directions')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400">Venue</button>
              <button onClick={() => navigateTo('team')} className="text-left text-sm font-black uppercase tracking-wider py-2.5 px-4 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400">Team (Faculty)</button>
              <a href={registrationLink} target="_blank" rel="noopener noreferrer" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 rounded-xl text-center uppercase tracking-wider shadow-lg">Register for Summit</a>
            </div>
          )}

          {/* =====================================================================
              2. CENTERPIECE AGENTIC AI SUMMIT LOGO & FLOATING STATS CARD
              WITH FLOWING CURVED WAVE GRAPHICS IN THE BACKGROUND
              ===================================================================== */}
          <section className="relative w-full overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20" id="home">
            
            {/* Flowing Curved Background Wave Paths (matching reference image) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              {/* Soft subtle radial ambient glow centered behind the logo */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-400/10 via-sky-300/15 to-blue-600/10 dark:from-blue-600/20 dark:via-cyan-500/15 dark:to-indigo-600/20 rounded-full blur-3xl" />

              {/* Elegant SVG Curved Waves matching reference design */}
              <svg 
                className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20" 
                viewBox="0 0 1440 600" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path 
                  d="M-100 200 C 300 450, 600 150, 1540 350" 
                  stroke="url(#blueWaveGrad1)" 
                  strokeWidth="1.5" 
                />
                <path 
                  d="M-50 480 C 400 200, 1000 550, 1500 180" 
                  stroke="url(#blueWaveGrad2)" 
                  strokeWidth="1.5" 
                />
                <path 
                  d="M0 320 C 500 500, 950 100, 1440 280" 
                  stroke="url(#blueWaveGrad1)" 
                  strokeWidth="1" 
                  strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient id="blueWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="blueWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#2563eb" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
              
              {/* PRIMARY PROMINENT OFFICIAL AGENTIC AI SUMMIT LOGO */}
              <div className="mb-8 sm:mb-12 animate-float">
                <img 
                  src="/imgs/ai-summit.png" 
                  alt="Jaypee Agentic AI International Summit Logo" 
                  className={`h-40 sm:h-52 md:h-64 lg:h-72 w-auto object-contain mx-auto cursor-pointer transition-all duration-300 hover:scale-105 ${
                    darkMode ? 'logo-glow-dark' : 'logo-glow-light'
                  }`}
                />
              </div>

              {/* FLOATING 4-COLUMN STATS CARD */}
              <div className="w-full max-w-3xl lg:max-w-4xl bg-white/95 dark:bg-[#0c162d]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800/80 px-4 sm:px-8 py-5 sm:py-6 grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800">
                
                {/* Stat 1: Themes */}
                <div className="flex flex-col items-center px-1 sm:px-3 group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
                  <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#0b2253] dark:text-white leading-none">
                    {animatedStats.themes}
                  </span>
                  <span className="font-display font-extrabold text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 tracking-widest uppercase mt-1.5">
                    THEMES
                  </span>
                </div>

                {/* Stat 2: Events */}
                <div className="flex flex-col items-center px-1 sm:px-3 group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
                  <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#0b2253] dark:text-white leading-none">
                    {animatedStats.events}
                  </span>
                  <span className="font-display font-extrabold text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 tracking-widest uppercase mt-1.5">
                    EVENTS
                  </span>
                </div>

                {/* Stat 3: Prize Pool */}
                <div className="flex flex-col items-center px-1 sm:px-3 group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
                  <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-blue-600 dark:text-cyan-400 leading-none">
                    ₹{animatedStats.prize}M
                  </span>
                  <span className="font-display font-extrabold text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 tracking-widest uppercase mt-1.5">
                    PRIZE POOL
                  </span>
                </div>

                {/* Stat 4: Pre-Seed Pool */}
                <div className="flex flex-col items-center px-1 sm:px-3 group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
                  <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-blue-600 dark:text-cyan-400 leading-none">
                    ₹{animatedStats.preSeed}M
                  </span>
                  <span className="font-display font-extrabold text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 tracking-widest uppercase mt-1.5">
                    PRE-SEED POOL
                  </span>
                </div>

              </div>

            </div>
          </section>

          {/* =====================================================================
              BODY CONTENT SECTIONS
              ===================================================================== */}
          <main className="max-w-[1584px] mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-16">

            {/* 1. OVERVIEW & 3 STACKED CARDS */}
            <section className="bg-white dark:bg-[#0b1329] rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300" id="about">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Column: Heading + Editorial Intro */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 px-3.5 py-1 rounded-full font-display">
                    Summit Overview
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight font-display">
                    Where Human Intelligence Meets Autonomous Execution
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                    Hosted at Jaypee Institute of Information Technology (JIIT) Wish Town Campus in Sector-128, Noida, JAI 2026 convenes academic researchers, industry architects, and student innovators to pioneer the frontier of agentic AI systems.
                  </p>

                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 font-display">
                    Real Problems &nbsp;|&nbsp; Intelligent Agents &nbsp;|&nbsp; Lasting Impact
                  </div>
                </div>

                {/* Right Column: 3 Stacked Cards */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  
                  <div className="bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-900 dark:text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-200 hover:translate-x-1.5 border border-slate-200 dark:border-slate-700/60 shadow-sm cursor-pointer group">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg font-display">Agentic AI Hackathon</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        Build autonomous problem-solving agents backed by an exciting INR 1.5 Million prize pool.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-900 dark:text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-200 hover:translate-x-1.5 border border-slate-200 dark:border-slate-700/60 shadow-sm cursor-pointer group">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg font-display">Pre-Seed Funding Pool</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        Access to an INR 10 Million pre-seed funding pool driven by RIDE to incubate promising AI ventures.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-900 dark:text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-200 hover:translate-x-1.5 border border-slate-200 dark:border-slate-700/60 shadow-sm cursor-pointer group">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg font-display">Institutional Collaboration</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        Organized by Jaypee Institute of Information Technology (JIIT) in partnership with the RIDE initiative.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* =====================================================================
                2. SUMMIT HIGHLIGHTS (IMPROVED UI - ENGAGING, HIGH-TECH & VISUAL)
                ===================================================================== */}
            <section className="bg-white dark:bg-[#0b1329] rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300" id="highlights">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-display">
                    Core Confluence Pillars
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-1">
                    Summit Highlights
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Seven distinguished engagement tracks featured in the official summit brochure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-5">
                
                {/* 1. Global Tech Talks */}
                <div className="group relative rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between cursor-pointer">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-300 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full mb-2">Keynotes</span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white font-display leading-snug">Global Tech Talks</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    World leaders presenting breakthroughs in autonomous agent architectures.
                  </p>
                </div>

                {/* 2. Research & Innovation */}
                <div className="group relative rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between cursor-pointer">
                  <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full mb-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full mb-2">Academic</span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white font-display leading-snug">Research & Innovation</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Peer-reviewed papers and frontier prototypes in multi-agent intelligence.
                  </p>
                </div>

                {/* 3. Industry Perspectives */}
                <div className="group relative rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between cursor-pointer">
                  <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mb-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full mb-2">Enterprise</span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white font-display leading-snug">Industry Perspectives</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Executive insights on enterprise adoption, ROI, and agent workflows.
                  </p>
                </div>

                {/* 4. Networking & Collaboration */}
                <div className="group relative rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between cursor-pointer">
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mb-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full mb-2">Connect</span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white font-display leading-snug">Networking & Mix</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    High-impact networking between researchers, developers, and founders.
                  </p>
                </div>

                {/* 5. Agentic AI Hackathon */}
                <div className="group relative rounded-2xl p-5 bg-gradient-to-b from-blue-50 to-indigo-50/60 dark:from-blue-950/60 dark:to-slate-900 border-2 border-blue-400 dark:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between cursor-pointer">
                  <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 rounded-full mb-4 opacity-100" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/90 border border-amber-300/60 px-2 py-0.5 rounded-full mb-2">Flagship Sprint</span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white font-display leading-snug">Agentic AI Hackathon</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-semibold">
                    INR 1.5M Prize Pool & INR 10M Pre-Seed Funding Pool.
                  </p>
                </div>

                {/* 6. Expo */}
                <div className="group relative rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-pink-400 dark:hover:border-pink-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between cursor-pointer">
                  <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full mb-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/80 text-pink-600 dark:text-pink-300 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                      <Store className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 px-2 py-0.5 rounded-full mb-2">Showcase</span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white font-display leading-snug">AI Expo Arena</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Interactive demonstration booths showcasing live enterprise agent systems.
                  </p>
                </div>

                {/* 7. Panel Discussions */}
                <div className="group relative rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between cursor-pointer">
                  <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mb-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-300 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                      <MessagesSquare className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-full mb-2">Debates</span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white font-display leading-snug">Panel Discussions</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Thought leaders tackling ethics, governance, safety, and agent alignment.
                  </p>
                </div>

              </div>
            </section>

            {/* =====================================================================
                3. KEY THEMATIC AREAS (IMPROVED UI - RICH LUXURY TRACK CARDS)
                ===================================================================== */}
            <section className="bg-white dark:bg-[#0b1329] rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300" id="thematic-areas">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-display">
                    Agentic AI Focus Tracks
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-1">
                    Key Thematic Areas
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md sm:text-right">
                  Frontier application tracks where autonomous agent architectures drive transformative industry solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Track 1: Cybersecurity */}
                <div className="group relative rounded-3xl p-7 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-cyan-400/80 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[360px] cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
                        Security Track
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-display leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                      Agentic AI for Cybersecurity
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                      Deploying self-governing agents for real-time vulnerability detection, automated threat containment, and zero-trust protocol enforcement.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Threat Defense</span>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Auto-Forensics</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-blue-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider font-display">
                    <span>Explore Track</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Track 2: Healthcare */}
                <div className="group relative rounded-3xl p-7 bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/80 dark:hover:border-emerald-400/80 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[360px] cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                        <Activity className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full font-display">
                        Health Track
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-display leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      Agentic AI for Healthcare
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                      Empowering clinical decision support, biomedical data synthesis, and autonomous patient monitoring pipelines with verifiable safety.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Clinical Agents</span>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Biomedical LLMs</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider font-display">
                    <span>Explore Track</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Track 3: Natural Language Processing */}
                <div className="group relative rounded-3xl p-7 bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/80 dark:hover:border-indigo-400/80 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[360px] cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full font-display">
                        Language Track
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-display leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      Agentic AI for NLP
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                      Next-generation multi-turn conversational agents, autonomous chain-of-thought synthesis, cross-lingual intelligence, and semantic workflows.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Reasoning Chains</span>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Autonomous Dialogue</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider font-display">
                    <span>Explore Track</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Track 4: Open Innovation */}
                <div className="group relative rounded-3xl p-7 bg-gradient-to-b from-slate-50 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-amber-500/80 dark:hover:border-amber-400/80 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[360px] cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                        <Lightbulb className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full font-display">
                        Open Track
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-display leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Agentic AI for Open Innovation
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                      Cross-disciplinary breakthrough applications unlocking societal impact, sustainability, education, economics, and robotics frontiers.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Cross-Disciplinary</span>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">Frontier Tech</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider font-display">
                    <span>Explore Track</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

              </div>
            </section>

            {/* =====================================================================
                4. HACKATHON SPOTLIGHT (With Agentic AI Graphic & QR Code)
                ===================================================================== */}
            <section className="bg-white dark:bg-[#0b1329] rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300" id="hackathon">
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-8 sm:p-14 border border-blue-900/60 shadow-xl">
                
                {/* Background Agentic Silhouette Motif */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none mix-blend-screen overflow-hidden">
                  <img src="/imgs/ai-agent-face.png" alt="" className="w-full h-full object-cover object-left" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  
                  {/* Left Column: Details & Prize Pools */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-800 px-3.5 py-1 rounded-full font-display">
                        Flagship Competition
                      </span>
                      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mt-3 font-display">
                        Agentic AI Hackathon
                      </h2>
                      <p className="text-slate-300 text-base sm:text-lg mt-2 leading-relaxed">
                        Build autonomous agents solving mission-critical real-world challenges across healthcare, security, NLP, and open innovation.
                      </p>
                    </div>

                    {/* Prize Pools */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300 font-display">Exciting Prize Pool</div>
                        <div className="text-2xl sm:text-4xl font-black text-white mt-1 font-display">INR 1.5 MILLION</div>
                      </div>

                      <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 font-display">Pre-Seed Funding Pool</div>
                        <div className="text-2xl sm:text-4xl font-black text-white mt-1 font-display">INR 10 MILLION</div>
                      </div>
                    </div>

                    <div>
                      <a 
                        href={registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black font-display text-sm sm:text-base px-8 py-4 rounded-full inline-flex items-center gap-2.5 transition-all shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5"
                      >
                        <span>Register for Hackathon</span>
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: QR Code Registration Card */}
                  <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">
                      Scan to Register
                    </span>

                    {/* Vector QR Code */}
                    <div className="w-44 h-44 bg-white border border-slate-200 rounded-xl p-3 my-4 flex items-center justify-center shadow-inner">
                      <svg width="140" height="140" viewBox="0 0 100 100" fill="#0f172a" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="5" width="28" height="28" rx="3" fill="#0f172a"/>
                        <rect x="9" y="9" width="20" height="20" rx="1" fill="#ffffff"/>
                        <rect x="13" y="13" width="12" height="12" fill="#0f172a"/>

                        <rect x="67" y="5" width="28" height="28" rx="3" fill="#0f172a"/>
                        <rect x="71" y="9" width="20" height="20" rx="1" fill="#ffffff"/>
                        <rect x="75" y="13" width="12" height="12" fill="#0f172a"/>

                        <rect x="5" y="67" width="28" height="28" rx="3" fill="#0f172a"/>
                        <rect x="9" y="71" width="20" height="20" rx="1" fill="#ffffff"/>
                        <rect x="13" y="75" width="12" height="12" fill="#0f172a"/>

                        <rect x="38" y="8" width="6" height="6" fill="#0f172a"/>
                        <rect x="48" y="8" width="12" height="6" fill="#0f172a"/>
                        <rect x="38" y="18" width="12" height="6" fill="#0f172a"/>
                        <rect x="54" y="18" width="6" height="6" fill="#0f172a"/>

                        <rect x="8" y="38" width="6" height="12" fill="#0f172a"/>
                        <rect x="18" y="38" width="6" height="6" fill="#0f172a"/>
                        <rect x="18" y="48" width="12" height="6" fill="#0f172a"/>

                        <rect x="38" y="38" width="24" height="24" rx="2" fill="#0f172a"/>
                        <text x="50" y="53" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">JAI</text>

                        <rect x="68" y="38" width="12" height="6" fill="#0f172a"/>
                        <rect x="84" y="38" width="8" height="12" fill="#0f172a"/>
                        <rect x="68" y="48" width="8" height="12" fill="#0f172a"/>

                        <rect x="38" y="68" width="8" height="6" fill="#0f172a"/>
                        <rect x="50" y="68" width="12" height="6" fill="#0f172a"/>
                        <rect x="42" y="84" width="16" height="8" fill="#0f172a"/>
                        <rect x="68" y="68" width="24" height="6" fill="#0f172a"/>
                        <rect x="68" y="78" width="12" height="12" fill="#0f172a"/>
                        <rect x="84" y="84" width="8" height="8" fill="#0f172a"/>
                      </svg>
                    </div>

                    <div className="text-xs font-mono font-bold text-blue-700 mb-3">
                      forms.gle/E1x9CT8mF5z1R4YC8
                    </div>

                    <a 
                      href={registrationLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black font-display text-xs py-3 rounded-full inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm hover:shadow"
                    >
                      <span>Open Form</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>
            </section>

            {/* =====================================================================
                5. TENTATIVE SUMMIT SCHEDULE (TBD)
                ===================================================================== */}
            <section className="bg-white dark:bg-[#0b1329] rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300" id="schedule">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-display">
                    Program Itinerary
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-1">
                    Tentative Summit Schedule (TBD)
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Tentative timeline framework for the two-day summit. Detailed sessions to be announced.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Day 1 Card */}
                <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white font-display">
                      Day 1: Friday, Oct 30, 2026
                    </div>
                    <span className="text-xs font-extrabold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
                      Tentative Outline (TBD)
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 09:00 – 10:30 AM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Inaugural Ceremony & Opening Keynote</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Welcome address and opening perspectives on Agentic AI.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 11:00 AM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Agentic AI Hackathon Sprint Kickoff</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Problem statement deep dive and development sprint begins.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 11:30 AM – 01:00 PM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Global Tech Talks</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Presentations from autonomous agents researchers.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 02:30 – 05:00 PM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Research Track & Panel Discussions</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Parallel sessions across cybersecurity, health, and NLP.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 Card */}
                <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white font-display">
                      Day 2: Saturday, Oct 31, 2026
                    </div>
                    <span className="text-xs font-extrabold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
                      Tentative Outline (TBD)
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 09:30 – 11:00 AM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Industry Perspectives & Expo</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Live demonstration stalls and enterprise case studies.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 11:30 AM – 01:30 PM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Hackathon Demos & Jury Evaluation</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Finalist teams showcase working autonomous agent prototypes.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 02:30 – 04:00 PM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Pre-Seed Venture Pitch Session</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Pitches for the INR 10 Million pre-seed funding pool.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-32 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> 04:30 – 05:30 PM
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">Valedictory & Prize Distribution</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Awarding INR 1.5 Million in prizes and concluding remarks.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* =====================================================================
                6. VENUE & DIRECTIONS (JIIT Sector 128 + Google Maps)
                ===================================================================== */}
            <section className="bg-white dark:bg-[#0b1329] rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300" id="directions">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-display">
                    Official Location
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-1">
                    Venue & Directions
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Campus address and interactive navigation map for the summit venue.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Official Address */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                      Wish Town Campus
                    </h3>
                    <div className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-cyan-400 mt-1 font-display">
                      Jaypee Institute of Information Technology (JIIT)
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-600 dark:border-cyan-400 pl-4 py-1.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    Jaypee Wish Town, Sector 128,<br />
                    Noida, Uttar Pradesh 201304,<br />
                    India
                  </div>

                  <div>
                    <a 
                      href="https://maps.google.com/?q=Jaypee+Institute+of+Information+Technology+Sector+128+Noida" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-black font-display text-xs sm:text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Google Maps Embed */}
                <div className="lg:col-span-7 h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.747970724816!2d77.36987707629636!3d28.517228889445107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce640be474fa7%3A0x6a053cdae0234a47!2sJaypee%20Institute%20of%20Information%20Technology%2C%20Sector%20128!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                    className="w-full h-full border-0"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="JIIT Sector 128 Map"
                  />
                </div>

              </div>
            </section>

          </main>
        </div>
      )}

      {/* =========================================================================
          FOOTER: With Home, About, Highlights, Themes, Hackathon, Schedule, Venue, Team
          ========================================================================= */}
      <footer className="w-full max-w-[1584px] mx-auto px-4 sm:px-6 lg:px-12 pb-12 pt-6">
        <div className="bg-white dark:bg-[#070c18] border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-3xl p-8 sm:p-12 space-y-8 shadow-sm">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-5">
              <img src="/imgs/jiit.png" alt="JIIT" className="h-14 sm:h-16 w-auto object-contain logo-clean-drop" />
              <img src="/imgs/ride.png" alt="RIDE" className="h-14 sm:h-16 w-auto object-contain logo-clean-drop" />
              <div className="border-l border-slate-300 dark:border-slate-700 pl-3">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight font-display">JAI 2026</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Jaypee Agentic AI International Summit</p>
              </div>
            </div>

            {/* Complete Bottom Navigation Links */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider font-display">
              <button onClick={() => navigateTo('home')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                Home
              </button>
              <button onClick={() => navigateTo('home', 'about')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                About
              </button>
              <button onClick={() => navigateTo('home', 'highlights')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                Highlights
              </button>
              <button onClick={() => navigateTo('home', 'thematic-areas')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                Themes
              </button>
              <button onClick={() => navigateTo('home', 'hackathon')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                Hackathon
              </button>
              <button onClick={() => navigateTo('home', 'schedule')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                Schedule
              </button>
              <button onClick={() => navigateTo('home', 'directions')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                Venue
              </button>
              <button onClick={() => navigateTo('team')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer">
                Team
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-display">
            <div className="font-extrabold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
              PEOPLE &nbsp;|&nbsp; IDEAS &nbsp;|&nbsp; PERSPECTIVE &nbsp;|&nbsp; A BETTER TOMORROW
            </div>
            <div className="text-slate-500">
              © 2026 Jaypee Agentic AI International Summit. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
