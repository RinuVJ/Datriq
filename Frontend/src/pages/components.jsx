import { useState } from 'react';
import { Trash2, Edit3, ArrowUp, ArrowDown, Lock } from 'lucide-react';
import defaultCollegeLogoUrl from '../assets/SJU-NEW-LOGO-HEADER.png';

export const DatriqLogo = ({ customLogoUrl, size = 'md', showTagline = true }) => {
  const dimensions = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-20',
    xl: 'h-28'
  }[size] || 'h-12';

  if (customLogoUrl) {
    return (
      <div className="flex items-center gap-3 select-none">
        <img
          src={customLogoUrl}
          alt="DATRIQ - Data Science Club Logo"
          className={`${dimensions} w-auto object-contain rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 bg-[#050914]`}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 select-none group">
      <div className={`relative flex items-center justify-center rounded-xl bg-[#040812] border border-cyan-400/30 p-1.5 shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400/60 transition-all ${size === 'xl' ? 'w-24 h-24' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11'}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id="datriqCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F7FA" />
              <stop offset="45%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="datriqRimGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>
          {/* Outer Crescent / Network Hemisphere matching DATRIQ emblem */}
          <path
            d="M 42 22 A 44 44 0 1 0 98 68"
            fill="none"
            stroke="url(#datriqRimGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Internal Neural Network Mesh Lines */}
          <line x1="42" y1="22" x2="42" y2="52" stroke="url(#datriqCyanGrad)" strokeWidth="4" />
          <line x1="21" y1="60" x2="42" y2="52" stroke="url(#datriqCyanGrad)" strokeWidth="4" />
          <line x1="42" y1="52" x2="55" y2="85" stroke="url(#datriqCyanGrad)" strokeWidth="4" />
          <line x1="28" y1="88" x2="55" y2="85" stroke="url(#datriqCyanGrad)" strokeWidth="4" />
          <line x1="55" y1="85" x2="62" y2="103" stroke="url(#datriqCyanGrad)" strokeWidth="4" />
          <line x1="42" y1="52" x2="77" y2="66" stroke="url(#datriqCyanGrad)" strokeWidth="4.5" />
          <line x1="55" y1="85" x2="77" y2="66" stroke="url(#datriqCyanGrad)" strokeWidth="4" />
          <line x1="77" y1="66" x2="70" y2="102" stroke="url(#datriqCyanGrad)" strokeWidth="4" />
          <line x1="77" y1="66" x2="98" y2="68" stroke="url(#datriqCyanGrad)" strokeWidth="4.5" />
          {/* Upper Signal Arm */}
          <line x1="77" y1="66" x2="56" y2="40" stroke="#E0F2FE" strokeWidth="5" strokeLinecap="round" />
          <line x1="56" y1="40" x2="72" y2="16" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
          {/* Network Nodes */}
          <circle cx="42" cy="52" r="7" fill="#0284C7" />
          <circle cx="55" cy="85" r="6.5" fill="#0284C7" />
          <circle cx="77" cy="66" r="7.5" fill="#E0F2FE" />
          <circle cx="56" cy="40" r="7.5" fill="#E0F2FE" />
          {/* Floating Data Pixels (Top Right) */}
          <rect x="76" y="34" width="15" height="15" rx="1.5" fill="url(#datriqCyanGrad)" />
          <rect x="86" y="19" width="10" height="10" rx="1" fill="#0284C7" />
          <rect x="96" y="31" width="12" height="12" rx="1" fill="#0EA5E9" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-[0.16em] bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent leading-none ${size === 'xl' ? 'text-3xl' : size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
          DATRIQ
        </span>
        {showTagline && (
          <span className={`font-semibold tracking-[0.2em] text-cyan-300/80 uppercase mt-1 ${size === 'xl' ? 'text-xs' : 'text-[9px]'}`}>
            RAW DATA RARE INTELLIGENCE
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Renders the admin-uploaded university logo or the bundled official logo.
 */
export const CollegeLogoBadge = ({ customCollegeLogoUrl, size = 'md' }) => {
  const heightClass = {
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-16'
  }[size] || 'h-11';

  return (
    <div className="flex items-center justify-center bg-white px-2 py-1 rounded-md border border-slate-200/70">
      <img
        src={customCollegeLogoUrl || defaultCollegeLogoUrl}
        alt="St. Joseph's University Official Logo"
        className={`${heightClass} w-auto max-w-[240px] object-contain`}
      />
    </div>
  );
};

// ============================================================================
// REUSABLE LEADERSHIP / MEMBER CARD COMPONENT
// ============================================================================
export function MemberProfileCard({
  member,
  isAdmin,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="rounded-3xl bg-[#0A1228] border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all shadow-xl group relative">
      <div>
        {/* Top Role Badge & Admin Reorder Controls */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30">
            {member.designation}
          </span>
          {isAdmin && (
            <div className="flex items-center gap-1">
              {!isFirst && (
                <button
                  onClick={onMoveUp}
                  title="Move Up"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              )}
              {!isLast && (
                <button
                  onClick={onMoveDown}
                  title="Move Down"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onEdit}
                title="Edit Member"
                className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onDelete}
                title="Remove Member"
                className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Profile Avatar & Name */}
        <div className="flex items-center gap-4 mb-4">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center text-xl font-extrabold text-cyan-200 shadow-inner">
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
              {member.name}
            </h3>
            <p className="text-xs text-slate-400">{member.department || 'Data Science'}</p>
            {member.year && (
              <p className="text-[11px] text-purple-300 font-medium mt-0.5">{member.year}</p>
            )}
          </div>
        </div>

        {/* Short Bio */}
        {member.bio && (
          <p className="text-xs text-slate-300 leading-relaxed mb-4">{member.bio}</p>
        )}

        {/* Skills Tags */}
        {member.skills && member.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {(Array.isArray(member.skills)
              ? member.skills
              : String(member.skills).split(',')
            ).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300"
              >
                {String(skill).trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Links & Private-by-Default Email */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {member.emailPublic || isAdmin || showEmail ? (
            <span className="text-[11px] text-cyan-300 truncate max-w-[170px]" title={member.email}>
              {member.email}
            </span>
          ) : (
            <button
              onClick={() => setShowEmail(true)}
              className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1"
              title="Email is private by default"
            >
              <Lock className="w-3 h-3 text-slate-500" /> Email Private
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] font-medium"
            >
              LinkedIn
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 border border-slate-800 text-[11px] font-medium"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
