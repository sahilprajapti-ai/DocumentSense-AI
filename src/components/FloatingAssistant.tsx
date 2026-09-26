import React, { useState } from 'react';
import { DocumentData } from '../types';
import { Brain, X, Minus, Send, Sparkles } from 'lucide-react';

interface FloatingAssistantProps {
  currentDoc: DocumentData;
  onSendQuestion: (text: string) => Promise<string>;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  currentDoc,
  onSendQuestion,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      id: 'f1',
      sender: 'bot',
      text: `Hi! I'm **Sense AI**. You can ask me anything about the **${currentDoc.title}**. Try asking: *"What documents do I need to attach?"* or *"Explain the penalty for late submission."*`,
      time: 'Online',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputVal).trim();
    if (!textToSend || isLoading) return;

    setMessages((prev) => [...prev, { id: String(Date.now()), sender: 'user', text: textToSend, time: 'Just now' }]);
    setInputVal('');
    setIsLoading(true);

    try {
      const answer = await onSendQuestion(textToSend);
      setMessages((prev) => [...prev, { id: String(Date.now() + 1), sender: 'bot', text: answer, time: 'Just now' }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: `Based on **${currentDoc.title}**, please ensure you submit before the cut-off date (${currentDoc.dates[0]?.date || 'stated deadline'}).`,
          time: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs rounded-full shadow-xl shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
        >
          <Brain className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Sense AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[380px] h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold">Sense AI Document Assistant</div>
                <div className="text-[10px] text-indigo-300">Ready to explain clauses & dates</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                title="Minimize"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-1.5 overflow-x-auto text-[10px] font-semibold text-slate-600">
            <button
              onClick={() => handleSend('What do I need to submit?')}
              className="bg-white border border-slate-200 px-2 py-1 rounded-full shrink-0 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer"
            >
              What to submit?
            </button>
            <button
              onClick={() => handleSend('What is the deadline?')}
              className="bg-white border border-slate-200 px-2 py-1 rounded-full shrink-0 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer"
            >
              When is deadline?
            </button>
            <button
              onClick={() => handleSend('What information is missing?')}
              className="bg-white border border-slate-200 px-2 py-1 rounded-full shrink-0 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer"
            >
              Missing info?
            </button>
            <button
              onClick={() => handleSend('What should I do first?')}
              className="bg-white border border-slate-200 px-2 py-1 rounded-full shrink-0 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer"
            >
              What to do first?
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
            {isLoading && (
              <div className="text-[11px] text-indigo-600 italic flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
                <span>Sense AI is analyzing...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2.5 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about this document..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
