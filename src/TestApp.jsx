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
  CheckCircle2 
} from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

export default function TestApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Animated number counter ticker for stats
  const [animatedStats, setAnimatedStats] = useState({
    themes: 0,
    events: 0,
    prize: "0.0",
    preSeed: 0
  });

  useEffect(() => {
    let startTime = null;
    const duration = 2800; // 2.8s smooth roll

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
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#eaeff4] dark:bg-[#070b16] text-slate-800 dark:text-slate-100 antialiased selection:bg-slate-900 selection:text-white dark:selection:bg-cyan-500 dark:selection:text-slate-950 font-sans transition-colors duration-300">
      
      {/* =========================================================================
          HERO LANDING: Clean Professional Layout (/test)
          Logos on Left & Right | Text-Only Taskbar Center | Big Hero Typography | Broad Campus Frame
          ========================================================================= */}
      <header className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 pb-6 sm:pb-10 bg-[#eaeff4] dark:bg-[#070b16] flex flex-col justify-between min-h-[100dvh] transition-colors duration-300" id="home">
        
        {/* Main Content Area (No Outer Box Line) */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col justify-between flex-1 gap-6 lg:gap-8">
          
          {/* =====================================================================
              TOP HEADER ROW: 
              [JIIT Logo + Jaypee Agentic AI Logo] (Left)
              [Text-Only Floating Taskbar] (Center)
              [RIDE Logo + ThemeToggle] (Right)
              ===================================================================== */}
          <div className="relative z-30 w-full flex items-center justify-between gap-4">
            
            {/* Left Corner: JIIT Institutional Logo + Jaypee Agentic AI Logo */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a 
                href="#home" 
                className="transition-transform duration-200 hover:scale-105 flex items-center justify-center" 
                title="Jaypee Institute of Information Technology"
              >
                <img 
                  src="/imgs/jiit.png" 
                  alt="Jaypee Institute of Information Technology" 
                  className="h-11 sm:h-13 md:h-15 lg:h-[4.2rem] w-auto object-contain [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_2px_8px_rgba(255,255,255,0.7))]"
                />
              </a>

              {/* Vertical Subtle Divider */}
              <div className="h-8 sm:h-10 w-px bg-slate-300 dark:bg-slate-700" />

              {/* Jaypee Agentic AI Summit Logo placed right next to JIIT logo */}
              <a 
                href="#home"
                className="transition-transform duration-200 hover:scale-105 flex items-center justify-center"
                title="Jaypee Agentic AI International Summit 2026"
              >
                <img 
                  src="/imgs/ai-summit.png" 
                  alt="Jaypee Agentic AI International Summit" 
                  className="h-10 sm:h-12 md:h-14 lg:h-[3.8rem] w-auto object-contain [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_2px_12px_rgba(56,189,248,0.5))]"
                />
              </a>

              {/* RIDE Logo: visible on mobile (< lg) */}
              <a 
                href="#about" 
                className="lg:hidden transition-transform duration-200 hover:scale-105 flex items-center justify-center" 
                title="RIDE Initiative"
              >
                <img 
                  src="/imgs/ride.png" 
                  alt="RIDE Logo" 
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_2px_8px_rgba(255,255,255,0.7))]"
                />
              </a>
            </div>

            {/* Center: THE TASKBAR (Floating Pill containing ONLY text links, NO logos!) */}
            <nav className="hidden lg:flex items-center justify-center bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-200/90 dark:border-slate-800 px-8 xl:px-10 py-3 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_4px_25px_-4px_rgba(0,0,0,0.5)] transition-colors duration-300">
              <div className="flex items-center gap-7 xl:gap-9">
                <a href="#about" className="text-[13px] font-bold tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors uppercase font-display hover:-translate-y-0.5">
                  About
                </a>
                <a href="#thematic-areas" className="text-[13px] font-bold tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors uppercase font-display hover:-translate-y-0.5">
                  Themes
                </a>
                <a href="#highlights" className="text-[13px] font-bold tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors uppercase font-display hover:-translate-y-0.5">
                  Highlights
                </a>
                <a href="#hackathon" className="text-[13px] font-bold tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors uppercase font-display hover:-translate-y-0.5">
                  Hackathon
                </a>
                <a href="#schedule" className="text-[13px] font-bold tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors uppercase font-display hover:-translate-y-0.5">
                  Schedule
                </a>
                <a href="#directions" className="text-[13px] font-bold tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors uppercase font-display hover:-translate-y-0.5">
                  Venue
                </a>
              </div>
            </nav>

            {/* Right Corner: RIDE Logo (Desktop) + ThemeToggle + Mobile Menu Toggle Button */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a 
                href="#about" 
                className="hidden lg:flex transition-transform duration-200 hover:scale-105 items-center justify-center" 
                title="RIDE Initiative"
              >
                <img 
                  src="/imgs/ride.png" 
                  alt="RIDE Logo" 
                  className="h-11 sm:h-13 md:h-15 lg:h-[4.2rem] w-auto object-contain [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_2px_8px_rgba(255,255,255,0.7))]"
                />
              </a>

              {/* Theme Toggle Button (Light / Dark mode) */}
              <div className="hidden sm:block">
                <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-x-4 top-24 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-center font-display animate-fadeIn">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-800">About</a>
              <a href="#thematic-areas" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-800">Themes</a>
              <a href="#highlights" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-800">Highlights</a>
              <a href="#hackathon" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-800">Hackathon</a>
              <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-800">Schedule</a>
              <a href="#directions" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-800">Venue</a>
              
              <div className="py-2 flex items-center justify-center">
                <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </div>

              <a 
                href={registrationLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 rounded-full uppercase tracking-wider mt-1 shadow-lg"
              >
                Register for Summit
              </a>
            </div>
          )}

          {/* =====================================================================
              SPLIT HERO STAGE
              Left: Enlarged typography taking the whole space on the left of the image
              Right: Broad, Panoramic Sector-128 Campus Photography Window
              ===================================================================== */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 flex-1 items-center my-auto min-h-0">
            
            {/* -----------------------------------------------------------------
                LEFT COLUMN: Takes the whole space on the left of the image
                Big Bold AGENTIC AI SUMMIT 2026 Typography
                ----------------------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left py-2 sm:py-4">
              
              {/* Stacked Large Heading: Line 1 = AGENTIC AI, Line 2 = SUMMIT + 2026 */}
              <div className="flex flex-col select-none mb-5 sm:mb-6">
                <h1 className={`font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.6rem] 2xl:text-[5.4rem] tracking-tight leading-[0.94] uppercase whitespace-nowrap ${
                  darkMode ? 'text-3d-summit-dark' : 'text-3d-summit-pro'
                }`}>
                  AGENTIC AI
                </h1>

                <div className="inline-flex items-center gap-3 sm:gap-4 mt-1 sm:mt-2">
                  <h1 className={`font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.6rem] 2xl:text-[5.4rem] tracking-tight leading-[0.94] uppercase whitespace-nowrap ${
                    darkMode ? 'text-3d-summit-dark' : 'text-3d-summit-pro'
                  }`}>
                    SUMMIT
                  </h1>
                  <span className="text-vertical-year font-display font-black text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[#062DB1] dark:text-cyan-400 drop-shadow-[1px_1px_0_#ffffff] dark:drop-shadow-[1px_1px_0_#062DB1] tracking-widest leading-none">
                    2026
                  </span>
                </div>
              </div>

              {/* Location & Date Pill Badge */}
              <div className="mb-5 sm:mb-6 space-y-1.5">
                <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 px-4 py-1.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
                  <span className="font-display font-extrabold text-[11px] sm:text-xs text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                    JIIT Sector 128, Noida &nbsp;|&nbsp; Oct 30 – 31, 2026
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide pl-1">
                  "Human Intelligence Meets Agentic Possibilities"
                </p>
              </div>

              {/* Main CTA Register Button */}
              <div className="mb-6 sm:mb-7">
                <a 
                  href={registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-slate-900 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-white font-display text-xs sm:text-sm font-extrabold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(15,23,42,0.15)] dark:shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-2.5 group"
                >
                  <span>Register for Summit</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-300 dark:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* 4 Metric Counters (With Slow Animated Ticker) */}
              <div className="w-full max-w-xl grid grid-cols-4 gap-2 sm:gap-4 border-t border-slate-300/80 dark:border-slate-800 pt-4">
                <div className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
                  <span className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-none">
                    {animatedStats.themes}
                  </span>
                  <span className="font-display font-bold text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">THEMES</span>
                </div>

                <div className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
                  <span className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-none">
                    {animatedStats.events}
                  </span>
                  <span className="font-display font-bold text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">EVENTS</span>
                </div>

                <div className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
                  <span className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-none">
                    ₹{animatedStats.prize}M
                  </span>
                  <span className="font-display font-bold text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">PRIZE POOL</span>
                </div>

                <div className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
                  <span className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-none">
                    ₹{animatedStats.preSeed}M
                  </span>
                  <span className="font-display font-bold text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">PRE-SEED</span>
                </div>
              </div>

            </div>

            {/* -----------------------------------------------------------------
                RIGHT COLUMN: Broad, Expanded Campus Photography Window
                ----------------------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col h-full w-full justify-center">
              <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[490px] xl:h-[540px] rounded-3xl sm:rounded-[32px] border border-slate-300/80 dark:border-slate-800 overflow-hidden shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] group bg-slate-100 dark:bg-slate-900 transition-all duration-300">
                
                {/* Clean Broad Sector-128 Campus Photography */}
                <img 
                  src="/imgs/jiit128.jpeg" 
                  alt="Jaypee Institute of Information Technology, Sector 128 Noida Campus" 
                  className="w-full h-full object-cover object-[center_35%] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

              </div>
            </div>

          </div>

        </div>

      </header>

      {/* =========================================================================
          BODY SECTIONS: Full Summit Program, Themes, Hackathon, Venue & Schedule
          ========================================================================= */}
      <div className="bg-[#eaeff4] dark:bg-[#070b16] w-full transition-colors duration-300">
        <main className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-14 space-y-14">

        {/* 1. OVERVIEW & 3 STACKED CARDS */}
        <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-14 shadow-wander-card dark:shadow-slate-950/40 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl" id="about">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Heading + Editorial Intro */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
                Summit Overview
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-display">
                Where Human Intelligence Meets Autonomous Execution
              </h2>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                Hosted at Jaypee Institute of Information Technology (JIIT) Wish Town Campus in Sector-128, Noida, JAI 2026 convenes academic researchers, industry architects, and student innovators to pioneer the frontier of agentic AI systems.
              </p>

              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 font-display">
                Real Problems &nbsp;|&nbsp; Intelligent Agents &nbsp;|&nbsp; Lasting Impact
              </div>
            </div>

            {/* Right Column: 3 Stacked Slate-Blue Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              <div className="bg-[#6b7f94] dark:bg-slate-800 hover:bg-[#5a6e83] dark:hover:bg-slate-750 text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:translate-x-2 shadow-sm hover:shadow-md cursor-pointer group border border-transparent dark:border-slate-700">
                <div className="w-11 h-11 rounded-xl bg-white/20 dark:bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5 text-white dark:text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-display">Agentic AI Hackathon</h3>
                  <p className="text-slate-100 dark:text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Build autonomous problem-solving agents backed by an exciting INR 1.5 Million prize pool.
                  </p>
                </div>
              </div>

              <div className="bg-[#6b7f94] dark:bg-slate-800 hover:bg-[#5a6e83] dark:hover:bg-slate-750 text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:translate-x-2 shadow-sm hover:shadow-md cursor-pointer group border border-transparent dark:border-slate-700">
                <div className="w-11 h-11 rounded-xl bg-white/20 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Rocket className="w-5 h-5 text-white dark:text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-display">Pre-Seed Funding Pool</h3>
                  <p className="text-slate-100 dark:text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    INR 10 Million dedicated backing for high-impact autonomous agent spin-offs and student startups.
                  </p>
                </div>
              </div>

              <div className="bg-[#6b7f94] dark:bg-slate-800 hover:bg-[#5a6e83] dark:hover:bg-slate-750 text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:translate-x-2 shadow-sm hover:shadow-md cursor-pointer group border border-transparent dark:border-slate-700">
                <div className="w-11 h-11 rounded-xl bg-white/20 dark:bg-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-white dark:text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-display">RIDE Initiative</h3>
                  <p className="text-slate-100 dark:text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Research, Innovation & Direct Engagement powering sustainable and responsible AI governance.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. THEMATIC AREAS */}
        <section className="space-y-8" id="thematic-areas">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
              Core Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Four Frontier Thematic Pillars
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
              Engineered to translate agentic architectures from theoretical formulation into autonomous real-world deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Theme 1 */}
            <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-wander-card dark:shadow-slate-950/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">Theme 01</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Healthcare & Life Sciences</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Autonomous diagnostic copilots, genomic discovery pipelines, closed-loop clinical trial triage, and personalized patient monitoring systems.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
                <span>Autonomous Care Pathways</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Theme 2 */}
            <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-wander-card dark:shadow-slate-950/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">Theme 02</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Finance & Economic Systems</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Decentralized algorithmic trading agents, automated underwriting, adaptive AML forensics, and real-time counterparty risk arbitration.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                <span>Algorithmic Governance</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Theme 3 */}
            <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-wander-card dark:shadow-slate-950/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">Theme 03</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Urban Infrastructure & Energy</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Grid balance coordination, multimodal logistics dispatchers, climate-resilient water infrastructure, and autonomous traffic orchestration.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                <span>Self-Healing Urban Grids</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Theme 4 */}
            <div className="bg-white dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-wander-card dark:shadow-slate-950/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">Theme 04</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Safety, Ethics & Alignment</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Provable safety guarantees, constitutional multi-agent sandboxing, interpretability under tool-use, and human-in-the-loop escalation frameworks.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <span>Constitutional Alignment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </section>

        {/* 3. SUMMIT HIGHLIGHTS & EVENTS */}
        <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-14 shadow-wander-card dark:shadow-slate-950/40 border border-slate-200/80 dark:border-slate-800 transition-colors duration-300" id="highlights">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
                Curated Agenda
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3 font-display">
                Seven Signature Summit Tracks
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
              A meticulously engineered two-day international conference featuring visionary keynotes, hands-on masterclasses, and an investment pitch arena.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Event 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold font-display">01</span>
                <h3 className="font-bold text-slate-900 dark:text-white font-display">Global Keynote Addresses</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Visionary insights delivered by pioneering researchers from top international AI labs, frontier model labs, and global think-tanks.
              </p>
            </div>

            {/* Event 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-xs font-bold font-display">02</span>
                <h3 className="font-bold text-slate-900 dark:text-white font-display">Thematic Expert Panels</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Critical cross-sector debates reconciling regulatory compliance, safety bottlenecks, enterprise tool integration, and compute optimization.
              </p>
            </div>

            {/* Event 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-display">03</span>
                <h3 className="font-bold text-slate-900 dark:text-white font-display">Agentic AI Hackathon</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                36-hour sprint challenging multidisciplinary engineering squads to construct production-ready autonomous agents tackling real-world problem sets.
              </p>
            </div>

            {/* Event 4 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold font-display">04</span>
                <h3 className="font-bold text-slate-900 dark:text-white font-display">Startup & Investor Arena</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Curated pitch arena where selected founders showcase autonomous solutions before active angel syndicates and venture venture partners.
              </p>
            </div>

            {/* Event 5 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center text-xs font-bold font-display">05</span>
                <h3 className="font-bold text-slate-900 dark:text-white font-display">Hands-On Masterclasses</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Deep-dive developer bootcamps exploring multi-agent orchestrations, memory vector graphs, MCP protocols, and human escalation systems.
              </p>
            </div>

            {/* Event 6 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-bold font-display">06</span>
                <h3 className="font-bold text-slate-900 dark:text-white font-display">Research Paper Colloquium</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Peer-reviewed academic proceedings publishing novel architectures in reinforcement learning from agent feedback and cognitive planning.
              </p>
            </div>

          </div>
        </section>

        {/* 4. HACKATHON SPOTLIGHT */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden" id="hackathon">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-display">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship 36-Hour Hackathon</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
                Build Autonomous Agents. <br />
                Win from <span className="text-cyan-300">INR 1.5 Million</span>.
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Open to students, independent researchers, and professional builders worldwide. Teams will construct multi-agent systems, synthetic memory graphs, and task-specific reasoning frameworks evaluated by principal researchers and active venture partners.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="text-2xl font-black text-cyan-300 font-display">INR 1.5M</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Guaranteed Cash Prize Pool</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="text-2xl font-black text-emerald-400 font-display">INR 10M</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Pre-Seed Venture Funding Pool</div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-display text-sm font-extrabold px-8 py-3.5 rounded-full uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-cyan-400/25 hover:scale-105 inline-flex items-center gap-2"
                >
                  <span>Apply for Hackathon</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-lg text-white font-display border-b border-white/10 pb-3">Evaluation Rubric</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Autonomy & Self-Correction:</strong> Resiliency when external tool calls fail.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cognitive Planning & Memory:</strong> Sophistication of recursive sub-task decomposition.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Responsible Boundary Enforcement:</strong> Guardrails preventing hallucinated execution.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Enterprise Economic Viability:</strong> Real-world commercialization potential.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. SUMMIT SCHEDULE */}
        <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-14 shadow-wander-card dark:shadow-slate-950/40 border border-slate-200/80 dark:border-slate-800 transition-colors duration-300" id="schedule">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
              Two-Day Conference Itinerary
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Engineered For Impact
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              October 30 – 31, 2026 • Jaypee Institute of Information Technology, Wish Town, Sector 128 Noida
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Day 1 */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-800/40 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-widest font-display">Day 01</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Friday, October 30, 2026</h3>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-700 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600">
                  Opening & Build Kickoff
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">08:30 AM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Delegate Registration & Morning Networking</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Main Atrium & Welcome Foyer</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">10:00 AM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Inaugural Ceremony & Presidential Keynote</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Auditorium Complex • Institute Leadership & Chief Guests</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">11:30 AM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Plenary Panel: Frontiers of Cognitive Agent Architectures</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Foundational Model Architects & Systems Researchers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">01:00 PM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Networking Luncheon</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Campus Dining Court</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">02:00 PM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">36-Hour Agentic Hackathon Commencement</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Innovation Laboratories & Hack Space</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-slate-400 pt-0.5 w-20 shrink-0">04:30 PM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Technical Masterclasses & Paper Presentation Session A</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Parallel Track Theatres</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-800/40 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-widest font-display">Day 02</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Saturday, October 31, 2026</h3>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-700 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600">
                  Demo Day & Awards
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">09:00 AM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Day 2 Keynote: Safety & Constitutional Alignment in Autonomous Swarms</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Auditorium Complex</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">10:30 AM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Startup Pitch Showcase & Investor Roundtables</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Venture Arena • 10M Pre-Seed Syndicate</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">01:00 PM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Networking Luncheon</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Campus Dining Court</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">02:30 PM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Hackathon Grand Finale Demos & Live Judging</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Main Stage • Top 10 Finalist Demonstrations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 pt-0.5 w-20 shrink-0">05:00 PM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Valedictory Ceremony & 1.5M Prize Distribution</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Auditorium Complex</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-slate-400 pt-0.5 w-20 shrink-0">06:30 PM</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Closing Reception & High Tea</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Wish Town Promenade</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. VENUE & DIRECTIONS */}
        <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-14 shadow-wander-card dark:shadow-slate-950/40 border border-slate-200/80 dark:border-slate-800 transition-colors duration-300" id="directions">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-display">
                Summit Location
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
                JIIT Wish Town Campus, Sector-128, Noida
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Jaypee Institute of Information Technology (JIIT) Sector-128 is an expansive, world-class educational hub situated right off the Noida-Greater Noida Expressway, offering seamless access from Central Delhi, Indira Gandhi International Airport (DEL), and Noida metro lines.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-semibold">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Sector 128, Jaypee Wish Town, Noida, Uttar Pradesh 201304</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-semibold">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Friday – Saturday, October 30 – 31, 2026</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-4">
                <a 
                  href="https://maps.google.com/?q=Jaypee+Institute+of+Information+Technology+Sector+128+Noida" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-display text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg relative h-[360px] sm:h-[420px]">
              <img 
                src="/imgs/jiit128.jpeg" 
                alt="Jaypee Institute of Information Technology Sector 128 Noida" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-display">Campus Landmark</p>
                  <h4 className="text-lg font-extrabold font-display">Interdisciplinary Studies & Innovation Campus</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Jaypee Wish Town, Sector 128, Noida</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        </main>

        {/* FOOTER */}
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/imgs/jiit.png" alt="JIIT" className="h-9 w-auto object-contain opacity-90 [filter:drop-shadow(0_2px_8px_rgba(255,255,255,0.6))]" />
              <div className="h-6 w-px bg-slate-800" />
              <img src="/imgs/ai-summit.png" alt="Jaypee Agentic AI" className="h-9 w-auto object-contain opacity-90" />
              <div className="h-6 w-px bg-slate-800" />
              <img src="/imgs/ride.png" alt="RIDE" className="h-9 w-auto object-contain opacity-90 [filter:drop-shadow(0_2px_8px_rgba(255,255,255,0.6))]" />
            </div>
            
            <p className="text-xs text-center sm:text-left text-slate-500 font-medium">
              © 2026 Jaypee Agentic AI International Summit (JAI 2026). Jaypee Institute of Information Technology, Sector-128 Noida.
            </p>

            <div className="flex items-center gap-4 text-xs font-bold font-display text-slate-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#thematic-areas" className="hover:text-white transition-colors">Themes</a>
              <a href="#hackathon" className="hover:text-white transition-colors">Hackathon</a>
              <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">Standard View</a>
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}
