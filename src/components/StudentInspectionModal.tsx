import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  BookOpen,
  Calendar,
  Mail,
  ChevronRight,
  Loader2,
  FileText,
  Search,
} from 'lucide-react';
import { StudentRosterItem, ExamAttempt, NursingPracticeId } from '../types';
import { CloudStorageService } from '../services/cloudStorage';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import { generateTosExam, calculateTosExamScore } from '../data/questionGenerator';

interface StudentInspectionModalProps {
  student: StudentRosterItem | null;
  onClose: () => void;
}

export const StudentInspectionModal: React.FC<StudentInspectionModalProps> = ({
  student,
  onClose,
}) => {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState<ExamAttempt | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'mastery' | 'reviewsheet'>('overview');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [reviewSearch, setReviewSearch] = useState('');

  useEffect(() => {
    if (!student) return;

    let isMounted = true;
    const fetchAttempts = async () => {
      setLoading(true);
      try {
        const data = await CloudStorageService.getUserAttempts(student.id);
        if (!isMounted) return;
        setAttempts(data);
        if (data.length > 0) {
          // Select the latest submitted attempt or active attempt
          const first = data[0];
          // Rehydrate questions if needed
          if (!first.questions || first.questions.length === 0) {
            first.questions = generateTosExam(first.examMode, first.attemptNumber || 1, 0);
          }
          if (!first.score && first.status === 'submitted') {
            const timeSpent = first.timeAllocatedSeconds - first.timeRemainingSeconds;
            first.score = calculateTosExamScore(first.questions, first.userAnswers, timeSpent, 75);
          }
          setSelectedAttempt(first);
        }
      } catch (err) {
        console.error('Failed to load student attempts:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAttempts();
    return () => {
      isMounted = false;
    };
  }, [student]);

  if (!student) return null;

  const handleSelectAttempt = (att: ExamAttempt) => {
    if (!att.questions || att.questions.length === 0) {
      att.questions = generateTosExam(att.examMode, att.attemptNumber || 1, 0);
    }
    if (!att.score && att.status === 'submitted') {
      const timeSpent = att.timeAllocatedSeconds - att.timeRemainingSeconds;
      att.score = calculateTosExamScore(att.questions, att.userAnswers, timeSpent, 75);
    }
    setSelectedAttempt(att);
    setActiveTab('overview');
  };

  // Category mastery calculations
  const practiceMastery = selectedAttempt?.score?.practiceScores || null;

  // Filter review sheet questions
  const filteredQuestions = selectedAttempt
    ? selectedAttempt.questions.filter((q, idx) => {
        const userChoice = selectedAttempt.userAnswers[idx];
        const isCorrect = userChoice === q.correctOption;

        if (reviewFilter === 'incorrect' && isCorrect) return false;
        if (reviewFilter === 'correct' && !isCorrect) return false;

        if (reviewSearch.trim()) {
          const s = reviewSearch.toLowerCase();
          return (
            q.questionText.toLowerCase().includes(s) ||
            q.topic.toLowerCase().includes(s) ||
            q.rationale.core.toLowerCase().includes(s)
          );
        }

        return true;
      })
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 relative border-b border-teal-900/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center text-lg font-bold">
                {student.photoURL ? (
                  <img
                    src={student.photoURL}
                    alt={student.displayName}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {student.displayName}
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      student.hasPassed
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {student.hasPassed ? 'Passed (≥75%)' : 'Needs Review'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-0.5 font-medium">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-teal-400" />
                    {student.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    Registered: {new Date(student.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick stats badge */}
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-2.5 px-4 backdrop-blur-xs border border-white/10">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-teal-300 block">Attempts</span>
                <span className="text-base font-extrabold text-white tabular-nums">
                  {attempts.length}
                </span>
              </div>
              <div className="w-px h-7 bg-white/20" />
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-teal-300 block">Highest</span>
                <span className="text-base font-extrabold text-emerald-400 tabular-nums">
                  {student.highestScore !== undefined ? `${student.highestScore.toFixed(1)}%` : '—'}
                </span>
              </div>
              <div className="w-px h-7 bg-white/20" />
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-teal-300 block">Latest</span>
                <span className="text-base font-extrabold text-teal-200 tabular-nums">
                  {student.latestScore !== undefined ? `${student.latestScore.toFixed(1)}%` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <span className="text-xs font-semibold">Retrieving student examination attempts and review sheets...</span>
          </div>
        ) : attempts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs space-y-2">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-sm text-slate-800">No Exam Attempts Recorded</p>
            <p className="text-slate-500 max-w-sm mx-auto">
              This candidate has registered their account but has not yet finalized any practice or 500-item pre-board examinations.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Sidebar: Attempt Selector */}
            <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-3 sm:p-4 overflow-y-auto space-y-2 shrink-0 max-h-48 md:max-h-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block">
                Recorded Attempts ({attempts.length})
              </span>
              {attempts.map((att) => {
                const isSelected = selectedAttempt?.id === att.id;
                const isPassed = att.score ? att.score.percentage >= 75 : false;
                return (
                  <button
                    key={att.id}
                    onClick={() => handleSelectAttempt(att)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Attempt #{att.attemptNumber || 1}
                      </span>
                      <span className={`text-xs font-black tabular-nums ${
                        isSelected
                          ? 'text-white'
                          : isPassed
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}>
                        {att.score ? `${att.score.percentage.toFixed(1)}%` : att.status}
                      </span>
                    </div>

                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {att.examTitle}
                    </p>

                    <div className={`flex items-center justify-between text-[11px] mt-1 ${
                      isSelected ? 'text-teal-100' : 'text-slate-400'
                    }`}>
                      <span>{new Date(att.submittedAt || att.startedAt).toLocaleDateString()}</span>
                      <span>{att.totalQuestions} items</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 px-6 pt-3 bg-white shrink-0">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'border-teal-700 text-teal-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Score Breakdown</span>
                </button>

                <button
                  onClick={() => setActiveTab('mastery')}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'mastery'
                      ? 'border-teal-700 text-teal-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Category Mastery (NP 1–5)</span>
                </button>

                <button
                  onClick={() => setActiveTab('reviewsheet')}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'reviewsheet'
                      ? 'border-teal-700 text-teal-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Question Review Sheets</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
                {selectedAttempt && activeTab === 'overview' && (
                  <div className="space-y-5">
                    {/* Overall Score Summary Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {selectedAttempt.examTitle}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <h3 className="text-2xl font-black text-slate-900 tabular-nums">
                            {selectedAttempt.score?.percentage.toFixed(2)}%
                          </h3>
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${
                              (selectedAttempt.score?.percentage ?? 0) >= 75
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {(selectedAttempt.score?.percentage ?? 0) >= 75 ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Passed Benchmark (≥75%)
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                Needs Review (&lt;75%)
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Correct</span>
                          <span className="text-base font-black text-emerald-700 tabular-nums">
                            {selectedAttempt.score?.correctCount || 0}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Incorrect</span>
                          <span className="text-base font-black text-rose-700 tabular-nums">
                            {selectedAttempt.score?.incorrectCount || 0}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Items</span>
                          <span className="text-base font-black text-slate-900 tabular-nums">
                            {selectedAttempt.totalQuestions}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nursing Practices Quick Progress Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {Object.values(NURSING_PRACTICES).map((np) => {
                        const pScore = practiceMastery ? practiceMastery[np.id] : null;
                        const pct = pScore ? pScore.percentage : 0;
                        const passed = pct >= 75;

                        return (
                          <div
                            key={np.id}
                            className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col justify-between"
                          >
                            <div>
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded text-white inline-block mb-1.5"
                                style={{ backgroundColor: np.color }}
                              >
                                {np.title}
                              </span>
                              <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                                {np.shortTitle}
                              </h4>
                            </div>

                            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-xs font-black text-slate-900 tabular-nums">
                                {pct.toFixed(1)}%
                              </span>
                              <span className={`text-[10px] font-bold ${passed ? 'text-emerald-700' : 'text-amber-700'}`}>
                                {passed ? 'Passed' : 'Deficit'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Category Mastery Tab */}
                {selectedAttempt && activeTab === 'mastery' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500">
                      Evaluated mastery per Table of Specifications Nursing Practice booklet and specific subtopics:
                    </p>

                    <div className="space-y-4">
                      {Object.values(NURSING_PRACTICES).map((np) => {
                        const pScore = practiceMastery ? practiceMastery[np.id] : null;
                        const pct = pScore ? pScore.percentage : 0;
                        const isPassed = pct >= 75;

                        return (
                          <div
                            key={np.id}
                            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-xs font-bold px-2.5 py-1 rounded text-white"
                                  style={{ backgroundColor: np.color }}
                                >
                                  {np.title}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900">
                                  {np.shortTitle}
                                </h4>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-500 font-medium">
                                  {pScore ? `${pScore.correctAnswers} / ${pScore.totalQuestions} items` : '—'}
                                </span>
                                <span className={`text-sm font-extrabold tabular-nums ${
                                  isPassed ? 'text-emerald-700' : 'text-amber-700'
                                }`}>
                                  {pct.toFixed(1)}%
                                </span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  isPassed ? 'bg-emerald-600' : 'bg-amber-500'
                                }`}
                                style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                              />
                            </div>

                            {/* Subtopics */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                              {np.subtopics.map((sId) => {
                                const subInfo = SUBTOPIC_SPECIFICATIONS[sId];
                                const subScore = pScore?.subtopicScores ? pScore.subtopicScores[sId] : null;
                                const subPct = subScore ? subScore.percentage : 0;

                                return (
                                  <div
                                    key={sId}
                                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between"
                                  >
                                    <div className="truncate max-w-[200px]">
                                      <span className="font-semibold text-slate-800 block truncate">
                                        {subInfo.name}
                                      </span>
                                      <span className="text-[10px] text-slate-400">
                                        {subInfo.placementRange} ({subInfo.itemCount} items)
                                      </span>
                                    </div>
                                    <span className={`font-bold tabular-nums shrink-0 ${
                                      subPct >= 75 ? 'text-emerald-700' : 'text-amber-700'
                                    }`}>
                                      {subPct.toFixed(0)}%
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Question Review Sheet Tab */}
                {selectedAttempt && activeTab === 'reviewsheet' && (
                  <div className="space-y-4">
                    {/* Filter and search bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-1.5 w-full sm:w-auto">
                        <button
                          onClick={() => setReviewFilter('all')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            reviewFilter === 'all'
                              ? 'bg-teal-700 text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          All Items ({selectedAttempt.questions.length})
                        </button>
                        <button
                          onClick={() => setReviewFilter('incorrect')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            reviewFilter === 'incorrect'
                              ? 'bg-rose-600 text-white'
                              : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                          }`}
                        >
                          Incorrect Only ({selectedAttempt.score?.incorrectCount || 0})
                        </button>
                        <button
                          onClick={() => setReviewFilter('correct')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            reviewFilter === 'correct'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                          }`}
                        >
                          Correct ({selectedAttempt.score?.correctCount || 0})
                        </button>
                      </div>

                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search rationales, items..."
                          value={reviewSearch}
                          onChange={(e) => setReviewSearch(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    {/* Question List */}
                    <div className="space-y-4">
                      {filteredQuestions.map((q, idx) => {
                        const originalIndex = selectedAttempt.questions.findIndex((item) => item.id === q.id);
                        const userChoice = selectedAttempt.userAnswers[originalIndex];
                        const isCorrect = userChoice === q.correctOption;

                        return (
                          <div
                            key={q.id}
                            className={`p-5 rounded-2xl border transition-all ${
                              isCorrect
                                ? 'bg-white border-slate-200'
                                : 'bg-rose-50/20 border-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                  Item #{q.itemNumber} (NP {q.npItemNumber})
                                </span>
                                <span className="text-xs font-semibold text-slate-500">
                                  {q.topic}
                                </span>
                              </div>

                              <span
                                className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                                  isCorrect
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                              </span>
                            </div>

                            <p className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed">
                              {q.questionText}
                            </p>

                            {/* Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                              {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                                const isKeyCorrect = q.correctOption === optKey;
                                const isUserSelected = userChoice === optKey;

                                let optClasses = 'border-slate-200 bg-slate-50/70 text-slate-700';
                                if (isKeyCorrect) {
                                  optClasses = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold';
                                } else if (isUserSelected && !isKeyCorrect) {
                                  optClasses = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold';
                                }

                                return (
                                  <div
                                    key={optKey}
                                    className={`p-2.5 rounded-xl border flex items-start gap-2 ${optClasses}`}
                                  >
                                    <span
                                      className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                                        isKeyCorrect
                                          ? 'bg-emerald-600 text-white'
                                          : isUserSelected
                                          ? 'bg-rose-600 text-white'
                                          : 'bg-slate-200 text-slate-700'
                                      }`}
                                    >
                                      {optKey}
                                    </span>
                                    <span className="pt-0.5 leading-snug">
                                      {q.options[optKey]}
                                      {isUserSelected && (
                                        <span className="ml-1.5 text-[10px] font-bold uppercase underline">
                                          (Student Choice)
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Clinical Rationale Box */}
                            <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950 text-xs space-y-1">
                              <span className="font-bold text-teal-900 block">
                                Clinical Rationale & Teaching Points:
                              </span>
                              <p className="leading-relaxed">
                                <strong>Core Concept:</strong> {q.rationale.core}
                              </p>
                              <p className="leading-relaxed">
                                <strong>Why Correct:</strong> {q.rationale.whyCorrect}
                              </p>
                              <span className="text-[10px] text-slate-500 block pt-1">
                                Reference: {q.reference}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
