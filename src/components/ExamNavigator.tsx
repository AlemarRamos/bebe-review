import React, { useState, useMemo } from 'react';
import { Question, NursingPracticeId, SubtopicId } from '../types';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import { Filter, Search, X } from 'lucide-react';

interface ExamNavigatorProps {
  questions: Question[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | null>;
  flaggedQuestions: Record<number, boolean>;
  onClose?: () => void;
}

type StatusFilter = 'all' | 'answered' | 'unanswered' | 'flagged';

export const ExamNavigator: React.FC<ExamNavigatorProps> = ({
  questions,
  currentIndex,
  onSelectQuestion,
  userAnswers,
  flaggedQuestions,
  onClose,
}) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [practiceFilter, setPracticeFilter] = useState<NursingPracticeId | 'all'>('all');
  const [jumpInput, setJumpInput] = useState<string>('');

  // Counts
  const answeredCount = useMemo(() => {
    return Object.values(userAnswers).filter((val) => val !== null && val !== undefined).length;
  }, [userAnswers]);

  const flaggedCount = useMemo(() => {
    return Object.values(flaggedQuestions).filter(Boolean).length;
  }, [flaggedQuestions]);

  const unansweredCount = questions.length - answeredCount;

  // Filtered list
  const filteredIndices = useMemo(() => {
    const indices: number[] = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const isAnswered = userAnswers[i] !== null && userAnswers[i] !== undefined;
      const isFlagged = !!flaggedQuestions[i];

      // Nursing Practice filter
      if (practiceFilter !== 'all' && q.practiceId !== practiceFilter) {
        continue;
      }

      // Status filter
      if (statusFilter === 'answered' && !isAnswered) continue;
      if (statusFilter === 'unanswered' && isAnswered) continue;
      if (statusFilter === 'flagged' && !isFlagged) continue;

      indices.push(i);
    }
    return indices;
  }, [questions, userAnswers, flaggedQuestions, statusFilter, practiceFilter]);

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= questions.length) {
      onSelectQuestion(num - 1);
      setJumpInput('');
      if (onClose) onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden max-h-[85vh] lg:max-h-none">
      {/* Navigator Header */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Filter className="w-4 h-4 text-teal-700 shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 truncate">
              Navigator ({questions.length} Items)
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold tabular-nums text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {answeredCount}/{questions.length}
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title="Close Navigator"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/70 rounded-lg text-xs font-medium mb-2.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`py-1 rounded text-center transition-colors ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setStatusFilter('answered')}
            className={`py-1 rounded text-center transition-colors ${
              statusFilter === 'answered'
                ? 'bg-white text-teal-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Done ({answeredCount})
          </button>
          <button
            onClick={() => setStatusFilter('unanswered')}
            className={`py-1 rounded text-center transition-colors ${
              statusFilter === 'unanswered'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Left ({unansweredCount})
          </button>
          <button
            onClick={() => setStatusFilter('flagged')}
            className={`py-1 rounded text-center transition-colors ${
              statusFilter === 'flagged'
                ? 'bg-white text-amber-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Flag ({flaggedCount})
          </button>
        </div>

        {/* Nursing Practice Selector & Direct Jump */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <select
            value={practiceFilter}
            onChange={(e) => setPracticeFilter(e.target.value as NursingPracticeId | 'all')}
            className="w-full bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All 5 Nursing Practices</option>
            {Object.values(NURSING_PRACTICES).map((p) => (
              <option key={p.id} value={p.id}>
                NP {p.number} (Items {p.number === 1 ? '1-100' : p.number === 2 ? '101-200' : p.number === 3 ? '201-300' : p.number === 4 ? '301-400' : '401-500'})
              </option>
            ))}
          </select>

          <form onSubmit={handleJump} className="flex items-center gap-1">
            <div className="relative flex-1">
              <input
                type="number"
                min="1"
                max={questions.length}
                placeholder={`Jump to # (1-${questions.length})`}
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md pl-2 pr-7 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 tabular-nums"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded flex items-center justify-center transition-colors"
                title="Go"
              >
                <Search className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-100/60 border-b border-slate-200 text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-teal-600 inline-block" />
          <span>Done</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" />
          <span>Flag</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-white border border-slate-300 inline-block" />
          <span>Empty</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded border-2 border-indigo-600 bg-indigo-50 inline-block" />
          <span>Current</span>
        </div>
      </div>

      {/* Grid of Questions */}
      <div className="flex-1 overflow-y-auto p-3 max-h-[520px]">
        {filteredIndices.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No questions match the current filter.
          </div>
        ) : (
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
            {filteredIndices.map((idx) => {
              const qNum = idx + 1;
              const isCurrent = idx === currentIndex;
              const isAnswered = userAnswers[idx] !== null && userAnswers[idx] !== undefined;
              const isFlagged = !!flaggedQuestions[idx];

              let bgClasses = 'bg-white border-slate-200 text-slate-700 hover:border-slate-400';

              if (isAnswered && !isFlagged) {
                bgClasses = 'bg-teal-600 border-teal-600 text-white font-semibold hover:bg-teal-700';
              } else if (isFlagged && !isAnswered) {
                bgClasses = 'bg-amber-500 border-amber-500 text-white font-semibold hover:bg-amber-600';
              } else if (isAnswered && isFlagged) {
                bgClasses = 'bg-amber-600 border-amber-600 text-white font-semibold hover:bg-amber-700';
              }

              if (isCurrent) {
                bgClasses += ' ring-2 ring-indigo-600 ring-offset-1 z-10 scale-105';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectQuestion(idx);
                    if (onClose) onClose();
                  }}
                  className={`h-8 rounded text-xs tabular-nums flex items-center justify-center relative transition-all border ${bgClasses}`}
                  title={`Question ${qNum} - ${questions[idx].topic}`}
                >
                  <span>{qNum}</span>
                  {isFlagged && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="p-2 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center font-medium">
        Showing {filteredIndices.length} of {questions.length} questions
      </div>
    </div>
  );
};
