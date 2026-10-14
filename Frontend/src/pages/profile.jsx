import { Award } from 'lucide-react';

export function MemberProfilePage({
  currentUser,
  eventRegistrations,
  onOpenIdCard,
  navigateTo
}) {
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-lg font-bold text-white">Join DATRIQ to access your member profile.</p>
        <button
          onClick={() => navigateTo('join')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Join the Club
        </button>
      </div>
    );
  }

  const myEvents = eventRegistrations.filter(
    (r) =>
      r.email?.toLowerCase() === currentUser.email?.toLowerCase() ||
      r.rollNumber?.toLowerCase() === currentUser.rollNumber?.toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="rounded-3xl bg-[#0A1228] border border-cyan-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {currentUser.photoUrl ? (
            <img
              src={currentUser.photoUrl}
              alt={currentUser.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-extrabold text-slate-950">
              {currentUser.fullName?.charAt(0)}
            </div>
          )}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ Verified Member
              </span>
              <span className="text-xs font-mono text-cyan-400">
                ID: {currentUser.rollNumber}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">{currentUser.fullName}</h1>
            <p className="text-xs text-slate-400">
              {currentUser.department} • {currentUser.yearOfStudy}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenIdCard}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg"
        >
          <Award className="w-4 h-4" /> View Digital ID Card
        </button>
      </div>

      {/* My Registered Events */}
      <div className="rounded-3xl bg-[#0A1228] border border-slate-800 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">
          My Registered Events ({myEvents.length})
        </h3>
        {myEvents.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/60 text-center space-y-2">
            <p className="text-xs text-slate-400">
              You haven't registered for any upcoming events yet.
            </p>
            <button
              onClick={() => navigateTo('events')}
              className="text-xs font-bold text-cyan-400 hover:underline"
            >
              Browse Upcoming Events →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myEvents.map((reg) => (
              <div
                key={reg.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-white">{reg.eventTitle}</p>
                  <p className="text-xs text-cyan-400 mt-0.5">Event Date: {reg.eventDate}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
