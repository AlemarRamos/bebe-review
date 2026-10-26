import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ExamAttempt, Bookmark } from '../types';

export interface UserProfileData {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
}

export const CloudStorageService = {
  /**
   * Save or update student profile document in /users/{userId}
   */
  async saveUserProfile(user: User, customDisplayName?: string): Promise<void> {
    const userRef = doc(db, 'users', user.uid);
    const now = new Date().toISOString();

    try {
      const snap = await getDoc(userRef);
      const email = user.email || `${user.uid}@student.pnle.edu`;
      const displayName = customDisplayName || user.displayName || 'BSN Student';
      const photoURL = user.photoURL || undefined;

      if (!snap.exists()) {
        const profileData: Record<string, any> = {
          id: user.uid,
          email: email.slice(0, 255),
          displayName: displayName.slice(0, 128),
          createdAt: now,
          updatedAt: now,
        };
        if (photoURL) {
          profileData.photoURL = photoURL.slice(0, 1024);
        }
        await setDoc(userRef, profileData);
      } else {
        const updateData: Record<string, any> = {
          displayName: displayName.slice(0, 128),
          updatedAt: now,
        };
        if (photoURL) {
          updateData.photoURL = photoURL.slice(0, 1024);
        }
        await updateDoc(userRef, updateData);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
  },

  /**
   * Save or sync an exam attempt to /users/{userId}/attempts/{attemptId}
   */
  async saveExamAttempt(userId: string, attempt: ExamAttempt): Promise<void> {
    const attemptRef = doc(db, 'users', userId, 'attempts', attempt.id);
    const now = new Date().toISOString();

    // Convert numeric keys in userAnswers and flaggedQuestions to strings for Firestore maps
    const answersMap: Record<string, string> = {};
    Object.entries(attempt.userAnswers).forEach(([k, v]) => {
      if (v) answersMap[String(k)] = v;
    });

    const flaggedMap: Record<string, boolean> = {};
    Object.entries(attempt.flaggedQuestions).forEach(([k, v]) => {
      if (v) flaggedMap[String(k)] = true;
    });

    const payload: Record<string, any> = {
      id: attempt.id.slice(0, 128),
      userId,
      attemptNumber: attempt.attemptNumber || 1,
      studentName: (attempt.studentName || 'BSN Student').slice(0, 128),
      totalQuestions: attempt.totalQuestions,
      examMode: attempt.examMode,
      examTitle: attempt.examTitle.slice(0, 128),
      timeAllocatedSeconds: attempt.timeAllocatedSeconds,
      timeRemainingSeconds: attempt.timeRemainingSeconds,
      startedAt: attempt.startedAt.slice(0, 64),
      submittedAt: attempt.submittedAt ? attempt.submittedAt.slice(0, 64) : null,
      status: attempt.status,
      userAnswers: answersMap,
      flaggedQuestions: flaggedMap,
      updatedAt: now,
    };

    if (attempt.score) {
      payload.rawScore = attempt.score.rawScore;
      payload.percentage = attempt.score.percentage;
      payload.passedBenchmark = attempt.score.passedBenchmark;
    }

    try {
      const snap = await getDoc(attemptRef);
      if (!snap.exists()) {
        await setDoc(attemptRef, payload);
      } else {
        const existingData = snap.data();
        if (existingData.status === 'submitted' && attempt.status === 'in_progress') {
          // Cannot revert submitted to in_progress
          return;
        }

        if (attempt.status === 'submitted') {
          await updateDoc(attemptRef, {
            status: 'submitted',
            submittedAt: payload.submittedAt,
            rawScore: payload.rawScore ?? 0,
            percentage: payload.percentage ?? 0,
            passedBenchmark: payload.passedBenchmark ?? false,
            userAnswers: answersMap,
            flaggedQuestions: flaggedMap,
            timeRemainingSeconds: attempt.timeRemainingSeconds,
            updatedAt: now,
          });
        } else {
          await updateDoc(attemptRef, {
            userAnswers: answersMap,
            flaggedQuestions: flaggedMap,
            timeRemainingSeconds: attempt.timeRemainingSeconds,
            updatedAt: now,
          });
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${userId}/attempts/${attempt.id}`);
    }
  },

  /**
   * Fetch all exam attempts for the user
   */
  async getUserAttempts(userId: string): Promise<ExamAttempt[]> {
    const attemptsRef = collection(db, 'users', userId, 'attempts');
    try {
      const snap = await getDocs(attemptsRef);
      const attempts: ExamAttempt[] = [];

      snap.forEach((docSnap) => {
        const data = docSnap.data();
        // Reconstruct numeric keys for userAnswers
        const userAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | null> = {};
        if (data.userAnswers) {
          Object.entries(data.userAnswers).forEach(([k, v]) => {
            const num = parseInt(k, 10);
            if (!isNaN(num)) userAnswers[num] = v as 'A' | 'B' | 'C' | 'D';
          });
        }

        const flaggedQuestions: Record<number, boolean> = {};
        if (data.flaggedQuestions) {
          Object.entries(data.flaggedQuestions).forEach(([k, v]) => {
            const num = parseInt(k, 10);
            if (!isNaN(num)) flaggedQuestions[num] = Boolean(v);
          });
        }

        attempts.push({
          id: data.id,
          attemptNumber: data.attemptNumber || 1,
          studentName: data.studentName || 'BSN Student',
          totalQuestions: data.totalQuestions || 500,
          examMode: data.examMode,
          examTitle: data.examTitle,
          questions: [], // Rehydrated when selected
          userAnswers,
          flaggedQuestions,
          timeAllocatedSeconds: data.timeAllocatedSeconds || 36000,
          timeRemainingSeconds: data.timeRemainingSeconds || 0,
          startedAt: data.startedAt,
          submittedAt: data.submittedAt || null,
          status: data.status,
          score: data.status === 'submitted' ? {
            totalQuestions: data.totalQuestions || 500,
            correctCount: data.rawScore || 0,
            incorrectCount: Math.max(0, (data.totalQuestions || 500) - (data.rawScore || 0)),
            unansweredCount: 0,
            rawScore: data.rawScore || 0,
            percentage: data.percentage || 0,
            benchmarkPercentage: 75,
            passedBenchmark: data.passedBenchmark || false,
            timeSpentSeconds: (data.timeAllocatedSeconds || 36000) - (data.timeRemainingSeconds || 0),
            practiceScores: {} as any,
          } : undefined,
        });
      });

      return attempts.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `users/${userId}/attempts`);
      return [];
    }
  },

  /**
   * Save a bookmark to Firestore
   */
  async saveBookmark(userId: string, bookmark: Bookmark): Promise<void> {
    const bookmarkRef = doc(db, 'users', userId, 'bookmarks', bookmark.id);
    const payload: Record<string, any> = {
      id: bookmark.id.slice(0, 128),
      userId,
      questionId: bookmark.questionId.slice(0, 64),
      createdAt: (bookmark.createdAt || new Date().toISOString()).slice(0, 64),
    };
    if (bookmark.notes) {
      payload.notes = bookmark.notes.slice(0, 500);
    }

    try {
      await setDoc(bookmarkRef, payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${userId}/bookmarks/${bookmark.id}`);
    }
  },

  /**
   * Delete a bookmark from Firestore
   */
  async deleteBookmark(userId: string, bookmarkId: string): Promise<void> {
    const bookmarkRef = doc(db, 'users', userId, 'bookmarks', bookmarkId);
    try {
      await deleteDoc(bookmarkRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${userId}/bookmarks/${bookmarkId}`);
    }
  },

  /**
   * Fetch all bookmarks for user
   */
  async getUserBookmarks(userId: string): Promise<Bookmark[]> {
    const bookmarksRef = collection(db, 'users', userId, 'bookmarks');
    try {
      const snap = await getDocs(bookmarksRef);
      const bookmarks: Bookmark[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        bookmarks.push({
          id: d.id,
          questionId: d.questionId,
          createdAt: d.createdAt,
          notes: d.notes,
          question: {} as any, // rehydrated from question bank
        });
      });
      return bookmarks;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `users/${userId}/bookmarks`);
      return [];
    }
  },
};
