import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ExamAttempt, Question } from '../types';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import { ExamNavigator } from './ExamNavigator';
import { StorageService } from '../utils/storage';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Send,
  Grid,
  CheckCircle2,
  AlertTriangle,
  Bookmark as BookmarkIcon,
  Pause,
  Play
} from 'lucide-react';

interface ExamScreenProps {
  attempt: ExamAttempt;
  onUpdateAttempt: (updated: ExamAttempt) => void;
  onSubmitAttempt: (attempt: ExamAttempt) => void;
  onExitToDashboard: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  attempt,
  onUpdateAttempt,
  onSubmitAttempt,
  onExitToDashboard,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showNavigatorDrawer, setShowNavigatorDrawer] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  const currentQuestion: Question | undefined = attempt.questions[currentIndex];
  const totalQuestions = attempt.questions.length;

  // Current answer & flag
  const selectedOption = attempt.userAnswers[currentIndex] ?? null;
  const isFlagged = !!attempt.flaggedQuestions[currentIndex];
  const isBookmarked = currentQuestion ? StorageService.isQuestionBookmarked(currentQuestion.id) : false;

  // Answered & unanswered counts
  const answeredCount = useMemo(() => {
    return Object.values(attempt.userAnswers).filter((v) => v !== null && v !== undefined).length;
  }, [attempt.userAnswers]);

  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = useMemo(() => {
    return Object.values(attempt.flaggedQuestions).filter(Boolean).length;
  }, [attempt.flaggedQuestions]);

  // Timer countdown
  useEffect(() => {
    if (isTimerPaused || attempt.status === 'submitted') return;

    const interval = setInterval(() => {
      if (attempt.timeRemainingSeconds <= 1) {
        clearInterval(interval);
        handleSubmitFinal();
      } else {
        const nextTime = attempt.timeRemainingSeconds - 1;
        const updated: ExamAttempt = {
          ...attempt,
          timeRemainingSeconds: nextTime,
        };
        onUpdateAttempt(updated);
        if (nextTime % 5 === 0) {
          StorageService.saveActiveExam(updated);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [attempt, isTimerPaused]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Answer selection
  const handleSelectOption = useCallback(
    (option: 'A' | 'B' | 'C' | 'D') => {
      setSaveStatus('saving');
      const updatedAnswers = {
        ...attempt.userAnswers,
        [currentIndex]: option,
      };
      const updatedAttempt: ExamAttempt = {
        ...attempt,
        userAnswers: updatedAnswers,
      };
      onUpdateAttempt(updatedAttempt);
      StorageService.saveActiveExam(updatedAttempt);
      setTimeout(() => setSaveStatus('saved'), 150);
    },
    [attempt, currentIndex, onUpdateAttempt]
  );

  // Clear answer
  const handleClearAnswer = useCallback(() => {
    setSaveStatus('saving');
    const updatedAnswers = { ...attempt.userAnswers };
    delete updatedAnswers[currentIndex];
    const updatedAttempt: ExamAttempt = {
      ...attempt,
      userAnswers: updatedAnswers,
    };
    onUpdateAttempt(updatedAttempt);
    StorageService.saveActiveExam(updatedAttempt);
    setTimeout(() => setSaveStatus('saved'), 150);
  }, [attempt, currentIndex, onUpdateAttempt]);

  // Flag toggle
  const handleToggleFlag = useCallback(() => {
    const updatedFlags = {
      ...attempt.flaggedQuestions,
      [currentIndex]: !isFlagged,
    };
    const updatedAttempt: ExamAttempt = {
      ...attempt,
      flaggedQuestions: updatedFlags,
    };
    onUpdateAttempt(updatedAttempt);
    StorageService.saveActiveExam(updatedAttempt);
  }, [attempt, currentIndex, isFlagged, onUpdateAttempt]);

  // Bookmark toggle
  const handleToggleBookmark = useCallback(() => {
    if (!currentQuestion) return;
    StorageService.toggleBookmark({
      id: `bm-${currentQuestion.id}`,
      questionId: currentQuestion.id,
      question: currentQuestion,
      createdAt: new Date().toISOString(),
    });
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 100);
  }, [currentQuestion]);

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'a' || e.key === 'A') handleSelectOption('A');
      else if (e.key === 'b' || e.key === 'B') handleSelectOption('B');
      else if (e.key === 'c' || e.key === 'C') handleSelectOption('C');
      else if (e.key === 'd' || e.key === 'D') handleSelectOption('D');
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'f' || e.key === 'F') handleToggleFlag();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectOption, handleToggleFlag, currentIndex, totalQuestions]);

  const handleSubmitFinal = () => {
    setShowSubmitModal(false);
    onSubmitAttempt(attempt);
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-600">
        <p>No questions loaded for this examination.</p>
        <button
          onClick={onExitToDashboard}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const practiceMeta = NURSING_PRACTICES[currentQuestion.practiceId];
  const subtopicMeta = SUBTOPIC_SPECIFICATIONS[currentQuestion.subtopicId];
  const isTimeCritical = attempt.timeRemainingSeconds <= 900; // < 15 mins

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-50/60 pb-28 md:pb-12">
      {/* Top Exam Header Strip */}
      <div className="bg-white border-b border-slate-200 sticky top-14 sm:top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            {/* Top / Left: Attempt Title, Nursing Practice & Item */}
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="font-bold text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-white shadow-xs shrink-0"
                  style={{ backgroundColor: practiceMeta?.color || '#0d9488' }}
                >
                  {practiceMeta?.title} ({currentQuestion.npItemNumber}/100)
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                  Item <span className="text-teal-700 font-extrabold">{currentIndex + 1}</span>
                  <span className="text-slate-400 font-normal text-xs">/{totalQuestions}</span>
                </span>
              </div>

              {/* Mobile-only timer and submit quick action */}
              <div className="flex sm:hidden items-center gap-1.5 shrink-0">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-md border font-mono tabular-nums text-xs font-bold ${
                    isTimeCritical
                      ? 'bg-red-50 border-red-300 text-red-700 animate-pulse'
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{formatTime(attempt.timeRemainingSeconds)}</span>
                </div>

                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-2.5 py-1 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-md shadow-xs flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit</span>
                </button>
              </div>

              <span className="text-slate-300 hidden md:inline">·</span>
              <span className="text-xs font-semibold text-slate-600 hidden md:inline truncate max-w-xs">
                {subtopicMeta?.name} ({subtopicMeta?.placementRange})
              </span>
            </div>

            {/* Middle & Right: Desktop Save Indicator, Timer, Navigator & Submit */}
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
              <span className="text-xs text-slate-500 hidden lg:flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>{saveStatus === 'saving' ? 'Saving...' : 'Auto-saved'}</span>
              </span>

              {/* Timer */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono tabular-nums text-sm font-bold shadow-xs transition-colors ${
                  isTimeCritical
                    ? 'bg-red-50 border-red-300 text-red-700 animate-pulse'
                    : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{formatTime(attempt.timeRemainingSeconds)}</span>
                <button
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
                >
                  {isTimerPaused ? <Play className="w-3.5 h-3.5 text-teal-600" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Navigator Toggle Button */}
              <button
                onClick={() => setShowNavigatorDrawer(!showNavigatorDrawer)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5 text-teal-600" />
                <span>Navigator</span>
                <span className="bg-teal-50 text-teal-800 px-1.5 py-0.2 rounded text-[11px] font-bold">
                  {answeredCount}/{totalQuestions}
                </span>
              </button>

              {/* Submit Exam Button */}
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Exam</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Column */}
          <div className={showNavigatorDrawer ? 'lg:col-span-8' : 'lg:col-span-12'}>
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs">
              {/* Question Metadata Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md text-white"
                    style={{ backgroundColor: practiceMeta?.color || '#0d9488' }}
                  >
                    {practiceMeta?.title}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">·</span>
                  <span className="text-xs font-bold text-slate-800">
                    {subtopicMeta?.name}
                  </span>
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">·</span>
                  <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                    Item Placement: {subtopicMeta?.placementRange}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleBookmark}
                    className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
                      isBookmarked
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Bookmark this question"
                  >
                    <BookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600' : ''}`} />
                    <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>

                  <button
                    onClick={handleToggleFlag}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isFlagged
                        ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 text-amber-600' : ''}`} />
                    <span>{isFlagged ? 'Flagged for Review' : 'Mark for Review'}</span>
                  </button>
                </div>
              </div>

              {/* Learning Objective Banner */}
              <div className="mb-4 text-xs font-medium text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <strong className="text-slate-800">TOS Objective: </strong>
                {currentQuestion.learningObjective}
              </div>

              {/* Question Text Stem */}
              <div className="mb-8">
                <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                  {currentQuestion.questionText}
                </h2>
              </div>

              {/* 4 Selectable Answer Cards */}
              <div className="space-y-3 mb-8">
                {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                  const isSelected = selectedOption === letter;
                  const optionText = currentQuestion.options[letter];

                  return (
                    <button
                      key={letter}
                      onClick={() => handleSelectOption(letter)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-start gap-3 sm:gap-3.5 group cursor-pointer min-h-[52px] active:scale-[0.99] ${
                        isSelected
                          ? 'bg-teal-50/90 border-teal-600 shadow-xs ring-1 ring-teal-600 text-teal-950'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-800'
                      }`}
                    >
                      {/* Letter Badge */}
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-teal-700 text-white font-extrabold shadow-xs'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {letter}
                      </span>

                      {/* Text */}
                      <span className="text-xs sm:text-sm font-normal pt-1 leading-relaxed flex-1">
                        {optionText}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Navigation & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 sm:pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg sm:rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === totalQuestions - 1}
                    className="px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg sm:rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {selectedOption && (
                    <button
                      onClick={handleClearAnswer}
                      className="px-2.5 sm:px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}

                  <span className="text-xs font-medium text-slate-500 hidden sm:inline ml-2">
                    Keyboard: <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px]">A</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px]">B</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px]">C</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px]">D</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px]">→</kbd>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigator Sidebar */}
          {showNavigatorDrawer && (
            <div className="hidden lg:block lg:col-span-4 sticky top-32 z-10">
              <ExamNavigator
                questions={attempt.questions}
                currentIndex={currentIndex}
                onSelectQuestion={(idx) => setCurrentIndex(idx)}
                userAnswers={attempt.userAnswers}
                flaggedQuestions={attempt.flaggedQuestions}
                onClose={() => setShowNavigatorDrawer(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom-Sheet Drawer Navigator */}
      {showNavigatorDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-h-[85vh] w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <ExamNavigator
              questions={attempt.questions}
              currentIndex={currentIndex}
              onSelectQuestion={(idx) => {
                setCurrentIndex(idx);
                setShowNavigatorDrawer(false);
              }}
              userAnswers={attempt.userAnswers}
              flaggedQuestions={attempt.flaggedQuestions}
              onClose={() => setShowNavigatorDrawer(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-3 py-2 flex items-center justify-between safe-area-inset-bottom">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs flex items-center gap-1 min-w-[70px] justify-center cursor-pointer active:scale-95 transition-transform shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        <button
          type="button"
          onClick={() => setShowNavigatorDrawer(true)}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-transform"
        >
          <Grid className="w-3.5 h-3.5 text-teal-700" />
          <span>{currentIndex + 1}/{totalQuestions}</span>
          <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded-full font-bold">
            {answeredCount} done
          </span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1}
          className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs flex items-center gap-1 min-w-[70px] justify-center cursor-pointer shadow-xs active:scale-95 transition-transform"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Submit Examination?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {attempt.examTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-5 text-center">
              <div>
                <span className="block text-xl font-bold text-teal-700 tabular-nums">
                  {answeredCount}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Answered</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-800 tabular-nums">
                  {unansweredCount}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Unanswered</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-amber-700 tabular-nums">
                  {flaggedCount}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Flagged</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 mb-5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> You have <strong>{unansweredCount}</strong> unanswered questions. Unanswered questions are graded as incorrect (0 points).
                </p>
              </div>
            )}

            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Upon submission, your scores across all 5 Nursing Practices and subtopics will be calculated, accompanied by complete verified rationales.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Continue Examination
              </button>
              <button
                onClick={handleSubmitFinal}
                className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
