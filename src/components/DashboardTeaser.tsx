import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  Lock,
  UserCheck,
  Flame,
  FileKey,
  Star,
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  ListCheck,
  Shield
} from 'lucide-react';

interface DashboardTeaserProps {
  onLaunchApp: () => void;
  onOpenUpload: () => void;
  onContactSales?: () => void;
}

export const DashboardTeaser: React.FC<DashboardTeaserProps> = ({
  onLaunchApp,
  onOpenUpload,
  onContactSales,
}) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What kinds of documents can DocumentSense AI analyze?',
      a: 'DocumentSense AI specializes in dense, procedural, and bureaucratic documentation: government circulars, university scholarship notices, admission guides, rental agreements, employment contracts, medical insurance policies, court summons, tax notices, and visa petitions.'
    },
    {
      q: 'How does it detect "missing information" in my forms?',
      a: 'Our AI cross-references the requirements stated in the text with the filled slots and attachments. If a clause mandates "Two gazetted officer countersignatures" but only one signature block is detected, or if an income certificate is referenced without the mandatory issued date, our system flags it with high-priority warnings.'
    },
    {
      q: 'Is my sensitive legal or medical data secure?',
      a: 'Yes. All files are encrypted using AES-256 at rest and TLS 1.3 in transit. We have a strict zero-retention policy option, where uploaded files are permanently expunged immediately after processing, and your personal data is NEVER used to train AI models.'
    },
    {
      q: 'Can I ask custom questions to the document?',
      a: 'Absolutely! The built-in Sense AI assistant allows you to converse naturally with any uploaded document. You can ask "What are the penalty clauses?", "Who pays for property repairs?", or "Where do I submit the final packet?" and get answers grounded directly in the text with page citations.'
    }
  ];

  return (
    <>
      {/* SECTION 6: SAAS DASHBOARD TEASER */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="dashboard-preview">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full mb-3">
                <Shield className="w-3.5 h-3.5" />
                <span>Production SaaS Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Complete Control Over All Your Official Affairs
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Organize all notices, university communications, real estate contracts, and visa petitions in one secure intelligence hub.
              </p>
            </div>

            <button
              onClick={onLaunchApp}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer w-fit"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Live SaaS Workspace</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
              <div className="text-3xl font-extrabold text-indigo-400 mb-1">12</div>
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> Documents Analyzed
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +4 this month
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
              <div className="text-3xl font-extrabold text-emerald-400 mb-1">27</div>
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                <ListCheck className="w-3.5 h-3.5 text-emerald-400" /> Action Items Found
              </div>
              <div className="text-[11px] text-slate-400 font-semibold">19 completed</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
              <div className="text-3xl font-extrabold text-amber-400 mb-1">8</div>
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Upcoming Deadlines
              </div>
              <div className="text-[11px] text-red-400 font-semibold">2 due this week</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
              <div className="text-3xl font-extrabold text-cyan-400 mb-1">94%</div>
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Avg AI Confidence
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold">Verified source text</div>
            </div>
          </div>

          {/* Interactive Frame preview */}
          <div
            onClick={onLaunchApp}
            className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-mono text-[11px] text-slate-400">https://app.documentsense.ai/workspace/overview</span>
              </div>
              <span className="text-indigo-400 text-xs font-semibold group-hover:underline">
                Click anywhere to launch interactive workspace →
              </span>
            </div>

            <div className="p-6">
              <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-5 p-3 bg-slate-900/90 font-bold text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <span className="col-span-2">Document Name</span>
                  <span>Category</span>
                  <span>Extracted Cut-off</span>
                  <span>Status</span>
                </div>
                <div className="grid grid-cols-5 p-3.5 bg-slate-950 items-center border-b border-slate-900 text-slate-300">
                  <span className="col-span-2 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Circular_MoHFW_Scholarship_2026_Final.pdf
                  </span>
                  <span><span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded text-[10px]">Government</span></span>
                  <span className="font-mono text-red-400 font-bold">Feb 15, 2026</span>
                  <span><span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[10px]">Action Required</span></span>
                </div>
                <div className="grid grid-cols-5 p-3.5 bg-slate-950 items-center border-b border-slate-900 text-slate-300">
                  <span className="col-span-2 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Lease_Commercial_Suite402_PrimeTowers.pdf
                  </span>
                  <span><span className="bg-purple-950 text-purple-300 px-2 py-0.5 rounded text-[10px]">Contract</span></span>
                  <span className="font-mono text-slate-400">Mar 01, 2026</span>
                  <span><span className="bg-red-950 text-red-300 px-2 py-0.5 rounded text-[10px]">3 Missing Info</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: SECURITY */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="security">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Institutional Trust</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Confidentiality Built for Sensitive Documents
            </h2>
            <p className="text-base text-slate-600">
              Government notices, leases, and medical records carry your most sensitive personal data. We treat privacy as non-negotiable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">End-to-End Encryption</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Documents are encrypted in transit via TLS 1.3 and at rest with AES-256 military-grade encryption keys rotated continuously.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Zero AI Model Training</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your documents are never used to train or fine-tune public foundation models. Your data remains strictly yours.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Automated Shredder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose 24-hour auto-purge or zero-retention mode. Once analysis is exported, files are permanently deleted from secure memory.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <FileKey className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">PII Anonymization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatic redaction of Social Security, Aadhaar numbers, tax IDs, and bank account numbers prior to semantic analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-3 py-1 rounded-full mb-3">
              <Star className="w-3.5 h-3.5 fill-indigo-600" />
              <span>User Stories</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Loved by Students, Immigrants & Small Businesses
            </h2>
            <p className="text-sm text-slate-500">Real people saving hours and avoiding rejected applications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-6">
                  "The 34-page scholarship notice felt written in another language. DocumentSense extracted the 4 exact documents I needed and pointed out that I had forgotten a notary stamp. Saved my ₹1.2 lakh grant!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">AK</div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ananya Kulkarni</div>
                  <div className="text-[10px] text-slate-500">Postgraduate Scholar, Delhi University</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-6">
                  "As an immigrant navigating visa extension policies, missing a 15-day notice window could mean deportation. This tool turned a stressful legal document into a clean, reassuring 5-step checklist."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">MR</div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Mateo Rodriguez</div>
                  <div className="text-[10px] text-slate-500">Tech Lead & Skilled Worker Visa Holder</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-6">
                  "Before signing our 5-year commercial office lease, DocumentSense caught an un-capped CAM fee escalation clause that our broker didn't even notice. Paid for itself 100 times over."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">SL</div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Sarah Lin</div>
                  <div className="text-[10px] text-slate-500">Founder & CEO, Lumina Retail Tech</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: PRICING */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Plans</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Simple Pricing for Total Peace of Mind
            </h2>
            <p className="text-sm text-slate-500 mb-6">Start analyzing for free. Upgrade for unlimited documents and team workflows.</p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center bg-white border border-slate-200 p-1 rounded-full shadow-2xs text-xs font-semibold">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  !isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual</span>
                <span className={`text-[10px] px-1.5 rounded-full font-bold ${isAnnual ? 'bg-indigo-500 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter Free */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Starter</h3>
                <p className="text-xs text-slate-500 mb-4">For individuals handling occasional paperwork</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>5 documents per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Up to 10 pages per document</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Date & deadline extraction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Required document checklist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>24-hour auto-purge guarantee</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onOpenUpload}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 font-semibold text-xs text-slate-800 transition-all cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Individual */}
            <div className="bg-white border-2 border-indigo-600 rounded-2xl p-6 shadow-lg shadow-indigo-500/10 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Pro Individual</h3>
                <p className="text-xs text-slate-500 mb-4">For applicants, students, expats & freelancers</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">${isAnnual ? '12' : '16'}</span>
                  <span className="text-xs text-slate-500">/month {isAnnual && '(billed annually)'}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span><strong>Unlimited</strong> document analyses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Up to 250 pages per document</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Missing information radar & alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Sense AI interactive chat assistant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Calendar sync (.ics & Google)</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onLaunchApp}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
              >
                Start 7-Day Free Trial
              </button>
            </div>

            {/* Legal & Teams */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Legal & Teams</h3>
                <p className="text-xs text-slate-500 mb-4">For law firms, universities, and HR teams</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">${isAnnual ? '49' : '65'}</span>
                  <span className="text-xs text-slate-500">/month {isAnnual && '(billed annually)'}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Multi-seat collaboration (5 users)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Bulk batch upload (up to 100 docs)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Custom redaction & audit log export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>REST API & Webhook access</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  if (onContactSales) {
                    onContactSales();
                  }
                }}
                className="w-full py-2.5 rounded-xl border border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 hover:bg-indigo-50 font-bold text-xs text-indigo-700 transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Contact Enterprise Sales</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500">Everything you need to know about DocumentSense AI.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: FINAL CTA BANNER */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Stop Dreading Complicated Paperwork.
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto mb-8">
            Join over 45,000 individuals and teams who turn confusing forms into clear, actionable confidence.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
            <button
              onClick={onOpenUpload}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              Upload Document Now
            </button>
            <button
              onClick={onLaunchApp}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              Explore Full App
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-indigo-300/80 flex-wrap">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Instant 5-second analysis</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Bank-grade encryption</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-white text-base">DocumentSense</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px] mb-4">
                The next-generation document intelligence engine that converts dense government notifications, contracts, and policies into clear, verifiable action plans.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">Product</h4>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#demo-section" className="hover:text-white transition-colors">Interactive Demo</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Capabilities</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">Use Cases</h4>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#demo-section" className="hover:text-white transition-colors">Government Grants</a></li>
                <li><a href="#demo-section" className="hover:text-white transition-colors">Office Leases</a></li>
                <li><a href="#demo-section" className="hover:text-white transition-colors">Insurance Grievances</a></li>
                <li><a href="#demo-section" className="hover:text-white transition-colors">Visa Clearances</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">Security & Trust</h4>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#security" className="hover:text-white transition-colors">Zero Retention Policy</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">PII Redaction</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">SOC2 Type II Report</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4 text-[11px]">
            <div>© 2026 DocumentSense AI Inc. All rights reserved. Designed for absolute clarity.</div>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All AI Engine Nodes Operational (99.98% uptime)</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
