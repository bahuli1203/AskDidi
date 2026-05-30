import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithDidi } from '../../lib/api';
import { BackHeader, Header } from './DiaryPage';

export default function FutureMePage() {
    const [goals, setGoals] = useState('');
    const [habits, setHabits] = useState('');
    const [vision, setVision] = useState('');
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (!goals.trim()) return;
        setLoading(true);
        setVision('');
        const prompt = `Goals (where I want to go):\n${goals.trim()}\n\nCurrent habits (what I'm doing daily right now):\n${habits.trim() || 'Not described.'}`;
        try {
            const res = await chatWithDidi({
                message: prompt,
                history: [],
                mode: 'futureMe',
                maxTokens: 1200,
            });
            setVision(res.reply);
        } catch {
            setVision("Couldn't reach Didi just now 🌸 — try again in a moment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <BackHeader />
                <Header emoji="🔮" title="Future Me Simulator" subtitle="Three vivid versions of you, two years from now — based on what you're doing today." gradient="from-purple-500 via-pink-500 to-rose-500" />

                <div className="glass-panel-heavy rounded-3xl p-5 mb-6 border-pink-100/40 dark:border-white/10 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Your goals</label>
                        <textarea
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="e.g. Become a senior frontend engineer, save ₹6L, run a half-marathon, learn French..."
                            rows={3}
                            className="w-full p-3 rounded-xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Current habits</label>
                        <textarea
                            value={habits}
                            onChange={(e) => setHabits(e.target.value)}
                            placeholder="e.g. Code 1 hour after work, gym 2x/week, doomscroll Instagram an hour at night, journal sometimes..."
                            rows={3}
                            className="w-full p-3 rounded-xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-pink-500"
                        />
                    </div>
                    <button
                        onClick={generate}
                        disabled={loading || !goals.trim()}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white text-sm font-bold shadow-lg hover:opacity-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {loading ? 'Looking into your future...' : 'Show me my futures 🔮'}
                    </button>
                </div>

                {vision && (
                    <div className="glass-panel rounded-3xl p-6 border-pink-100/40 dark:border-white/10">
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-headings:my-3 prose-strong:text-pink-600 dark:prose-strong:text-pink-300">
                            <ReactMarkdown>{vision}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
