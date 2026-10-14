import { Award, LogOut, Menu, Shield, Sparkles, Upload, UserCheck, X } from 'lucide-react';
import { DatriqLogo, CollegeLogoBadge } from './pages/components.jsx';

export function Navbar({
  activePage,
  branding,
  navItems,
  currentUser,
  mobileMenuOpen,
  setMobileMenuOpen,
  userDropdownOpen,
  setUserDropdownOpen,
  setLogoUploadModalOpen,
  setIsAdminMode,
  setMemberIdCardModalOpen,
  setCurrentUser,
  showNotification,
  navigateTo
}) {
  return (
    <>
      {/* Top Institutional Sub-Header Bar */}
      <div className="relative z-30 bg-[#03060E] border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold text-[11px]">
              <Sparkles className="w-3 h-3" /> Official Tech Community
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="font-medium text-slate-200">
              St. Joseph's University — DATRIQ Data Science Club
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLogoUploadModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
            >
              <Upload className="w-3 h-3" /> Upload Official Logos
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => {
                setIsAdminMode(true);
                navigateTo('admin');
              }}
              className={`flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-md transition-all ${
                activePage === 'admin'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 border border-purple-500/30'
              }`}
            >
              <Shield className="w-3 h-3" /> Admin Management System
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#060B19]/90 border-b border-cyan-500/15 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Dual Brand Logos: DATRIQ + St. Joseph's University */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div onClick={() => navigateTo('home')} className="cursor-pointer">
              <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="sm" showTagline={true} />
            </div>
            <div className="hidden md:block h-8 w-[1px] bg-slate-800" />
            <div className="hidden sm:block">
              <CollegeLogoBadge
                customCollegeLogoUrl={branding.collegeLogoUrl}
                onOpenUploadModal={() => setLogoUploadModalOpen(true)}
                size="sm"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              if (item.id === 'join') {
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`ml-1 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/15'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Logged-In Profile Avatar Dropdown & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-all"
                >
                  {currentUser.photoUrl ? (
                    <img
                      src={currentUser.photoUrl}
                      alt={currentUser.fullName}
                      className="w-7 h-7 rounded-full object-cover border border-cyan-400"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold text-slate-950">
                      {currentUser.fullName?.charAt(0) || 'M'}
                    </div>
                  )}
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-white leading-none">
                      {currentUser.fullName.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-cyan-400 leading-tight">{currentUser.role || 'Member'}</p>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0B132B] border border-cyan-500/30 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-800">
                      <p className="text-sm font-bold text-white truncate">{currentUser.fullName}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        ID: {currentUser.rollNumber}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('profile');
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-200 hover:bg-slate-800/80 flex items-center gap-2.5"
                    >
                      <UserCheck className="w-4 h-4 text-cyan-400" /> My Profile & Registered Events
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setMemberIdCardModalOpen(true);
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-200 hover:bg-slate-800/80 flex items-center gap-2.5"
                    >
                      <Award className="w-4 h-4 text-purple-400" /> Digital Membership ID Card
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('admin');
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-200 hover:bg-slate-800/80 flex items-center gap-2.5"
                    >
                      <Shield className="w-4 h-4 text-emerald-400" /> Admin Management Portal
                    </button>
                    <div className="border-t border-slate-800 my-1" />
                    <button
                      onClick={() => {
                        setCurrentUser(null);
                        setUserDropdownOpen(false);
                        showNotification('Logged out safely.', 'info');
                        navigateTo('home');
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-semibold text-red-400 hover:bg-red-950/30 flex items-center gap-2.5"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#080F24] border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-3">
            <div className="pb-2 border-b border-slate-800 flex items-center justify-between">
              <CollegeLogoBadge
                customCollegeLogoUrl={branding.collegeLogoUrl}
                onOpenUploadModal={() => {
                  setMobileMenuOpen(false);
                  setLogoUploadModalOpen(true);
                }}
                size="sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                    activePage === item.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigateTo('admin')}
                className="px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" /> Admin Dashboard
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
