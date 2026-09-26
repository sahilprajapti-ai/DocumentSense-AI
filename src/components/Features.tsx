import React from 'react';
import {
  FileText,
  Brain,
  Layers,
  ListOrdered,
  Scan,
  Languages,
  CalendarCheck,
  IdCard,
  AlertTriangle,
  BookMarked,
  MessageSquareCode,
  Milestone,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <>
      {/* SECTION 2: TRANSFORMATION ENGINE (HOW IT WORKS) */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-3 py-1 rounded-full mb-3">
              <Brain className="w-3.5 h-3.5" />
              <span>Transformation Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              From 20 Pages of Bureaucratic Jargon<br />
              <span className="text-indigo-600">To 4 Clear, Actionable Steps</span>
            </h2>
            <p className="text-base text-slate-600">
              Most official notices are intentionally dense. DocumentSense AI breaks the document down into what actually matters to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 relative hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-3xl font-extrabold text-slate-200 mb-2">01</div>
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Upload Any Document</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Government circulars, university rules, office leases, tax notices, or medical claim forms. Multi-lingual OCR supports over 40 languages.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-200/70">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>PDF, scanned images, DOCX</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automatic deskew & rotation</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-b from-indigo-50/60 to-white border-2 border-indigo-500 rounded-2xl p-6 relative shadow-md shadow-indigo-500/10 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Core Engine
              </div>
              <div className="text-3xl font-extrabold text-indigo-200 mb-2">02</div>
              <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-indigo-600/30">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">AI Neural Extraction</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Our model isolates obligations, penalties, cut-off dates, prerequisite certificates, and ambiguous clauses while ignoring boilerplate filler.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-indigo-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Date & cut-off detection</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ambiguity & risk flags</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 relative hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-3xl font-extrabold text-slate-200 mb-2">03</div>
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Plain-English Simplification</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Legal and bureaucratic jargon is translated into clean, 8th-grade reading level explanations with "Why it matters" context.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-200/70">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>8th-grade conversational clarity</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Latin & legal term decoders</span>
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 relative hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-3xl font-extrabold text-slate-200 mb-2">04</div>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <ListOrdered className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Execution Action Plan</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Receive an interactive checklist of required proofs, step-by-step submission instructions, calendar sync alerts, and warnings for missing fields.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-200/70">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>One-click .ics calendar export</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Missing signature warnings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 10 CORE FEATURES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-3 py-1 rounded-full mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Comprehensive Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Built for Real Life Paperwork
            </h2>
            <p className="text-base text-slate-600">
              Every feature is engineered to remove anxiety, prevent costly missed deadlines, and translate bureaucratic legalese into straightforward action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Scan className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Computer Vision</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">AI Document Scanner</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Industrial-strength OCR processes multi-page scanned PDFs, low-light phone photos, and skewed government forms with 99.4% character fidelity.
              </p>
            </div>

            {/* 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Languages className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Plain English</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Simple Language Explanation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Converts dense legal clauses and passive bureaucratic sentences into plain, 8th-grade conversational reading so you never misunderstand rights or duties.
              </p>
            </div>

            {/* 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Never Miss Deadlines</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Important Date Extraction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identifies submission cut-offs, hearing schedules, objection periods, and grace dates. Exports with one click to Google, Outlook, and Apple Calendar.
              </p>
            </div>

            {/* 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <IdCard className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Zero Surprises</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Required Document Detection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extracts buried prerequisites into a dynamic interactive checklist — from Aadhaar/passport to revenue stamps, marksheets, and affidavits.
              </p>
            </div>

            {/* 5 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <ListOrdered className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Step-by-Step</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Action Item Generator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transforms paragraphs of instructions into ordered steps: 01 Complete Form, 02 Upload Verification, 03 Counter-sign, 04 Final Dispatch.
              </p>
            </div>

            {/* 6 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Rejection Prevention</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Missing Information Detection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audits forms for forgotten signatures, un-notarized attachments, missing annexures, and blank mandatory fields before you face rejection.
              </p>
            </div>

            {/* 7 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
                <BookMarked className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jargon Buster</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">AI Terminology Explainer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Displays confusing Latin maxims, administrative jargon, and statutory codes alongside simple definitions and "Why It Matters To You" context.
              </p>
            </div>

            {/* 8 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                <MessageSquareCode className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Conversational</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Document Q&A (Sense AI)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chat directly with your document. Ask "Can I apply if my marksheet is late?" and receive exact cited answers with source page highlights.
              </p>
            </div>

            {/* 9 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Milestone className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Milestone Tracking</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Smart Timeline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visual chronological roadmaps from opening date through verification windows to disbursement and appeal limits, color-coded by urgency.
              </p>
            </div>

            {/* 10 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Executive Brief</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Document Summary</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A crisp 60-second executive overview categorizing document type, legal jurisdiction, confidence indicators, and primary financial obligations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
