import React from 'react';
import { Users, Lock, Bell } from 'lucide-react';
import { BackHeader, Header } from './DiaryPage';

const CIRCLES = [
    { name: 'Career & Climbing the Ladder', emoji: '💼', members: '2.3k waitlisted', topics: ['Salary negotiation', 'Imposter syndrome', 'Switching fields'] },
    { name: 'College Sisters', emoji: '📚', members: '1.8k waitlisted', topics: ['Hostel life', 'Exam stress', 'First-job jitters'] },
    { name: 'Periods, Hormones & Wellness', emoji: '🌸', members: '3.1k waitlisted', topics: ['PCOS support', 'Period care', 'Mental wellness'] },
    { name: 'Surviving Family', emoji: '🏠', members: '1.4k waitlisted', topics: ['Boundaries', 'Pressure to marry', 'Parents who don\'t get it'] },
    { name: 'Heartbreak Healing', emoji: '💔', members: '2.6k waitlisted', topics: ['Breakups', 'Toxic friendships', 'Moving on'] },
    { name: 'Money & Independence', emoji: '💰', members: '1.1k waitlisted', topics: ['First salary', 'Investing for women', 'Saving in India'] },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-5xl mx-auto">
                <BackHeader />
                <Header emoji="👭" title="Community Circles" subtitle="Anonymous women-only spaces. Coming very soon — be on the waitlist." gradient="from-fuchsia-500 via-pink-500 to-rose-400" />

                <div className="glass-panel-heavy rounded-3xl p-5 mb-6 border-pink-100/40 dark:border-white/10 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-pink-500 shrink-0 mt-1" />
                    <div>
                        <h3 className="font-display font-bold text-slate-800 dark:text-white text-sm">100% anonymous, women-only</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            No real names, no profile photos. Identity verification happens once at signup, then you choose your sister-name.
                            Conversations are moderated by Didi to keep things kind. Currently in private beta — every circle below has a waitlist.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CIRCLES.map((c) => (
                        <div key={c.name} className="glass-panel rounded-3xl p-5 border-pink-100/40 dark:border-white/10 hover:scale-[1.02] transition-transform">
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-3xl">{c.emoji}</span>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-pink-500 bg-pink-50 dark:bg-pink-950/30 px-2 py-0.5 rounded-full">
                                    <Users className="w-3 h-3" /> {c.members}
                                </div>
                            </div>
                            <h4 className="font-display font-bold text-slate-800 dark:text-white text-base mb-2">{c.name}</h4>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {c.topics.map((t) => (
                                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-300 border border-pink-100/50">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => alert(`✨ You're on the waitlist for "${c.name}". We'll notify you the moment it opens. 🌸`)}
                                className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold cursor-pointer hover:opacity-95 flex items-center justify-center gap-1.5"
                            >
                                <Bell className="w-3.5 h-3.5" /> Join Waitlist
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
