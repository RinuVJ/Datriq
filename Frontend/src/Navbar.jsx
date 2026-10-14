import {
  ArrowRight,
  Award,
  CalendarDays,
  Images,
  LogOut,
  Menu,
  MessageCircle,
  Shield,
  Sparkles,
  UserCheck,
  Users,
  Home,
  X,
} from "lucide-react";

import { DatriqLogo, CollegeLogoBadge } from "./pages/components.jsx";

export function Navbar({
  activePage,
  branding,
  navItems,
  currentUser,
  mobileMenuOpen,
  setMobileMenuOpen,
  userDropdownOpen,
  setUserDropdownOpen,
  setMemberIdCardModalOpen,
  setCurrentUser,
  showNotification,
  navigateTo,
}) {
  const iconFor = (id) => {
    const icons = {
      home: Home,
      about: Sparkles,
      team: Users,
      events: CalendarDays,
      calendar: CalendarDays,
      gallery: Images,
      contact: MessageCircle,
      join: ArrowRight,
    };
    return icons[id] || Sparkles;
  };

  return (
    <>
      {/* Slim institutional strip */}
      <div className="relative z-40 border-b border-cyan-400/10 bg-[#030711]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2.5 text-[11px] sm:text-xs">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-2.5 py-1 font-semibold tracking-wide text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Official Tech Community
            </span>
            <span className="hidden text-slate-700 sm:inline">/</span>
            <span className="hidden truncate text-slate-400 sm:inline">
              St. Joseph&apos;s University <span className="text-slate-600">·</span>{" "}
              <span className="text-slate-200">DATRIQ Data Science Club</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              navigateTo("admin");
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition duration-200 ${
              activePage === "admin"
                ? "border-violet-400/50 bg-violet-500 text-white"
                : "border-violet-400/20 bg-violet-400/[0.07] text-violet-200 hover:border-violet-300/50 hover:bg-violet-400/15"
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            Admin Management
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-30 border-b border-cyan-300/15 bg-[#050a15]/95 shadow-[0_12px_35px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
        <div className="mx-auto flex min-h-[78px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand group */}
          <div className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
            <button
              type="button"
              onClick={() => navigateTo("home")}
              aria-label="DATRIQ home"
              className="shrink-0 rounded-xl transition duration-200 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <DatriqLogo
                customLogoUrl={branding.datriqLogoUrl}
                size="sm"
                showTagline={true}
              />
            </button>

            <span className="hidden h-10 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent lg:block" />

            <div className="hidden shrink-0 sm:block">
              <CollegeLogoBadge
                customCollegeLogoUrl={branding.collegeLogoUrl}
                size="sm"
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex 2xl:gap-2"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = iconFor(item.id);

              if (item.id === "join") {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateTo(item.id)}
                    className={`group ml-1 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold tracking-wide text-slate-950 shadow-lg shadow-cyan-500/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/25 ${
                      isActive
                        ? "bg-cyan-300"
                        : "bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400"
                    }`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition duration-200 2xl:px-3.5 ${
                    isActive
                      ? "bg-cyan-400/[0.10] text-cyan-200 ring-1 ring-inset ring-cyan-300/25"
                      : "text-slate-300 hover:bg-white/[0.045] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive ? "text-cyan-300" : "text-slate-500"}`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Account controls */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {currentUser && (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  className="flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-slate-900/80 py-1.5 pl-1.5 pr-3 transition hover:border-cyan-300/50 hover:bg-slate-800/90"
                >
                  {currentUser.photoUrl ? (
                    <img
                      src={currentUser.photoUrl}
                      alt={currentUser.fullName}
                      className="h-8 w-8 rounded-full border border-cyan-300/60 object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-sm font-bold text-slate-950">
                      {currentUser.fullName?.charAt(0) || "M"}
                    </span>
                  )}
                  <span className="max-w-[115px] text-left">
                    <span className="block truncate text-xs font-bold leading-tight text-white">
                      {currentUser.fullName?.split(" ")[0]}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-tight text-cyan-300">
                      {currentUser.role || "Member"}
                    </span>
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#0a1122] shadow-2xl shadow-black/50">
                    <div className="border-b border-white/[0.07] bg-white/[0.025] px-4 py-4">
                      <p className="truncate text-sm font-bold text-white">
                        {currentUser.fullName}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {currentUser.email}
                      </p>
                      <span className="mt-2 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2.5 py-1 text-[10px] font-semibold text-cyan-200">
                        ID: {currentUser.rollNumber}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo("profile");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium text-slate-200 transition hover:bg-white/[0.05]"
                    >
                      <UserCheck className="h-4 w-4 text-cyan-300" />
                      My Profile &amp; Registered Events
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setMemberIdCardModalOpen(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium text-slate-200 transition hover:bg-white/[0.05]"
                    >
                      <Award className="h-4 w-4 text-violet-300" />
                      Digital Membership ID Card
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo("admin");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium text-slate-200 transition hover:bg-white/[0.05]"
                    >
                      <Shield className="h-4 w-4 text-emerald-300" />
                      Admin Management Portal
                    </button>
                    <div className="mx-3 border-t border-white/[0.07]" />
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUser(null);
                        setUserDropdownOpen(false);
                        showNotification("Logged out safely.", "info");
                        navigateTo("home");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-semibold text-rose-300 transition hover:bg-rose-400/[0.07]"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="rounded-xl border border-cyan-300/20 bg-slate-900/80 p-2.5 text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200 xl:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive mobile / tablet drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-cyan-300/10 bg-[#070d1b] px-4 pb-5 pt-4 shadow-2xl xl:hidden sm:px-6">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
              <div className="sm:hidden">
                <CollegeLogoBadge
                  customCollegeLogoUrl={branding.collegeLogoUrl}
                  size="sm"
                />
              </div>
              <p className="text-xs font-medium text-slate-400">
                Explore the DATRIQ community
              </p>
            </div>

            <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                const Icon = iconFor(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      navigateTo(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-semibold transition ${
                      isActive
                        ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
                        : item.id === "join"
                        ? "border-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950"
                        : "border-white/[0.07] bg-white/[0.025] text-slate-200 hover:border-cyan-300/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {currentUser && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      navigateTo("profile");
                      setMobileMenuOpen(false);
                    }}
                    className="flex min-h-12 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 text-left text-xs font-semibold text-slate-200"
                  >
                    <UserCheck className="h-4 w-4 text-cyan-300" />
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMemberIdCardModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex min-h-12 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 text-left text-xs font-semibold text-slate-200"
                  >
                    <Award className="h-4 w-4 text-violet-300" />
                    Membership ID
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentUser(null);
                      setMobileMenuOpen(false);
                      showNotification("Logged out safely.", "info");
                      navigateTo("home");
                    }}
                    className="flex min-h-12 items-center gap-2 rounded-xl border border-rose-400/15 bg-rose-400/[0.05] px-3 py-3 text-left text-xs font-semibold text-rose-300"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  navigateTo("admin");
                  setMobileMenuOpen(false);
                }}
                className="flex min-h-12 items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/[0.06] px-3 py-3 text-left text-xs font-semibold text-violet-200"
              >
                <Shield className="h-4 w-4" />
                Admin Dashboard
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
