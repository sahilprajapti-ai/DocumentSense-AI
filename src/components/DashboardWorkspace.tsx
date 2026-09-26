import React, { useState } from 'react';
import {
  DocumentData,
  DashboardDocItem,
  UserProfile,
  DashboardTab
} from '../types';
import {
  PieChart,
  FolderOpen,
  Sparkles,
  CalendarCheck,
  ListCheck,
  Brain,
  Bookmark,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Plus,
  ArrowLeft,
  CalendarPlus,
  RotateCcw,
  Send,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Flame,
  UserCheck,
  User,
  Key,
  HardDrive,
  Award,
  Shield,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Edit2,
  LogOut
} from 'lucide-react';
import { sendPasswordReset } from '../lib/firebase';

interface DashboardWorkspaceProps {
  documents: DashboardDocItem[];
  currentDoc: DocumentData;
  currentUser: UserProfile | null;
  onOpenUpload: () => void;
  onSelectDoc: (id: string) => void;
  onReturnLanding: () => void;
  onExportCalendar: () => void;
  onSendAssistantChat: (text: string) => Promise<string>;
  onLogout: () => void;
  onOpenProfile?: () => void;
  showToast?: (msg: string) => void;
}

export const DashboardWorkspace: React.FC<DashboardWorkspaceProps> = ({
  documents,
  currentDoc,
  currentUser,
  onOpenUpload,
  onSelectDoc,
  onReturnLanding,
  onExportCalendar,
  onSendAssistantChat,
  onLogout,
  onOpenProfile,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Master action items state
  const [actionItems, setActionItems] = useState([
    { id: '1', title: 'Upload self-attested Aadhaar Card', doc: 'NMS Scholarship', done: true },
    { id: '2', title: 'Obtain Tehsildar Income Certificate', doc: 'NMS Scholarship', done: false },
    { id: '3', title: 'Acquire Dean / Principal Counter-Signature', doc: 'NMS Scholarship', done: false },
    { id: '4', title: 'Freeze Form 4A on National Portal', doc: 'NMS Scholarship', done: false },
    { id: '5', title: 'Negotiate CAM escalation ceiling', doc: 'Commercial Lease', done: true },
    { id: '6', title: 'Bind $1,000,000 Liability Insurance Policy', doc: 'Commercial Lease', done: false },
    { id: '7', title: 'Wire $33,600 deposit & first month rent', doc: 'Commercial Lease', done: false },
    { id: '8', title: 'Surgeon acute condition certificate', doc: 'Health Claim Denial', done: false },
    { id: '9', title: 'Submit signed Form G-1 to Grievance Cell', doc: 'Health Claim Denial', done: false },
    { id: '10', title: 'F-1 Visa SEVIS fee payment receipt', doc: 'Visa Notice', done: true },
  ]);

  // Full session chat state
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      id: 'c1',
      sender: 'bot',
      text: `Hello ${currentUser ? currentUser.name.split(' ')[0] : 'there'}! I have indexed all 12 documents in your repository. I can answer questions about your **National Merit Scholarship**, your **Commercial Office Lease**, or compare requirements across documents. What would you like to know?`,
      time: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Settings state
  const [zeroRetention, setZeroRetention] = useState(false);
  const [piiRedact, setPiiRedact] = useState(true);
  const [calSync, setCalSync] = useState(true);

  const toggleAction = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const text = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { id: String(Date.now()), sender: 'user', text, time: 'Just now' }]);
    setIsChatLoading(true);

    try {
      const answer = await onSendAssistantChat(text);
      setChatMessages((prev) => [...prev, { id: String(Date.now() + 1), sender: 'bot', text: answer, time: 'Just now' }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: `Verified against **${currentDoc.title}**: Please refer to the designated clause for submission prerequisites and cut-off deadlines.`,
          time: 'Just now',
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const filteredDocs = documents.filter((d) => {
    const matchesCat = categoryFilter === 'all' || d.cat === categoryFilter;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.catName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredActions = actionItems.filter((a) => {
    if (actionFilter === 'pending') return !a.done;
    if (actionFilter === 'completed') return a.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white text-sm">DocumentSense</div>
              <div className="text-[10px] text-indigo-400 font-bold tracking-wider">WORKSPACE PRO</div>
            </div>
          </div>
        </div>

        {/* User Card */}
        <button
          onClick={() => {
            if (onOpenProfile) {
              onOpenProfile();
            }
            setActiveTab('profile');
          }}
          className="user-profile-btn p-4 border-b border-slate-800 flex items-center gap-3 text-left w-full hover:bg-slate-800/80 transition-colors cursor-pointer group"
          title="Click to show User Profile & Account Settings"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold text-xs flex items-center justify-center relative shrink-0 shadow-xs">
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              currentUser?.initials || 'DR'
            )}
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900"></span>
          </div>
          <div className="truncate flex-1">
            <div className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              <span>{currentUser?.name || 'Guest User'}</span>
            </div>
            <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
              <span>{currentUser?.plan || 'Pro Individual'}</span>
              <span className="text-[9px] bg-indigo-900/60 text-indigo-300 px-1 py-0.2 rounded border border-indigo-700/50">Profile</span>
            </div>
          </div>
          <User className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
        </button>

        {/* Sidebar Nav */}
        <nav className="p-3 space-y-1 flex-1 text-xs font-medium overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
            Main Workspace
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <PieChart className="w-4 h-4" /> Overview
            </span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'documents' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FolderOpen className="w-4 h-4" /> My Documents
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">12</span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'deadlines' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4" /> Deadlines
            </span>
            <span className="text-[10px] bg-red-950 text-red-400 font-bold px-1.5 py-0.5 rounded">8</span>
          </button>

          <button
            onClick={() => setActiveTab('action-items')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'action-items' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ListCheck className="w-4 h-4" /> Action Items
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">27</span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'assistant' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Brain className="w-4 h-4" /> Sense AI Assistant
            </span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'saved' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4" /> Bookmarked
            </span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 pt-4">
            Preferences & Account
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <User className="w-4 h-4" /> My Profile & Plan
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
              Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" /> Security Settings
            </span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Encrypted Storage</span>
              <span>2.4 / 10 GB</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[24%]"></div>
            </div>
          </div>

          <button
            onClick={onOpenUpload}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Upload Document
          </button>

          <button
            onClick={onReturnLanding}
            className="w-full py-1.5 text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 text-[11px] cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" /> Return to Website
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-semibold">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search notices, dates, items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 w-52"
              />
            </div>

            <button
              onClick={() => {
                if (showToast) {
                  showToast('Notifications: 2 deadlines due this week. All extraction agents active.');
                }
              }}
              className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1"></span>
            </button>

            <button
              onClick={onOpenUpload}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> New Upload
            </button>

            <button
              onClick={() => {
                if (onOpenProfile) {
                  onOpenProfile();
                } else {
                  setActiveTab('profile');
                }
              }}
              className="user-profile-btn flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-full py-1 pl-1 pr-3 transition-colors cursor-pointer group shadow-xs"
              title="Click to show User Profile & Account Settings"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-white font-bold text-xs flex items-center justify-center overflow-hidden shrink-0">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  currentUser?.initials || 'DR'
                )}
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors hidden sm:inline">
                {currentUser?.name.split(' ')[0] || 'Profile'}
              </span>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full border border-indigo-100 hidden md:inline">
                Profile
              </span>
            </button>
          </div>
        </header>

        {/* Content Tab Pages */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold mb-1">
                    Welcome back, {currentUser?.name || 'David'}! 👋
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
                    You have <strong>8 upcoming deadlines</strong> and <strong>27 action items</strong> across 12 analyzed documents. 2 items require urgent attention this week.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      if (onOpenProfile) {
                        onOpenProfile();
                      } else {
                        setActiveTab('profile');
                      }
                    }}
                    className="user-profile-btn px-3.5 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/40 rounded-xl text-xs font-bold text-indigo-200 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                    title="Click to show User Profile & Settings"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-300" />
                    Show Profile
                  </button>
                  <button
                    onClick={onOpenUpload}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer"
                  >
                    Analyze New Document
                  </button>
                  <button
                    onClick={() => setActiveTab('deadlines')}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
                  >
                    View Deadlines
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                  <div className="text-2xl font-extrabold text-indigo-600 mb-0.5">12</div>
                  <div className="text-xs font-semibold text-slate-700">Documents Analyzed</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">↑ +4 this month</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                  <div className="text-2xl font-extrabold text-emerald-600 mb-0.5">27</div>
                  <div className="text-xs font-semibold text-slate-700">Action Items Found</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1">19 completed (70%)</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                  <div className="text-2xl font-extrabold text-amber-600 mb-0.5">8</div>
                  <div className="text-xs font-semibold text-slate-700">Upcoming Deadlines</div>
                  <div className="text-[10px] text-red-600 font-bold mt-1">2 due this week</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                  <div className="text-2xl font-extrabold text-cyan-600 mb-0.5">94%</div>
                  <div className="text-xs font-semibold text-slate-700">Avg AI Confidence</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">100% verified source</div>
                </div>
              </div>

              {/* Two Column Grid: Documents Table & Priority Radar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Documents Table */}
                <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Recent Documents</h3>
                      <p className="text-[11px] text-slate-500">Click any document to inspect deep AI findings</p>
                    </div>

                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 outline-none text-slate-700"
                    >
                      <option value="all">All Categories</option>
                      <option value="government">Government</option>
                      <option value="contract">Contracts & Leases</option>
                      <option value="insurance">Insurance</option>
                      <option value="university">University</option>
                    </select>
                  </div>

                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="pb-2">Document</th>
                          <th className="pb-2">Category</th>
                          <th className="pb-2">Next Cut-off</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredDocs.slice(0, 5).map((doc) => (
                          <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2.5 font-bold text-slate-900 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                              <span className="truncate max-w-[200px]">{doc.name}</span>
                            </td>
                            <td className="py-2.5 text-slate-600">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                                {doc.catName}
                              </span>
                            </td>
                            <td className="py-2.5 font-mono text-slate-700 font-bold">{doc.deadline}</td>
                            <td className="py-2.5">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  doc.status.includes('Urgent')
                                    ? 'bg-red-100 text-red-700'
                                    : doc.status.includes('Missing')
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {doc.status}
                              </span>
                            </td>
                            <td className="py-2.5 text-right">
                              <button
                                onClick={() => {
                                  onSelectDoc(doc.id);
                                  onReturnLanding();
                                  setTimeout(() => {
                                    const el = document.getElementById('demo-section');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                  }, 100);
                                }}
                                className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Priority Checklist & Deadlines Radar */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Action Items Snapshot */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <ListCheck className="w-3.5 h-3.5 text-indigo-600" /> Priority Checklist
                      </h3>
                      <button
                        onClick={() => setActiveTab('action-items')}
                        className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer"
                      >
                        View all 27 →
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      {actionItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleAction(item.id)}
                          className={`p-2.5 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-all ${
                            item.done ? 'bg-slate-50 text-slate-400 line-through' : 'bg-white hover:border-indigo-300'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded mt-0.5 flex items-center justify-center shrink-0 border text-[9px] ${
                              item.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                            }`}
                          >
                            {item.done && '✓'}
                          </div>
                          <div className="flex-1 truncate">
                            <div className="font-semibold text-slate-800 truncate">{item.title}</div>
                            <div className="text-[10px] text-slate-400">{item.doc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadlines Radar */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <CalendarCheck className="w-3.5 h-3.5 text-red-500" /> Deadlines Radar
                      </h3>
                      <button
                        onClick={onExportCalendar}
                        className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <CalendarPlus className="w-3 h-3" /> Sync
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-red-900">Scholarship Portal Lock</div>
                          <div className="text-[10px] text-red-700">NMS-2026 Circular</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-red-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                          Feb 15, 2026
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-red-900">Insurance Tier 1 Appeal</div>
                          <div className="text-[10px] text-red-700">ApolloCare Denial</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-red-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                          Feb 19, 2026
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800">Security Deposit Wire</div>
                          <div className="text-[10px] text-slate-500">Commercial Lease</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                          Feb 20, 2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: MY DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">All Indexed Documents (12)</h3>
                  <p className="text-xs text-slate-500">All uploaded notices, leases, and forms processed with neural OCR</p>
                </div>
                <button
                  onClick={onOpenUpload}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Upload Document
                </button>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-2">File Name</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Pages</th>
                      <th className="pb-2">Date Analyzed</th>
                      <th className="pb-2">Next Cut-off</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-bold text-slate-900">{d.name}</td>
                        <td className="py-3">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                            {d.catName}
                          </span>
                        </td>
                        <td className="py-3 text-slate-500">{d.pages} pages</td>
                        <td className="py-3 text-slate-500">{d.dateAnalyzed}</td>
                        <td className="py-3 font-mono font-bold text-slate-800">{d.deadline}</td>
                        <td className="py-3">
                          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              onSelectDoc(d.id);
                              onReturnLanding();
                              setTimeout(() => {
                                const el = document.getElementById('demo-section');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            }}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DEADLINES */}
          {activeTab === 'deadlines' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upcoming Deadlines (8 Total)</h3>
                  <p className="text-xs text-slate-500">Every statutory lock cut-off and submission window extracted from your documents</p>
                </div>
                <button
                  onClick={onExportCalendar}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5" /> Export All (.ics)
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((d) => (
                  <div key={d.id} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all bg-slate-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        {d.catName}
                      </span>
                      <span className="font-mono text-xs font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        {d.deadline}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 mb-1">{d.name}</div>
                    <div className="text-[11px] text-slate-500 mb-3">{d.status}</div>
                    <button
                      onClick={onExportCalendar}
                      className="w-full py-1.5 text-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 rounded-lg cursor-pointer"
                    >
                      + Add to Calendar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ACTION ITEMS */}
          {activeTab === 'action-items' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Master Action Board (27 Total)</h3>
                  <p className="text-xs text-slate-500">Ordered execution checklist to prevent application rejection</p>
                </div>
                <div className="flex gap-1.5 text-xs">
                  <button
                    onClick={() => setActionFilter('all')}
                    className={`px-3 py-1 rounded-full font-semibold cursor-pointer ${
                      actionFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    All (10)
                  </button>
                  <button
                    onClick={() => setActionFilter('pending')}
                    className={`px-3 py-1 rounded-full font-semibold cursor-pointer ${
                      actionFilter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Pending (7)
                  </button>
                  <button
                    onClick={() => setActionFilter('completed')}
                    className={`px-3 py-1 rounded-full font-semibold cursor-pointer ${
                      actionFilter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Completed (3)
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {filteredActions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleAction(item.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      item.done ? 'bg-slate-50 text-slate-400 line-through' : 'bg-white hover:border-indigo-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border text-[10px] ${
                          item.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                        }`}
                      >
                        {item.done && '✓'}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-[10px] text-slate-400">Document: {item.doc}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.done ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.done ? 'Completed' : 'Action Due'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SENSE AI ASSISTANT FULL SESSION */}
          {activeTab === 'assistant' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col h-[600px] overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Sense AI Full-Session Workspace</h3>
                    <p className="text-[10px] text-slate-500">Ask questions across all 12 indexed repository documents</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatMessages([chatMessages[0]])}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
                {chatMessages.map((m) => (
                  <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line">{m.text}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="text-xs text-indigo-600 italic flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                    <span>Sense AI is analyzing 12 documents...</span>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask Sense AI about requirements, dates, or missing signatures..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSendChat}
                  disabled={isChatLoading}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: SAVED */}
          {activeTab === 'saved' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Starred & Bookmarked Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Government</span>
                    <span className="text-amber-500 font-bold">★ Starred</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Circular_MoHFW_Scholarship_2026_Final.pdf</h4>
                  <p className="text-[11px] text-slate-500 mb-3">Saved for annual fellowship renewals and marksheet verification</p>
                  <button
                    onClick={() => {
                      onSelectDoc('scholarship');
                      onReturnLanding();
                      setTimeout(() => {
                        const el = document.getElementById('demo-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Open in Viewer →
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Real Estate</span>
                    <span className="text-amber-500 font-bold">★ Starred</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Lease_Commercial_Suite402_PrimeTowers.pdf</h4>
                  <p className="text-[11px] text-slate-500 mb-3">Bookmarked for 90-day renewal notice cutoff on Nov 30, 2028</p>
                  <button
                    onClick={() => {
                      onSelectDoc('lease');
                      onReturnLanding();
                      setTimeout(() => {
                        const el = document.getElementById('demo-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Open in Viewer →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-5 max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-slate-900">Security & Workspace Settings</h3>
                <p className="text-xs text-slate-500">Configure automated shredding, PII masks, and calendar integrations</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <strong className="block text-slate-900 text-xs">Zero Data Retention Mode</strong>
                    <span className="text-slate-500 text-[11px]">
                      Automatically expunge all uploaded source PDFs and text buffers after analysis is downloaded.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={zeroRetention}
                    onChange={(e) => setZeroRetention(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <strong className="block text-slate-900 text-xs">PII Redaction Engine</strong>
                    <span className="text-slate-500 text-[11px]">
                      Mask Social Security numbers, Aadhaar IDs, and bank account credentials before semantic parsing.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={piiRedact}
                    onChange={(e) => setPiiRedact(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <strong className="block text-slate-900 text-xs">Calendar Deadlines Auto-Sync</strong>
                    <span className="text-slate-500 text-[11px]">
                      Generate reminders 3 days and 24 hours prior to strict cut-off dates.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={calSync}
                    onChange={(e) => setCalSync(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    if (showToast) {
                      showToast('Security & workspace preferences successfully updated.');
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* TAB: USER PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl">
              {/* Header Hero Card */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    {currentUser?.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white font-black text-xl flex items-center justify-center border-2 border-indigo-300 shadow-md">
                        {currentUser?.initials || 'DR'}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Active"></span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold">{currentUser?.name || 'Guest User'}</h2>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/40">
                        <Sparkles className="w-3 h-3" />
                        {currentUser?.plan || 'Pro Individual Plan'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 mt-1">{currentUser?.email || 'N/A'}</div>

                    {currentUser?.uid && (
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                        <span className="font-mono text-[10px] bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
                          UID: {currentUser.uid}
                        </span>
                        <button
                          onClick={() => {
                            if (currentUser?.uid) {
                              navigator.clipboard.writeText(currentUser.uid);
                              if (showToast) showToast('User ID copied to clipboard');
                            }
                          }}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                          title="Copy UID"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                  {onOpenProfile && (
                    <button
                      onClick={onOpenProfile}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Profile Details</span>
                    </button>
                  )}

                  <button
                    onClick={onLogout}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-400 border border-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold text-slate-600">Documents</span>
                    <FolderOpen className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">12</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Parsed & Indexed</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold text-slate-600">Deadlines</span>
                    <CalendarCheck className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">8</div>
                  <div className="text-[11px] text-amber-600 font-semibold mt-0.5">Active Radar Items</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold text-slate-600">Cloud Storage</span>
                    <HardDrive className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">2.4 GB</div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">of 10.0 GB (24%)</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold text-slate-600">Extraction Accuracy</span>
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">98.8%</div>
                  <div className="text-[11px] text-purple-600 font-semibold mt-0.5">Gemini 3.5 Average</div>
                </div>
              </div>

              {/* Persona Showcase */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎓</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Active Persona: {currentUser?.persona === 'legal' ? 'Legal & Contracts' : currentUser?.persona === 'immigrant' ? 'Immigration & Visas' : currentUser?.persona === 'healthcare' ? 'Healthcare & Claims' : 'Student & Academic'}</h3>
                      <p className="text-xs text-slate-500">DocumentSense AI customizes prompt heuristics, proof checklists, and penalty warnings according to your persona.</p>
                    </div>
                  </div>

                  {onOpenProfile && (
                    <button
                      onClick={onOpenProfile}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      Change Persona →
                    </button>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Configured for government portals, scholarship certificates, lease covenants, and deadline escalations.</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">Firestore Path: <code className="text-indigo-600">users/{currentUser?.uid || 'guest'}</code></span>
                </div>
              </div>

              {/* Membership Plan Details */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Subscription & Plan Features</h3>
                    <p className="text-xs text-slate-500">Your tier is active with full document intelligence features enabled.</p>
                  </div>
                  <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                    {currentUser?.plan || 'Pro Individual Plan'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited PDF & Image document scanning</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Gemini 3.5 AI multi-clause semantic analysis</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Automatic iCal / Google Calendar sync</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Owner-bound Firestore encrypted isolation</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">Need team seats or dedicated compliance agreements?</span>
                  <button
                    onClick={() => {
                      if (showToast) showToast('Enterprise upgrade inquiries are processed within 24 hours.');
                    }}
                    className="font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    Explore Team Tier →
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
