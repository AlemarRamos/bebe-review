import React, { useState, useEffect } from 'react';
import { Bookmark as BookmarkType } from '../types';
import { NURSING_PRACTICES, TOS_SUBTOPICS } from '../data/tableOfSpecifications';
import { PNLE_SUBJECTS } from '../data/subjects';
import { StorageService } from '../utils/storage';
import { Bookmark as BookmarkIcon, Trash2, Search, Award } from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setBookmarks(StorageService.getBookmarks());
  }, []);

  const handleRemove = (questionId: string) => {
    const updated = bookmarks.filter((b) => b.questionId !== questionId);
    setBookmarks(updated);
    try {
      localStorage.setItem('pnle_question_bookmarks_v2', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredBookmarks = bookmarks.filter((bm) => {
    const q = bm.question;
    const query = searchQuery.toLowerCase();
    const practiceTitle = q.practiceId ? NURSING_PRACTICES[q.practiceId]?.title || '' : '';
    const subtopicName = q.subtopicId ? TOS_SUBTOPICS[q.subtopicId]?.name || '' : '';
    const legacySubject = q.subjectId ? PNLE_SUBJECTS[q.subjectId]?.name || '' : '';

    return (
      q.questionText.toLowerCase().includes(query) ||
      q.topic.toLowerCase().includes(query) ||
      practiceTitle.toLowerCase().includes(query) ||
      subtopicName.toLowerCase().includes(query) ||
      legacySubject.toLowerCase().includes(query) ||
      (q.rationale?.core && q.rationale.core.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookmarkIcon className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Bookmarked Nursing Questions ({bookmarks.length})
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Saved questions for targeted review and reinforcement of difficult concepts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search bookmarked items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Bookmarks List */}
      {filteredBookmarks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs">
          <BookmarkIcon className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-700">No bookmarked questions yet.</p>
          <p className="mt-1 text-slate-400">
            Click the "Bookmark" icon during examinations or study mode to save questions here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map((bm) => {
            const q = bm.question;
            const practice = q.practiceId ? NURSING_PRACTICES[q.practiceId] : null;
            const subtopic = q.subtopicId ? TOS_SUBTOPICS[q.subtopicId] : null;
            const legacySub = q.subjectId ? PNLE_SUBJECTS[q.subjectId] : null;
            const badgeColor = practice?.color || legacySub?.color || '#0d9488';
            const badgeLabel = practice ? `NP ${practice.number}` : legacySub?.shortName || 'NP';

            return (
              <div
                key={bm.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-white font-bold"
                      style={{ backgroundColor: badgeColor }}
                    >
                      {badgeLabel}
                    </span>
                    <span className="font-bold text-slate-800">
                      {subtopic ? subtopic.name : q.topic}
                    </span>
                    {q.npItemNumber && (
                      <span className="text-[11px] font-mono text-slate-400">
                        Item #{q.npItemNumber}
                      </span>
                    )}
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-medium">{q.difficulty}</span>
                  </div>

                  <button
                    onClick={() => handleRemove(q.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-900 leading-relaxed">
                  {q.questionText}
                </p>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                    const isCorrect = q.correctOption === letter;
                    return (
                      <div
                        key={letter}
                        className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] shrink-0 ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="pt-0.5">{q.options[letter]}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Educational Rationale Box */}
                <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-teal-950 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-teal-900">
                    <Award className="w-4 h-4 text-teal-600" />
                    <span>Clinical Rationale</span>
                  </div>
                  <p className="leading-relaxed">
                    <strong>Core Concept: </strong>
                    {q.rationale.core}
                  </p>
                  <p className="leading-relaxed">
                    <strong>Why Correct: </strong>
                    {q.rationale.whyCorrect}
                  </p>
                  <div className="pt-1 text-[11px] text-slate-500 font-medium">
                    <strong>Reference: </strong>
                    {q.reference}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
