import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { CloudStorageService } from '../services/cloudStorage';
import { StorageService } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSyncing: boolean;
  syncNotice: string | null;
  dismissSyncNotice: () => void;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openLoginModal = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const dismissSyncNotice = () => {
    setSyncNotice(null);
  };

  // Sync local offline attempts and bookmarks to cloud after login
  const syncLocalDataToCloud = async (authenticatedUser: User) => {
    try {
      setIsSyncing(true);
      const localHistory = StorageService.getExamHistory();
      const localActive = StorageService.getActiveExam();
      const localBookmarks = StorageService.getBookmarks();

      let syncedAttempts = 0;
      let syncedBookmarks = 0;

      // Save user profile first
      await CloudStorageService.saveUserProfile(authenticatedUser);

      // Sync active exam if exists
      if (localActive) {
        await CloudStorageService.saveExamAttempt(authenticatedUser.uid, localActive);
      }

      // Sync completed attempts
      for (const attempt of localHistory) {
        await CloudStorageService.saveExamAttempt(authenticatedUser.uid, attempt);
        syncedAttempts++;
      }

      // Sync bookmarks
      for (const bm of localBookmarks) {
        await CloudStorageService.saveBookmark(authenticatedUser.uid, bm);
        syncedBookmarks++;
      }

      if (syncedAttempts > 0 || syncedBookmarks > 0) {
        setSyncNotice(
          `Secure Sync Complete: ${syncedAttempts} exam attempt(s) and ${syncedBookmarks} bookmark(s) saved to your cloud profile.`
        );
      } else {
        setSyncNotice('Account connected: Cloud backup active for all future exam sessions.');
      }
    } catch (e) {
      console.error('Data sync warning:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        await syncLocalDataToCloud(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      await CloudStorageService.saveUserProfile(result.user);
      await syncLocalDataToCloud(result.user);
    }
    setAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
    if (result.user) {
      await CloudStorageService.saveUserProfile(result.user);
      await syncLocalDataToCloud(result.user);
    }
    setAuthModalOpen(false);
  };

  const registerWithEmail = async (email: string, pass: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (result.user) {
      await updateProfile(result.user, {
        displayName: displayName.trim() || 'BSN Student',
      });
      await CloudStorageService.saveUserProfile(result.user, displayName.trim());
      await syncLocalDataToCloud(result.user);
    }
    setAuthModalOpen(false);
  };

  const logout = async () => {
    await signOut(auth);
    setSyncNotice(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSyncing,
        syncNotice,
        dismissSyncNotice,
        authModalOpen,
        authModalMode,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
