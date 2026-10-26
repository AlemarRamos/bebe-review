import React from 'react';
import { ExamAttempt, NursingPracticeId } from '../types';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import {
  PlayCircle,
  BookOpen,
  Bookmark,
  Award,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  History,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCode2,
  Layers,
  GraduationCap,
  ShieldCheck,
  Cloud,
  LogIn,
  ExternalLink,
  Database,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardProps {
  activeExam: ExamAttempt | null;
  history: ExamAttempt[];
  onStartExamMode: (mode: 'full_500' | 'np1' | 'np2' | 'np3' | 'np4' | 'np5') => void;
  onResumeActiveExam: () => void;
  onAbandonActiveExam: () => void;
  onReviewExam: (attempt: ExamAttempt) => void;
  onRetakeExam: () => void;
  onOpenStudyMode: () => void;
  onOpenBookmarks: () => void;
  onOpenAdmin: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activeExam,
  history,
  onStartExamMode,
  onResumeActiveExam,
  onAbandonActiveExam,
  onReviewExam,
  onRetakeExam,
  onOpenStudyMode,
  onOpenBookmarks,
  onOpenAdmin,
}) => {
  const { user, openLoginModal, openRegisterModal } = useAuth();
  const submittedAttempts = history.filter((h) => h.status === 'submitted');
  const totalCompleted = submittedAttempts.length;
  const latestAttempt = submittedAttempts[0] || null;

  const highestScore = submittedAttempts.reduce(
    (max, att) => (att.score ? Math.max(max, att.score.percentage) : max),
    0
  );

  const averageScore =
    totalCompleted > 0
      ? (
          submittedAttempts.reduce((sum, att) => sum + (att.score?.percentage || 0), 0) /
          totalCompleted
        ).toFixed(1)
      : '0';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              PHINMA EDUCATION · FINAL EXAMINATION
            </span>
            <span className="text-xs text-slate-500 font-medium">NUR 225_099: NURSING SEMINAR 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Nursing Pre-Board Table of Specifications System
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Full 500-item pre-board examination structured strictly according to the Table of Specification for Nursing Practice 1 through 5.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-teal-700">
            <GraduationCap className="w-4 h-4" />
            <span>TOP THE BOARD EXAM!</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => onStartExamMode('full_500')}
            className="w-full sm:w-auto px-5 py-3 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <PlayCircle className="w-5 h-5 group-hover:scale-105 transition-transform" />
            <span>Take Full 500-Item Exam</span>
          </button>
        </div>
      </div>

      {/* Cloud Account & Data Loss Protection Status Card */}
      {user ? (
        <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Data Loss Protection Active
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Cloud Synced
                </span>
              </div>
              <p className="text-xs text-emerald-900/90 mt-0.5">
                Connected as <strong>{user.displayName || user.email}</strong>. In-progress exams, scores, and bookmarks are backed up automatically.
              </p>
            </div>
          </div>

          <a
            href="https://console.firebase.google.com/project/ai-studio-applet-webapp-13a5c/firestore/databases/ai-studio-pnlenursingprebo-990415bd-9582-49ba-ab64-f8b181dbc5cb/data"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200/80 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
          >
            <Database className="w-3.5 h-3.5 text-emerald-700" />
            <span>Open Firestore Database</span>
            <ExternalLink className="w-3 h-3 text-emerald-600" />
          </a>
        </div>
      ) : (
        <div className="bg-teal-50/80 border border-teal-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-950 uppercase tracking-wider">
                  Prevent Exam Data Loss
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-200/60 text-teal-900 px-2 py-0.5 rounded-full">
                  Guest Session
                </span>
              </div>
              <p className="text-xs text-teal-900/90 mt-0.5 max-w-2xl leading-relaxed">
                Log in or create a student account to safeguard your 500-item pre-board scores, in-progress attempts, and bookmarks against accidental browser clears or device switches.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={openLoginModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={openRegisterModal}
              className="px-4 py-2.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-100/70 border border-teal-300 rounded-xl transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      )}

      {/* In-Progress Exam Alert Banner */}
      {activeExam && activeExam.status === 'in_progress' && (
        <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Unfinished Examination in Progress
                </span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded">
                  {activeExam.examTitle}
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                You have an active exam with{' '}
                <strong>
                  {Object.values(activeExam.userAnswers).filter(Boolean).length} / {activeExam.questions.length}
                </strong>{' '}
                questions answered. Your remaining time and selections are auto-saved.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onResumeActiveExam}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Resume Exam</span>
            </button>
            <button
              onClick={onAbandonActiveExam}
              className="px-3 py-2 text-xs font-medium text-amber-900 hover:bg-amber-100 rounded-lg transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Completed Attempts
            </span>
            <History className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {totalCompleted}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Across TOS examinations
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Latest Score
            </span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {latestAttempt?.score ? `${latestAttempt.score.percentage}%` : '—'}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {latestAttempt?.score
              ? `${latestAttempt.score.rawScore} / ${latestAttempt.totalQuestions} points`
              : 'No attempts recorded'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Best Score
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">
            {highestScore > 0 ? `${highestScore.toFixed(1)}%` : '—'}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Passing benchmark: 75%
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Average Score
            </span>
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {totalCompleted > 0 ? `${averageScore}%` : '—'}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Over {totalCompleted} completed attempts
          </span>
        </div>
      </div>

      {/* Official Table of Specification Modules (NP 1 to NP 5) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900">
                Table of Specification Modules (100 Items Each)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice the complete 500-question pre-board or drill individual 100-item Nursing Practice booklets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(NURSING_PRACTICES).map((p) => {
            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.title}
                    </span>
                    <span className="text-xs font-bold text-slate-600 tabular-nums">
                      {p.totalItems} Items
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {p.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {/* Subtopics Listing */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-200/80 mb-4">
                    {p.subtopics.map((subId) => {
                      const sub = SUBTOPIC_SPECIFICATIONS[subId];
                      return (
                        <div key={subId} className="flex items-center justify-between text-[11px] text-slate-600">
                          <span className="truncate max-w-[200px]">{sub.name}</span>
                          <span className="font-semibold tabular-nums text-slate-800">
                            {sub.itemCount} items ({sub.placementRange})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => onStartExamMode(p.id)}
                  className="w-full py-2 text-xs font-bold text-slate-800 bg-white hover:bg-teal-50 hover:text-teal-800 border border-slate-300 hover:border-teal-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PlayCircle className="w-4 h-4 text-teal-600" />
                  <span>Take {p.title} (100 Items)</span>
                </button>
              </div>
            );
          })}

          {/* Full 500-Item Card */}
          <div className="p-5 rounded-2xl border-2 border-teal-600 bg-teal-50/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-teal-700 text-white">
                  FULL PRE-BOARD
                </span>
                <span className="text-xs font-extrabold text-teal-800">
                  500 Items Total
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Complete Final Examination (NP 1 to NP 5)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Simulates the entire Philippine Nurse Licensure Examination across all 18 Table of Specifications subtopics.
              </p>

              <div className="text-xs text-slate-600 space-y-1 pt-3 border-t border-teal-200/60 mb-4">
                <div>• Exactly 500 multiple-choice questions</div>
                <div>• Realistic 600-minute simulation timer</div>
                <div>• Automatic scoring and subject mastery breakdown</div>
              </div>
            </div>

            <button
              onClick={() => onStartExamMode('full_500')}
              className="w-full py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Launch Full 500-Item Pre-Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={onOpenStudyMode}
          className="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-5 shadow-xs cursor-pointer transition-all hover:shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Study & Practice Mode
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Practice questions with instant rationales by Table of Specifications topic and difficulty.
          </p>
          <span className="text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Launch Study Mode <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={onOpenBookmarks}
          className="bg-white border border-slate-200 hover:border-rose-400 rounded-2xl p-5 shadow-xs cursor-pointer transition-all hover:shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-3 group-hover:scale-105 transition-transform">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Bookmarked Questions
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Review your flagged and bookmarked difficult nursing questions with clinical rationales.
          </p>
          <span className="text-xs font-bold text-rose-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            View Bookmarks <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={onOpenAdmin}
          className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-5 shadow-xs cursor-pointer transition-all hover:shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3 group-hover:scale-105 transition-transform">
            <FileCode2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Table of Specifications & SQL
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Inspect the Table of Specifications matrix, question bank validator, and export SQL packages.
          </p>
          <span className="text-xs font-bold text-slate-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            View TOS Matrix <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Examination History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold text-slate-900">
              Examination Attempt History
            </h2>
          </div>
        </div>

        {submittedAttempts.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            <p className="mb-3">No completed examinations recorded yet.</p>
            <button
              onClick={() => onStartExamMode('full_500')}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
            >
              Take Your First 500-Item Pre-Board Exam
            </button>
          </div>
        ) : (
          <div>
            {/* Mobile Cards (sm:hidden) */}
            <div className="sm:hidden space-y-3">
              {submittedAttempts.map((att) => {
                const passed = att.score?.passedBenchmark;
                return (
                  <div
                    key={att.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {att.examTitle}
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          {new Date(att.submittedAt || att.startedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          passed
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {passed ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        <span>{passed ? 'Passed' : 'Review'}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Score</span>
                        <span className="font-extrabold text-slate-800 tabular-nums">
                          {att.score?.rawScore || 0}/{att.totalQuestions}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Grade</span>
                        <span className="font-extrabold text-teal-800 tabular-nums">
                          {att.score?.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onReviewExam(att)}
                        className="py-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 text-center transition-colors cursor-pointer"
                      >
                        Review
                      </button>
                      <button
                        onClick={onRetakeExam}
                        className="py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 text-center transition-colors cursor-pointer"
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table (hidden sm:block) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Exam Title</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Percentage</th>
                    <th className="py-3 px-4">Benchmark Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submittedAttempts.map((att) => {
                    const passed = att.score?.passedBenchmark;
                    return (
                      <tr key={att.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {att.examTitle}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {new Date(att.submittedAt || att.startedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-extrabold text-slate-900 tabular-nums">
                          {att.score?.rawScore || 0} / {att.totalQuestions}
                        </td>
                        <td className="py-3 px-4 font-extrabold text-teal-800 tabular-nums">
                          {att.score?.percentage.toFixed(2)}%
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              passed
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {passed ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-amber-600" />}
                            <span>{passed ? 'Passed (≥ 75%)' : 'Needs Review (< 75%)'}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => onReviewExam(att)}
                            className="px-2.5 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-50 rounded border border-teal-200 transition-colors cursor-pointer"
                          >
                            Review Results
                          </button>
                          <button
                            onClick={onRetakeExam}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded border border-slate-300 transition-colors cursor-pointer"
                          >
                            Retake
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
