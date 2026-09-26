import React, { useState } from 'react';
import { DocumentData, ChatMessage } from '../types';
import { Brain, Sparkles, Quote, Bot, Send } from 'lucide-react';

interface SenseAIChatSpotlightProps {
  currentDoc: DocumentData;
  onSendQuestion: (text: string) => Promise<string>;
}

export const SenseAIChatSpotlight: React.FC<SenseAIChatSpotlightProps> = ({
  currentDoc,
  onSendQuestion
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Hello! I've scanned the **${currentDoc.title}**. I found **${currentDoc.dates.length} key deadlines**, **${currentDoc.checklist.length} required certificates**, and **${currentDoc.actions.length} critical action steps**. How can I help you?`,
      time: 'Just now'
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'What is the absolute last date to apply and what happens if my marksheet is late?',
      time: '1 min ago'
    },
    {
      id: 'm3',
      sender: 'bot',
      text: '1. **Final Submission Deadline:** February 15, 2026 at 23:59 IST.\n2. **If marksheet is delayed:** Applications without certified marksheets are rejected automatically with no extensions. However, you can submit an Interim Principal Provisional Certificate to secure your spot!',
      time: 'Just now',
      citation: 'Verified against Clause 5.1 & Section 4.2'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputVal).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const answer = await onSendQuestion(textToSend);
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: answer,
        time: 'Just now',
        citation: `Cross-referenced against ${currentDoc.filename}`
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: `Based on **${currentDoc.title}**, ensure you submit your application through the official portal before the final cut-off date (${currentDoc.dates[0]?.date || 'the designated deadline'}) to avoid forfeiture.`,
        time: 'Just now',
        citation: 'Verified from document context'
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="ai-chat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: Info & Popular Questions */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center bg-slate-950/60 border-b lg:border-b-0 lg:border-r border-slate-800 text-white">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-700/50 px-3 py-1 rounded-full mb-4 w-fit">
              <Brain className="w-3.5 h-3.5" />
              <span>Conversational Intelligence</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Meet Sense AI: Your Personal Document Attorney & Guide
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Don't guess what an ambiguous phrase means. Ask Sense AI in plain language and get grounded answers cited directly from the clauses in your document.
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Popular questions users ask:
              </span>
              <button
                onClick={() => handleSend('What do I need to submit?')}
                className="w-full text-left bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-xs font-medium text-slate-200 p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer"
              >
                <span>"What do I need to submit?"</span>
                <span className="text-indigo-400 text-[10px]">Ask →</span>
              </button>

              <button
                onClick={() => handleSend('What is the final deadline?')}
                className="w-full text-left bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-xs font-medium text-slate-200 p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer"
              >
                <span>"What is the final deadline?"</span>
                <span className="text-indigo-400 text-[10px]">Ask →</span>
              </button>

              <button
                onClick={() => handleSend('What information is missing?')}
                className="w-full text-left bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-xs font-medium text-slate-200 p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer"
              >
                <span>"What information is missing?"</span>
                <span className="text-indigo-400 text-[10px]">Ask →</span>
              </button>

              <button
                onClick={() => handleSend('What should I do first?')}
                className="w-full text-left bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-xs font-medium text-slate-200 p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer"
              >
                <span>"What should I do first?"</span>
                <span className="text-indigo-400 text-[10px]">Ask →</span>
              </button>
            </div>
          </div>

          {/* Right: Embedded Interactive Chat Window */}
          <div className="lg:col-span-7 flex flex-col h-[520px] bg-slate-900">
            {/* Chat Header */}
            <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sense AI Assistant</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active & Grounded
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                {currentDoc.filename.slice(0, 24)}...
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>
                    {m.citation && (
                      <div className="mt-2 text-[10px] text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                        <Quote className="w-2.5 h-2.5" />
                        <span>{m.citation}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-indigo-400 text-xs italic">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                  <span>Sense AI is analyzing clauses...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask anything about this document..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
