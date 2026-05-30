import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mic, Loader2 } from 'lucide-react';
import { chatWithDidi, transcribeAudio } from '../lib/api';
import useVoiceRecorder from '../lib/useVoiceRecorder';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'didi',
      text: "Hey there! Didi here. What's on your mind today, sister? Feel free to ask me anything. I'm listening, and remember — your secret is safe with me. 🌸",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const chatContainerRef = useRef(null);
  const recorder = useVoiceRecorder();

  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const ask = async (text) => {
    const clean = text?.trim();
    if (!clean) return;
    const userMsg = { sender: 'user', text: clean };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const history = [...messages, userMsg]
      .slice(-10)
      .slice(0, -1)
      .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));

    try {
      const res = await chatWithDidi({ message: clean, history });
      setMessages((prev) => [...prev, { sender: 'didi', text: res.reply }]);
    } catch (err) {
      console.warn('[floating chat] failed', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'didi', text: "Hmm, I can't reach my brain right now 🌸 — please try again in a moment." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = inputVal.trim();
    if (!text) return;
    setInputVal('');
    ask(text);
  };

  const handleMic = async () => {
    setVoiceError('');
    if (transcribing) return;
    if (recorder.isRecording) {
      try {
        const blob = await recorder.stop();
        if (!blob) return;
        setTranscribing(true);
        const { text } = await transcribeAudio(blob);
        if (text?.trim()) await ask(text.trim());
        else setVoiceError("I couldn't catch that, sister.");
      } catch (err) {
        setVoiceError(err.message || 'Voice failed.');
      } finally {
        setTranscribing(false);
      }
    } else {
      try { await recorder.start(); } catch { /* error in recorder.error */ }
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-400/30 hover:shadow-xl hover:shadow-rose-400/40 hover:scale-[1.05] transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span className="text-lg">🌸</span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-sm font-semibold">
              Chat with Didi
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[90%] sm:w-[380px] h-[500px] glass-panel-heavy rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/40 dark:border-white/10 flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <div>
                  <h4 className="font-bold text-sm">Chat with Didi 💕</h4>
                  <span className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white/80 rounded-full animate-ping" />
                    Always Anonymous & Safe
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-white/30 dark:bg-black/10">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex items-start gap-2.5 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${m.sender === 'user'
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                      }`}
                  >
                    {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : '🌸'}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-line ${m.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-tr-none'
                      : 'bg-white dark:bg-pink-950/20 text-slate-800 dark:text-slate-200 rounded-tl-none border border-pink-100/50 dark:border-pink-800/20'
                      }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5 max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-xs">🌸</div>
                  <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-didi-card-dark border border-slate-100 dark:border-white/5 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            {(voiceError || recorder.error) && (
              <div className="px-4 py-1.5 text-[11px] text-rose-500 bg-rose-50/60 dark:bg-rose-950/20">
                {voiceError || recorder.error}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="p-3 bg-white/60 dark:bg-didi-card-dark/40 border-t border-slate-100 dark:border-white/5 flex gap-2 shrink-0">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={recorder.isRecording ? 'Listening... 🎙️' : 'Talk to Didi... 🌸'}
                disabled={recorder.isRecording || transcribing}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-pink-200/50 dark:border-pink-800/30 bg-white dark:bg-pink-950/15 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-pink-600 focus:outline-none focus:border-pink-400 dark:focus:border-pink-500 disabled:opacity-70"
              />
              <button
                type="button"
                onClick={handleMic}
                disabled={!recorder.isSupported || transcribing}
                title={recorder.isRecording ? 'Stop & send' : 'Record voice'}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer disabled:opacity-50 ${recorder.isRecording
                  ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                  : 'bg-pink-50 dark:bg-white/5 border-pink-200/50 dark:border-pink-800/30 text-pink-500 hover:bg-pink-100'
                  }`}
              >
                {transcribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                type="submit"
                disabled={isTyping}
                className="p-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl shadow-md shadow-pink-200/30 hover:scale-[1.03] transition-transform cursor-pointer disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
