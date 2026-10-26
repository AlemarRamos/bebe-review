import React, { useState, useEffect } from 'react';
import { ExamAttempt } from './types';
import { StorageService } from './utils/storage';
import { generateTosExam, calculateTosExamScore } from './data/questionGenerator';
import { NURSING_PRACTICES } from './data/tableOfSpecifications';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExamScreen } from './components/ExamScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { StudyMode } from './components/StudyMode';
import { BookmarksView } from './components/BookmarksView';
import { AdminPanel } from './components/AdminPanel';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { CloudStorageService } from './services/cloudStorage';
import { CheckCircle2, X } from 'lucide-react';

interface ConfirmDialogState {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'exam' | 'results' | 'study' | 'bookmarks' | 'admin'>('dashboard');
  const [activeExam, setActiveExam] = useState<ExamAttempt | null>(null);
  const [history, setHistory] = useState<ExamAttempt[]>([]);
  const [selectedResultAttempt, setSelectedResultAttempt] = useState<ExamAttempt | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  const { user, syncNotice, dismissSyncNotice } = useAuth();

  // Load initial local data
  useEffect(() => {
    const savedActive = StorageService.getActiveExam();
    const savedHistory = StorageService.getExamHistory();
    if (savedActive) {
      setActiveExam(savedActive);
    }
    setHistory(savedHistory);
  }, []);

  // When user signs in, load any cloud attempts and merge with local state
  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const fetchCloudData = async () => {
      try {
        const cloudAttempts = await CloudStorageService.getUserAttempts(user.uid);
        if (!isMounted) return;

        if (cloudAttempts.length > 0) {
          const localHistory = StorageService.getExamHistory();
          // Merge unique by ID
          const existingIds = new Set(localHistory.map((h) => h.id));
          const newFromCloud = cloudAttempts.filter((ca) => !existingIds.has(ca.id));

          if (newFromCloud.length > 0) {
            const merged = [...localHistory, ...newFromCloud].sort(
              (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
            );
            merged.forEach((item) => StorageService.saveExamToHistory(item));
            setHistory(merged);
          }
        }
      } catch (e) {
        console.error('Error loading cloud history:', e);
      }
    };

    fetchCloudData();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const createAndLaunchExam = (
    mode: 'full_500' | 'np1' | 'np2' | 'np3' | 'np4' | 'np5',
    retakeModifier: number
  ) => {
    const nextAttemptNumber = history.length + 1;
    const questions = generateTosExam(mode, nextAttemptNumber, retakeModifier);

    const isFull = mode === 'full_500';
    const totalQuestions = questions.length; // 500 or 100
    const timeMinutes = isFull ? 600 : 120; // 600 mins for 500 items; 120 mins for 100 items

    const examTitle = isFull
      ? 'NUR 225_099: Nursing Seminar 1 - Full 500-Item Pre-Board Exam'
      : `${NURSING_PRACTICES[mode].title}: ${NURSING_PRACTICES[mode].shortTitle} (100 Items)`;

    const studentName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'Juan Dela Cruz, BSN Candidate');

    const newAttempt: ExamAttempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      attemptNumber: nextAttemptNumber,
      studentName,
      totalQuestions,
      examMode: mode,
      examTitle,
      questions,
      userAnswers: {},
      flaggedQuestions: {},
      timeAllocatedSeconds: timeMinutes * 60,
      timeRemainingSeconds: timeMinutes * 60,
      startedAt: new Date().toISOString(),
      submittedAt: null,
      status: 'in_progress',
    };

    setActiveExam(newAttempt);
    StorageService.saveActiveExam(newAttempt);

    // If student is logged in, sync to cloud
    if (user) {
      CloudStorageService.saveExamAttempt(user.uid, newAttempt).catch((err) =>
        console.warn('Background cloud save:', err)
      );
    }

    setActiveTab('exam');
  };

  // Start an exam: full 500 items or individual NP booklet (100 items)
  const handleStartExamMode = (
    mode: 'full_500' | 'np1' | 'np2' | 'np3' | 'np4' | 'np5',
    retakeModifier: number = 0
  ) => {
    if (activeExam && activeExam.status === 'in_progress') {
      setConfirmDialog({
        title: 'Ongoing Examination Found',
        message:
          'You have an in-progress examination attempt. Starting a new examination will discard your current progress. Do you wish to proceed and start fresh?',
        confirmLabel: 'Start Fresh',
        isDestructive: true,
        onConfirm: () => createAndLaunchExam(mode, retakeModifier),
      });
      return;
    }

    createAndLaunchExam(mode, retakeModifier);
  };

  // Retake Examination with fresh question variants
  const handleRetakeExam = () => {
    const currentMode = selectedResultAttempt?.examMode || activeExam?.examMode || 'full_500';

    setConfirmDialog({
      title: 'Begin Retake Examination?',
      message:
        'The system will generate a fresh set of questions testing equivalent learning objectives and concepts from the Table of Specifications with recalculated option keys.',
      confirmLabel: 'Begin Retake',
      isDestructive: false,
      onConfirm: () => {
        handleStartExamMode(currentMode, Math.floor(Math.random() * 20) + 1);
      },
    });
  };

  const handleResumeActiveExam = () => {
    if (activeExam) {
      setActiveTab('exam');
    }
  };

  const handleAbandonActiveExam = () => {
    setConfirmDialog({
      title: 'Discard Unfinished Examination?',
      message:
        'Are you sure you want to discard your unfinished examination attempt? All recorded selections will be cleared from this browser session.',
      confirmLabel: 'Discard Attempt',
      isDestructive: true,
      onConfirm: () => {
        StorageService.clearActiveExam();
        setActiveExam(null);
      },
    });
  };

  const handleUpdateAttempt = (updated: ExamAttempt) => {
    setActiveExam(updated);
    StorageService.saveActiveExam(updated);

    // Sync progress to cloud if logged in
    if (user) {
      CloudStorageService.saveExamAttempt(user.uid, updated).catch((err) =>
        console.warn('Background sync error:', err)
      );
    }
  };

  const handleSubmitAttempt = (attempt: ExamAttempt) => {
    const timeSpent = attempt.timeAllocatedSeconds - attempt.timeRemainingSeconds;
    const score = calculateTosExamScore(attempt.questions, attempt.userAnswers, timeSpent, 75);

    const completedAttempt: ExamAttempt = {
      ...attempt,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      score,
    };

    StorageService.saveExamToHistory(completedAttempt);
    StorageService.clearActiveExam();
    setActiveExam(null);

    // Secure attempt to cloud
    if (user) {
      CloudStorageService.saveExamAttempt(user.uid, completedAttempt).catch((err) =>
        console.warn('Cloud submit sync error:', err)
      );
    }

    const updatedHistory = StorageService.getExamHistory();
    setHistory(updatedHistory);

    setSelectedResultAttempt(completedAttempt);
    setActiveTab('results');
  };

  const handleReviewExam = (attempt: ExamAttempt) => {
    // If questions array is empty (e.g. loaded from cloud summary), generate questions for review
    if (!attempt.questions || attempt.questions.length === 0) {
      const rehydratedQuestions = generateTosExam(attempt.examMode, attempt.attemptNumber || 1, 0);
      attempt = { ...attempt, questions: rehydratedQuestions };
    }
    setSelectedResultAttempt(attempt);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Cloud Sync Toast Notification */}
      {syncNotice && (
        <div className="bg-teal-900 text-white text-xs py-2 px-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{syncNotice}</span>
          </div>
          <button
            onClick={dismissSyncNotice}
            className="text-teal-200 hover:text-white p-1 rounded hover:bg-teal-800 transition-colors cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'exam' && !activeExam) {
            handleStartExamMode('full_500');
          } else {
            setActiveTab(tab);
          }
        }}
        hasActiveExam={!!activeExam && activeExam.status === 'in_progress'}
        activeExamQuestionCount={activeExam?.questions.length || 500}
      />

      <PWAInstallBanner />
      <OfflineIndicator />
      <AuthModal />

      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <Dashboard
            activeExam={activeExam}
            history={history}
            onStartExamMode={(mode) => handleStartExamMode(mode, 0)}
            onResumeActiveExam={handleResumeActiveExam}
            onAbandonActiveExam={handleAbandonActiveExam}
            onReviewExam={handleReviewExam}
            onRetakeExam={handleRetakeExam}
            onOpenStudyMode={() => setActiveTab('study')}
            onOpenBookmarks={() => setActiveTab('bookmarks')}
            onOpenAdmin={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'exam' && activeExam && (
          <ExamScreen
            attempt={activeExam}
            onUpdateAttempt={handleUpdateAttempt}
            onSubmitAttempt={handleSubmitAttempt}
            onExitToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'results' && selectedResultAttempt && (
          <ResultsScreen
            attempt={selectedResultAttempt}
            onRetakeExam={handleRetakeExam}
            onReturnToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'study' && <StudyMode />}

        {activeTab === 'bookmarks' && <BookmarksView />}

        {activeTab === 'admin' && <AdminPanel />}
      </main>

      {/* Mobile Bottom Navigation Bar (Visible on mobile/tablet outside exam mode) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasActiveExam={!!activeExam && activeExam.status === 'in_progress'}
        activeExamQuestionCount={activeExam?.questions.length || 500}
      />

      <footer className="bg-white border-t border-slate-200 py-6 mb-16 md:mb-0 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} PHINMA EDUCATION · NUR 225_099: Nursing Seminar 1 · Table of Specification Examination System.
          </p>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-teal-800">
            <span>Nursing Practice 1 – 5</span>
            <span>·</span>
            <span>500 Total Multiple-Choice Items</span>
            <span>·</span>
            <span>TOP THE BOARD EXAM!</span>
          </div>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {confirmDialog.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {confirmDialog.message}
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                {confirmDialog.cancelLabel || 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const action = confirmDialog.onConfirm;
                  setConfirmDialog(null);
                  action();
                }}
                className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-xs transition-colors cursor-pointer ${
                  confirmDialog.isDestructive
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                    : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
                }`}
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
