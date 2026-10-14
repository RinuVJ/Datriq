import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactPage({ branding, onSubmitInquiry }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          Connect With Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Contact DATRIQ – Data Science Club
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          St. Joseph's University • Department of Data Science & Computer Science
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0A1228] border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Official Coordinates</h3>
            <p className="text-xs text-slate-300 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{branding.clubLocation}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{branding.clubEmail}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{branding.clubPhone}</span>
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitInquiry(form);
            setForm({ name: '', email: '', subject: '', message: '' });
          }}
          className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0A1228] border border-cyan-500/30 space-y-4 text-xs"
        >
          <h3 className="text-lg font-bold text-white">Send an Official Inquiry</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
            <input
              type="email"
              required
              placeholder="Your Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
          </div>
          <input
            type="text"
            required
            placeholder="Subject *"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
          />
          <textarea
            rows={4}
            required
            placeholder="How can the DATRIQ team help you? *"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
          />
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
