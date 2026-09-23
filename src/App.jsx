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
  X
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const registrationLink = "https://forms.gle/E1x9CT8mF5z1R4YC8";

  // Animated number counter ticker for stats (slowed down for satisfying smooth roll)
  const [animatedStats, setAnimatedStats] = useState({
    themes: 0,
    events: 0,
    prize: "0.0",
    preSeed: 0
  });

  useEffect(() => {
    let startTime = null;
    const duration = 2800; // 2.8s slow, deliberate counter

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth cubic ease out
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
    <div className="min-h-screen bg-slate-950 text-slate-800 antialiased selection:bg-slate-900 selection:text-white font-sans">
      
      {/* =========================================================================
          HERO LANDING: 100% Viewport Height (Entire landing visible without scrolling)
          ========================================================================= */}
      <header className="relative w-full h-screen max-h-screen flex flex-col justify-between overflow-hidden bg-slate-950" id="home">
        
        {/* Campus Background Image covering the entire landing */}
        <img 
          src="/imgs/jiit128.jpeg" 
          alt="Jaypee Institute of Information Technology, Sector 128 Noida" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-100 transition-transform duration-1000 ease-out"
        />

        {/* Lighter, Less Dominant Neutral Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-900/15 to-slate-950/50 z-10 backdrop-brightness-100" />

        {/* Soft Center Backlight for Logo & Typography Contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,transparent_65%)] z-10 pointer-events-none" />

        {/* =====================================================================
            TOP NAVBAR: Logos on Both Corners, Centered Navigation Menu
            ===================================================================== */}
        <nav className="hero-navbar relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 h-[84px] max-h-[86px] flex items-center justify-between">
          
          {/* Top Left: Official JIIT Logo (Option 1: Soft White Contour / Glow) */}
          <div className="flex items-center">
            <a 
              href="#home" 
              className="transition-transform duration-200 hover:scale-105 flex items-center justify-center" 
              title="Jaypee Institute of Information Technology"
            >
              <img 
                src="/imgs/jiit.png" 
                alt="JIIT Logo" 
                className="hero-corner-logo h-14 sm:h-16 md:h-[4.5rem] lg:h-[5.05rem] w-auto object-contain [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.85))_drop-shadow(0_1px_3px_rgba(255,255,255,0.95))]"
              />
            </a>
          </div>

          {/* Center / Middle: Clean Navigation Links with Increased Font Size */}
          <div className="hidden lg:flex items-center justify-center gap-7 xl:gap-9">
            <a href="#about" className="text-sm lg:text-[15px] font-bold text-white hover:text-cyan-300 transition-all duration-200 tracking-wider uppercase font-display drop-shadow-sm hover:-translate-y-0.5">
              About
            </a>
            <a href="#thematic-areas" className="text-sm lg:text-[15px] font-bold text-white hover:text-cyan-300 transition-all duration-200 tracking-wider uppercase font-display drop-shadow-sm hover:-translate-y-0.5">
              Themes
            </a>
            <a href="#highlights" className="text-sm lg:text-[15px] font-bold text-white hover:text-cyan-300 transition-all duration-200 tracking-wider uppercase font-display drop-shadow-sm hover:-translate-y-0.5">
              Highlights
            </a>
            <a href="#hackathon" className="text-sm lg:text-[15px] font-bold text-white hover:text-cyan-300 transition-all duration-200 tracking-wider uppercase font-display drop-shadow-sm hover:-translate-y-0.5">
              Hackathon
            </a>
            <a href="#schedule" className="text-sm lg:text-[15px] font-bold text-white hover:text-cyan-300 transition-all duration-200 tracking-wider uppercase font-display drop-shadow-sm hover:-translate-y-0.5">
              Schedule
            </a>
            <a href="#directions" className="text-sm lg:text-[15px] font-bold text-white hover:text-cyan-300 transition-all duration-200 tracking-wider uppercase font-display drop-shadow-sm hover:-translate-y-0.5">
              Venue
            </a>
          </div>

          {/* Top Right: Official RIDE Logo (Option 1: Soft White Contour / Glow) & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="#about" 
              className="transition-transform duration-200 hover:scale-105 flex items-center justify-center" 
              title="RIDE Initiative"
            >
              <img 
                src="/imgs/ride.png" 
                alt="RIDE Logo" 
                className="hero-corner-logo h-14 sm:h-16 md:h-[4.5rem] lg:h-[5.05rem] w-auto object-contain [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.85))_drop-shadow(0_1px_3px_rgba(255,255,255,0.95))]"
              />
            </a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-4 top-20 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-center font-display animate-fadeIn">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white uppercase tracking-wider py-2 border-b border-white/10">About</a>
            <a href="#thematic-areas" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white uppercase tracking-wider py-2 border-b border-white/10">Themes</a>
            <a href="#highlights" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white uppercase tracking-wider py-2 border-b border-white/10">Highlights</a>
            <a href="#hackathon" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white uppercase tracking-wider py-2 border-b border-white/10">Hackathon</a>
            <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white uppercase tracking-wider py-2 border-b border-white/10">Schedule</a>
            <a href="#directions" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white uppercase tracking-wider py-2 border-b border-white/10">Venue</a>
            <a 
              href={registrationLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-slate-900 font-extrabold text-sm py-3 rounded-full uppercase tracking-wider mt-2 shadow-lg"
            >
              Register for Summit
            </a>
          </div>
        )}

        {/* =====================================================================
            HERO CENTER STAGE (Balanced to fit in 100vh)
            ===================================================================== */}
        <div className="relative z-20 w-full max-w-6xl 2xl:max-w-7xl mx-auto px-6 my-auto text-center flex flex-col items-center justify-center py-2 sm:py-3.5">
          
          {/* Prominent Official AI Summit Logo with Gentle Floating Motion & Hover Pop */}
          <div className="mb-2 sm:mb-2.5 animate-float">
            <img 
              src="/imgs/ai-summit.png" 
              alt="Jaypee Agentic AI International Summit Logo" 
              className="hero-summit-logo h-24 sm:h-32 md:h-40 lg:h-[11.5rem] w-auto object-contain logo-glow mx-auto cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_35px_rgba(56,189,248,0.75)]"
            />
          </div>

          {/* 3D AGENTIC AI SUMMIT + #062DB1 2026 Display Typography */}
          <div className="relative inline-flex items-center justify-center select-none my-0.5 sm:my-1 transition-transform duration-300 hover:scale-[1.01]">
            
            {/* The Words "AGENTIC AI SUMMIT" with 3D Blue Extrusion */}
            <h1 className="hero-title-text font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[4.1rem] xl:text-[4.85rem] 2xl:text-[5.4rem] tracking-tight leading-none text-3d-summit uppercase whitespace-nowrap">
              AGENTIC AI SUMMIT
            </h1>

            {/* Rotated "2026" with user-specified color: #062DB1 */}
            <div className="ml-2 sm:ml-3.5 flex flex-col items-center justify-center">
              <span className="hero-year-text text-vertical-year font-display font-black text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl text-[#062DB1] drop-shadow-[1px_1px_0_#ffffff] tracking-widest">
                2026
              </span>
            </div>
          </div>

          {/* Location & Date Line */}
          <div className="hero-location-box mt-2 sm:mt-2.5 mb-3.5 sm:mb-4">
            <p className="font-display font-extrabold text-xs sm:text-base md:text-lg text-white tracking-widest uppercase drop-shadow-md">
              JIIT SECTOR 128, WISH TOWN, NOIDA &nbsp;|&nbsp; OCTOBER 30 – 31, 2026
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-100 tracking-wider mt-0.5 drop-shadow-sm">
              "Human Intelligence Meets Agentic Possibilities"
            </p>
          </div>

          {/* Main (Single) Register Button */}
          <div className="hero-cta-box mb-3.5 sm:mb-4.5">
            <a 
              href={registrationLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-slate-950 hover:bg-slate-900 border border-white/30 text-white font-display text-xs sm:text-sm font-extrabold px-9 sm:px-11 py-3 sm:py-3.5 rounded-full uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 hover:border-cyan-300 inline-flex items-center gap-2 group"
            >
              <span>Register for Summit</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* 4 Metric Stat Columns with Slow Animated Number Ticker */}
          <div className="hero-stats-box w-full max-w-4xl lg:max-w-5xl grid grid-cols-4 gap-4 sm:gap-10 border-t border-white/20 pt-3 pb-3 sm:pb-3.5">
            
            {/* Stat 1: Number of Themes */}
            <div className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
              <span className="hero-stat-num font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-none group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                {animatedStats.themes}
              </span>
              <span className="font-display font-bold text-[10px] sm:text-xs text-slate-200 tracking-widest uppercase mt-1">THEMES</span>
            </div>

            {/* Stat 2: Number of Events (7 from Brochure) */}
            <div className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
              <span className="hero-stat-num font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-none group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                {animatedStats.events}
              </span>
              <span className="font-display font-bold text-[10px] sm:text-xs text-slate-200 tracking-widest uppercase mt-1">EVENTS</span>
            </div>

            {/* Stat 3: Prize Pool */}
            <div className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
              <span className="hero-stat-num font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-none group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                ₹{animatedStats.prize}M
              </span>
              <span className="font-display font-bold text-[10px] sm:text-xs text-slate-200 tracking-widest uppercase mt-1">PRIZE POOL</span>
            </div>

            {/* Stat 4: Pre-Seed Funding Pool */}
            <div className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
              <span className="hero-stat-num font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-none group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                ₹{animatedStats.preSeed}M
              </span>
              <span className="font-display font-bold text-[10px] sm:text-xs text-slate-200 tracking-widest uppercase mt-1">PRE-SEED POOL</span>
            </div>

          </div>

        </div>

      </header>

      {/* =========================================================================
          BODY SECTIONS: Broader Layout Container (max-w-[1600px])
          ========================================================================= */}
      <div className="bg-[#eaeff4] w-full">
        <main className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-14 space-y-14">

        {/* 1. OVERVIEW & 3 STACKED CARDS (Wander.ph 2-Column Section) */}
        <section className="bg-white rounded-3xl p-8 sm:p-14 shadow-wander-card border border-slate-200/80 transition-shadow duration-300 hover:shadow-xl" id="about">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Heading + Editorial Intro */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-display">
                Summit Overview
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                Where Human Intelligence Meets Autonomous Execution
              </h2>

              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                Hosted at Jaypee Institute of Information Technology (JIIT) Wish Town Campus in Sector-128, Noida, JAI 2026 convenes academic researchers, industry architects, and student innovators to pioneer the frontier of agentic AI systems.
              </p>

              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 font-display">
                Real Problems &nbsp;|&nbsp; Intelligent Agents &nbsp;|&nbsp; Lasting Impact
              </div>
            </div>

            {/* Right Column: 3 Stacked Slate-Blue Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              <div className="bg-[#6b7f94] hover:bg-[#5a6e83] text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:translate-x-2 shadow-sm hover:shadow-md cursor-pointer group">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-display">Agentic AI Hackathon</h3>
                  <p className="text-slate-100 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Build autonomous problem-solving agents backed by an exciting INR 1.5 Million prize pool.
                  </p>
                </div>
              </div>

              <div className="bg-[#6b7f94] hover:bg-[#5a6e83] text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:translate-x-2 shadow-sm hover:shadow-md cursor-pointer group">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-display">Pre-Seed Funding Pool</h3>
                  <p className="text-slate-100 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Access to an INR 10 Million pre-seed funding pool driven by RIDE to incubate promising AI ventures.
                  </p>
                </div>
              </div>

              <div className="bg-[#6b7f94] hover:bg-[#5a6e83] text-white p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:translate-x-2 shadow-sm hover:shadow-md cursor-pointer group">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-display">Institutional Collaboration</h3>
                  <p className="text-slate-100 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Organized by Jaypee Institute of Information Technology (JIIT) in partnership with the RIDE initiative.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 2. KEY THEMATIC AREAS (Wander.ph "Top Destinations" Inset Container) */}
        <section className="bg-white rounded-3xl p-6 sm:p-12 shadow-wander-card border border-slate-200/80 transition-shadow duration-300 hover:shadow-xl" id="thematic-areas">
          <div className="bg-[#f1f4f8] rounded-2xl sm:rounded-3xl p-6 sm:p-12">
            
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                  Key Thematic Areas
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 font-display">Agentic AI Focus Tracks</p>
              </div>
              <p className="text-sm text-slate-600 max-w-md sm:text-right">
                Frontier domains where autonomous agent architectures drive transformative industry solutions.
              </p>
            </div>

            {/* 4 Thematic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              
              {/* Card 1: Cybersecurity */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[240px] group cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug font-display group-hover:text-blue-700 transition-colors">
                    Agentic AI for Cybersecurity
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-display">
                    Security Track
                  </span>
                </div>
              </div>

              {/* Card 2: Healthcare */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[240px] group cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Activity className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug font-display group-hover:text-blue-700 transition-colors">
                    Agentic AI for Healthcare
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-display">
                    Health Track
                  </span>
                </div>
              </div>

              {/* Card 3: NLP */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[240px] group cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug font-display group-hover:text-blue-700 transition-colors">
                    Agentic AI for Natural Language Processing
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-display">
                    Language Track
                  </span>
                </div>
              </div>

              {/* Card 4: Open Innovation */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[240px] group cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug font-display group-hover:text-blue-700 transition-colors">
                    Agentic AI for Open Innovation
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-display">
                    Open Track
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. SUMMIT HIGHLIGHTS (The 7 Pillars from Brochure) */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-wander-card border border-slate-200/80 transition-shadow duration-300 hover:shadow-xl" id="highlights">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Summit Highlights
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 font-display">Core Confluence Pillars</p>
            </div>
            <p className="text-sm text-slate-600">
              The seven primary engagement tracks featured in the official summit brochure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
            
            {/* 1. Global Tech Talks */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 mb-3.5 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                <Globe className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-display">Global Tech Talks</span>
            </div>

            {/* 2. Research & Innovation */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 mb-3.5 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-display">Research & Innovation</span>
            </div>

            {/* 3. Industry Perspectives */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 mb-3.5 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-display">Industry Perspectives</span>
            </div>

            {/* 4. Networking & Collaboration */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 mb-3.5 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-display">Networking & Collaboration</span>
            </div>

            {/* 5. Agentic AI Hackathon */}
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-white mb-3.5 group-hover:scale-110 transition-all">
                <Trophy className="w-6 h-6 text-amber-300" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-display">Agentic AI Hackathon</span>
            </div>

            {/* 6. Expo */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 mb-3.5 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                <Store className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-display">Expo</span>
            </div>

            {/* 7. Panel Discussions */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 mb-3.5 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                <MessagesSquare className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-display">Panel Discussions</span>
            </div>

          </div>
        </section>

        {/* 4. HACKATHON SPOTLIGHT */}
        <section className="bg-white rounded-3xl p-6 sm:p-12 shadow-wander-card border border-slate-200/80 transition-shadow duration-300 hover:shadow-xl" id="hackathon">
          <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-8 sm:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Details & Prize Pools */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-300 bg-white/10 px-3 py-1 rounded-full font-display">
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
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300 font-display">Exciting Prize Pool</div>
                    <div className="text-2xl sm:text-4xl font-black text-white mt-1 font-display">INR 1.5 MILLION</div>
                  </div>

                  <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-300 font-display">Pre-Seed Funding Pool</div>
                    <div className="text-2xl sm:text-4xl font-black text-white mt-1 font-display">INR 10 MILLION</div>
                  </div>
                </div>

                <div>
                  <a 
                    href={registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white hover:bg-slate-100 text-slate-900 font-bold font-display text-sm sm:text-base px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>Register for Hackathon</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: QR Code Registration Card */}
              <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 font-display">
                  Scan to Register
                </span>

                {/* Clean Vector QR Code Simulation */}
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
                    <text x="50" y="53" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle" font-family="sans-serif">JAI</text>

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
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold font-display text-xs py-3 rounded-full inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm hover:shadow"
                >
                  <span>Open Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* 5. SAMPLE SUMMIT SCHEDULE (TBD) */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-wander-card border border-slate-200/80 transition-shadow duration-300 hover:shadow-xl" id="schedule">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Sample Summit Schedule (TBD)
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 font-display">Program Itinerary</p>
            </div>
            <p className="text-sm text-slate-600">
              Tentative timeline framework for the two-day summit. Detailed sessions to be announced.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Day 1 Card */}
            <div className="bg-[#f1f4f8] rounded-2xl p-7 border border-slate-200/60 transition-transform duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div className="font-extrabold text-lg sm:text-xl text-slate-900 font-display">
                  Day 1: Friday, Oct 30, 2026
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-display">
                  Sample Outline (TBD)
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 09:00 – 10:30 AM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Inaugural Ceremony & Opening Keynote</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Welcome address and opening perspectives on Agentic AI.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 11:00 AM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Agentic AI Hackathon Sprint Kickoff</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Problem statement deep dive and development sprint begins.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 11:30 AM – 01:00 PM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Global Tech Talks</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Presentations from autonomous agents researchers.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 02:30 – 05:00 PM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Research Track & Panel Discussions</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Parallel sessions across cybersecurity, health, and NLP.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 Card */}
            <div className="bg-[#f1f4f8] rounded-2xl p-7 border border-slate-200/60 transition-transform duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div className="font-extrabold text-lg sm:text-xl text-slate-900 font-display">
                  Day 2: Saturday, Oct 31, 2026
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-display">
                  Sample Outline (TBD)
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 09:30 – 11:00 AM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Industry Perspectives & Expo</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Live demonstration stalls and enterprise case studies.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 11:30 AM – 01:30 PM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Hackathon Demos & Jury Evaluation</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Finalist teams showcase working autonomous agent prototypes.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 02:30 – 04:00 PM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Pre-Seed Venture Pitch Session</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Pitches for the INR 10 Million pre-seed funding pool.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 04:30 – 05:30 PM
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 font-display">Valedictory & Prize Distribution</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Awarding INR 1.5 Million in prizes and concluding remarks.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. VENUE & DIRECTIONS (Minimal: Official Address + Google Maps ONLY) */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-wander-card border border-slate-200/80 transition-shadow duration-300 hover:shadow-xl" id="directions">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Venue & Directions
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 font-display">Official Location</p>
            </div>
            <p className="text-sm text-slate-600">
              Campus address and interactive navigation map for the summit venue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Official Address */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  Wish Town Campus
                </h3>
                <div className="text-sm sm:text-base font-bold text-blue-700 mt-1 font-display">
                  Jaypee Institute of Information Technology (JIIT)
                </div>
              </div>

              <div className="border-l-4 border-slate-900 pl-4 py-1.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                Jaypee Wish Town, Sector 128,<br />
                Noida, Uttar Pradesh 201304,<br />
                India
              </div>

              <div>
                <a 
                  href="https://maps.google.com/?q=Jaypee+Institute+of+Information+Technology+Sector+128+Noida" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-slate-950 hover:bg-slate-900 text-white font-bold font-display text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2 transition-all shadow-sm hover:shadow"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Embed */}
            <div className="lg:col-span-7 h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
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

      {/* =========================================================================
          FOOTER (Broader Layout Container)
          ========================================================================= */}
      <footer className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-12">
        <div className="bg-slate-900 text-slate-400 rounded-3xl p-8 sm:p-12 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <img src="/imgs/jiit.png" alt="JIIT" className="h-10 w-auto object-contain" />
              <img src="/imgs/ride.png" alt="RIDE" className="h-10 w-auto object-contain" />
              <div className="border-l border-slate-700 pl-3">
                <span className="text-xl font-black text-white tracking-tight font-display">JAI 2026</span>
                <p className="text-[10px] text-slate-400">Jaypee Agentic AI International Summit</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs sm:text-sm font-semibold text-slate-300 font-display">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#thematic-areas" className="hover:text-white transition-colors">Thematic Areas</a>
              <a href="#highlights" className="hover:text-white transition-colors">Highlights</a>
              <a href="#hackathon" className="hover:text-white transition-colors">Hackathon</a>
              <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
              <a href="#directions" className="hover:text-white transition-colors">Directions</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-display">
            <div className="font-bold tracking-wider text-slate-300 uppercase">
              PEOPLE &nbsp;|&nbsp; IDEAS &nbsp;|&nbsp; PERSPECTIVE &nbsp;|&nbsp; A BETTER TOMORROW
            </div>
            <div>
              © 2026 Jaypee Agentic AI International Summit. All rights reserved.
            </div>
          </div>

        </div>
      </footer>
      </div>

    </div>
  );
}
