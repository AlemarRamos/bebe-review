import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, PlusSquare, X, Smartphone, CheckCircle2 } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // If already installed or user dismissed banner for this session, hide
  if (isInstalled || isDismissed) {
    return null;
  }

  // Only show if installable or iOS Safari
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-900 text-white px-3 sm:px-4 py-2.5 sm:py-3 shadow-md border-b border-teal-600/40 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-teal-200" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold tracking-tight truncate flex items-center gap-1.5">
                <span>Install PNLE 500 App</span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 bg-teal-500/30 text-teal-200 text-[10px] rounded uppercase font-bold tracking-wider">
                  Offline-Ready
                </span>
              </p>
              <p className="text-[11px] text-teal-100/80 truncate">
                Practice pre-board exams anywhere on your phone like a native app.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isInstallable && (
              <button
                type="button"
                onClick={install}
                className="inline-flex items-center gap-1.5 bg-white text-teal-900 hover:bg-teal-50 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-teal-700" />
                <span>Install</span>
              </button>
            )}

            {isIOS && (
              <button
                type="button"
                onClick={() => setShowIOSModal(true)}
                className="inline-flex items-center gap-1.5 bg-white text-teal-900 hover:bg-teal-50 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-teal-700" />
                <span>Add to Home Screen</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1.5 text-teal-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Guided Install Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Install on iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Install the Philippine Nurse Licensure Exam app to your home screen for quick offline access, full-screen view, and no browser URL bar:
            </p>

            <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  Tap the <strong className="text-slate-900">Share</strong> button{' '}
                  <span className="inline-flex items-center p-0.5 bg-slate-200 rounded">
                    <Share2 className="w-3 h-3 text-slate-800" />
                  </span>{' '}
                  in your Safari navigation bar.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  Scroll down the menu and tap <strong className="text-slate-900">"Add to Home Screen"</strong>{' '}
                  <span className="inline-flex items-center p-0.5 bg-slate-200 rounded">
                    <PlusSquare className="w-3 h-3 text-slate-800" />
                  </span>.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  Tap <strong className="text-slate-900">"Add"</strong> in the top-right corner to finish.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
