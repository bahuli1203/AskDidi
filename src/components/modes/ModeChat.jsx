import React, { useEffect, useRef, useState } from 'react';
import { Send, Mic, Loader2, ArrowLeft, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithDidi, transcribeAudio } from '../../lib/api';
import useVoiceRecorder from '../../lib/useVoiceRecorder';
import { backToHome } from '../../lib/useHashRoute';
import { loadJSON, saveJSON } from '../../lib/storage';

// Generic chat surface, parameterised by mode. Used by Roadmap, Decision,
// Confidence, Interview, Money, Safety, Wellness, Scholarship.
export default function ModeChat({ mode, title, emoji, subtitle, intro, suggestions = [] }) {
    const storageKey = `chat:${mode}`;
    const [messages, setMessages] = useState(() =>
        loadJSON(storageKey, [{ sender: 'didi', text: intro }])
    );
    const [inputVal, setInputVal] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [transcribing, setTranscribing] = useState(false);
    const [voiceError, setVoiceError] = useState('');
    const containerRef = useRef(null);
    const recorder = useVoiceRecorder();

    useEffect(() => { saveJSON(storageKey, messages); }, [messages, storageKey]);
    useEffect(() => {
        const el = containerRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping]);

    const ask = async (text) => {
        const clean = text?.trim();
        if (!clean) return;
        const userMsg = { sender: 'user', text: clean };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        const history = [...messages, userMsg]
            .slice(-12)
            .slice(0, -1)
            .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));

        try {
            const res = await chatWithDidi({ message: clean, history, mode, maxTokens: 900 });
            setMessages((prev) => [...prev, { sender: 'didi', text: res.reply }]);
        } catch (err) {
            console.warn('[ModeChat]', err);
            setMessages((prev) => [...prev, {
                sender: 'didi',
                text: "I couldn't reach my brain just now 🌸 — please try again in a moment.",
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) return;
        const t = inputVal.trim();
        setInputVal('');
        ask(t);
    };

    const onMic = async () => {
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
            try { await recorder.start(); } catch { /* recorder.error set */ }
        }
    };

    const reset = () => {
        setMessages([{ sender: 'didi', text: intro }]);
    };

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={backToHome}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-pink-100/50 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-pink-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Home
                    </button>
                    <button
                        onClick={reset}
                        className="text-xs text-slate-400 hover:text-pink-500 cursor-pointer"
                    >
                        Clear conversation
                    </button>
                </div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-400 to-purple-500 text-3xl shadow-lg shadow-pink-300/30 mb-3">
                        {emoji}
                    </div>
                    <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-800 dark:text-white">
                        {title}
                    </h1>
                    {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">{subtitle}</p>}
                </div>

                <div className="glass-panel-heavy rounded-3xl overflow-hidden shadow-xl border-pink-100/40 dark:border-white/10 flex flex-col h-[68vh]">
                    {/* Messages */}
                    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto space-y-4">
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-3 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${m.sender === 'user'
                                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                        : 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300'
                                    }`}>
                                    {m.sender === 'user' ? <User className="w-4 h-4" /> : '🌸'}
                                </div>
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.sender === 'user'
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-tr-none'
                                        : 'bg-white dark:bg-pink-950/25 text-slate-800 dark:text-slate-200 rounded-tl-none border border-pink-100/60 dark:border-white/5'
                                    }`}>
                                    {m.sender === 'didi' ? (
                                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:font-display prose-headings:my-2 prose-strong:text-pink-600 dark:prose-strong:text-pink-300">
                                            <ReactMarkdown>{m.text}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        <div className="whitespace-pre-line">{m.text}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-start gap-3 max-w-[80%]">
                                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-xs">🌸</div>
                                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-pink-950/25 border border-pink-100/60 dark:border-white/5 rounded-tl-none flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0s' }} />
                                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Suggestions */}
                    {suggestions.length > 0 && messages.length <= 1 && (
                        <div className="px-5 pb-2 flex flex-wrap gap-2 border-t border-pink-100/40 dark:border-white/5 pt-3">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider w-full mb-1">
                                <Sparkles className="w-3 h-3 inline text-pink-500" /> Try saying
                            </span>
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => ask(s)}
                                    className="text-xs px-3 py-1.5 rounded-full border border-pink-200/60 dark:border-white/10 bg-white/90 dark:bg-pink-950/20 text-slate-700 dark:text-slate-300 hover:border-pink-400 hover:bg-pink-50 transition-colors cursor-pointer"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {(voiceError || recorder.error) && (
                        <div className="px-5 py-2 text-xs text-rose-500 bg-rose-50/70 dark:bg-rose-950/20 border-t border-rose-100/40 dark:border-rose-900/20">
                            {voiceError || recorder.error}
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={onSubmit} className="p-4 bg-white/70 dark:bg-pink-950/20 border-t border-pink-100/50 dark:border-white/5 flex gap-2">
                        <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            placeholder={recorder.isRecording ? 'Listening... 🎙️' : `Talk to Didi...`}
                            disabled={recorder.isRecording || transcribing}
                            className="flex-1 px-4 py-3 rounded-xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm disabled:opacity-70"
                        />
                        <button
                            type="button"
                            onClick={onMic}
                            disabled={!recorder.isSupported || transcribing}
                            className={`p-3 rounded-xl border transition-all cursor-pointer disabled:opacity-50 ${recorder.isRecording
                                    ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                                    : 'bg-pink-50 dark:bg-white/5 border-pink-200/60 dark:border-white/10 text-pink-500 hover:bg-pink-100'
                                }`}
                            title={recorder.isRecording ? 'Stop & send' : 'Record voice'}
                        >
                            {transcribing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
                        </button>
                        <button
                            type="submit"
                            disabled={isTyping || !inputVal.trim()}
                            className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl shadow-md hover:opacity-95 transition-all cursor-pointer disabled:opacity-60"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
