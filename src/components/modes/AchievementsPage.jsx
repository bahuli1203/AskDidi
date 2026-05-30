import React from 'react';
import { Flame, Trophy, Star, Lock } from 'lucide-react';
import { loadJSON } from '../../lib/storage';
import { BackHeader, Header } from './DiaryPage';

const STREAK_KEYS = [
    { key: 'streak:diary', label: 'Diary', emoji: '💬', color: 'from-pink-500 to-rose-400' },
    { key: 'streak:mood', label: 'Mood', emoji: '😊', color: 'from-orange-400 to-pink-500' },
    { key: 'streak:goals', label: 'Goals', emoji: '🎯', color: 'from-purple-500 to-indigo-500' },
    { key: 'streak:checkin', label: 'Check-In', emoji: '📅', color: 'from-rose-300 to-pink-400' },
];

const BADGES = [
    { id: 'first-diary', title: 'First Words', desc: 'Wrote your first diary entry.', check: () => loadJSON('diary', []).length >= 1, icon: '✍️' },
    { id: 'diary-7', title: 'Diary Devotee', desc: '7 diary entries logged.', check: () => loadJSON('diary', []).length >= 7, icon: '📖' },
    { id: 'mood-3', title: 'Tuned In', desc: 'Logged your mood for 3 days.', check: () => loadJSON('mood', []).length >= 3, icon: '🎵' },
    { id: 'mood-30', title: 'Self-Aware', desc: '30 mood entries logged.', check: () => loadJSON('mood', []).length >= 30, icon: '🧘‍♀️' },
    { id: 'goal-1', title: 'Goal Getter', desc: 'Completed your first goal.', check: () => loadJSON('goals', []).filter((g) => g.done).length >= 1, icon: '🎯' },
    { id: 'goal-10', title: 'On a Roll', desc: 'Completed 10 goals.', check: () => loadJSON('goals', []).filter((g) => g.done).length >= 10, icon: '🚀' },
    { id: 'checkin-7', title: 'Daily Sister', desc: '7-day check-in streak.', check: () => (loadJSON('streak:checkin', { current: 0 }).current || 0) >= 7, icon: '💕' },
    { id: 'checkin-30', title: 'Inseparable', desc: '30-day check-in streak.', check: () => (loadJSON('streak:checkin', { current: 0 }).current || 0) >= 30, icon: '🌸' },
];

export default function AchievementsPage() {
    const streaks = STREAK_KEYS.map((s) => ({
        ...s,
        state: loadJSON(s.key, { current: 0, longest: 0, lastDate: null }),
    }));

    const earned = BADGES.filter((b) => {
        try { return b.check(); } catch { return false; }
    });
    const earnedIds = new Set(earned.map((b) => b.id));

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <BackHeader />
                <Header emoji="🏆" title="Streaks & Achievements" subtitle="Small consistent steps add up. Here's the proof." gradient="from-yellow-400 via-orange-500 to-pink-500" />

                {/* Streaks */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {streaks.map((s) => (
                        <div key={s.key} className={`rounded-2xl p-4 bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">{s.emoji}</span>
                                <Flame className="w-4 h-4 opacity-70" />
                            </div>
                            <p className="text-xs opacity-80 font-bold uppercase tracking-wider">{s.label}</p>
                            <p className="text-3xl font-display font-extrabold leading-tight my-1">{s.state.current || 0}</p>
                            <p className="text-[10px] opacity-80">days · best {s.state.longest || 0}</p>
                        </div>
                    ))}
                </div>

                {/* Badges */}
                <div className="glass-panel-heavy rounded-3xl p-6 border-pink-100/40 dark:border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" /> Badges
                        </h3>
                        <span className="text-xs text-slate-500"><strong className="text-pink-500">{earned.length}</strong> of {BADGES.length} earned</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {BADGES.map((b) => {
                            const got = earnedIds.has(b.id);
                            return (
                                <div
                                    key={b.id}
                                    className={`p-4 rounded-2xl text-center transition-all ${got
                                            ? 'bg-gradient-to-br from-yellow-100 to-pink-100 dark:from-yellow-900/30 dark:to-pink-900/30 border border-yellow-300/50 dark:border-yellow-700/40 shadow-md'
                                            : 'bg-slate-100/60 dark:bg-white/3 border border-slate-200/60 dark:border-white/5 opacity-50'
                                        }`}
                                >
                                    <div className="text-3xl mb-1">{got ? b.icon : <Lock className="w-6 h-6 inline text-slate-400" />}</div>
                                    <p className="font-display font-bold text-xs text-slate-800 dark:text-white">{b.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{b.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-slate-400">
                    <Star className="w-3 h-3 inline mb-0.5 mr-1" />
                    Streaks update when you use a feature on a new day.
                </div>
            </div>
        </div>
    );
}
