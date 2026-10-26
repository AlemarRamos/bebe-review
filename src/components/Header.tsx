import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Bookmark,
  ShieldCheck,
  PlayCircle,
  BarChart3,
  User,
  LogOut,
  LogIn,
  CheckCircle2,
  ChevronDown,
  Cloud,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeTab: 'dashboard' | 'exam' | 'results' | 'study' | 'bookmarks' | 'admin';
  setActiveTab: (tab: 'dashboard' | 'exam' | 'results' | 'study' | 'bookmarks' | 'admin') => void;
  hasActiveExam: boolean;
  activeExamQuestionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasActiveExam,
  activeExamQuestionCount,
}) => {
  const { user, openLoginModal, openRegisterModal, logout, isSyncing } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'BS';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-14 sm:h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer min-w-0 shrink"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-xs shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-base font-extrabold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors truncate block">
                PNLE Pre-Board Master
              </span>
              <span className="text-[9px] sm:text-[11px] text-slate-500 truncate block leading-tight font-medium">
                NUR 225_099 · 500 TOS Items
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dashboard' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('exam')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 relative cursor-pointer ${
                activeTab === 'exam' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>500-Item Exam</span>
              {hasActiveExam && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-0.5" title="Exam in progress" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('study')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'study' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Study Mode</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'bookmarks' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'admin' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>TOS Matrix</span>
            </button>
          </nav>

          {/* Zone 3: Actions & User Authentication */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Exam Action Button */}
            {hasActiveExam ? (
              <button
                onClick={() => setActiveTab('exam')}
                className="px-2 sm:px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg sm:rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resume Exam ({activeExamQuestionCount})</span>
                <span className="sm:hidden">Resume</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('exam')}
                className="hidden lg:flex px-3 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 items-center gap-1 cursor-pointer"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>500-Item Exam</span>
              </button>
            )}

            {/* Auth Zone: Sign In / Register OR User Profile */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-white hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Candidate'}
                      className="w-7 h-7 rounded-full object-cover border border-teal-500/30 shrink-0"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {getInitials(user.displayName, user.email)}
                    </div>
                  )}

                  <div className="hidden sm:block text-left min-w-0 max-w-[110px]">
                    <span className="text-xs font-bold text-slate-800 truncate block leading-tight">
                      {user.displayName || 'Student'}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 leading-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {isSyncing ? 'Syncing...' : 'Cloud Saved'}
                    </span>
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 bg-slate-50 rounded-xl mb-1 border border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user.displayName || 'BSN Candidate'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {user.email}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cloud Data Loss Guard Active</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In / Register</span>
                  <span className="sm:hidden">Log In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
