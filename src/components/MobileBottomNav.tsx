import React from 'react';
import { BarChart3, PlayCircle, BookOpen, Bookmark, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MobileBottomNavProps {
  activeTab: 'dashboard' | 'exam' | 'results' | 'study' | 'bookmarks' | 'admin';
  setActiveTab: (tab: 'dashboard' | 'exam' | 'results' | 'study' | 'bookmarks' | 'admin') => void;
  hasActiveExam: boolean;
  activeExamQuestionCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  hasActiveExam,
  activeExamQuestionCount,
}) => {
  const { isAdmin } = useAuth();
  // During an active examination session, hide general tabs to avoid accidental abandonment,
  // or allow quick switching if the user wants to consult bookmarks
  if (activeTab === 'exam') {
    return null; // ExamScreen provides its own dedicated mobile sticky action bar
  }

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Home',
      icon: BarChart3,
    },
    {
      id: 'exam' as const,
      label: hasActiveExam ? 'Resume' : '500 Exam',
      icon: PlayCircle,
      badge: hasActiveExam ? `${activeExamQuestionCount}` : undefined,
      isSpecial: true,
    },
    {
      id: 'study' as const,
      label: 'Study',
      icon: BookOpen,
    },
    {
      id: 'bookmarks' as const,
      label: 'Saved',
      icon: Bookmark,
    },
    {
      id: 'admin' as const,
      label: isAdmin ? 'Admin' : 'TOS Matrix',
      icon: ShieldCheck,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1 safe-area-inset-bottom"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-teal-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-teal-700 stroke-[2.4]' : 'text-slate-500'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-amber-500 text-white text-[9px] font-extrabold rounded-full leading-tight shadow-xs animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-teal-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
