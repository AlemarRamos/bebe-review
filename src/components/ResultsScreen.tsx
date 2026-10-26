import React, { useState, useMemo, useEffect } from 'react';
import { ExamAttempt, NursingPracticeId, SubtopicId } from '../types';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import { StorageService } from '../utils/storage';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Bookmark as BookmarkIcon,
  Search,
  BarChart3,
  Clock,
  ArrowRight,
  Layers
} from 'lucide-react';

interface ResultsScreenProps {
  attempt: ExamAttempt;
  onRetakeExam: () => void;
  onReturnToDashboard: () => void;
}

type FilterTab = 'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged';

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  attempt,
  onRetakeExam,
  onReturnToDashboard,
}) => {
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [practiceFilter, setPracticeFilter] = useState<NursingPracticeId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  const score = attempt.score;
  const isPassed = score ? score.passedBenchmark : false;

  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isPassed]);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const toggleExpand = (idx: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    for (let i = 0; i < attempt.questions.length; i++) {
      allExpanded[i] = true;
    }
    setExpandedQuestions(allExpanded);
  };

  const collapseAll = () => {
    setExpandedQuestions({});
  };

  // Filter questions
  const filteredQuestionIndices = useMemo(() => {
    const indices: number[] = [];
    const query = searchQuery.trim().toLowerCase();

    for (let i = 0; i < attempt.questions.length; i++) {
      const q = attempt.questions[i];
      const chosen = attempt.userAnswers[i];
      const isCorrect = chosen === q.correctOption;
      const isAnswered = chosen !== null && chosen !== undefined;
      const isFlagged = !!attempt.flaggedQuestions[i];

      // Practice Filter
      if (practiceFilter !== 'all' && q.practiceId !== practiceFilter) {
        continue;
      }

      // Status Filter
      if (filterTab === 'correct' && !isCorrect) continue;
      if (filterTab === 'incorrect' && (isCorrect || !isAnswered)) continue;
      if (filterTab === 'unanswered' && isAnswered) continue;
      if (filterTab === 'flagged' && !isFlagged) continue;

      // Text search
      if (query) {
        const textMatch = q.questionText.toLowerCase().includes(query);
        const topicMatch = q.topic.toLowerCase().includes(query);
        const numMatch = (i + 1).toString() === query;
        if (!textMatch && !topicMatch && !numMatch) continue;
      }

      indices.push(i);
    }

    return indices;
  }, [attempt, filterTab, practiceFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-8">
      {/* Hero Score Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none -mr-20 -mt-20 ${
            isPassed ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                PHINMA Education · NUR 225_099 Seminar 1
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Attempt #{attempt.attemptNumber} · {new Date(attempt.submittedAt || Date.now()).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {attempt.examTitle}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Official Table of Specification Performance Analysis covering Nursing Practice 1 through 5, with comprehensive verified rationales.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Time Spent: <strong className="text-slate-800">{formatDuration(score?.timeSpentSeconds || 0)}</strong></span>
              </div>
              <span>·</span>
              <div>
                Answered:{' '}
                <strong className="text-slate-800">
                  {(score?.correctCount || 0) + (score?.incorrectCount || 0)} / {attempt.totalQuestions}
                </strong>
              </div>
            </div>
          </div>

          {/* Score Badge Block */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 shrink-0">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Final Raw Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tabular-nums">
                  {score?.rawScore || 0}
                </span>
                <span className="text-lg font-bold text-slate-500">/ {attempt.totalQuestions}</span>
              </div>
              <span className="text-sm font-extrabold text-teal-700 block mt-1 tabular-nums">
                {score?.percentage.toFixed(2)}%
              </span>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6 text-center sm:text-left">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold shadow-xs ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <AlertCircle className="w-4 h-4 text-amber-700" />}
                <span>{isPassed ? 'Passed Benchmark (≥ 75%)' : 'Needs Review (< 75%)'}</span>
              </span>
              <span className="block text-[11px] text-slate-500 mt-2 max-w-[200px] leading-tight">
                *Targeting 75% passing mark for PNLE Board Examination.
              </span>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRetakeExam}
              className="px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
              <span>Retake Examination (Fresh Variant Set)</span>
            </button>

            <button
              onClick={() => {
                setFilterTab('incorrect');
                const el = document.getElementById('question-review-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2.5 text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Review Incorrect ({score?.incorrectCount || 0})</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print TOS Results / PDF</span>
            </button>
          </div>

          <button
            onClick={onReturnToDashboard}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Nursing Practice Score Breakdown Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold text-slate-900">
              Nursing Practice Performance (NP 1 to NP 5)
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Passing Target: 75% per Practice
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {score?.practiceScores &&
            (Object.keys(score.practiceScores) as NursingPracticeId[]).map((pId) => {
              const p = score.practiceScores[pId];
              const pInfo = NURSING_PRACTICES[pId];
              const meetsSubBenchmark = p.percentage >= 75;

              return (
                <div
                  key={pId}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-extrabold px-2.5 py-0.5 rounded text-white"
                        style={{ backgroundColor: pInfo?.color || '#0d9488' }}
                      >
                        {pInfo?.title}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          meetsSubBenchmark ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {meetsSubBenchmark ? 'Passed' : 'Needs Review'}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 mb-2">
                      {pInfo?.shortTitle}
                    </h3>

                    <div className="flex items-baseline justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-600">
                        Score: {p.correctAnswers} / {p.totalQuestions}
                      </span>
                      <span className="font-extrabold tabular-nums text-slate-900">
                        {p.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          meetsSubBenchmark ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(p.percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Subtopics mini tags */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
                    {p.subtopicScores &&
                      Object.values(p.subtopicScores).map((sub) => (
                        <div key={sub.subtopicId} className="flex items-center justify-between">
                          <span className="truncate max-w-[180px]">{sub.subtopicName}</span>
                          <span className="font-bold tabular-nums">
                            {sub.correctAnswers}/{sub.totalQuestions} ({sub.percentage}%)
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Question Review Section */}
      <div id="question-review-section" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Detailed Question Review & Verified Rationales
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review every item, verified answer keys, clinical rationales, and distractor analyses according to the Table of Specifications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterTab === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({attempt.questions.length})
            </button>
            <button
              onClick={() => setFilterTab('correct')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterTab === 'correct' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Correct ({score?.correctCount || 0})
            </button>
            <button
              onClick={() => setFilterTab('incorrect')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterTab === 'incorrect' ? 'bg-white text-rose-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Incorrect ({score?.incorrectCount || 0})
            </button>
            <button
              onClick={() => setFilterTab('unanswered')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterTab === 'unanswered' ? 'bg-white text-slate-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unanswered ({score?.unansweredCount || 0})
            </button>
          </div>

          {/* Nursing Practice & Search */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <select
              value={practiceFilter}
              onChange={(e) => setPracticeFilter(e.target.value as NursingPracticeId | 'all')}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">All 5 Practices</option>
              {Object.values(NURSING_PRACTICES).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search question, topic, or #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-700 focus:ring-1 focus:ring-teal-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestionIndices.map((idx) => {
            const q = attempt.questions[idx];
            const qNum = idx + 1;
            const chosen = attempt.userAnswers[idx];
            const isCorrect = chosen === q.correctOption;
            const isUnanswered = chosen === null || chosen === undefined;
            const isExpanded = expandedQuestions[idx] ?? true;
            const isBookmarked = StorageService.isQuestionBookmarked(q.id);
            const practiceMeta = NURSING_PRACTICES[q.practiceId];
            const subtopicMeta = SUBTOPIC_SPECIFICATIONS[q.subtopicId];

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-white border-slate-200'
                    : isUnanswered
                    ? 'bg-slate-50/50 border-slate-200'
                    : 'bg-rose-50/30 border-rose-200'
                }`}
              >
                {/* Card Header Bar */}
                <div
                  onClick={() => toggleExpand(idx)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isCorrect ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : isUnanswered ? (
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                          —
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                          <XCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          Item #{qNum} (NP {practiceMeta?.number}: #{q.npItemNumber})
                        </span>
                        <span className="text-slate-300">·</span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.2 rounded text-white"
                          style={{ backgroundColor: practiceMeta?.color || '#0d9488' }}
                        >
                          {practiceMeta?.title}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-slate-700">
                          {subtopicMeta?.name}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 line-clamp-2">
                        {q.questionText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-800'
                          : isUnanswered
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '1 / 1 pt' : '0 / 1 pt'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-xs space-y-4">
                    <div className="text-slate-500 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong className="text-slate-700">TOS Placement: </strong>
                      {subtopicMeta?.name} ({subtopicMeta?.placementRange}) · {q.learningObjective}
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                        const optionText = q.options[letter];
                        const isThisCorrect = q.correctOption === letter;
                        const isThisChosen = chosen === letter;

                        let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700';

                        if (isThisCorrect) {
                          optionStyle = 'bg-emerald-50/90 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                        } else if (isThisChosen && !isThisCorrect) {
                          optionStyle = 'bg-rose-50/90 border-rose-300 text-rose-950 line-through opacity-80';
                        }

                        return (
                          <div
                            key={letter}
                            className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${optionStyle}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                                isThisCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isThisChosen
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {letter}
                            </span>

                            <div className="flex-1 text-xs leading-relaxed pt-0.5">
                              <span>{optionText}</span>
                              {isThisCorrect && (
                                <span className="ml-2 font-bold text-emerald-700 text-[11px]">
                                  (Correct Best Answer)
                                </span>
                              )}
                              {isThisChosen && !isThisCorrect && (
                                <span className="ml-2 font-bold text-rose-700 text-[11px]">
                                  (Your Selected Answer)
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Educational Rationale Box */}
                    <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 text-teal-950 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800">
                        <Award className="w-4 h-4 text-teal-600" />
                        <span>Clinical Rationale & Board Competency</span>
                      </div>

                      <p className="leading-relaxed text-xs">
                        <strong className="text-teal-900">Core Clinical Concept: </strong>
                        {q.rationale.core}
                      </p>

                      <p className="leading-relaxed text-xs">
                        <strong className="text-teal-900">Why Correct: </strong>
                        {q.rationale.whyCorrect}
                      </p>

                      <div className="pt-2 text-[11px] text-slate-500 font-medium">
                        <strong>Reference Source: </strong> {q.reference}
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          StorageService.toggleBookmark({
                            id: `bm-${q.id}`,
                            questionId: q.id,
                            question: q,
                            createdAt: new Date().toISOString(),
                          });
                          setExpandedQuestions({ ...expandedQuestions });
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          isBookmarked
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <BookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600' : ''}`} />
                        <span>{isBookmarked ? 'Bookmarked' : 'Bookmark for Review'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
