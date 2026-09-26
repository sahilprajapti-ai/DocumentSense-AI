import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { submitSalesInquiry } from '../lib/firebase';
import {
  X,
  Shield,
  Building2,
  Mail,
  User,
  Phone,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Lock,
  Copy,
  Check,
  Loader2,
  Calendar,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ContactSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  showToast: (msg: string) => void;
}

const USE_CASES = [
  'Legal Contracts & Commercial Leases',
  'Government Circulars & Public Grants',
  'Healthcare Policies & Claims Appeals',
  'Visa, Immigration & SEVIS Filings',
  'University Admissions & Academic Regulations',
  'Enterprise Procurement & Vendor Compliance',
];

const COMPLIANCE_OPTIONS = [
  'SOC2 Type II Certified',
  'HIPAA Compliance (BAA)',
  'Zero Data Retention Option',
  'Dedicated Cloud / Single Tenant VPC',
  'Custom REST API & Webhook Endpoints',
  'Single Sign-On (SAML / Okta)',
];

export const ContactSalesModal: React.FC<ContactSalesModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  showToast,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [teamSize, setTeamSize] = useState('10-50');
  const [volume, setVolume] = useState('500-2500');
  const [useCase, setUseCase] = useState(USE_CASES[0]);
  const [selectedCompliance, setSelectedCompliance] = useState<string[]>([
    'SOC2 Type II Certified',
    'Zero Data Retention Option',
  ]);
  const [message, setMessage] = useState('');
  const [timeline, setTimeline] = useState('Within 1-2 weeks');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prepopulate from currentUser when opening
  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setFullName(currentUser.name || '');
        setEmail(currentUser.email || '');
      }
      setSubmittedTicket(null);
      setErrorMessage(null);
    }
  }, [isOpen, currentUser]);

  // Handle ESC key
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

  const toggleCompliance = (item: string) => {
    setSelectedCompliance((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const calculateEstimatedHours = () => {
    switch (volume) {
      case '<100':
        return '35+ hours/mo';
      case '100-500':
        return '90+ hours/mo';
      case '500-2500':
        return '320+ hours/mo';
      case '2500+':
        return '1,200+ hours/mo';
      default:
        return '150+ hours/mo';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !company.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Work Email, Company).');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const ticketId = await submitSalesInquiry(
        {
          fullName,
          email,
          company,
          phone,
          teamSize: `${teamSize} team members`,
          volume: `${volume} docs/month`,
          useCase,
          compliance: selectedCompliance,
          message,
          preferredTimeline: timeline,
        },
        currentUser?.uid
      );

      setSubmittedTicket(ticketId);
      showToast(`Sales inquiry received! Ticket: ${ticketId}`);
    } catch (err) {
      console.error('Contact sales error:', err);
      setErrorMessage('Failed to submit inquiry to server. Please try again or email enterprise@documentsense.ai.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (!submittedTicket) return;
    navigator.clipboard.writeText(submittedTicket);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
    showToast('Inquiry Ticket ID copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Enterprise Solutions & Licensing
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Tailored Document Intelligence for Teams
          </h2>
          <p className="text-xs text-indigo-200 mt-1 max-w-lg">
            Dedicated infrastructure, custom regulatory pipelines, SLA guarantees, and multi-user volume pricing.
          </p>

          {/* Quick Badges */}
          <div className="flex items-center gap-3 mt-4 text-[10px] text-slate-300 flex-wrap">
            <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
              <Shield className="w-3 h-3 text-emerald-400" /> SOC2 Type II Certified
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
              <Lock className="w-3 h-3 text-cyan-400" /> Zero Retention Guarantee
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3 text-amber-400" /> &lt;2-Hour Executive Response
            </span>
          </div>
        </div>

        {/* Content Body */}
        {!submittedTicket ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs">
                <X className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-indigo-600" /> Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-indigo-600" /> Work / Corporate Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="s.jenkins@company.com"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Company & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" /> Organization / Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Apex Legal Partners LLP"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Direct Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Team Size & Volume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-indigo-600" /> Team / Seat Requirement
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all cursor-pointer"
                >
                  <option value="1-5">1 - 5 Users (Small Practice)</option>
                  <option value="10-50">10 - 50 Users (Mid-Market / Department)</option>
                  <option value="50-250">50 - 250 Users (Corporate Division)</option>
                  <option value="250+">250+ Users (Global Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" /> Expected Monthly Volume
                </label>
                <select
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all cursor-pointer"
                >
                  <option value="<100">&lt; 100 Documents / Month</option>
                  <option value="100-500">100 - 500 Documents / Month</option>
                  <option value="500-2500">500 - 2,500 Documents / Month</option>
                  <option value="2500+">2,500+ High Volume Batch Processing</option>
                </select>
              </div>
            </div>

            {/* ROI Pill */}
            <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-emerald-50 border border-indigo-200/80 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-slate-700">
                  Estimated efficiency impact for your volume:
                </span>
              </div>
              <span className="font-extrabold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 text-xs shadow-2xs shrink-0">
                {calculateEstimatedHours()}
              </span>
            </div>

            {/* Row 4: Primary Use Case */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-600" /> Primary Document Focus
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all cursor-pointer"
              >
                {USE_CASES.map((uc) => (
                  <option key={uc} value={uc}>{uc}</option>
                ))}
              </select>
            </div>

            {/* Row 5: Compliance & Feature Requirements */}
            <div>
              <label className="block text-slate-700 font-bold mb-2">
                Security & Infrastructure Needs (Select all that apply):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COMPLIANCE_OPTIONS.map((opt) => {
                  const isChecked = selectedCompliance.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleCompliance(opt)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-indigo-500 bg-indigo-50/70 text-indigo-950 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-[11px]">{opt}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 6: Additional Message */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Special Workflows, Questions, or Integration Notes <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your current paperwork bottlenecks, OCR integrations, or rollout timeline..."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted transmission & strict confidentiality</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Sales Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900">
                Inquiry Received by Enterprise Solutions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your enterprise inquiry for <strong>{company}</strong> has been assigned to our senior solutions engineering team.
              </p>
            </div>

            {/* Ticket Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Enterprise Reference Ticket
                  </div>
                  <div className="font-mono text-sm font-extrabold text-indigo-600">
                    {submittedTicket}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs"
                >
                  {copiedTicket ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-400 text-[10px] block">Guaranteed SLA:</span>
                  <strong className="text-slate-800">Under 2 Hours</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Assigned Lead:</span>
                  <strong className="text-slate-800">Director of Solutions</strong>
                </div>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  showToast('Booking calendar link opened in workspace scheduler.');
                  onClose();
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule 15-Min Live Demo</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
