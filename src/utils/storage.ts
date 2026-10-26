import { ExamAttempt, Bookmark, ExamBlueprint } from '../types';
import { DEFAULT_BLUEPRINT } from '../data/subjects';

const ACTIVE_EXAM_KEY = 'pnle_active_exam_attempt_v2';
const EXAM_HISTORY_KEY = 'pnle_exam_history_v2';
const BOOKMARKS_KEY = 'pnle_question_bookmarks_v2';
const BLUEPRINT_KEY = 'pnle_exam_blueprint_v2';

export const StorageService = {
  // Active Exam
  saveActiveExam(attempt: ExamAttempt): void {
    try {
      localStorage.setItem(ACTIVE_EXAM_KEY, JSON.stringify(attempt));
    } catch (e) {
      console.error('Error saving active exam:', e);
    }
  },

  getActiveExam(): ExamAttempt | null {
    try {
      const data = localStorage.getItem(ACTIVE_EXAM_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading active exam:', e);
      return null;
    }
  },

  clearActiveExam(): void {
    localStorage.removeItem(ACTIVE_EXAM_KEY);
  },

  // Exam History
  getExamHistory(): ExamAttempt[] {
    try {
      const data = localStorage.getItem(EXAM_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading exam history:', e);
      return [];
    }
  },

  saveExamToHistory(attempt: ExamAttempt): void {
    try {
      const history = this.getExamHistory();
      // Remove any duplicate id if updating
      const updated = [attempt, ...history.filter(h => h.id !== attempt.id)];
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving exam history:', e);
    }
  },

  // Bookmarks
  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading bookmarks:', e);
      return [];
    }
  },

  toggleBookmark(bookmark: Bookmark): boolean {
    try {
      const bookmarks = this.getBookmarks();
      const exists = bookmarks.some(b => b.questionId === bookmark.questionId);
      let updated: Bookmark[];
      let isBookmarked: boolean;

      if (exists) {
        updated = bookmarks.filter(b => b.questionId !== bookmark.questionId);
        isBookmarked = false;
      } else {
        updated = [bookmark, ...bookmarks];
        isBookmarked = true;
      }

      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      return isBookmarked;
    } catch (e) {
      console.error('Error toggling bookmark:', e);
      return false;
    }
  },

  isQuestionBookmarked(questionId: string): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some(b => b.questionId === questionId);
  },

  // Custom Blueprint
  getBlueprint(): ExamBlueprint {
    try {
      const data = localStorage.getItem(BLUEPRINT_KEY);
      return data ? JSON.parse(data) : DEFAULT_BLUEPRINT;
    } catch (e) {
      return DEFAULT_BLUEPRINT;
    }
  },

  saveBlueprint(blueprint: ExamBlueprint): void {
    localStorage.setItem(BLUEPRINT_KEY, JSON.stringify(blueprint));
  }
};
