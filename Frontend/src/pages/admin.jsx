import { useState } from 'react';
import { Sparkles, Trash2, GraduationCap } from 'lucide-react';
import { DatriqLogo, CollegeLogoBadge } from './components.jsx';
import { TeamPage } from './team.jsx';
import { compressImageFile } from './utils.js';

export function AdminDashboard({
  branding,
  onSaveBranding,
  teamMembers,
  onSaveTeamMember,
  onDeleteTeamMember,
  onReorderTeamMember,
  registeredMembers,
  onDeleteRegisteredMember,
  events,
  onSaveEvent,
  onDeleteEvent,
  projects,
  onSaveProject,
  onDeleteProject,
  inquiries,
  showNotification
}) {
  const [tab, setTab] = useState('branding');
  const [newEvt, setNewEvt] = useState({
    title: '',
    category: 'Workshop',
    date: '2026-11-25',
    time: '10:00 AM - 01:00 PM',
    venue: 'St. Joseph\'s University',
    speaker: '',
    status: 'Upcoming',
    description: '',
    posterUrl: ''
  });
  const [newProj, setNewProj] = useState({
    title: '',
    lead: '',
    domain: 'Machine Learning',
    description: '',
    techStack: 'Python, Scikit-Learn'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#0B132B] to-cyan-950/60 border border-purple-500/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Full-Stack Admin Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            DATRIQ Club Management System
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage official logos, leadership team profiles, events, workshops, club projects, and student registrations in real time.
          </p>
        </div>
      </div>

      {/* Admin Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'branding', label: '1. Logos & Branding' },
          { id: 'team', label: `2. Leadership Team (${teamMembers.length})` },
          { id: 'events', label: `3. Events & Workshops (${events.length})` },
          { id: 'projects', label: `4. Club Projects (${projects.length})` },
          { id: 'members', label: `5. Registered Students (${registeredMembers.length})` },
          { id: 'inquiries', label: `6. Contact Inquiries (${inquiries.length})` }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              tab === t.id
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LOGOS & BRANDING SETTINGS */}
      {tab === 'branding' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DATRIQ Club Logo Upload Card */}
          <div className="p-6 rounded-3xl bg-[#0A1228] border border-cyan-500/30 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Official DATRIQ Club Logo
            </h3>
            <p className="text-xs text-slate-400">
              Upload the official DATRIQ logo image (`image_5c6abc.png`). It will immediately display in the header, hero, ID cards, and footer.
            </p>
            <div className="p-4 rounded-2xl bg-[#050914] border border-slate-800 flex items-center justify-center min-h-[120px]">
              <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="lg" showTagline={true} />
            </div>
            <div className="flex items-center justify-between gap-3 pt-2">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const dataUrl = await compressImageFile(file, 600, 600, true);
                    onSaveBranding({ datriqLogoUrl: dataUrl });
                  }
                }}
                className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-cyan-500 file:text-slate-950 file:font-bold"
              />
              {branding.datriqLogoUrl && (
                <button
                  onClick={() => onSaveBranding({ datriqLogoUrl: '' })}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-red-300"
                >
                  Reset to Default SVG
                </button>
              )}
            </div>
          </div>

          {/* St. Joseph's University Logo Upload Card */}
          <div className="p-6 rounded-3xl bg-[#0A1228] border border-purple-500/30 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" /> St. Joseph's University Official Logo
            </h3>
            <p className="text-xs text-slate-400">
              Upload the official St. Joseph's University header logo (`SJU-NEW-LOGO-HEADER.png`). Replaces the temporary placeholder across the website.
            </p>
            <div className="p-4 rounded-2xl bg-[#050914] border border-slate-800 flex items-center justify-center min-h-[120px]">
              <CollegeLogoBadge
                customCollegeLogoUrl={branding.collegeLogoUrl}
                onOpenUploadModal={() => {}}
                size="lg"
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-2">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const dataUrl = await compressImageFile(file, 700, 250, true);
                    onSaveBranding({ collegeLogoUrl: dataUrl });
                  }
                }}
                className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-purple-500 file:text-white file:font-bold"
              />
              {branding.collegeLogoUrl && (
                <button
                  onClick={() => onSaveBranding({ collegeLogoUrl: '' })}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-red-300"
                >
                  Revert to Placeholder
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TEAM MANAGER */}
      {tab === 'team' && (
        <TeamPage
          teamMembers={teamMembers}
          registeredMembers={registeredMembers}
          isAdmin={true}
          onSaveMember={onSaveTeamMember}
          onDeleteMember={onDeleteTeamMember}
          onReorderMember={onReorderTeamMember}
          showNotification={showNotification}
        />
      )}

      {/* TAB 3: EVENTS & WORKSHOPS MANAGER */}
      {tab === 'events' && (
        <div className="space-y-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSaveEvent(newEvt, false);
              setNewEvt({
                title: '',
                category: 'Workshop',
                date: '2026-11-25',
                time: '10:00 AM - 01:00 PM',
                venue: 'St. Joseph\'s University',
                speaker: '',
                status: 'Upcoming',
                description: '',
                posterUrl: ''
              });
            }}
            className="p-6 rounded-3xl bg-[#0A1228] border border-cyan-500/30 space-y-4 text-xs"
          >
            <h3 className="text-base font-bold text-white">Create New Event or Workshop</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Event Title *"
                value={newEvt.title}
                onChange={(e) => setNewEvt({ ...newEvt, title: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
              <select
                value={newEvt.category}
                onChange={(e) => setNewEvt({ ...newEvt, category: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              >
                <option value="Workshop">Workshop (Increments Workshop Counter)</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Symposium">Symposium</option>
              </select>
              <input
                type="date"
                required
                value={newEvt.date}
                onChange={(e) => setNewEvt({ ...newEvt, date: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Venue"
                value={newEvt.venue}
                onChange={(e) => setNewEvt({ ...newEvt, venue: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="Speaker / Host"
                value={newEvt.speaker}
                onChange={(e) => setNewEvt({ ...newEvt, speaker: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>
            <textarea
              rows={2}
              required
              placeholder="Event Description *"
              value={newEvt.description}
              onChange={(e) => setNewEvt({ ...newEvt, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Event Poster:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const dataUrl = await compressImageFile(file, 700, 500, false);
                      setNewEvt({ ...newEvt, posterUrl: dataUrl });
                    }
                  }}
                  className="text-slate-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold"
              >
                Publish Event
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-[#0A1228] border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan-400">
                    {ev.category} • {ev.date}
                  </span>
                  <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                </div>
                <button
                  onClick={() => onDeleteEvent(ev.id)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROJECTS MANAGER */}
      {tab === 'projects' && (
        <div className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSaveProject({
                ...newProj,
                techStack: newProj.techStack.split(',').map((s) => s.trim())
              });
              setNewProj({
                title: '',
                lead: '',
                domain: 'Machine Learning',
                description: '',
                techStack: 'Python, Scikit-Learn'
              });
            }}
            className="p-6 rounded-3xl bg-[#0A1228] border border-emerald-500/30 space-y-4 text-xs"
          >
            <h3 className="text-base font-bold text-white">Add Student / Club Data Science Project</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Project Title *"
                value={newProj.title}
                onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
              <input
                type="text"
                required
                placeholder="Project Lead(s) *"
                value={newProj.lead}
                onChange={(e) => setNewProj({ ...newProj, lead: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="Domain (e.g. Computer Vision / NLP)"
                value={newProj.domain}
                onChange={(e) => setNewProj({ ...newProj, domain: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>
            <textarea
              rows={2}
              required
              placeholder="Project Description *"
              value={newProj.description}
              onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold"
            >
              Save Project to Database
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-[#0A1228] border border-slate-800 flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">{p.domain}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{p.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                </div>
                <button
                  onClick={() => onDeleteProject(p.id)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REGISTERED STUDENT MEMBERS DIRECTORY */}
      {tab === 'members' && (
        <div className="rounded-3xl bg-[#0A1228] border border-slate-800 p-6 space-y-4">
          <h3 className="text-base font-bold text-white">
            Registered Student Members ({registeredMembers.length})
          </h3>
          {registeredMembers.length === 0 ? (
            <p className="text-xs text-slate-400">
              No students have registered via the Join form yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-2">Roll No</th>
                    <th className="py-3 px-2">Full Name</th>
                    <th className="py-3 px-2">Department & Year</th>
                    <th className="py-3 px-2">Email & Phone</th>
                    <th className="py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {registeredMembers.map((m) => (
                    <tr key={m.id}>
                      <td className="py-3 px-2 font-mono text-cyan-300">{m.rollNumber}</td>
                      <td className="py-3 px-2 font-bold text-white">{m.fullName}</td>
                      <td className="py-3 px-2 text-slate-300">
                        {m.department} ({m.yearOfStudy})
                      </td>
                      <td className="py-3 px-2 text-slate-400">
                        {m.email} • {m.phone}
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => onDeleteRegisteredMember(m.id)}
                          className="text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: INQUIRIES */}
      {tab === 'inquiries' && (
        <div className="space-y-3">
          {inquiries.length === 0 ? (
            <p className="text-xs text-slate-400">No contact inquiries submitted yet.</p>
          ) : (
            inquiries.map((inq) => (
              <div key={inq.id} className="p-5 rounded-2xl bg-[#0A1228] border border-slate-800">
                <p className="text-xs font-bold text-cyan-400">
                  {inq.name} ({inq.email})
                </p>
                <p className="text-sm font-bold text-white mt-1">{inq.subject}</p>
                <p className="text-xs text-slate-300 mt-1">{inq.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
