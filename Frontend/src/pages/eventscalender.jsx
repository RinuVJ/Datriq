import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export function EventCalendarPage({ events, onSelectEventForReg }) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9);
  const [currentYear, setCurrentYear] = useState(2026);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay();

  const changeMonth = (delta) => {
    let nextMonth = currentMonthIndex + delta;
    let nextYear = currentYear;
    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    } else if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    setCurrentMonthIndex(nextMonth);
    setCurrentYear(nextYear);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Academic Schedule
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            DATRIQ Event Calendar
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-[#0A1228] p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-white min-w-[140px] text-center">
            {monthNames[currentMonthIndex]} {currentYear}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-3xl bg-[#0A1228] border border-slate-800 p-6 shadow-xl">
        <div className="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-bold text-cyan-400 uppercase">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {[...Array(firstDayOfWeek)].map((_, emptyIdx) => (
            <div
              key={`empty-${emptyIdx}`}
              className="h-24 sm:h-28 rounded-2xl bg-slate-950/40 border border-slate-900/50"
            />
          ))}

          {[...Array(daysInMonth)].map((_, dayIdx) => {
            const dayNum = dayIdx + 1;
            const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayEvents = events.filter((e) => e.date === dateStr);

            return (
              <div
                key={dayNum}
                className={`h-24 sm:h-28 rounded-2xl p-2 border transition-all flex flex-col justify-between overflow-hidden ${
                  dayEvents.length > 0
                    ? 'bg-cyan-950/30 border-cyan-500/50'
                    : 'bg-slate-900/60 border-slate-800/80'
                }`}
              >
                <span className="text-xs font-bold text-slate-300">{dayNum}</span>
                <div className="space-y-1 overflow-y-auto">
                  {dayEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => onSelectEventForReg(ev)}
                      className="w-full text-left px-2 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[10px] truncate hover:bg-cyan-400"
                      title={ev.title}
                    >
                      {ev.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chronological Schedule List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Complete Chronological Event Directory</h3>
        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-5 rounded-2xl bg-[#0A1228] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                    {ev.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {ev.date} • {ev.time}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{ev.title}</h4>
                <p className="text-xs text-slate-400">{ev.venue}</p>
              </div>
              <button
                onClick={() => onSelectEventForReg(ev)}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0"
              >
                Register / Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
