import React, { useState } from 'react';
import { NursingPracticeId, Question } from '../types';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import { generateTosExam } from '../data/questionGenerator';
import { StorageService } from '../utils/storage';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
  Bookmark as BookmarkIcon,
  Sparkles
} from 'lucide-react';

export const StudyMode: React.FC = () => {
  const [selectedPractice, setSelectedPractice] = useState<NursingPracticeId | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userSelection, setUserSelection] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [studyScore, setStudyScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  const handleStartStudy = () => {
    const pool = generateTosExam(
      selectedPractice === 'all' ? 'full_500' : selectedPractice,
      Math.floor(Math.random() * 50) + 1
    );

    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, questionCount);

    setSessionQuestions(shuffled);
    setCurrentIndex(0);
    setUserSelection(null);
    setIsAnswerRevealed(false);
    setStudyScore({ correct: 0, total: 0 });
    setShowCompletionModal(false);
    setSessionActive(true);
  };

  const currentQ = sessionQuestions[currentIndex];
  const isBookmarked = currentQ ? StorageService.isQuestionBookmarked(currentQ.id) : false;

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerRevealed) return;

    setUserSelection(opt);
    setIsAnswerRevealed(true);

    const isCorrect = opt === currentQ.correctOption;
    setStudyScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserSelection(null);
      setIsAnswerRevealed(false);
    } else {
      setShowCompletionModal(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-28 md:pb-8">
      {!sessionActive ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Self-Paced Study & Practice Mode
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Answer focused questions with immediate rationale and distractor reveal after each question.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Practice Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Nursing Practice Module
              </label>
              <select
                value={selectedPractice}
                onChange={(e) => setSelectedPractice(e.target.value as NursingPracticeId | 'all')}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="all">All 5 Nursing Practices (Complete TOS)</option>
                {Object.values(NURSING_PRACTICES).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}: {p.shortTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Count Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Number of Practice Items
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      questionCount === num
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} Items
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleStartStudy}
              className="px-6 py-3 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Begin Practice Session</span>
            </button>
          </div>
        </div>
      ) : (
        currentQ && (
          <div className="space-y-6">
            {/* Top Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-900">
                  Question {currentIndex + 1} of {sessionQuestions.length}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  Score: {studyScore.correct} / {studyScore.total}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    StorageService.toggleBookmark({
                      id: `bm-${currentQ.id}`,
                      questionId: currentQ.id,
                      question: currentQ,
                      createdAt: new Date().toISOString(),
                    });
                    setUserSelection(userSelection);
                  }}
                  className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 ${
                    isBookmarked
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                  title="Bookmark"
                >
                  <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-rose-600' : ''}`} />
                  <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                <button
                  onClick={() => setSessionActive(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  End Session
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 text-xs">
                <span
                  className="px-2 py-0.5 rounded text-white font-bold"
                  style={{ backgroundColor: NURSING_PRACTICES[currentQ.practiceId]?.color || '#0d9488' }}
                >
                  {NURSING_PRACTICES[currentQ.practiceId]?.title}
                </span>
                <span className="text-slate-400">·</span>
                <span className="font-semibold text-slate-700">
                  {SUBTOPIC_SPECIFICATIONS[currentQ.subtopicId]?.name}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                {currentQ.questionText}
              </h2>

              {/* 4 Options */}
              <div className="space-y-3">
                {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                  const optionText = currentQ.options[letter];
                  const isThisCorrect = currentQ.correctOption === letter;
                  const isThisChosen = userSelection === letter;

                  let style = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

                  if (isAnswerRevealed) {
                    if (isThisCorrect) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (isThisChosen && !isThisCorrect) {
                      style = 'bg-rose-50 border-rose-400 text-rose-950 line-through opacity-85';
                    } else {
                      style = 'bg-slate-50 border-slate-200 text-slate-500 opacity-70';
                    }
                  }

                  return (
                    <button
                      key={letter}
                      disabled={isAnswerRevealed}
                      onClick={() => handleSelectOption(letter)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${style}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isAnswerRevealed && isThisCorrect
                            ? 'bg-emerald-600 text-white'
                            : isAnswerRevealed && isThisChosen
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-sm pt-0.5 leading-relaxed flex-1">
                        {optionText}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Revealed Feedback */}
              {isAnswerRevealed && (
                <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-950 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    {userSelection === currentQ.correctOption ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct! Option {currentQ.correctOption} is the intended best answer.</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Incorrect. The correct answer is Option {currentQ.correctOption}.</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed">
                    <strong className="text-teal-900">Core Clinical Concept: </strong>
                    {currentQ.rationale.core}
                  </p>

                  <p className="text-xs leading-relaxed">
                    <strong className="text-teal-900">Why Correct: </strong>
                    {currentQ.rationale.whyCorrect}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-500">
                    <strong>Reference: </strong> {currentQ.reference}
                  </div>

                    <div className="pt-3 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{currentIndex < sessionQuestions.length - 1 ? 'Next Question' : 'Finish Practice'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Practice Session Finished!</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Great job reviewing concepts from the Table of Specifications.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Session Score</span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {studyScore.correct} / {sessionQuestions.length}
              </div>
              <span className="text-xs font-extrabold text-teal-700 block mt-0.5">
                {sessionQuestions.length > 0 ? ((studyScore.correct / sessionQuestions.length) * 100).toFixed(0) : 0}% Accuracy
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  setSessionActive(false);
                }}
                className="py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Study Home
              </button>
              <button
                type="button"
                onClick={() => {
                  handleStartStudy();
                }}
                className="py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Practice More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
