import React, { useEffect, useMemo, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { loadJSON, saveJSON, bumpStreak } from '../../lib/storage';
import { chatWithDidi } from '../../lib/api';
import { BackHeader, Header } from './DiaryPage';

const MOODS = [
    { key: 'amazing', emoji: '🌟', label: 'Amazing', color: 'from-emerald-400 to-teal-400', score: 5 },
    { key: 'happy', emoji: '😊', label: 'Happy', color: 'from-yellow-400 to-orange-400', score: 4 },
    { key: 'okay', emoji: '😌', label: 'Okay', color: 'from-sky-400 to-indigo-400', score: 3 },
    { key: 'low', emoji: '😔', label: 'Low', color: 'from-purple-400 to-pink-400', score: 2 },
    { key: 'awful', emoji: '💔', label: 'Awful', color: 'from-rose-500 to-red-500', score: 1 },
];

export default function MoodPage() {
    const [logs, setLogs] = useState(() => loadJSON('mood', []));
    const [note, setNote] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => { saveJSON('mood', logs); }, [logs]);

    const today = new Date().toISOString().slice(0, 10);
    const loggedToday = logs.some((l) => l.date === today);

    const log = (mood) => {
        const entry = { id: Date.now(), date: today, mood: mood.key, score: mood.score, emoji: mood.emoji, label: mood.label, note: note.trim() };
        // Replace today's log if it exists, else prepend.
        setLogs((prev) => {
            const filtered = prev.filter((l) => l.date !== today);
            return [entry, ...filtered].slice(0, 365);
        });
        setNote('');
        bumpStreak('streak:mood');
    };

    const last30 = useMemo(() => logs.slice(0, 30).reverse(), [logs]);

    const trend = useMemo(() => {
        if (last30.length < 3) return null;
        const avg = last30.reduce((a, l) => a + l.score, 0) / last30.length;
        return avg.toFixed(1);
    }, [last30]);

    const askSummary = async () => {
        if (logs.length < 3) return;
        setLoading(true);
        setSummary('');
        const text = logs.slice(0, 14).map((l) => `${l.date}: ${l.label} (${l.score}/5)${l.note ? ' — ' + l.note : ''}`).join('\n');
        try {
            const res = await chatWithDidi({
                message: `Here is my recent mood log:\n${text}`,
                history: [],
                mode: 'moodSummary',
                maxTokens: 300,
            });
            setSummary(res.reply);
        } catch {
            setSummary("Couldn't reach Didi right now 🌸");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <BackHeader />
                <Header emoji="😊" title="Mood Tracker" subtitle="Log how you're feeling each day. After a few days, Didi can spot patterns." />

                {/* Today */}
                <div className="glass-panel-heavy rounded-3xl p-6 mb-6 border-pink-100/40 dark:border-white/10">
                    <h3 className="font-display font-bold text-slate-800 dark:text-white mb-4 text-center">
                        How are you feeling today?
                    </h3>
                    <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
                        {MOODS.map((m) => (
                            <button
                                key={m.key}
                                onClick={() => log(m)}
                                className={`flex flex-col items-center gap-1 py-4 rounded-2xl bg-gradient-to-br ${m.color} text-white font-bold text-xs shadow-md hover:scale-[1.05] transition-transform cursor-pointer`}
                            >
                                <span className="text-2xl">{m.emoji}</span>
                                <span>{m.label}</span>
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Optional note... what made you feel this way?"
                        className="w-full px-4 py-2.5 rounded-xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm"
                    />
                    {loggedToday && (
                        <p className="text-xs text-emerald-500 mt-2 text-center">✅ You've logged your mood for today.</p>
                    )}
                </div>

                {/* Trend */}
                {last30.length > 0 && (
                    <div className="glass-panel rounded-3xl p-6 mb-6 border-pink-100/40 dark:border-white/10">
                        <div className="flex items-baseline justify-between mb-4">
                            <h3 className="font-display font-bold text-slate-800 dark:text-white">Last 30 days</h3>
                            {trend && <span className="text-sm text-slate-500">Average: <strong className="text-pink-500">{trend}/5</strong></span>}
                        </div>
                        <div className="flex items-end gap-1 h-32">
                            {last30.map((l) => (
                                <div
                                    key={l.id}
                                    title={`${l.date}: ${l.label}`}
                                    className="flex-1 rounded-t-md bg-gradient-to-t from-pink-500 to-rose-300 dark:from-pink-600 dark:to-rose-400 transition-all hover:opacity-80"
                                    style={{ height: `${(l.score / 5) * 100}%`, minHeight: '6px' }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                            <span>{last30[0]?.date}</span>
                            <span>{last30[last30.length - 1]?.date}</span>
                        </div>
                    </div>
                )}

                {/* AI summary */}
                <div className="glass-panel rounded-3xl p-5 border-purple-100/40 dark:border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-500" /> Didi's Read on Your Week
                        </h3>
                        <button
                            onClick={askSummary}
                            disabled={loading || logs.length < 3}
                            className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                        >
                            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                            {loading ? 'Reading...' : 'Summarize'}
                        </button>
                    </div>
                    {summary ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{summary}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {logs.length < 3 ? 'Log your mood for at least 3 days, then I\'ll give you a gentle reading.' : 'Click "Summarize" — I\'ll spot patterns from your last 14 days.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
