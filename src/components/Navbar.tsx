import React from 'react';
import { UserProfile, AppViewMode } from '../types';
import { Shield, Compass, LayoutDashboard, UploadCloud, User, ArrowRight, ChevronDown, FolderOpen, Settings, LogOut, Sparkles } from 'lucide-react';

interface NavbarProps {
  appView: AppViewMode;
  setAppView: (view: AppViewMode) => void;
  currentUser: UserProfile | null;
  onOpenUpload: () => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  onOpenContactSales?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  appView,
  setAppView,
  currentUser,
  onOpenUpload,
  onOpenAuth,
  onOpenProfile,
  onLogout,
  isUserMenuOpen,
  setIsUserMenuOpen,
  onOpenContactSales,
}) => {
  return (
    <>
      {/* Top Global Announcement Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-indigo-100 text-xs py-2 px-4 border-b border-indigo-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 flex-wrap text-center">
          <span className="bg-indigo-600 text-white font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" /> New
          </span>
          <span>
            <strong>DocumentSense 2.5 is Live:</strong> Instant multiformat extraction with 99.4% accuracy on government and legal PDFs.
          </span>
          <button
            onClick={() => {
              setAppView('landing');
              const el = document.getElementById('demo-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-cyan-400 font-semibold hover:text-white inline-flex items-center gap-1 transition-colors underline cursor-pointer"
          >
            Try Live Sample <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => setAppView('landing')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">DocumentSense</span>
              <span className="bg-indigo-50 text-indigo-600 font-bold text-xs px-1.5 py-0.5 rounded border border-indigo-200/50">AI</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#how-it-works" onClick={() => setAppView('landing')} className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#demo-section" onClick={() => setAppView('landing')} className="hover:text-indigo-600 transition-colors">Interactive Demo</a>
            <a href="#features" onClick={() => setAppView('landing')} className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#security" onClick={() => setAppView('landing')} className="hover:text-indigo-600 transition-colors">Security</a>
            <a href="#pricing" onClick={() => setAppView('landing')} className="hover:text-indigo-600 transition-colors">Pricing</a>
            <button
              onClick={() => {
                if (onOpenContactSales) {
                  onOpenContactSales();
                }
              }}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors cursor-pointer"
            >
              Contact Sales
            </button>
          </nav>

          {/* Actions: View Mode Switcher, Upload, Auth */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle Pill */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 text-xs font-semibold">
              <button
                onClick={() => setAppView('landing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  appView === 'landing' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Overview</span>
              </button>
              <button
                onClick={() => setAppView('app')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  appView === 'app' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>SaaS App</span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1 rounded-full font-bold">Live</span>
              </button>
            </div>

            {/* Quick Upload CTA */}
            <button
              onClick={onOpenUpload}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-indigo-600" />
              <span>Upload</span>
            </button>

            {/* Auth State */}
            {currentUser ? (
              <div className="relative flex items-center gap-1.5">
                {/* Direct User Profile Click Button */}
                <button
                  onClick={onOpenProfile}
                  className="user-profile-btn flex items-center gap-2 bg-white hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-full py-1 pl-1 pr-3 transition-all shadow-xs cursor-pointer group"
                  title="Click to show User Profile & Account Settings"
                  aria-label="Show User Profile"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-white font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      currentUser.initials
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors hidden sm:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-bold bg-indigo-50 group-hover:bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full border border-indigo-100 hidden md:inline">
                    Profile
                  </span>
                </button>

                {/* Account Menu Dropdown Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="user-profile-btn w-7 h-7 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="More account options"
                  aria-label="Account options menu"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isUserMenuOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="user-dropdown-menu absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-sm animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="font-semibold text-slate-900">{currentUser.name}</div>
                      <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {currentUser.plan}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onOpenProfile();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-indigo-50/70 flex items-center gap-2.5 text-indigo-700 font-semibold cursor-pointer border-b border-slate-100 group"
                    >
                      <User className="w-4 h-4 text-indigo-600 shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <div>Show User Profile</div>
                        <div className="text-[10px] text-indigo-500 font-normal">Account, stats, persona & plan</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setAppView('app');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>Workspace Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setAppView('app');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4 text-slate-400" />
                      <span>My Documents</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenProfile();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Security & Profile Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (onOpenContactSales) {
                          onOpenContactSales();
                        }
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-50/60 flex items-center gap-2.5 text-indigo-700 font-semibold cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Contact Enterprise Sales</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Guest Profile click to show profile */}
                <button
                  onClick={onOpenProfile}
                  className="user-profile-btn flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50/60 rounded-lg border border-slate-200 hover:border-indigo-300 shadow-xs transition-all cursor-pointer group"
                  title="Click to show User Profile & Preferences"
                >
                  <User className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/30 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Register</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
