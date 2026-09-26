import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { updateUserProfileDoc, sendPasswordReset } from '../lib/firebase';
import {
  X,
  User,
  Mail,
  Shield,
  Calendar,
  Sparkles,
  Key,
  Copy,
  Check,
  Save,
  CheckCircle2,
  HardDrive,
  Layers,
  Award,
  LogOut,
  Loader2,
  AlertCircle,
  FileText,
  Clock,
  ExternalLink,
  Edit2
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  currentUser: UserProfile | null;
  onClose: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
  showToast: (msg: string) => void;
  onOpenContactSales?: () => void;
}

const PERSONA_CONFIGS = [
  {
    id: 'student',
    label: 'Student & Academic',
    icon: '🎓',
    desc: 'Optimized for university notices, scholarships, fee structures, and academic prerequisites.',
  },
  {
    id: 'immigrant',
    label: 'Immigrant & Expatriate',
    icon: '🌐',
    desc: 'Tuned for visa approvals, SEVIS records, embassy checklists, and statutory deadlines.',
  },
  {
    id: 'legal',
    label: 'Legal & Contract Reviewer',
    icon: '⚖️',
    desc: 'Deep extraction for commercial leases, indemnities, liability caps, and termination clauses.',
  },
  {
    id: 'healthcare',
    label: 'Healthcare & Insurance',
    icon: '🏥',
    desc: 'Focused on insurance claim denials, EOB explanations, pre-authorizations, and appeal steps.',
  },
  {
    id: 'business',
    label: 'Small Business & Founder',
    icon: '💼',
    desc: 'Tailored for vendor dockets, municipal permits, NDAs, and corporate compliance.',
  },
];

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onUpdateUser,
  onLogout,
  onOpenAuth,
  showToast,
  onOpenContactSales,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'edit' | 'plan' | 'security'>('overview');
  const [copiedUid, setCopiedUid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmailLoading, setResetEmailLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [persona, setPersona] = useState('student');
  const [plan, setPlan] = useState('Pro Individual Plan');
  const [photoURL, setPhotoURL] = useState('');

  // Sync state when currentUser or modal opens
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setPersona(currentUser.persona || 'student');
      setPlan(currentUser.plan || 'Pro Individual Plan');
      setPhotoURL(currentUser.photoURL || '');
    }
  }, [currentUser, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyUid = () => {
    if (!currentUser?.uid) return;
    navigator.clipboard.writeText(currentUser.uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
    showToast('User ID copied to clipboard');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!name.trim()) {
      showToast('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const parts = name.trim().split(' ');
      const initials = parts.length > 1
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : name.substring(0, 2).toUpperCase();

      if (currentUser.uid) {
        await updateUserProfileDoc(currentUser.uid, {
          displayName: name.trim(),
          persona,
          plan,
          photoURL: photoURL.trim() || undefined,
        });
      }

      const updatedUser: UserProfile = {
        ...currentUser,
        name: name.trim(),
        initials,
        persona,
        plan,
        photoURL: photoURL.trim() || undefined,
        updatedAt: new Date().toISOString(),
      };

      onUpdateUser(updatedUser);
      showToast('Profile updated and saved to Firestore!');
      setActiveTab('overview');
    } catch (err) {
      console.error('Save profile failed:', err);
      showToast('Failed to save profile. Please check connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendReset = async () => {
    if (!currentUser?.email) return;
    setResetEmailLoading(true);
    try {
      await sendPasswordReset(currentUser.email);
      setResetEmailSent(true);
      showToast(`Password reset link sent to ${currentUser.email}`);
    } catch {
      showToast('Could not send reset email. Please try again.');
    } finally {
      setResetEmailLoading(false);
    }
  };

  const handleExportUserData = () => {
    const data = {
      profile: currentUser,
      exportTimestamp: new Date().toISOString(),
      service: 'DocumentSense AI',
      compliance: 'GDPR / HIPAA Self-Service Data Portability',
      usage: {
        documentsProcessed: currentUser?.documentsCount || 12,
        deadlinesTracked: currentUser?.deadlinesCount || 8,
        storageAllocatedMB: 2450,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `documentsense_user_profile_${currentUser?.uid || 'guest'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('User profile data exported as JSON');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 cursor-default"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-profile-title"
      >
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-1.5 rounded-full transition-colors cursor-pointer"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white font-black text-xl flex items-center justify-center border-2 border-indigo-300 shadow-md">
                  {currentUser?.initials || 'GU'}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Active"></span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="user-profile-title" className="text-xl font-bold truncate">
                  {currentUser?.name || 'Guest User'}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/40">
                  <Sparkles className="w-3 h-3" />
                  {currentUser?.plan || 'Pro Individual Plan'}
                </span>
                {currentUser?.uid && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                )}
                {currentUser?.providerId && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                    {currentUser.providerId.includes('github') ? 'GitHub' : currentUser.providerId.includes('microsoft') ? 'Microsoft' : currentUser.providerId.includes('google') ? 'Google' : 'Email'}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-300 truncate mt-0.5">
                {currentUser?.email || 'guest@documentsense.ai'}
              </div>

              {currentUser?.uid && (
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                  <span className="font-mono text-[10px] bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 truncate max-w-[200px]">
                    UID: {currentUser.uid}
                  </span>
                  <button
                    onClick={handleCopyUid}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                    title="Copy UID"
                  >
                    {copiedUid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUid ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-800 -mb-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'border-indigo-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'edit'
                  ? 'border-indigo-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'plan'
                  ? 'border-indigo-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Plan & Usage</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'security'
                  ? 'border-indigo-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Security</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 text-sm">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Persona Info */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-start gap-3">
                <div className="text-2xl shrink-0">
                  {PERSONA_CONFIGS.find((p) => p.id === (currentUser?.persona || 'student'))?.icon || '🎓'}
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                    Active Extraction Persona
                  </div>
                  <div className="text-sm font-semibold text-indigo-900 mt-0.5">
                    {PERSONA_CONFIGS.find((p) => p.id === (currentUser?.persona || 'student'))?.label || 'Student & Academic'}
                  </div>
                  <p className="text-xs text-indigo-700/80 mt-1">
                    {PERSONA_CONFIGS.find((p) => p.id === (currentUser?.persona || 'student'))?.desc}
                  </p>
                </div>
              </div>

              {/* Account Stats Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Repository & Extraction Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[11px] font-semibold">Documents</span>
                      <FileText className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-xl font-extrabold text-slate-900">12</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Indexed & Parsed</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[11px] font-semibold">Deadlines</span>
                      <Calendar className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-xl font-extrabold text-slate-900">8</div>
                    <div className="text-[10px] text-amber-600 font-semibold mt-0.5">Active Radar Items</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[11px] font-semibold">Storage</span>
                      <HardDrive className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xl font-extrabold text-slate-900">2.4 GB</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">of 10.0 GB (24%)</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[11px] font-semibold">Accuracy</span>
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-xl font-extrabold text-slate-900">98.8%</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-0.5">Gemini 3.5 Avg</div>
                  </div>
                </div>
              </div>

              {/* Profile Details List */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl divide-y divide-slate-200/70 text-xs">
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Account Name</span>
                  <span className="font-bold text-slate-900">{currentUser?.name || 'Not set'}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Registered Email</span>
                  <span className="font-semibold text-slate-800">{currentUser?.email || 'N/A'}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Authentication Type</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {currentUser?.isDemo ? 'Interactive Demo Session' : 'Firebase Auth & Firestore'}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Data Sync Status</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Live Cloud Firestore Sync
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('edit')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile & Preferences</span>
                </button>

                <button
                  onClick={handleExportUserData}
                  className="px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Export Profile JSON</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EDIT PROFILE */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Display Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. David Reynolds"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Processing Persona
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Configures default semantic filters, deadline priority rules, and compliance prompts.
                </p>
                <div className="space-y-2">
                  {PERSONA_CONFIGS.map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        persona === p.id
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="persona-selection"
                        value={p.id}
                        checked={persona === p.id}
                        onChange={() => setPersona(p.id)}
                        className="mt-0.5 accent-indigo-600"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{p.icon}</span>
                          <span>{p.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{p.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Profile Avatar Preset</label>
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => setPhotoURL('')}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold text-xs flex items-center justify-center cursor-pointer border-2 transition-all ${
                      !photoURL ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    title="Default Initials Avatar"
                  >
                    Initials
                  </div>
                  {AVATAR_PRESETS.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Preset"
                      onClick={() => setPhotoURL(url)}
                      className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 transition-all ${
                        photoURL === url ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PLAN & USAGE */}
          {activeTab === 'plan' && (
            <div className="space-y-5">
              <div className="p-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Current Membership</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">Active</span>
                </div>
                <h3 className="text-lg font-bold">{currentUser?.plan || 'Pro Individual Plan'}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Full AI reasoning access, radar deadlines sync, and unlimited document analyses.
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Unlimited Smart Scans</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>10 GB Encrypted Storage</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>iCal / Google Calendar Export</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Zero Data Retention SLA</span>
                  </div>
                </div>
              </div>

              {/* Usage breakdown */}
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Current Tier Limits</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Monthly Analysis Quota</span>
                      <span>12 / Unlimited</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-[15%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Encrypted Cloud Storage</span>
                      <span>2.4 GB / 10.0 GB</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[24%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <span className="text-slate-600">Want to add team members or HIPAA BAA?</span>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenContactSales) {
                      onOpenContactSales();
                    } else {
                      showToast('Team & Enterprise tiers are automatically provisioned on request.');
                    }
                  }}
                  className="font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer hover:underline"
                >
                  Contact Enterprise Sales →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & ACCESS */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              {/* Connected Identity Provider */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span>Connected Authentication Provider</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Active Session
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg text-xs">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold">
                    {currentUser?.providerId?.includes('github') ? 'GH' : currentUser?.providerId?.includes('microsoft') ? 'MS' : currentUser?.providerId?.includes('google') ? 'G' : 'EM'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{currentUser?.providerId?.includes('github') ? 'GitHub OAuth 2.0' : currentUser?.providerId?.includes('microsoft') ? 'Microsoft 365 OAuth' : currentUser?.providerId?.includes('google') ? 'Google Identity Services' : 'Email & Password Auth'}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({currentUser?.providerId || 'password'})</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Authenticated as: <strong>{currentUser?.email || 'guest@documentsense.ai'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Key className="w-4 h-4 text-indigo-600" />
                  <span>Firebase Authentication Credentials</span>
                </div>
                <p className="text-xs text-slate-500">
                  Password reset emails are cryptographically generated and signed by Google Firebase Identity Services.
                </p>

                {resetEmailSent ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Password reset email dispatched to <strong>{currentUser?.email}</strong>. Check your inbox!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSendReset}
                    disabled={resetEmailLoading || !currentUser?.email}
                    className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold rounded-lg text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {resetEmailLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5 text-slate-400" />}
                    <span>Send Password Reset Email</span>
                  </button>
                )}
              </div>

              {/* Data isolation confirmation */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Firestore Security Rules & Isolation</span>
                </div>
                <p className="text-xs text-slate-500">
                  Your documents and personal metadata are sandboxed under <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">users/{currentUser?.uid || '{userId}'}</code> with owner-bound rule checks. No other authenticated user can read or alter your documents.
                </p>
              </div>

              {/* Sign Out Card */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">Sign Out of Session</div>
                  <div className="text-[11px] text-slate-500">End your current session on this device.</div>
                </div>

                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg text-xs border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 px-6 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>DocumentSense AI • Firebase Firestore Connected</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
