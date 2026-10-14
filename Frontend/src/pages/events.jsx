import { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Users, MapPin, Plus, UserCheck } from 'lucide-react';

export function EventsPage({ events, eventRegistrations, onSelectEventForReg, onNavigateToAdmin }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Club Activity', 'Workshop', 'Hackathon', 'Symposium'];

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return events;
    return events.filter(
      (e) => e.category && e.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [events, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Technical Programs & Bootcamps
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            DATRIQ Events & Workshops
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Register for upcoming hands-on workshops, hackathons, and technical sessions at St. Joseph's University.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={onNavigateToAdmin}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Create Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const regCount = eventRegistrations.filter((r) => r.eventId === evt.id).length;
          return (
            <div
              key={evt.id}
              className="rounded-3xl bg-[#0A1228] border border-slate-800 hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="h-48 bg-gradient-to-br from-cyan-950 via-slate-900 to-purple-950 relative flex items-center justify-center p-6 border-b border-slate-800">
                  {evt.posterUrl ? (
                    <img
                      src={evt.posterUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  ) : (
                    <div className="text-center z-10 space-y-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {evt.category}
                      </span>
                      <p className="text-sm font-extrabold text-white px-2">{evt.title}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5" /> {evt.date}
                    </span>
                    <span className="text-slate-400">{evt.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>
                  <div className="pt-2 space-y-1.5 text-xs text-slate-400">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {evt.venue}
                    </p>
                    {evt.speaker && (
                      <p className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Speaker: {evt.speaker}
                      </p>
                    )}
                    <p className="flex items-center gap-2 text-emerald-300 font-medium">
                      <UserCheck className="w-3.5 h-3.5 shrink-0" /> {regCount} Registered Attendees
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectEventForReg(evt)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  Register Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
