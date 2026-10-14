import { useState } from 'react';
import { X } from 'lucide-react';
import { DatriqLogo, CollegeLogoBadge } from './components.jsx';
import { compressImageFile } from './utils.js';

export function LogoUploadModal({ branding, onClose, onSave, showNotification }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#0B132B] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Official Club & University Logo Upload Settings
            </h3>
            <p className="text-xs text-slate-400">
              Upload your official DATRIQ logo and St. Joseph's University logo files.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* DATRIQ Logo Upload */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <p className="text-xs font-bold text-cyan-300 uppercase">1. DATRIQ Club Logo</p>
            <div className="h-28 rounded-xl bg-[#050914] border border-slate-800 flex items-center justify-center p-3">
              <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="md" showTagline={true} />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const dataUrl = await compressImageFile(file, 600, 600, true);
                    await onSave({ datriqLogoUrl: dataUrl });
                  } catch {
                    showNotification('Error uploading logo', 'error');
                  }
                }
              }}
              className="w-full text-xs text-slate-300 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-cyan-500 file:text-slate-950 file:font-bold"
            />
          </div>

          {/* St. Joseph's University Logo Upload */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <p className="text-xs font-bold text-purple-300 uppercase">
              2. St. Joseph's University Logo
            </p>
            <div className="h-28 rounded-xl bg-[#050914] border border-slate-800 flex items-center justify-center p-3">
              <CollegeLogoBadge
                customCollegeLogoUrl={branding.collegeLogoUrl}
                size="md"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const dataUrl = await compressImageFile(file, 700, 250, true);
                    await onSave({ collegeLogoUrl: dataUrl });
                  } catch {
                    showNotification('Error uploading college logo', 'error');
                  }
                }
              }}
              className="w-full text-xs text-slate-300 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-purple-500 file:text-white file:font-bold"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export function EventRegistrationModal({ event, currentUser, onClose, onSubmit }) {
  const [attendee, setAttendee] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    rollNumber: currentUser?.rollNumber || '',
    department: currentUser?.department || 'Department of Data Science',
    year: currentUser?.yearOfStudy || '2nd Year'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#0B132B] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
              {event.category} Registration
            </span>
            <h3 className="text-lg font-bold text-white mt-1">{event.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {event.date} • {event.venue}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(attendee);
          }}
          className="space-y-3.5 text-xs"
        >
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={attendee.fullName}
              onChange={(e) => setAttendee({ ...attendee, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">College Email *</label>
              <input
                type="email"
                required
                value={attendee.email}
                onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Roll Number *</label>
              <input
                type="text"
                required
                value={attendee.rollNumber}
                onChange={(e) => setAttendee({ ...attendee, rollNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white uppercase"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Department</label>
              <input
                type="text"
                value={attendee.department}
                onChange={(e) => setAttendee({ ...attendee, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Year of Study</label>
              <input
                type="text"
                value={attendee.year}
                onChange={(e) => setAttendee({ ...attendee, year: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>
          </div>
          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
            >
              Confirm Seat Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function DigitalIdCardModal({ member, branding, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-b from-[#081229] via-[#060C1A] to-[#0E0B24] border-2 border-cyan-400/50 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 bg-[#040812] border-b border-slate-800 flex items-center justify-between">
          <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="sm" showTagline={true} />
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="inline-block px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30">
            St. Joseph's University • Official Member Pass
          </div>

          <div className="w-24 h-24 rounded-2xl mx-auto bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 shadow-lg">
            {member.photoUrl ? (
              <img
                src={member.photoUrl}
                alt={member.fullName}
                className="w-full h-full object-cover rounded-[14px]"
              />
            ) : (
              <div className="w-full h-full bg-[#060C1A] rounded-[14px] flex items-center justify-center text-3xl font-extrabold text-cyan-300">
                {member.fullName?.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white">{member.fullName}</h3>
            <p className="text-xs font-bold text-cyan-400 mt-0.5">{member.role || 'Club Member'}</p>
            <p className="text-xs text-slate-400 mt-1">{member.department}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 text-xs">
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Roll Number / ID</p>
              <p className="font-mono font-bold text-white">{member.rollNumber}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Academic Year</p>
              <p className="font-bold text-white">{member.yearOfStudy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
