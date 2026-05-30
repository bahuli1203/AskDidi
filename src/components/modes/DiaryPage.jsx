import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Trash2, Sparkles, Loader2, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { backToHome } from '../../lib/useHashRoute';
import { loadJSON, saveJSON, bumpStreak } from '../../lib/storage';
import { chatWithDidi } from '../../lib/api';

export default function DiaryPage() {
    const [entries, setEntries] = useState(() => loadJSON('diary', []));
    const [draft, setDraft] = useState('');
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => { saveJSON('diary', entries); }, [entries]);

    const save = () => {
        if (!draft.trim()) return;
        const entry = {
            id: Date.now(),
            date: new Date().toISOString(),
            text: draft.trim(),
        };
        setEntries((prev) => [entry, ...prev]);
        setDraft('');
        bumpStreak('streak:diary');
    };

    const remove = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

    const askInsight = async () => {
        if (!entries.length) return;
        setLoading(true);
        setInsight('');
        const text = entries.slice(0, 7).map((e) =>
            `[${new Date(e.date).toDateString()}]\n${e.text}`
        ).join('\n\n---\n\n');
        try {
            const res = await chatWithDidi({
                message: `Here are my recent diary entries:\n\n${text}`,
                history: [],
                mode: 'diaryInsight',
                maxTokens: 500,
            });
            setInsight(res.reply);
        } catch (err) {
            setInsight("Couldn't reach Didi right now 🌸 — try again in a moment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <BackHeader />

                <Header emoji="💬" title="Didi Diary" subtitle="A private space for your thoughts. Didi can read your last week and share gentle observations." />

                {/* Composer */}
                <div className="glass-panel-heavy rounded-3xl p-5 mb-6 border-pink-100/40 dark:border-white/10">
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Today I'm feeling..."
                        rows={5}
                        className="w-full p-4 rounded-2xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm resize-y"
                    />
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-400">{draft.length} characters · {entries.length} entries saved</span>
                        <button
                            onClick={save}
                            disabled={!draft.trim()}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold shadow-md hover:opacity-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Save Entry
                        </button>
                    </div>
                </div>

                {/* AI Insight */}
                <div className="glass-panel rounded-3xl p-5 mb-6 border-purple-100/40 dark:border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-500" /> Didi's Reflection
                        </h3>
                        <button
                            onClick={askInsight}
                            disabled={loading || entries.length === 0}
                            className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                        >
                            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                            {loading ? 'Reflecting...' : 'Get Insight'}
                        </button>
                    </div>
                    {insight ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{insight}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {entries.length === 0
                                ? 'Write your first entry, then I\'ll reflect on what I notice. 🌸'
                                : 'Click "Get Insight" — I\'ll read your last 7 entries and share gentle observations.'}
                        </p>
                    )}
                </div>

                {/* Past entries */}
                <div className="space-y-3">
                    {entries.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">Your diary is empty. Start with one line above.</p>
                        </div>
                    ) : (
                        entries.map((e) => (
                            <div key={e.id} className="glass-panel rounded-2xl p-4 border-pink-100/40 dark:border-white/10">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
                                        {new Date(e.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                    </span>
                                    <button
                                        onClick={() => remove(e.id)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                                        aria-label="Delete entry"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed">{e.text}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export function BackHeader() {
    return (
        <div className="flex items-center justify-between mb-6">
            <button
                onClick={backToHome}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-pink-100/50 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-pink-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" /> Home
            </button>
        </div>
    );
}

export function Header({ emoji, title, subtitle, gradient = 'from-pink-500 via-rose-400 to-purple-500' }) {
    return (
        <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br ${gradient} text-3xl shadow-lg shadow-pink-300/30 mb-3`}>
                {emoji}
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-800 dark:text-white">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">{subtitle}</p>}
        </div>
    );
}
