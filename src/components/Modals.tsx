import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  sendPasswordReset
} from '../lib/firebase';
import {
  X,
  CloudUpload,
  Brain,
  Zap,
  Lock,
  GraduationCap,
  ScrollText,
  ShieldAlert,
  Shield,
  Globe,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  FileText,
  Loader2
} from 'lucide-react';

interface ModalsProps {
  // Upload modal
  isUploadOpen: boolean;
  onCloseUpload: () => void;
  onSelectSampleAndScan: (key: string) => void;
  onCustomFileAnalyze: (file: File) => void;
  onCustomTextAnalyze: (text: string, title: string) => void;

  // Auth modal
  isAuthOpen: boolean;
  authTab: 'login' | 'register' | 'forgot';
  setAuthTab: (tab: 'login' | 'register' | 'forgot') => void;
  onCloseAuth: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  isUploadOpen,
  onCloseUpload,
  onSelectSampleAndScan,
  onCustomFileAnalyze,
  onCustomTextAnalyze,
  isAuthOpen,
  authTab,
  setAuthTab,
  onCloseAuth,
  onLoginSuccess
}) => {
  // Upload modal state
  const [pasteText, setPasteText] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Auth modal state
  const [loginEmail, setLoginEmail] = useState('david.reynolds@example.com');
  const [loginPassword, setLoginPassword] = useState('demo12345');
  const [showPassword, setShowPassword] = useState(false);
  const [authAlert, setAuthAlert] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPersona, setRegPersona] = useState('student');
  const [regTerms, setRegTerms] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');

  // Password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score: 2, label: 'Good', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const handleSimulatedScanProcess = (callback: () => void) => {
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 500);
    setTimeout(() => setScanStep(3), 1000);
    setTimeout(() => setScanStep(4), 1500);
    setTimeout(() => setScanStep(5), 2000);
    setTimeout(() => {
      setIsScanning(false);
      setScanStep(0);
      onCloseUpload();
      callback();
    }, 2500);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      uid: 'demo-user-12345',
      name: 'David Reynolds',
      email: 'david.reynolds@example.com',
      plan: 'Pro Individual Plan',
      initials: 'DR',
      isDemo: true
    };
    onLoginSuccess(demoUser);
    onCloseAuth();
  };

  const handleGoogleLogin = async () => {
    setAuthAlert(null);
    setIsAuthLoading(true);
    try {
      const user = await loginWithGoogle();
      const displayName = user.displayName || user.email?.split('@')[0] || 'Google User';
      const parts = displayName.split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : displayName.substring(0, 2).toUpperCase();

      const profile: UserProfile = {
        uid: user.uid,
        name: displayName,
        email: user.email || '',
        photoURL: user.photoURL || undefined,
        plan: 'Pro Individual Plan',
        initials,
        providerId: 'google.com',
      };

      onLoginSuccess(profile);
      onCloseAuth();
    } catch (err: unknown) {
      const errCode = (err as { code?: string })?.code || '';
      const errorMsg = err instanceof Error ? err.message : String(err);

      if (
        errCode === 'auth/popup-closed-by-user' ||
        errorMsg.includes('popup-closed-by-user') ||
        errorMsg.includes('closed-by-user')
      ) {
        setAuthAlert({
          text: 'Google Sign-in window was closed before completing authentication. Click below to try again or use the Instant Demo Access.',
          type: 'error'
        });
      } else if (
        errCode === 'auth/popup-blocked' ||
        errorMsg.includes('popup-blocked')
      ) {
        setAuthAlert({
          text: 'The sign-in popup was blocked by your browser. Please allow popups for this site, or use the 1-Click Instant Demo Login.',
          type: 'error'
        });
      } else if (
        errCode === 'auth/cancelled-popup-request' ||
        errorMsg.includes('cancelled-popup-request')
      ) {
        setAuthAlert({
          text: 'Previous popup request was replaced. Please try clicking Google sign-in again.',
          type: 'error'
        });
      } else if (
        errCode === 'auth/unauthorized-domain' ||
        errorMsg.includes('unauthorized-domain')
      ) {
        setAuthAlert({
          text: 'Current domain is not authorized in Firebase OAuth settings. You can sign in instantly with 1-Click Instant Demo Login or Email/Password.',
          type: 'error'
        });
      } else {
        setAuthAlert({ text: `Google Sign-In: ${errorMsg}`, type: 'error' });
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleEmailLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthAlert(null);
    if (!loginEmail || !loginPassword) {
      setAuthAlert({ text: 'Please fill in both email and password.', type: 'error' });
      return;
    }

    setIsAuthLoading(true);
    try {
      const user = await loginWithEmail(loginEmail, loginPassword);
      const displayName = user.displayName || user.email?.split('@')[0] || 'User';
      const parts = displayName.split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : displayName.substring(0, 2).toUpperCase();

      const profile: UserProfile = {
        uid: user.uid,
        name: displayName,
        email: user.email || loginEmail,
        photoURL: user.photoURL || undefined,
        plan: 'Pro Individual Plan',
        initials,
      };

      onLoginSuccess(profile);
      onCloseAuth();
    } catch (err: unknown) {
      const errCode = (err as { code?: string })?.code || '';
      const errMsg = err instanceof Error ? err.message : String(err);

      if (errCode === 'auth/user-not-found' || errCode === 'auth/invalid-credential') {
        setAuthAlert({
          text: 'Account not found or password incorrect. Try registering or use 1-Click Demo Login.',
          type: 'error'
        });
      } else if (errCode === 'auth/wrong-password') {
        setAuthAlert({ text: 'Incorrect password. Please try again or reset.', type: 'error' });
      } else {
        setAuthAlert({ text: errMsg, type: 'error' });
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthAlert(null);
    if (!regTerms) {
      setAuthAlert({ text: 'Please agree to the Terms of Service & Privacy Policy.', type: 'error' });
      return;
    }
    if (regPassword.length < 8) {
      setAuthAlert({ text: 'Password must be at least 8 characters long.', type: 'error' });
      return;
    }

    setIsAuthLoading(true);
    try {
      const user = await registerWithEmail(regEmail, regPassword, regName, regPersona);
      const displayName = regName.trim() || user.displayName || 'New User';
      const parts = displayName.split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : displayName.substring(0, 2).toUpperCase();

      const profile: UserProfile = {
        uid: user.uid,
        name: displayName,
        email: user.email || regEmail,
        plan: 'Pro Individual Plan',
        initials,
        persona: regPersona
      };

      onLoginSuccess(profile);
      onCloseAuth();
    } catch (err: unknown) {
      const errCode = (err as { code?: string })?.code || '';
      const errMsg = err instanceof Error ? err.message : String(err);

      if (errCode === 'auth/email-already-in-use') {
        setAuthAlert({ text: 'An account with this email already exists. Please sign in.', type: 'error' });
      } else {
        setAuthAlert({ text: errMsg, type: 'error' });
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthAlert(null);
    if (!forgotEmail) {
      setAuthAlert({ text: 'Please enter your email address.', type: 'error' });
      return;
    }

    setIsAuthLoading(true);
    try {
      await sendPasswordReset(forgotEmail);
      setAuthAlert({
        text: `Password reset email sent to ${forgotEmail}. Please check your inbox.`,
        type: 'success'
      });
      setTimeout(() => {
        setAuthTab('login');
      }, 2500);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setAuthAlert({ text: errMsg, type: 'error' });
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <>
      {/* 1. UPLOAD & SCANNER MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CloudUpload className="w-4 h-4 text-indigo-600" />
                <span>Upload Document for AI Intelligence Analysis</span>
              </h3>
              <button onClick={onCloseUpload} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {!isScanning ? (
                <div className="space-y-4">
                  {/* File Dropzone */}
                  <label className="border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-6 text-center cursor-pointer block bg-slate-50/50 hover:bg-indigo-50/30 transition-all">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.txt,.png,.jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const file = e.target.files[0];
                          handleSimulatedScanProcess(() => onCustomFileAnalyze(file));
                        }
                      }}
                    />
                    <CloudUpload className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                    <h4 className="text-xs font-bold text-slate-800">Select Document or Drag & Drop</h4>
                    <p className="text-[11px] text-slate-500 mb-3">PDF, DOCX, JPG, PNG, TXT up to 50MB</p>
                    <div className="inline-flex gap-3 text-[10px] text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> 5-sec scan</span>
                      <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-500" /> 256-bit AES</span>
                    </div>
                  </label>

                  {/* Or paste text */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>Or paste document text directly:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Document title (optional)"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                    />
                    <textarea
                      rows={3}
                      placeholder="Paste contract clauses, scholarship guidelines, or circular text..."
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                      className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                    ></textarea>
                    {pasteText.trim() && (
                      <button
                        onClick={() => {
                          handleSimulatedScanProcess(() =>
                            onCustomTextAnalyze(pasteText.trim(), customTitle.trim() || 'Pasted Document')
                          );
                        }}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
                      >
                        Analyze Pasted Document with Gemini AI
                      </button>
                    )}
                  </div>

                  <div className="relative text-center my-4 before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-slate-200">
                    <span className="relative bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      OR TEST A PRELOADED SAMPLE
                    </span>
                  </div>

                  {/* Sample selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div
                      onClick={() => handleSimulatedScanProcess(() => onSelectSampleAndScan('scholarship'))}
                      className="p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 cursor-pointer flex items-center gap-2.5 transition-all"
                    >
                      <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">Govt Scholarship Circular</div>
                        <div className="text-[10px] text-slate-500">Merit grant rules & income cut-off</div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleSimulatedScanProcess(() => onSelectSampleAndScan('lease'))}
                      className="p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 cursor-pointer flex items-center gap-2.5 transition-all"
                    >
                      <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                        <ScrollText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">Office Space Lease</div>
                        <div className="text-[10px] text-slate-500">Deposit & CAM escalation terms</div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleSimulatedScanProcess(() => onSelectSampleAndScan('insurance'))}
                      className="p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 cursor-pointer flex items-center gap-2.5 transition-all"
                    >
                      <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">Health Insurance Denial</div>
                        <div className="text-[10px] text-slate-500">Waiting period appeal directive</div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleSimulatedScanProcess(() => onSelectSampleAndScan('visa'))}
                      className="p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 cursor-pointer flex items-center gap-2.5 transition-all"
                    >
                      <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">Visa Form I-20 Notice</div>
                        <div className="text-[10px] text-slate-500">Financial proof & travel dates</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Multi-stage scanner animation */
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto relative">
                    <Brain className="w-8 h-8 animate-pulse" />
                    <span className="w-full h-full rounded-full border-2 border-indigo-500 absolute inset-0 animate-ping opacity-30"></span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Neural Document Processing...</h4>
                    <p className="text-xs text-slate-500">Extracting clauses and checking regulatory databases</p>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden max-w-sm mx-auto">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${(scanStep / 5) * 100}%` }}
                    ></div>
                  </div>

                  <div className="space-y-2 text-left max-w-sm mx-auto text-xs">
                    <div className={`flex items-center gap-2 ${scanStep >= 1 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Multi-layer OCR & Character Recognition
                    </div>
                    <div className={`flex items-center gap-2 ${scanStep >= 2 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Identifying Deadlines & Cut-off Dates
                    </div>
                    <div className={`flex items-center gap-2 ${scanStep >= 3 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Detecting Required Certificates & ID Proofs
                    </div>
                    <div className={`flex items-center gap-2 ${scanStep >= 4 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Translating Legal Jargon into Plain English
                    </div>
                    <div className={`flex items-center gap-2 ${scanStep >= 5 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Auditing for Missing Signatures & Gaps
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. AUTH MODAL (LOGIN / REGISTER) */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-sm text-slate-900">DocumentSense AI</span>
              </div>
              <button onClick={onCloseAuth} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 p-1 text-xs font-bold">
              <button
                onClick={() => setAuthTab('login')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authTab === 'login' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthTab('register')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authTab === 'register' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="p-6">
              {/* 1-Click Demo Login Banner */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-3 flex items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" /> Instant Demo Access
                  </div>
                  <div className="text-xs text-indigo-900">Sign in as <strong>David Reynolds</strong> (Pro Plan)</div>
                </div>
                <button
                  onClick={handleQuickDemoLogin}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  1-Click Sign In
                </button>
              </div>

              {/* Google Sign-in / Create Account Button */}
              <div className="space-y-2 mb-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isAuthLoading}
                  className="w-full py-3 px-4 text-xs font-bold border border-slate-300 hover:border-slate-400 rounded-xl flex items-center justify-center gap-3 text-slate-800 bg-white hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50 shadow-xs hover:shadow-md group"
                >
                  {isAuthLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  )}
                  <span>
                    {isAuthLoading
                      ? 'Authenticating with Google...'
                      : authTab === 'login'
                      ? 'Sign in with Google Account'
                      : 'Create account with Google'}
                  </span>
                </button>
              </div>

              <div className="relative text-center my-4 before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-slate-200">
                <span className="relative bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  OR WITH EMAIL
                </span>
              </div>

              {authAlert && (
                <div className={`p-2.5 rounded-lg text-xs mb-3 flex items-start gap-2 ${
                  authAlert.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{authAlert.text}</span>
                </div>
              )}

              {/* Login Form */}
              {authTab === 'login' && (
                <form onSubmit={handleEmailLoginSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-700 font-semibold">Password</label>
                      <button
                        type="button"
                        onClick={() => setAuthTab('forgot')}
                        className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 pr-9"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAuthLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isAuthLoading ? 'Signing In...' : 'Sign In to DocumentSense'}</span>
                  </button>
                </form>
              )}

              {/* Register Form */}
              {authTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="alex@university.edu"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="At least 8 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      required
                    />
                    {/* Password Strength Indicator */}
                    {regPassword && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden flex gap-0.5">
                          <div className={`flex-1 ${getPasswordStrength(regPassword).score >= 1 ? getPasswordStrength(regPassword).color : 'bg-slate-200'}`}></div>
                          <div className={`flex-1 ${getPasswordStrength(regPassword).score >= 2 ? getPasswordStrength(regPassword).color : 'bg-slate-200'}`}></div>
                          <div className={`flex-1 ${getPasswordStrength(regPassword).score >= 3 ? getPasswordStrength(regPassword).color : 'bg-slate-200'}`}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{getPasswordStrength(regPassword).label}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Primary Document Focus</label>
                    <select
                      value={regPersona}
                      onChange={(e) => setRegPersona(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-slate-700"
                    >
                      <option value="student">🎓 Student & University Scholarships</option>
                      <option value="immigrant">✈️ Visa, Immigration & Travel Filings</option>
                      <option value="legal">⚖️ Contracts, Property Leases & Real Estate</option>
                      <option value="healthcare">🛡️ Health Insurance Claims & Grievances</option>
                      <option value="business">🏢 Small Business & Tax Filings</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms-check"
                      checked={regTerms}
                      onChange={(e) => setRegTerms(e.target.checked)}
                      className="accent-indigo-600 rounded"
                    />
                    <label htmlFor="terms-check" className="text-[11px] text-slate-600">
                      I agree to the Terms of Service & Privacy Policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAuthLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isAuthLoading ? 'Creating Account...' : 'Create Free Account'}</span>
                  </button>
                </form>
              )}

              {/* Forgot Password Form */}
              {authTab === 'forgot' && (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Reset Password</h4>
                    <p className="text-slate-500 text-[11px] mb-3">
                      Enter your account email and we'll send you a secure Firebase password reset link.
                    </p>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAuthLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isAuthLoading ? 'Sending...' : 'Send Password Reset Link'}</span>
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setAuthTab('login')}
                      className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
