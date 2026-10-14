import { useState } from 'react';
import { Database, Brain, Cpu, Code2, BarChart3, Trophy, Wrench, Calendar as CalendarIcon, Users, Image as ImageIcon, UserPlus, Mail, MapPin, CheckCircle2, Sparkles, ChevronRight, Layers, Globe, FolderGit2, Star } from 'lucide-react';
import { DatriqLogo, CollegeLogoBadge, MemberProfileCard } from './components.jsx';

export function HomePage({
  branding,
  liveStats,
  events,
  teamMembers,
  gallery,
  testimonials,
  navigateTo,
  onSelectEventForReg,
  onSelectGalleryItem,
  onOpenLogoModal,
  onSubmitInquiry
}) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const activities = [
    {
      title: 'Data Science',
      icon: Database,
      color: 'from-cyan-500 to-blue-600',
      desc: 'End-to-end statistical analysis, hypothesis testing, feature engineering, and domain-driven data storytelling.'
    },
    {
      title: 'Artificial Intelligence',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      desc: 'Exploring Large Language Models (LLMs), Generative AI, autonomous agents, and neural reasoning systems.'
    },
    {
      title: 'Machine Learning',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-400',
      desc: 'Supervised & unsupervised learning, ensemble algorithms, deep neural networks, and model deployment.'
    },
    {
      title: 'Python Computing',
      icon: Code2,
      color: 'from-emerald-500 to-teal-600',
      desc: 'Hands-on mastery of NumPy, Pandas, Scikit-Learn, PyTorch, and FastAPI for scientific computing.'
    },
    {
      title: 'Data Analytics',
      icon: BarChart3,
      color: 'from-amber-500 to-orange-600',
      desc: 'Transforming raw datasets into actionable executive dashboards using SQL, PowerBI, Tableau, and Plotly.'
    },
    {
      title: 'Hackathons',
      icon: Trophy,
      color: 'from-pink-500 to-rose-600',
      desc: '24-hour competitive datathons solving real-world healthcare, sustainability, and fintech challenges.'
    },
    {
      title: 'Technical Workshops',
      icon: Wrench,
      color: 'from-indigo-500 to-purple-600',
      desc: 'Weekly peer-led lab sessions, Kaggle study jams, and industry guest lectures at St. Joseph\'s University.'
    }
  ];

  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dual Logo Institutional Pill */}
              <div className="inline-flex flex-wrap items-center gap-3 p-2 pr-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg">
                <span className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs tracking-wider uppercase">
                  DATRIQ
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Data Science Club • <strong className="text-white">St. Joseph's University</strong>
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Explore Data.{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Build Intelligence.
                </span>{' '}
                Shape the Future.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Welcome to <strong className="text-white">DATRIQ – Data Science Club</strong> of{' '}
                <strong className="text-cyan-300">St. Joseph's University</strong>. Where curious minds turn{' '}
                <span className="font-mono text-cyan-300 text-sm">RAW DATA</span> into{' '}
                <span className="font-mono text-purple-300 text-sm">RARE INTELLIGENCE</span> through collaborative AI research, machine learning bootcamps, and high-impact hackathons.
              </p>

              {/* Hero Call-To-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => navigateTo('join')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <UserPlus className="w-4 h-4" /> Join DATRIQ
                </button>
                <button
                  onClick={() => navigateTo('events')}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-cyan-500/40 font-bold text-sm flex items-center gap-2 transition-all"
                >
                  <CalendarIcon className="w-4 h-4 text-cyan-400" /> Explore Events
                </button>
                <button
                  onClick={() => navigateTo('team')}
                  className="px-5 py-3.5 rounded-2xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 border border-purple-500/30 font-semibold text-sm flex items-center gap-2 transition-all"
                >
                  <Users className="w-4 h-4 text-purple-400" /> Meet Our Team
                </button>
              </div>

              {/* Dual Official Brand Showcase Card inside Hero */}
              <div className="pt-4">
                <div className="p-4 rounded-2xl bg-[#080F22]/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="md" showTagline={true} />
                  <div className="flex items-center gap-3">
                    <CollegeLogoBadge
                      customCollegeLogoUrl={branding.collegeLogoUrl}
                      onOpenUploadModal={onOpenLogoModal}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Interactive Neural Data Intelligence Hub */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-[#0B1530] to-[#060B19] border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs font-mono text-cyan-300">
                      datriq_intelligence_engine.py
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    ● LIVE DB SYNC
                  </span>
                </div>

                {/* Central Emblem Display */}
                <div className="py-6 px-4 rounded-2xl bg-[#040812] border border-cyan-500/20 flex flex-col items-center text-center mb-5">
                  <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="xl" showTagline={true} />
                  <p className="text-xs text-slate-400 mt-4 max-w-xs">
                    Official Data Science & AI Community of St. Joseph's University
                  </p>
                </div>

                {/* Live Telemetry Mini Cards */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-slate-400 text-[11px]">Active Focus Track</p>
                    <p className="text-white font-bold mt-0.5 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-cyan-400" /> GenAI & Predictive ML
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-slate-400 text-[11px]">President</p>
                    <p className="text-white font-bold mt-0.5 truncate">Riya Jercy J</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL DATABASE-DRIVEN STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Real-Time Database Metrics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Live Club Impact & Records
            </h2>
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" /> Computed directly from live database collections
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => navigateTo('team')}
            className="cursor-pointer group p-6 rounded-3xl bg-gradient-to-br from-[#0B142C] to-[#070C1B] border border-cyan-500/25 hover:border-cyan-400 transition-all shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                {liveStats.leadershipCount} Exec + {liveStats.studentMemberCount} Students
              </span>
            </div>
            <p className="text-4xl font-extrabold text-white tracking-tight">
              {liveStats.totalRegisteredMembers}
            </p>
            <p className="text-sm font-semibold text-slate-300 mt-1">Registered Members</p>
            <p className="text-xs text-slate-500 mt-1">Verified records in database</p>
          </div>

          <div
            onClick={() => navigateTo('events')}
            className="cursor-pointer group p-6 rounded-3xl bg-gradient-to-br from-[#0B142C] to-[#070C1B] border border-blue-500/25 hover:border-blue-400 transition-all shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full">
                Live Events DB
              </span>
            </div>
            <p className="text-4xl font-extrabold text-white tracking-tight">
              {liveStats.totalEvents}
            </p>
            <p className="text-sm font-semibold text-slate-300 mt-1">Events Conducted & Scheduled</p>
            <p className="text-xs text-slate-500 mt-1">Symposiums, hackathons & sessions</p>
          </div>

          <div
            onClick={() => navigateTo('events')}
            className="cursor-pointer group p-6 rounded-3xl bg-gradient-to-br from-[#0B142C] to-[#070C1B] border border-purple-500/25 hover:border-purple-400 transition-all shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full">
                Hands-On Labs
              </span>
            </div>
            <p className="text-4xl font-extrabold text-white tracking-tight">
              {liveStats.totalWorkshops}
            </p>
            <p className="text-sm font-semibold text-slate-300 mt-1">Technical Workshops</p>
            <p className="text-xs text-slate-500 mt-1">Recorded workshop tracks</p>
          </div>

          <div
            onClick={() => navigateTo('about')}
            className="cursor-pointer group p-6 rounded-3xl bg-gradient-to-br from-[#0B142C] to-[#070C1B] border border-emerald-500/25 hover:border-emerald-400 transition-all shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Research & AI
              </span>
            </div>
            <p className="text-4xl font-extrabold text-white tracking-tight">
              {liveStats.totalProjects}
            </p>
            <p className="text-sm font-semibold text-slate-300 mt-1">Club Projects</p>
            <p className="text-xs text-slate-500 mt-1">Student-built ML & Data models</p>
          </div>
        </div>
      </section>

      {/* MISSION, VISION & OBJECTIVES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Institutional Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Our Mission, Vision & Objectives
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Empowering students across St. Joseph's University to master the mathematical, computational, and ethical foundations of modern data science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-[#0A1228] border border-cyan-500/25 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To cultivate a vibrant, hands-on learning community at St. Joseph's University that bridges theoretical statistics and computer science with real-world Artificial Intelligence and Data Science applications.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0A1228] border border-purple-500/25 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To become a premier collegiate center of excellence where students transform raw data into rare intelligence—driving socially responsible innovation, academic research, and technological leadership.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0A1228] border border-blue-500/25 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Core Objectives</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Conduct weekly Python, ML, and Analytics bootcamps.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Host inter-collegiate hackathons and Kaggle competitions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Build open-source campus AI projects and research papers.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CLUB ACTIVITIES & TECHNICAL DOMAINS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Core Club Activities & Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activities.map((act, idx) => {
            const IconComponent = act.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#091024] border border-slate-800 hover:border-cyan-500/40 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${act.color} p-0.5 mb-4 shadow-lg`}
                >
                  <div className="w-full h-full bg-[#091024] rounded-[14px] flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {act.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{act.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* UPCOMING EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Mark Your Calendar
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Upcoming Events & Workshops
            </h2>
          </div>
          <button
            onClick={() => navigateTo('events')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            View All Events ({events.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-3xl bg-[#0A1228] border border-slate-800 hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between transition-all shadow-xl"
            >
              <div>
                {/* Poster / Banner Header */}
                <div className="h-44 bg-gradient-to-br from-cyan-950 via-[#0B1536] to-purple-950 relative overflow-hidden border-b border-slate-800 flex items-center justify-center p-6">
                  {evt.posterUrl ? (
                    <img
                      src={evt.posterUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  ) : (
                    <div className="text-center z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {evt.category}
                      </span>
                      <p className="text-sm font-bold text-white mt-3 line-clamp-2">{evt.title}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-cyan-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5" /> {evt.date}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300">
                      {evt.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">{evt.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>
                  <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectEventForReg(evt)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  Register for Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP TEAM PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Executive Council
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              DATRIQ Leadership Team
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Meet the office bearers driving Data Science initiatives at St. Joseph's University.
            </p>
          </div>
          <button
            onClick={() => navigateTo('team')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            Explore Full Team & Manage Profiles <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.slice(0, 6).map((member) => (
            <MemberProfileCard key={member.id} member={member} isAdmin={false} />
          ))}
        </div>
      </section>

      {/* FEATURED EVENT GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Club Moments
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Featured Event Gallery
            </h2>
          </div>
          <button
            onClick={() => navigateTo('gallery')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            Open Full Gallery <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectGalleryItem(item)}
              className="cursor-pointer group rounded-3xl bg-[#0A1228] border border-slate-800 hover:border-cyan-500/40 overflow-hidden transition-all"
            >
              <div className="h-48 bg-gradient-to-br from-slate-900 via-cyan-950/50 to-purple-950/50 relative flex items-center justify-center overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center p-6">
                    <ImageIcon className="w-10 h-10 text-cyan-400/70 mb-2" />
                    <span className="text-xs font-semibold text-cyan-200">{item.category}</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-[11px] text-cyan-400 font-mono">{item.date}</p>
                <h3 className="text-base font-bold text-white mt-1 group-hover:text-cyan-300">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
            Community Voices
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Student Experiences at DATRIQ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-3xl bg-[#0A1228] border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-cyan-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK CONTACT SECTION ON HOMEPAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1532] via-[#091024] to-[#120D2B] border border-cyan-500/30 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Get In Touch
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Have Questions About Joining or Collaborating?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Reach out to the DATRIQ Executive Council at St. Joseph's University for membership queries, workshop proposals, or hackathon sponsorships.
              </p>
              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                <p className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400" /> {branding.clubLocation}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" /> {branding.clubEmail}
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!contactForm.name || !contactForm.email || !contactForm.message) return;
                onSubmitInquiry(contactForm);
                setContactForm({ name: '', email: '', subject: '', message: '' });
              }}
              className="space-y-3 bg-[#060B19]/90 p-6 rounded-2xl border border-slate-800"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="College Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Subject (e.g. Workshop Query / Project Collaboration)"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
              />
              <textarea
                rows={3}
                required
                placeholder="Your message..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
              >
                Send Message to DATRIQ
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
