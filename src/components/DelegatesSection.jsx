import React, { useState } from 'react';
import { User, Sparkles, Award, Globe, Users } from 'lucide-react';
import { delegateSections } from '../data/delegatesData';

export default function DelegatesSection({ darkMode }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSections = activeFilter === 'all' 
    ? delegateSections 
    : delegateSections.filter(sec => sec.id === activeFilter);

  return (
    <section 
      className="bg-white dark:bg-[#0b1329] rounded-3xl p-5 sm:p-8 md:p-12 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300" 
      id="delegates"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-display flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Distinguished Speakers &amp; Leaders
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-1">
            Summit Delegates
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
          World-class technologists, enterprise CXOs, venture leaders, and thought pioneers joining the Jaypee Agentic AI International Summit.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar select-none">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-display transition-all shrink-0 cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All Panels ({delegateSections.reduce((acc, s) => acc + s.delegates.length, 0)})
        </button>
        {delegateSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveFilter(sec.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold font-display transition-all shrink-0 cursor-pointer ${
              activeFilter === sec.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {sec.title} ({sec.delegates.length})
          </button>
        ))}
      </div>

      {/* Sections Rendered Heading-wise */}
      <div className="space-y-14">
        {filteredSections.map((sec, secIdx) => (
          <div key={sec.id} className="space-y-6">
            {/* Group Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-7 rounded-full bg-gradient-to-b ${sec.color}`} />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {sec.description}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border font-display ${sec.badgeColor}`}>
                {sec.badge}
              </span>
            </div>

            {/* Delegates Grid (3-4 per row on desktop/laptop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {sec.delegates.map((person, idx) => (
                <div
                  key={`${person.name}-${idx}`}
                  className="group bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {/* Delegate Photo / Placeholder */}
                    <div className="relative aspect-[4/4.7] w-full rounded-xl overflow-hidden bg-slate-200/70 dark:bg-slate-800 mb-4 shadow-inner">
                      {person.image ? (
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}

                      {/* Fallback stylized card for delegates without photo (e.g. Sanju Rathi) */}
                      <div 
                        className={`w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 ${
                          person.image ? 'hidden' : 'flex'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full bg-blue-600/10 dark:bg-cyan-400/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-2 font-display font-black text-xl border border-blue-200 dark:border-blue-900">
                          {person.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')}
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display">
                          Distinguished Delegate
                        </span>
                      </div>
                    </div>

                    {/* Delegate Details */}
                    <div className="space-y-1">
                      <h4 className="font-display font-black text-base sm:text-[17px] text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {person.name}
                      </h4>
                      <p className="text-xs sm:text-[13px] font-bold text-blue-600 dark:text-cyan-400 leading-snug">
                        {person.role}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {person.organization}
                      </p>
                      {person.detail && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 leading-normal border-t border-slate-200/60 dark:border-slate-800/60 mt-2">
                          {person.detail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom subtle accent line */}
                  <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">{sec.badge.split('•')[0].trim()}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
