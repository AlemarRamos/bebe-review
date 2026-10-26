import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Crown,
  GraduationCap,
  Info,
} from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { auth, oAuthClientId } from '../lib/firebase';
import { PERMANENT_ADMIN_EMAIL } from '../services/cloudStorage';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authModalMode,
    openLoginModal,
    openRegisterModal,
    closeAuthModal,
    loginWithGoogle,
    loginWithGoogleCredential,
    loginWithEmail,
    registerWithEmail,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [storagePartitionWarning, setStoragePartitionWarning] = useState(false);

  const googleBtnRef = useRef<HTMLDivElement>(null);

  const isRegister = authModalMode === 'register';

  // Initialize Google Identity Services (GIS) button when modal opens
  useEffect(() => {
    if (!authModalOpen) return;

    let mounted = true;

    const setupGis = () => {
      const google = (window as any).google;
      if (google?.accounts?.id && oAuthClientId && googleBtnRef.current && mounted) {
        try {
          google.accounts.id.initialize({
            client_id: oAuthClientId,
            callback: async (res: { credential?: string }) => {
              if (res.credential) {
                setIsLoading(true);
                setErrorMessage(null);
                setSuccessMessage(null);
                try {
                  await loginWithGoogleCredential(res.credential);
                } catch (err: any) {
                  console.error('GIS sign-in error:', err);
                  setErrorMessage(err.message || 'Google authentication failed. Please use email/password.');
                } finally {
                  if (mounted) setIsLoading(false);
                }
              }
            },
          });

          googleBtnRef.current.innerHTML = '';
          google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'large',
            width: googleBtnRef.current.clientWidth || 360,
            text: isRegister ? 'signup_with' : 'signin_with',
            shape: 'rectangular',
          });
        } catch (e) {
          console.warn('GIS button render caught:', e);
        }
      }
    };

    setupGis();
    const timer = setInterval(() => {
      if ((window as any).google?.accounts?.id && googleBtnRef.current) {
        setupGis();
        clearInterval(timer);
      }
    }, 400);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [authModalOpen, isRegister]);

  if (!authModalOpen) return null;

  const handleQuickFillAdmin = () => {
    setEmail(PERMANENT_ADMIN_EMAIL);
    if (!password) {
      setPassword('admin123456');
    }
    if (isRegister && !displayName) {
      setDisplayName('Alemar Ramos (Administrator)');
    }
    setErrorMessage(null);
    setSuccessMessage('Admin email loaded. Enter your admin password to proceed.');
  };

  const handleQuickFillStudent = () => {
    setEmail('examinee.bsn@phinma.edu.ph');
    if (!password) {
      setPassword('phinma2026');
    }
    if (isRegister && !displayName) {
      setDisplayName('Maria Santos, BSN');
    }
    setErrorMessage(null);
    setSuccessMessage('Student demo email loaded.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!displayName.trim()) {
          setErrorMessage('Please enter your candidate name or nickname.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMessage('Password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }
        await registerWithEmail(email, password, displayName);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = 'Authentication failed. Please check your credentials and try again.';
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        msg = isRegister
          ? 'Unable to complete registration. Please check your inputs.'
          : 'Invalid credentials. If this is your first time logging in with this email, please click "Register New Account" above to set up your password.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Please switch to "Sign In" to enter your password.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Access temporarily restricted due to multiple failed attempts. Please wait a moment or reset your password.';
      } else if (err.message && err.message.includes('auth/operation-not-allowed')) {
        msg = 'Email/password authentication is not enabled. Please contact administrator.';
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGooglePopupSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Google popup sign-in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Sign-in popup was closed before completion.');
      } else if (
        err.message?.includes('missing initial state') ||
        err.message?.includes('sessionStorage') ||
        err.code === 'auth/missing-initial-state'
      ) {
        setStoragePartitionWarning(true);
        setErrorMessage(
          'Your browser isolated third-party storage in this frame. Please use the Student Email / Password login below for 100% reliable direct access.'
        );
      } else {
        setErrorMessage(err.message || 'Unable to sign in with Google. Please use email/password below.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMessage('Please type your email address first to receive a password reset link.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMessage(`Password reset link sent to ${email.trim()}. Please check your inbox or spam folder.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not send password reset email. Please verify the email address.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={closeAuthModal}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-teal-200 border border-white/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200">
                Data Protection & Cloud Sync
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
                {isRegister ? 'Register BSN Candidate' : 'Sign In to Your Account'}
              </h2>
            </div>
          </div>

          <p className="text-xs text-teal-100/90 leading-relaxed font-normal">
            Securely save test progress, review rationales, and monitor PNLE pre-board competencies across all devices.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setSuccessMessage(null);
              openLoginModal();
            }}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              !isRegister
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setSuccessMessage(null);
              openRegisterModal();
            }}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              isRegister
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Quick Fill Shortcuts */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Info className="w-3 h-3 text-teal-600" />
                <span>Quick Fill For 2 System Roles:</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickFillAdmin}
                className="py-1.5 px-2 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl text-left transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs group"
                title="Fill Permanent System Administrator credentials"
              >
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Crown className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 group-hover:text-teal-900 leading-tight truncate">
                    Administrator
                  </p>
                  <p className="text-[9px] text-slate-500 truncate">alemarramos070624...</p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleQuickFillStudent}
                className="py-1.5 px-2 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl text-left transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs group"
                title="Fill BSN Student Candidate credentials"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 group-hover:text-teal-900 leading-tight truncate">
                    BSN Student
                  </p>
                  <p className="text-[9px] text-slate-500 truncate">examinee.bsn@...</p>
                </div>
              </button>
            </div>
          </div>

          {/* GIS Native Google Button Container */}
          <div className="space-y-2">
            <div ref={googleBtnRef} className="w-full flex justify-center min-h-[40px]" />

            {/* Fallback Google Button if GIS isn't loaded */}
            {(!googleBtnRef.current || !googleBtnRef.current.children.length) && (
              <button
                type="button"
                onClick={handleGooglePopupSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              or with email & password
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Success Notification */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Notification */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span>{errorMessage}</span>
                {storagePartitionWarning && (
                  <p className="text-[11px] text-rose-800 font-medium">
                    Tip: Email and password sign-in is not affected by cross-origin cookie restrictions and operates continuously.
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name / BSN Candidate Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g., Maria Clara Santos, BSN"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@phinma.edu.ph"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : isRegister ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Register & Secure Cloud Profile</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In & Restore Progress</span>
                </>
              )}
            </button>
          </form>

          {/* Cloud Protection Notice */}
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100 text-[11px] text-teal-800 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Zero Data Loss Guarantee</strong>: All question answers, bookmark flags, and test runs are preserved locally on this device and seamlessly synchronized with your cloud account upon login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
