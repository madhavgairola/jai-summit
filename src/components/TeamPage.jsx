import React, { useState } from 'react';
import { 
  Users, 
  ArrowLeft, 
  Search, 
  GraduationCap,
  Clock
} from 'lucide-react';
import { summitChairs, teamCategories, getInitials } from '../data/teamData';

// Student committees data structure (Details and photos pending)
const studentCategories = [
  {
    id: "student-leads",
    name: "Student Steering Committee",
    description: "Core student leadership responsible for overall summit orchestration and volunteer mobilization.",
    members: [
      { name: "Student Lead (TBA)", role: "Overall Student Coordinator", department: "Department of CSE & IT", filename: "student-lead-1.jpg" },
      { name: "Student Lead (TBA)", role: "Deputy Student Coordinator", department: "Department of CSE & IT", filename: "student-lead-2.jpg" },
      { name: "Student Lead (TBA)", role: "Operations Secretariat Lead", department: "Department of CSE & IT", filename: "student-lead-3.jpg" }
    ]
  },
  {
    id: "student-hackathon",
    name: "Hackathon Technical Operations",
    description: "Student engineers managing hackathon infrastructure, platform workflows, and mentor coordination.",
    members: [
      { name: "Tech Lead (TBA)", role: "Platform Architecture Lead", department: "Department of CSE & IT", filename: "student-tech-1.jpg" },
      { name: "Tech Co-Lead (TBA)", role: "Hackathon Operations Co-Lead", department: "Department of CSE & IT", filename: "student-tech-2.jpg" },
      { name: "DevOps Lead (TBA)", role: "Cloud & Lab Systems Co-Lead", department: "Department of CSE & IT", filename: "student-tech-3.jpg" }
    ]
  },
  {
    id: "student-design",
    name: "Media, Design & PR Team",
    description: "Creative student leads managing summit branding, social media amplification, and UI/UX.",
    members: [
      { name: "Design Lead (TBA)", role: "Creative & Brand Lead", department: "Department of CSE & IT", filename: "student-media-1.jpg" },
      { name: "Media Lead (TBA)", role: "Public Relations & Media Lead", department: "Department of CSE & IT", filename: "student-media-2.jpg" },
      { name: "Content Lead (TBA)", role: "Digital Content & Socials", department: "Department of CSE & IT", filename: "student-media-3.jpg" }
    ]
  },
  {
    id: "student-logistics",
    name: "Logistics, Hospitality & Registration",
    description: "Student team organizing on-ground registration desks, participant escorting, and campus navigation.",
    members: [
      { name: "Logistics Lead (TBA)", role: "Hospitality & Venue Coordinator", department: "Department of CSE & IT", filename: "student-log-1.jpg" },
      { name: "Registration Lead (TBA)", role: "Registration Desk Management", department: "Department of CSE & IT", filename: "student-log-2.jpg" },
      { name: "Volunteer Lead (TBA)", role: "Student Volunteer Coordinator", department: "Department of CSE & IT", filename: "student-log-3.jpg" }
    ]
  }
];

export default function TeamPage({ onNavigateHome, darkMode }) {
  const [teamType, setTeamType] = useState('faculty'); // 'faculty' | 'students'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id, e) => {
    if (e && e.target && e.target.src) {
      if (e.target.src.endsWith('.jpg')) {
        e.target.src = e.target.src.replace(/\.jpg$/, '.jpeg');
        return;
      }
      if (e.target.src.endsWith('.jpeg')) {
        e.target.src = e.target.src.replace(/\.jpeg$/, '.png');
        return;
      }
    }
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Filter categories and members for Faculty
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

  // Filter student categories
  const filteredStudentCategories = studentCategories.map((cat) => {
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
      {/* Team Header Banner */}
      <section className="relative overflow-hidden pt-7 pb-10 sm:pt-10 sm:pb-14 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/40 dark:from-slate-900/60 dark:via-[#070c18] dark:to-[#050811]">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-r from-blue-400/10 via-cyan-400/15 to-blue-500/10 dark:from-blue-600/15 dark:via-cyan-500/10 dark:to-blue-700/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* Top Row: Back to Home Button & Sleeker Team Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7">
            <button 
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-blue-700 dark:text-cyan-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-500 shadow-sm hover:shadow-md transition-all font-display group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Summit Home</span>
            </button>

            {/* Reduced Sleek Toggle Switch */}
            <div className="inline-flex p-1 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-sm font-display">
              <button
                onClick={() => { setTeamType('faculty'); setSelectedCategory('all'); }}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  teamType === 'faculty'
                    ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Faculty Team</span>
              </button>
              
              <button
                onClick={() => { setTeamType('students'); setSelectedCategory('all'); }}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  teamType === 'students'
                    ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Students Team</span>
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                  teamType === 'students' 
                    ? 'bg-white/20 text-white dark:bg-slate-950/30 dark:text-slate-950' 
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60'
                }`}>
                  Pending
                </span>
              </button>
            </div>
          </div>

          {/* Title & Introduction Section */}
          <div className="max-w-4xl space-y-3.5 mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-blue-700 dark:text-cyan-300 bg-blue-100/70 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800 font-display">
              {teamType === 'faculty' ? (
                <>
                  <Users className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Faculty Organizing Committee</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Student Organizing Team</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display leading-[1.1]">
              {teamType === 'faculty' ? (
                <>The Minds Driving <span className="text-blue-600 dark:text-cyan-400">JAI 2026</span></>
              ) : (
                <>Student Leaders & <span className="text-blue-600 dark:text-cyan-400">Coordinators</span></>
              )}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-0.5">
              {teamType === 'faculty' ? (
                "Meet the faculty leadership and committee architects organizing the Jaypee Agentic AI International Summit at Jaypee Institute of Information Technology, Wish Town Campus, Sector-128, Noida."
              ) : (
                "Meet the student leadership, technical architects, and volunteers coordinating event operations, hackathon workflows, and participant hospitality."
              )}
            </p>

            {/* If students tab is selected, show pending notification banner */}
            {teamType === 'students' && (
              <div className="flex items-center gap-2.5 p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-medium mt-3 shadow-sm">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold">Details Pending at the Moment: </span>
                  Student team nominations, profile photographs, and committee assignments are currently being compiled.
                </div>
              </div>
            )}
          </div>

          {/* Search & Category Filter Controls */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-slate-900/75 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-3">
            
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder={
                  teamType === 'faculty'
                    ? "Search faculty member name, role, or committee..."
                    : "Search student team member name, role, or committee..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all font-display cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All Committees
              </button>

              {(teamType === 'faculty' ? teamCategories : studentCategories).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all font-display cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
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
      <main className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-12 space-y-12 sm:space-y-14">
        
        {teamType === 'faculty' ? (
          <>
            {/* =====================================================================
                1. SUMMIT LEADERSHIP / CHAIRS
                ===================================================================== */}
            {(!searchQuery || filteredChairs.length > 0) && (
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-display">
                      Summit Leadership
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                      Organizing Chairs & Functional Head
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pioneering academic guidance and summit direction
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredChairs.map((chair, index) => {
                    const hasImgError = imageErrors[chair.filename];
                    return (
                      <div 
                        key={index}
                        className="relative group rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_8px_25px_rgba(56,189,248,0.12)] flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-4">
                          {/* Photo / Avatar */}
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-700 dark:via-indigo-900 dark:to-cyan-600 shadow-md flex items-center justify-center text-white border-2 border-white dark:border-slate-800">
                            {!hasImgError ? (
                              <img 
                                src={`/imgs/team/${chair.filename}`} 
                                alt={chair.name}
                                onError={(e) => handleImageError(chair.filename, e)}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : null}

                            {hasImgError && (
                              <span className="font-display font-black text-lg tracking-wider">
                                {getInitials(chair.name)}
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="space-y-1 flex-1">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-800 font-display">
                              {chair.role}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display leading-snug">
                              {chair.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {chair.department}
                            </p>
                          </div>
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
              <section key={category.id} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-display">
                      Committee Track
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                      {category.name} Team
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md sm:text-right">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {category.members.map((member, mIdx) => {
                    const hasImgError = imageErrors[member.filename];
                    const isLead = member.role.includes("Lead");

                    return (
                      <div 
                        key={mIdx}
                        className={`relative group rounded-2xl p-4 sm:p-4.5 bg-white dark:bg-slate-900 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between ${
                          isLead 
                            ? 'border-blue-300 dark:border-blue-700/70 shadow-sm' 
                            : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Photo / Initials Avatar */}
                          <div className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center text-white border ${
                            isLead 
                              ? 'bg-gradient-to-tr from-blue-600 to-cyan-600 border-blue-400 dark:border-cyan-400' 
                              : 'bg-gradient-to-tr from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950 border-slate-200 dark:border-slate-800'
                          }`}>
                            {!hasImgError ? (
                              <img 
                                src={`/imgs/team/${member.filename}`} 
                                alt={member.name}
                                onError={(e) => handleImageError(member.filename, e)}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : null}

                            {hasImgError && (
                              <span className="font-display font-black text-sm tracking-wider">
                                {getInitials(member.name)}
                              </span>
                            )}
                          </div>

                          {/* Name & Role */}
                          <div className="space-y-0.5 flex-1">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider font-display ${
                              isLead 
                                ? 'text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800' 
                                : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80'
                            }`}>
                              {member.role}
                            </span>

                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                              {member.name}
                            </h3>

                            <p className="text-[11px] text-slate-400">
                              {category.name}
                            </p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        ) : (
          /* =====================================================================
              STUDENT TEAM COMMITTEES (Details & Pictures Pending)
              ===================================================================== */
          <div className="space-y-12 sm:space-y-14">
            {filteredStudentCategories.map((category) => (
              <section key={category.id} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-display">
                      Student Wing
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                      {category.name}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md sm:text-right">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
                  {category.members.map((member, mIdx) => {
                    return (
                      <div 
                        key={mIdx}
                        className="relative group rounded-2xl p-4 sm:p-4.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400/80 dark:hover:border-cyan-500/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Photo / Avatar Placeholder */}
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center text-white border bg-gradient-to-tr from-cyan-600 to-blue-700 border-cyan-400/50">
                            {!imageErrors[member.filename] ? (
                              <img 
                                src={`/imgs/team/${member.filename}`} 
                                alt={member.name}
                                onError={(e) => handleImageError(member.filename, e)}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <GraduationCap className="w-5 h-5 text-white/90" />
                            )}
                          </div>

                          {/* Name & Role */}
                          <div className="space-y-0.5 flex-1">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider font-display text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800">
                              {member.role}
                            </span>

                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                              {member.name}
                            </h3>

                            <p className="text-[11px] text-slate-400">
                              {member.department}
                            </p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
