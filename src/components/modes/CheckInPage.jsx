import React, { useEffect, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithDidi } from '../../lib/api';
import { loadJSON, saveJSON, bumpStreak } from '../../lib/storage';
import { BackHeader, Header } from './DiaryPage';

export default function CheckInPage() {
    const [greeting, setGreeting] = useState('');
    const [reply, setReply] = useState('');
    const [response, setResponse] = useState('');
    const [followup, setFollowup] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    const today = new Date().toISOString().slice(0, 10);
    const log = loadJSON('checkin', {});
    const alreadyDone = log[today];

    useEffect(() => {
        askGreeting();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const askGreeting = async () => {
        setLoading(true);
        try {
            const res = await chatWithDidi({
                message: `Start a daily check-in. Today is ${new Date().toDateString()}.`,
                history: [],
                mode: 'dailyCheckIn',
                maxTokens: 200,
            });
            setGreeting(res.reply);
        } catch {
            setGreeting("Hi sister 🌸 How are you feeling right now — energy, body, mind? Take one slow breath and tell me. 🌸 I'm here.");
        } finally {
            setLoading(false);
        }
    };

    const send = async () => {
        if (!reply.trim()) return;
        setSending(true);
        try {
            const res = await chatWithDidi({
                message: reply.trim(),
                history: [{ role: 'assistant', content: greeting }],
                mode: 'default',
                maxTokens: 400,
            });
            setFollowup(res.reply);
            saveJSON('checkin', { ...log, [today]: { reply: reply.trim(), at: new Date().toISOString() } });
            bumpStreak('streak:checkin');
        } catch {
            setFollowup("Couldn't reach Didi 🌸 but your reply is saved. We'll talk soon.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-2xl mx-auto">
                <BackHeader />
                <Header emoji="📅" title="Daily Check-In" subtitle="One minute, just you and Didi. Every day a little hello." gradient="from-rose-300 to-pink-500" />

                <div className="glass-panel-heavy rounded-3xl p-6 mb-4 border-pink-100/40 dark:border-white/10">
                    {loading ? (
                        <div className="flex items-center gap-2 text-slate-400">
                            <Loader2 className="w-4 h-4 animate-spin" /> Didi is opening her arms...
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{greeting}</ReactMarkdown>
                        </div>
                    )}
                </div>

                <div className="glass-panel rounded-3xl p-5 border-pink-100/40 dark:border-white/10">
                    <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="One line is enough. Or write a paragraph if it's spilling out..."
                        rows={4}
                        className="w-full p-3 rounded-xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-pink-500"
                    />
                    <div className="flex items-center justify-between mt-3">
                        {alreadyDone && (
                            <span className="text-xs text-emerald-500 font-bold">✅ Today's check-in already done</span>
                        )}
                        <button
                            onClick={send}
                            disabled={sending || !reply.trim()}
                            className="ml-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold shadow-md hover:opacity-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {sending ? 'Sending...' : 'Send to Didi'}
                        </button>
                    </div>
                </div>

                {followup && (
                    <div className="glass-panel rounded-3xl p-5 mt-4 border-purple-100/40 dark:border-white/10 bg-gradient-to-br from-pink-50/50 to-purple-50/30 dark:from-pink-950/10 dark:to-purple-950/10">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{followup}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
