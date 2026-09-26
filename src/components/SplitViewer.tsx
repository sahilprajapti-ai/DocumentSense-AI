import React, { useState } from 'react';
import { DocumentData, InsightTab } from '../types';
import {
  FileText,
  Calendar,
  CheckSquare,
  ListTodo,
  BookOpen,
  AlertTriangle,
  Download,
  Maximize2,
  Clock,
  Sparkles,
  Info,
  CalendarPlus,
  Landmark,
  Stamp,
  Search,
  CheckCircle2,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';

interface SplitViewerProps {
  doc: DocumentData;
  activeTab: InsightTab;
  setActiveTab: (tab: InsightTab) => void;
  onToggleChecklist: (id: string) => void;
  onExportCalendar: () => void;
  onExportBrief: () => void;
  onOpenDashboard: () => void;
  isScanning: boolean;
}

export const SplitViewer: React.FC<SplitViewerProps> = ({
  doc,
  activeTab,
  setActiveTab,
  onToggleChecklist,
  onExportCalendar,
  onExportBrief,
  onOpenDashboard,
  isScanning
}) => {
  const [selectedHighlight, setSelectedHighlight] = useState<{
    id: string;
    type: string;
    text: string;
    explanation: string;
  } | null>(null);

  const [termSearch, setTermSearch] = useState('');

  // Handle click on highlighted span in document
  const handleDocumentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('.doc-hl') as HTMLElement | null;
    if (!target) return;

    const hlId = target.getAttribute('data-hl-id') || '';
    const text = target.textContent || '';
    const prefix = hlId.charAt(0);

    let type = 'Important Highlight';
    let explanation = '';

    if (prefix === 'd') {
      type = 'Important Date / Cut-off';
      setActiveTab('dates');
      explanation = 'This is a strict cut-off deadline. Failing to submit within this window results in automatic disqualification with zero appeal window.';
    } else if (prefix === 'c') {
      type = 'Required Document Prerequisite';
      setActiveTab('checklist');
      explanation = 'This official certificate must be digitally uploaded and cross-checked against national databases. Un-attested photocopies are rejected.';
    } else if (prefix === 'a') {
      type = 'Action Step Directive';
      setActiveTab('actions');
      explanation = 'You must carry out this sequential task without introducing any discrepancy against your matriculation or tax records.';
    } else if (prefix === 't') {
      type = 'Difficult Legal Term';
      setActiveTab('terms');
      explanation = 'Bureaucratic jargon decoded: This dictates how funds or liabilities are allocated equally without exceptions.';
    } else if (prefix === 'm') {
      type = 'Missing Information Risk';
      setActiveTab('missing');
      explanation = 'High-risk compliance gap! Submitting without resolving this item results in an estimated 82% rejection probability.';
    }

    setSelectedHighlight({ id: hlId, type, text, explanation });
  };

  const totalChecklist = doc.checklist.length;
  const completedChecklist = doc.checklist.filter((c) => c.checked).length;
  const checklistPercentage = totalChecklist > 0 ? Math.round((completedChecklist / totalChecklist) * 100) : 0;

  const filteredTerms = doc.terms.filter(
    (t) =>
      t.original.toLowerCase().includes(termSearch.toLowerCase()) ||
      t.meaning.toLowerCase().includes(termSearch.toLowerCase()) ||
      t.why.toLowerCase().includes(termSearch.toLowerCase())
  );

  return (
    <section className="py-16 bg-slate-100/70 border-y border-slate-200" id="demo-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Interactive Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Document Analysis & Verification
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Click any colored highlight on the left document to automatically inspect its AI decoded explanation on the right.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportBrief}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>Export Brief</span>
            </button>
            <button
              onClick={onOpenDashboard}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Dashboard Mode</span>
            </button>
          </div>
        </div>

        {/* Split Screen Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Top Status Bar */}
          <div className="bg-slate-900 text-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 font-semibold px-2.5 py-1 rounded-md">
                {doc.badge}
              </span>
              <span className="font-mono text-slate-300 hidden sm:inline">{doc.filename}</span>
              <span className="bg-emerald-950/70 border border-emerald-700/50 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{doc.confidence} AI Confidence</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="hidden md:inline">💡 Click any highlighted clause to inspect</span>
            </div>
          </div>

          {/* Split Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            
            {/* LEFT PANE: Rendered Document Source */}
            <div className="lg:col-span-6 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 sm:p-6 overflow-y-auto max-h-[720px]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Original Document (Rendered Source)</span>
                </span>
                <span className="font-mono text-[11px]">Page 1 of {doc.pages || 3}</span>
              </div>

              {/* Rendered Sheet Mockup */}
              <div
                onClick={handleDocumentClick}
                className="relative bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm font-serif text-slate-900 leading-relaxed text-sm select-text"
              >
                {/* Laser scan animation */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent sheet-scan-laser pointer-events-none ${
                    isScanning ? 'scanning opacity-100' : 'opacity-0'
                  }`}
                ></div>

                {/* Official Letterhead */}
                <div className="flex items-center gap-4 mb-4 pb-3 border-b border-slate-900">
                  <div className="w-12 h-12 rounded-full border-2 border-double border-slate-900 flex items-center justify-center shrink-0">
                    <Landmark className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wider text-slate-900">{doc.authority}</div>
                    <div className="text-[11px] text-slate-600 font-sans">{doc.office}</div>
                    <div className="text-[10px] text-slate-500 italic font-sans">{doc.refNo}</div>
                  </div>
                </div>

                {/* Document Subject */}
                <h4 className="font-bold text-center underline mb-4 text-xs sm:text-sm text-slate-900 leading-snug">
                  {doc.subject}
                </h4>

                {/* Paragraphs with interactive highlight spans */}
                <div className="space-y-3.5 text-slate-800 text-[13px] text-justify font-sans">
                  {doc.paragraphs.map((p, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>

                {/* Official Signatures & Seal */}
                <div className="mt-8 pt-4 border-t border-dashed border-slate-300 flex items-center justify-between text-xs font-sans">
                  <div>
                    <div className="border border-dashed border-slate-400 text-slate-500 px-3 py-1.5 rounded text-[10px] font-bold text-center inline-flex items-center gap-1">
                      <Stamp className="w-3 h-3" /> OFFICIAL SEAL
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif italic text-indigo-950 font-bold">Authorized Signatory</div>
                    <div className="text-[11px] text-slate-500">Joint Secretary / Director</div>
                    <div className="mt-1 bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Counter-signature Required
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANE: AI Insights & Tabs */}
            <div className="lg:col-span-6 bg-white flex flex-col max-h-[720px]">
              
              {/* Tab Navigation */}
              <div className="border-b border-slate-200 bg-slate-50/80 px-4 pt-3 flex items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeTab === 'summary'
                      ? 'bg-white text-indigo-600 border-t-2 border-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Summary</span>
                </button>

                <button
                  onClick={() => setActiveTab('dates')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeTab === 'dates'
                      ? 'bg-white text-indigo-600 border-t-2 border-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Key Dates</span>
                  <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 rounded-full">{doc.dates.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('checklist')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeTab === 'checklist'
                      ? 'bg-white text-indigo-600 border-t-2 border-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Checklist</span>
                  <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 rounded-full">{doc.checklist.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('actions')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeTab === 'actions'
                      ? 'bg-white text-indigo-600 border-t-2 border-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  <span>Actions</span>
                </button>

                <button
                  onClick={() => setActiveTab('terms')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-white text-indigo-600 border-t-2 border-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Difficult Terms</span>
                </button>

                <button
                  onClick={() => setActiveTab('missing')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeTab === 'missing'
                      ? 'bg-white text-red-600 border-t-2 border-red-600 shadow-2xs'
                      : 'text-red-600/80 hover:text-red-700 hover:bg-white/50'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  <span>Missing Info</span>
                  <span className="bg-red-100 text-red-700 text-[10px] px-1.5 rounded-full">{doc.missing.length}</span>
                </button>
              </div>

              {/* Tab Contents Container */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                
                {/* 1. SUMMARY TAB */}
                {activeTab === 'summary' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> AI Plain-Language Summary
                        </span>
                        <span className="text-[11px] text-slate-500 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 45 sec read (vs 18 min original)
                        </span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-medium">
                        {doc.summary.lead}
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-indigo-600" /> Core Takeaways:
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {doc.summary.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlight detail card (if user clicked a highlight) */}
                    {selectedHighlight && (
                      <div className="bg-indigo-50/80 border-2 border-indigo-500 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-150">
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {selectedHighlight.type}
                          </span>
                          <button
                            onClick={() => setSelectedHighlight(null)}
                            className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>
                        <div className="text-xs italic bg-white/80 p-2 rounded border border-indigo-100 text-slate-600 mb-2 font-serif">
                          "{selectedHighlight.text}"
                        </div>
                        <div className="text-xs font-bold text-indigo-900 mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-600" /> AI Decoded Meaning:
                        </div>
                        <div className="text-xs text-slate-800 font-medium leading-relaxed">
                          {selectedHighlight.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. DATES TAB */}
                {activeTab === 'dates' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                      <span className="bg-red-50 text-red-700 text-xs font-bold px-2 py-0.5 rounded border border-red-200 inline-flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3" /> Critical cut-off dates
                      </span>
                      <button
                        onClick={onExportCalendar}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                        <span>Export All to Calendar (.ics)</span>
                      </button>
                    </div>

                    <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-0.5 before:bg-slate-200">
                      {doc.dates.map((dateItem) => (
                        <div key={dateItem.id} className="relative">
                          <div
                            className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                              dateItem.done
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : dateItem.urgent
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'bg-white border-slate-300 text-slate-500'
                            }`}
                          >
                            {dateItem.done ? '✓' : '!'}
                          </div>
                          <div className={`p-3 rounded-xl border ${dateItem.urgent ? 'bg-red-50/40 border-red-200' : 'bg-white border-slate-200'}`}>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-bold text-slate-900">{dateItem.title}</span>
                              <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                                {dateItem.date}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">{dateItem.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. CHECKLIST TAB */}
                {activeTab === 'checklist' && (
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-700">Prerequisites Readiness</span>
                        <span className="text-indigo-600 font-bold">
                          {completedChecklist} of {totalChecklist} Ready ({checklistPercentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                          style={{ width: `${checklistPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {doc.checklist.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onToggleChecklist(item.id)}
                          className={`p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                            item.checked
                              ? 'bg-slate-50/80 border-slate-200 text-slate-500'
                              : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                              item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                            }`}
                          >
                            {item.checked && '✓'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-xs font-bold ${item.checked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {item.name}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  item.req ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {item.req ? 'REQUIRED' : 'OPTIONAL'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{item.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. ACTIONS TAB */}
                {activeTab === 'actions' && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-500 mb-2">
                      Execute these steps sequentially to guarantee full compliance without bureaucratic delay:
                    </div>
                    {doc.actions.map((act) => (
                      <div key={act.num} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-sm flex items-center justify-center shrink-0">
                          {act.num}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-900">{act.title}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                act.prio === 'Critical'
                                  ? 'bg-red-100 text-red-700'
                                  : act.prio === 'High'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {act.prio} Priority
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. DIFFICULT TERMS TAB */}
                {activeTab === 'terms' && (
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search legal jargon or clause..."
                        value={termSearch}
                        onChange={(e) => setTermSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-2.5">
                      {filteredTerms.map((term) => (
                        <div key={term.id} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                              {term.original}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">AI Decoded</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-900 mb-1">{term.meaning}</div>
                          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border-l-2 border-purple-500">
                            <strong>Why it matters:</strong> {term.why}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. MISSING INFORMATION TAB */}
                {activeTab === 'missing' && (
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-3">
                      <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-red-900">
                          {doc.missing.length} Pieces of Required Information are Missing
                        </div>
                        <div className="text-[11px] text-red-700 mt-0.5">
                          If submitted as-is, this application has an <strong>82% probability of rejection</strong>.
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {doc.missing.map((item) => (
                        <div key={item.id} className="bg-white border border-slate-200 border-l-4 border-l-red-500 rounded-xl p-3.5 shadow-2xs">
                          <div className="text-xs font-bold text-slate-900 mb-1">{item.title}</div>
                          <div className="text-xs text-slate-600 mb-2">{item.desc}</div>
                          <div className="text-[11px] text-indigo-900 bg-indigo-50/70 p-2 rounded flex items-center gap-1 font-medium">
                            <ArrowRight className="w-3 h-3 text-indigo-600 shrink-0" />
                            <span><strong>How to fix:</strong> {item.fix}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
