import React, { useState } from 'react';
import { 
  Users, 
  ArrowLeft, 
  Camera, 
  Check, 
  Copy,
  Search,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles
} from 'lucide-react';
import { summitChairs, teamCategories, getInitials } from '../data/teamData';

export default function TeamPage({ onNavigateHome, darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFilename, setCopiedFilename] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [showUploadGuide, setShowUploadGuide] = useState(false);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const copyToClipboard = (filename) => {
    navigator.clipboard.writeText(filename);
    setCopiedFilename(filename);
    setTimeout(() => setCopiedFilename(null), 2000);
  };

  // Filter categories and members
  const filteredChairs = summitChairs.filter((chair) => 
    chair.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chair.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = teamCategories.map((cat) => {
    const matchesCat = selectedCategory === 'all' || selectedCategory === cat.id;
    if (!matchesCat) return null;

    const matchingMembers = cat.members.filter((m) => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingMembers.length === 0 && searchQuery) return null;

    return {
      ...cat,
      members: matchingMembers
    };
  }).filter(Boolean);

  return (
    <div className="w-full">
      {/* Team Header Banner - Generously Spaced & Eye-Pleasing */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-18 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/40 dark:from-slate-900/60 dark:via-[#070c18] dark:to-[#050811]">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-r from-blue-400/10 via-cyan-400/15 to-blue-500/10 dark:from-blue-600/15 dark:via-cyan-500/10 dark:to-blue-700/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* Top Row: Back to Home Button & Badges with Generous Bottom Spacing */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
            <button 
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-black uppercase tracking-wider text-blue-700 dark:text-cyan-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-500 shadow-sm hover:shadow-md transition-all font-display group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Summit Home</span>
            </button>

            {/* Toggle Helper Button */}
            <button
              onClick={() => setShowUploadGuide(!showUploadGuide)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all font-display cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Photo Upload Guide</span>
              {showUploadGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Title & Introduction Section with Uncluttered, Relaxed Layout */}
          <div className="max-w-4xl space-y-4 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-blue-700 dark:text-cyan-300 bg-blue-100/70 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800 font-display">
              <Users className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Faculty Organizing Committee</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-display leading-[1.1]">
              The Minds Driving <span className="text-blue-600 dark:text-cyan-400">JAI 2026</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed pt-1">
              Meet the faculty leadership and committee architects organizing the Jaypee Agentic AI International Summit at Jaypee Institute of Information Technology, Wish Town Campus, Sector-128, Noida.
            </p>
          </div>

          {/* Collapsible Photo Upload Guide (Clean, Spacious & Non-Intrusive) */}
          {showUploadGuide && (
            <div className="mb-10 p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-blue-200 dark:border-blue-900/60 shadow-lg backdrop-blur-md animate-fadeIn">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0 text-blue-600 dark:text-cyan-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-display">
                    Faculty Photo Upload Guide
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    To display actual pictures for any faculty member, upload their image file directly into the project folder:
                  </p>
                  <div className="inline-block bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-xl font-mono text-xs text-blue-700 dark:text-cyan-300 select-all">
                    public/imgs/team/[filename].jpg
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    Each card below specifies the exact filename required with a 1-click copy button. If no image is provided yet, a stylized initials badge is automatically displayed!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Search & Category Filter Controls - Distinct, Spacious & Well-Organized */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/75 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-4">
            
            {/* Top Control Bar: Search Input */}
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search faculty member name, role, or committee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Pills with Clean Spacing and No Obtrusive Scrollbar */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all font-display cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All Committees
              </button>

              {teamCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all font-display cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Main Team Content Area */}
      <main className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12 py-14 space-y-16">
        
        {/* =====================================================================
            1. SUMMIT LEADERSHIP / CHAIRS
            ===================================================================== */}
        {(!searchQuery || filteredChairs.length > 0) && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-display">
                  Summit Leadership
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display mt-1">
                  Organizing Chairs & Functional Head
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Pioneering academic guidance and summit direction
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredChairs.map((chair, index) => {
                const hasImgError = imageErrors[chair.filename];
                return (
                  <div 
                    key={index}
                    className="relative group rounded-3xl p-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-5">
                      {/* Photo / Avatar */}
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-700 dark:via-indigo-900 dark:to-cyan-600 shadow-md flex items-center justify-center text-white border-2 border-white dark:border-slate-800">
                        {!hasImgError ? (
                          <img 
                            src={`/imgs/team/${chair.filename}`} 
                            alt={chair.name}
                            onError={() => handleImageError(chair.filename)}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : null}

                        {hasImgError && (
                          <span className="font-display font-black text-xl tracking-wider">
                            {getInitials(chair.name)}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5 flex-1">
                        <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-800 font-display">
                          {chair.role}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display leading-snug">
                          {chair.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {chair.department}
                        </p>
                      </div>
                    </div>

                    {/* Expected File Indicator with Copy Button */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                        <span>{chair.filename}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(chair.filename)}
                        title="Copy image filename"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {copiedFilename === chair.filename ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================================
            2. FUNCTIONAL FACULTY TEAMS (9 Committees)
            ===================================================================== */}
        {filteredCategories.map((category) => (
          <section key={category.id} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-display">
                  Committee Track
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display mt-1">
                  {category.name} Team
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md sm:text-right">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {category.members.map((member, mIdx) => {
                const hasImgError = imageErrors[member.filename];
                const isLead = member.role.includes("Lead");

                return (
                  <div 
                    key={mIdx}
                    className={`relative group rounded-3xl p-6 bg-white dark:bg-slate-900 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
                      isLead 
                        ? 'border-blue-300 dark:border-blue-700/70 shadow-sm' 
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Photo / Initials Avatar */}
                      <div className={`relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center text-white border ${
                        isLead 
                          ? 'bg-gradient-to-tr from-blue-600 to-cyan-600 border-blue-400 dark:border-cyan-400' 
                          : 'bg-gradient-to-tr from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950 border-slate-200 dark:border-slate-800'
                      }`}>
                        {!hasImgError ? (
                          <img 
                            src={`/imgs/team/${member.filename}`} 
                            alt={member.name}
                            onError={() => handleImageError(member.filename)}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : null}

                        {hasImgError && (
                          <span className="font-display font-black text-base tracking-wider">
                            {getInitials(member.name)}
                          </span>
                        )}
                      </div>

                      {/* Name & Role */}
                      <div className="space-y-1 flex-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider font-display ${
                          isLead 
                            ? 'text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800' 
                            : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80'
                        }`}>
                          {member.role}
                        </span>

                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                          {member.name}
                        </h3>

                        <p className="text-[11px] text-slate-400">
                          {category.name}
                        </p>
                      </div>
                    </div>

                    {/* Expected Filename indicator */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] truncate max-w-[180px]">
                        <Camera className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{member.filename}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(member.filename)}
                        title="Copy filename"
                        className="p-1 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        {copiedFilename === member.filename ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Complete Filename Upload Reference Grid */}
        <section className="rounded-3xl p-8 sm:p-10 bg-slate-900 text-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-display">
                Reference Table
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display mt-1">
                All Faculty Image Filenames
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm sm:text-right">
              Upload photos with these exact names to <code className="text-cyan-300">public/imgs/team/</code>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs font-mono">
            {summitChairs.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-slate-300 truncate mr-2">{c.name}</span>
                <span className="text-cyan-400 font-bold shrink-0">{c.filename}</span>
              </div>
            ))}
            {teamCategories.flatMap(cat => cat.members).map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-slate-300 truncate mr-2">{m.name}</span>
                <span className="text-cyan-400 font-bold shrink-0">{m.filename}</span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
