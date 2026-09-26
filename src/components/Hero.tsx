import React, { useRef, useState } from 'react';
import { DocumentData } from '../types';
import {
  Brain,
  CloudUpload,
  Play,
  Laptop,
  GraduationCap,
  ScrollText,
  ShieldAlert,
  Globe,
  FileText,
  FileSpreadsheet,
  FileImage,
  ArrowUpRight,
  Zap,
  Lock,
  EyeOff,
  CheckCircle2,
  ChevronRight,
  Layers,
  ListOrdered,
  Star
} from 'lucide-react';

interface HeroProps {
  currentDoc: DocumentData;
  onSelectSample: (docKey: string) => void;
  onTriggerScan: () => void;
  onOpenUpload: () => void;
  onLaunchApp: () => void;
  onCustomFileSelect: (file: File) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentDoc,
  onSelectSample,
  onTriggerScan,
  onOpenUpload,
  onLaunchApp,
  onCustomFileSelect
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanningActive, setIsScanningActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onCustomFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onCustomFileSelect(e.target.files[0]);
    }
  };

  const handleSimulateScan = () => {
    setIsScanningActive(true);
    setTimeout(() => {
      setIsScanningActive(false);
      onTriggerScan();
      const el = document.getElementById('demo-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  return (
    <section className="relative pt-12 pb-20 bg-radial-[at_50%_0%] from-indigo-50/80 via-slate-50 to-slate-50 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200/80 shadow-xs px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold text-slate-700">
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Gen Document Intelligence for Official Documents</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
            Understand Every Document.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Take the Right Action.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Upload any confusing government notice, university circular, legal contract, or insurance policy.
            Let AI instantly extract <strong>deadlines</strong>, <strong>required documents</strong>, <strong>action items</strong>, and <strong>missing information</strong> in seconds.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-3.5 flex-wrap mb-8">
            <button
              onClick={onOpenUpload}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <CloudUpload className="w-4 h-4" />
              <span>Upload Document</span>
              <span className="text-xs text-indigo-200 font-normal hidden sm:inline">(Free instant scan)</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-sm shadow-xs transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-indigo-600" />
              <span>Try Interactive Demo</span>
            </button>

            <button
              onClick={onLaunchApp}
              className="px-5 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Laptop className="w-4 h-4" />
              <span>Launch SaaS App</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500 flex-wrap">
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] ring-2 ring-white">JD</div>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] ring-2 ring-white">AK</div>
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px] ring-2 ring-white">MR</div>
              <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px] ring-2 ring-white">SL</div>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-slate-800 ml-1">4.9/5</span>
            </div>
            <span>Trusted by <strong>45,000+</strong> students, applicants & legal teams</span>
          </div>
        </div>

        {/* HERO INTERACTIVE UPLOAD & WORKFLOW CARD */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/85 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/60 p-4 sm:p-6">
            
            {/* Sample Selector Pills Header */}
            <div className="flex items-center justify-between flex-wrap gap-2.5 pb-4 mb-4 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Try with a preloaded sample:</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onSelectSample('scholarship')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentDoc.id === 'scholarship'
                      ? 'bg-indigo-50 border border-indigo-300 text-indigo-700 shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Govt Scholarship</span>
                </button>

                <button
                  onClick={() => onSelectSample('lease')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentDoc.id === 'lease'
                      ? 'bg-indigo-50 border border-indigo-300 text-indigo-700 shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <ScrollText className="w-3.5 h-3.5 text-purple-600" />
                  <span>Office Lease</span>
                </button>

                <button
                  onClick={() => onSelectSample('insurance')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentDoc.id === 'insurance'
                      ? 'bg-indigo-50 border border-indigo-300 text-indigo-700 shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Health Claim Denial</span>
                </button>

                <button
                  onClick={() => onSelectSample('visa')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentDoc.id === 'visa'
                      ? 'bg-indigo-50 border border-indigo-300 text-indigo-700 shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>Visa Clearance</span>
                </button>
              </div>
            </div>

            {/* Dropzone Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 sm:p-10 text-center transition-all cursor-pointer overflow-hidden ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-300'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileInputChange}
              />

              {/* Laser scanner animation */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-lg shadow-indigo-500/50 dropzone-scanner-beam pointer-events-none ${
                  isScanningActive ? 'scanning opacity-100' : 'opacity-0'
                }`}
              ></div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs">
                  <FileText className="w-3 h-3" /> PDF
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs">
                  <FileSpreadsheet className="w-3 h-3" /> DOCX
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs">
                  <FileImage className="w-3 h-3" /> JPG/PNG
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                Drag & drop your document here
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                or click to browse files from your computer to analyze automatically
              </p>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Select Document
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSimulateScan();
                  }}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Auto-Analyze Sample Now</span>
                </button>
              </div>

              {/* Dropzone Metadata Guarantee */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>5-sec instant analysis</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-bit bank encryption</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Zero data retention</span>
                </span>
              </div>
            </div>

            {/* Workflow Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">1. Upload Document</div>
                  <div className="text-[10px] text-slate-500">PDF, Scan, Image, TXT</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 ring-2 ring-indigo-500/20">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">2. AI Analysis</div>
                  <div className="text-[10px] text-slate-500">Deep Semantic Extraction</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">3. Smart Insights</div>
                  <div className="text-[10px] text-slate-500">Dates, Terms & Gaps</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <ListOrdered className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">4. Action Plan</div>
                  <div className="text-[10px] text-slate-500">Ordered Checklist</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
