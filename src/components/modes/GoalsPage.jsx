import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Check, Briefcase, BookOpen, Heart, User } from 'lucide-react';
import { loadJSON, saveJSON, bumpStreak } from '../../lib/storage';
import { BackHeader, Header } from './DiaryPage';

const CATEGORIES = [
    { key: 'career', label: 'Career', icon: Briefcase, color: 'from-indigo-500 to-purple-500' },
    { key: 'study', label: 'Study', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { key: 'fitness', label: 'Fitness', icon: Heart, color: 'from-rose-500 to-pink-500' },
    { key: 'personal', label: 'Personal', icon: User, color: 'from-emerald-500 to-teal-500' },
];

export default function GoalsPage() {
    const [goals, setGoals] = useState(() => loadJSON('goals', []));
    const [draft, setDraft] = useState('');
    const [activeCat, setActiveCat] = useState('career');
    const [filter, setFilter] = useState('all'); // all | active | done

    useEffect(() => { saveJSON('goals', goals); }, [goals]);

    const add = () => {
        if (!draft.trim()) return;
        setGoals((prev) => [
            { id: Date.now(), category: activeCat, text: draft.trim(), done: false, created: new Date().toISOString() },
            ...prev,
        ]);
        setDraft('');
    };

    const toggle = (id) => {
        setGoals((prev) => prev.map((g) => {
            if (g.id !== id) return g;
            const flipped = !g.done;
            if (flipped) bumpStreak('streak:goals');
            return { ...g, done: flipped, doneAt: flipped ? new Date().toISOString() : null };
        }));
    };

    const remove = (id) => setGoals((prev) => prev.filter((g) => g.id !== id));

    const visible = goals.filter((g) =>
        filter === 'all' ? true : filter === 'active' ? !g.done : g.done
    );

    const stats = {
        total: goals.length,
        done: goals.filter((g) => g.done).length,
    };
    const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <BackHeader />
                <Header emoji="🎯" title="Goal Planner" subtitle="Career, study, fitness, personal — track what matters and watch progress add up." gradient="from-purple-500 via-pink-400 to-rose-500" />

                {/* Progress */}
                {stats.total > 0 && (
                    <div className="glass-panel-heavy rounded-3xl p-5 mb-6 border-pink-100/40 dark:border-white/10">
                        <div className="flex items-baseline justify-between mb-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Overall progress</span>
                            <span className="text-sm text-slate-500">{stats.done} of {stats.total} done · <strong className="text-pink-500">{pct}%</strong></span>
                        </div>
                        <div className="w-full h-2 bg-pink-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                    </div>
                )}

                {/* Add new */}
                <div className="glass-panel-heavy rounded-3xl p-5 mb-6 border-pink-100/40 dark:border-white/10">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {CATEGORIES.map((c) => {
                            const Icon = c.icon;
                            const active = activeCat === c.key;
                            return (
                                <button
                                    key={c.key}
                                    onClick={() => setActiveCat(c.key)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${active
                                            ? `bg-gradient-to-r ${c.color} text-white shadow-md`
                                            : 'bg-white/70 dark:bg-white/5 border border-pink-100/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-pink-300'
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" /> {c.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && add()}
                            placeholder="What's the goal? e.g. Run 5km by July"
                            className="flex-1 px-4 py-3 rounded-xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm"
                        />
                        <button
                            onClick={add}
                            disabled={!draft.trim()}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                        >
                            <Plus className="w-4 h-4" /> Add
                        </button>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex gap-2 mb-4">
                    {['all', 'active', 'done'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${filter === f
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                                    : 'bg-white/70 dark:bg-white/5 border border-pink-100/40 dark:border-white/10 text-slate-500'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-2">
                    {visible.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-sm">
                            {goals.length === 0 ? 'Add your first goal above. 🌸' : 'Nothing here yet.'}
                        </div>
                    ) : (
                        visible.map((g) => {
                            const cat = CATEGORIES.find((c) => c.key === g.category) || CATEGORIES[0];
                            const Icon = cat.icon;
                            return (
                                <div key={g.id} className={`glass-panel rounded-2xl p-4 border-pink-100/40 dark:border-white/10 flex items-center gap-3 ${g.done ? 'opacity-60' : ''}`}>
                                    <button
                                        onClick={() => toggle(g.id)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${g.done
                                                ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md'
                                                : 'bg-white dark:bg-white/5 border-2 border-pink-200 dark:border-white/10 hover:border-pink-400'
                                            }`}
                                        aria-label="Toggle done"
                                    >
                                        {g.done && <Check className="w-4 h-4" />}
                                    </button>
                                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${cat.color} text-white shrink-0`}>
                                        <Icon className="w-3 h-3" /> {cat.label}
                                    </div>
                                    <p className={`flex-1 text-sm ${g.done ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {g.text}
                                    </p>
                                    <button
                                        onClick={() => remove(g.id)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                                        aria-label="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
