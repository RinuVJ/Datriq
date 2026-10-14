import { Plus } from 'lucide-react';
import { DatriqLogo, CollegeLogoBadge } from './components.jsx';

export function AboutPage({ branding, liveStats, projects, navigateTo, onOpenLogoModal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B1532] to-[#070C1B] border border-cyan-500/30 p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300">
              About The Club
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              DATRIQ – Data Science Club
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Established at <strong className="text-white">St. Joseph's University</strong>, DATRIQ embodies the motto{' '}
              <span className="text-cyan-300 font-mono">"RAW DATA RARE INTELLIGENCE"</span>. We bring together undergraduate and postgraduate scholars passionate about statistical modeling, artificial intelligence, machine learning engineering, and ethical data innovation.
            </p>
          </div>
          <div className="flex flex-col gap-3 bg-[#050914] p-5 rounded-2xl border border-slate-800">
            <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="md" showTagline={true} />
            <CollegeLogoBadge
              customCollegeLogoUrl={branding.collegeLogoUrl}
              onOpenUploadModal={onOpenLogoModal}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Club Projects Showcase (Drives Live Projects Counter) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Research & Innovation ({liveStats.totalProjects} Projects in DB)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Featured Student Data Science Projects
            </h2>
          </div>
          <button
            onClick={() => navigateTo('admin')}
            className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project via Admin
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-[#0A1228] border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {proj.domain}
                </span>
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-cyan-300 font-medium">Lead: {proj.lead}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                {(proj.techStack || []).map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
