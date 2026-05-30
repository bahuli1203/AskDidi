import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, CheckCircle2, Circle, Flame, TrendingUp, Mic, BookOpen,
  MessageSquare, Star, Plus, ChevronRight, Trophy, Sparkles
} from 'lucide-react';

const journeyTracks = [
  {
    id: 'goals',
    emoji: '🎯',
    label: 'Goal Setting',
    color: 'from-purple-400 to-violet-600',
    accent: 'purple',
    bgLight: 'bg-purple-50 dark:bg-purple-950/20',
    borderLight: 'border-purple-200/50 dark:border-purple-800/20',
    textAccent: 'text-purple-600 dark:text-purple-300',
    description: 'Break big dreams into weekly milestones Didi tracks with you.',
    sampleGoals: [
      { text: 'Land a new job in 3 months', progress: 65, streak: 12 },
      { text: 'Save ₹10,000 this month', progress: 40, streak: 5 },
      { text: 'Exercise 4x per week', progress: 80, streak: 8 }
    ]
  },
  {
    id: 'habits',
    emoji: '🔥',
    label: 'Habit Tracker',
    color: 'from-orange-400 to-rose-500',
    accent: 'orange',
    bgLight: 'bg-orange-50 dark:bg-orange-950/20',
    borderLight: 'border-orange-200/50 dark:border-orange-800/20',
    textAccent: 'text-orange-600 dark:text-orange-300',
    description: 'Build tiny daily habits that compound into massive life changes.',
    habits: [
      { emoji: '💧', name: 'Drink 8 glasses of water', done: true },
      { emoji: '📖', name: 'Read for 20 minutes', done: true },
      { emoji: '🧘', name: 'Morning meditation', done: false },
      { emoji: '✍️', name: 'Journal 3 gratitudes', done: true },
      { emoji: '🚶', name: 'Walk 5000 steps', done: false },
      { emoji: '😴', name: 'Sleep before 11pm', done: false },
    ]
  },
  {
    id: 'confidence',
    emoji: '💪',
    label: 'Confidence Builder',
    color: 'from-pink-400 to-rose-600',
    accent: 'pink',
    bgLight: 'bg-pink-50 dark:bg-pink-950/20',
    borderLight: 'border-pink-200/50 dark:border-pink-800/20',
    textAccent: 'text-pink-600 dark:text-pink-300',
    description: 'Daily affirmations, confidence challenges, and self-worth exercises.',
    challenges: [
      { day: 'Mon', title: 'Share an opinion boldly', done: true },
      { day: 'Tue', title: 'Compliment yourself 5x', done: true },
      { day: 'Wed', title: 'Say No to something draining', done: false },
      { day: 'Thu', title: 'Try something new today', done: false },
      { day: 'Fri', title: 'Ask for what you deserve', done: false },
    ]
  },
  {
    id: 'interview',
    emoji: '🎤',
    label: 'Interview Prep',
    color: 'from-teal-400 to-emerald-600',
    accent: 'teal',
    bgLight: 'bg-teal-50 dark:bg-teal-950/20',
    borderLight: 'border-teal-200/50 dark:border-teal-800/20',
    textAccent: 'text-teal-600 dark:text-teal-300',
    description: 'Mock interviews, STAR answers, company research — Didi preps you.',
    topics: [
      { title: 'Tell me about yourself', mastery: 90, icon: '💬' },
      { title: 'Strengths & Weaknesses', mastery: 70, icon: '⚡' },
      { title: 'Salary Negotiation', mastery: 45, icon: '💰' },
      { title: 'Behavioral Questions (STAR)', mastery: 60, icon: '⭐' },
    ]
  }
];

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const completedDays = [true, true, true, false, false, false, false];

export default function WeeklyGrowth() {
  const [activeTrack, setActiveTrack] = useState('goals');
  const current = journeyTracks.find(t => t.id === activeTrack);

  const renderContent = () => {
    switch (activeTrack) {
      case 'goals':
        return (
          <div className="space-y-4">
            {current.sampleGoals.map((goal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-5 border-purple-100/30 dark:border-purple-900/10"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-500 shrink-0" />
                    <p className="font-semibold text-sm text-slate-800 dark:text-white">{goal.text}</p>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500 shrink-0">
                    <Flame className="w-4 h-4" />
                    <span className="text-xs font-bold">{goal.streak}d</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-purple-100 dark:bg-purple-950/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, delay: idx * 0.15 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 w-8 shrink-0">{goal.progress}%</span>
                </div>
              </motion.div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-purple-200 dark:border-purple-800 text-purple-500 dark:text-purple-400 text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Add a New Goal with Didi
            </button>
          </div>
        );

      case 'habits':
        return (
          <div>
            {/* Week calendar */}
            <div className="flex gap-2 mb-6">
              {weekDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    completedDays[idx]
                      ? 'bg-gradient-to-b from-orange-400 to-rose-500 text-white shadow-md shadow-orange-200/40'
                      : 'bg-orange-50 dark:bg-orange-950/20 text-orange-400 dark:text-orange-600 border border-orange-100 dark:border-orange-900/20'
                  }`}
                >
                  <span>{day}</span>
                  {completedDays[idx] && <Flame className="w-3 h-3" />}
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              {current.habits.map((habit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                    habit.done
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/40 dark:border-emerald-800/20'
                      : 'bg-white/60 dark:bg-white/5 border-slate-100/50 dark:border-white/5'
                  }`}
                >
                  <span className="text-xl">{habit.emoji}</span>
                  <p className={`flex-1 text-sm font-medium ${habit.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                    {habit.name}
                  </p>
                  {habit.done
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    : <Circle className="w-5 h-5 text-slate-200 dark:text-slate-600 shrink-0" />
                  }
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'confidence':
        return (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200/40 dark:border-pink-800/20 mb-6">
              <p className="font-serif italic text-sm text-pink-800 dark:text-pink-200 text-center">
                "Confidence is not 'they will like me'. Confidence is 'I'll be fine if they don't.'" 💕
              </p>
            </div>
            {current.challenges.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  c.done
                    ? 'bg-pink-50 dark:bg-pink-950/15 border-pink-200/40 dark:border-pink-800/20'
                    : 'glass-panel border-pink-100/30 dark:border-white/5'
                }`}
              >
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${c.done ? 'bg-pink-200 dark:bg-pink-900 text-pink-700 dark:text-pink-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {c.day}
                </span>
                <p className={`flex-1 text-sm font-medium ${c.done ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                  {c.title}
                </p>
                {c.done
                  ? <Star className="w-5 h-5 text-amber-400 fill-current shrink-0" />
                  : <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                }
              </motion.div>
            ))}
          </div>
        );

      case 'interview':
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200/40 dark:border-teal-800/20 mb-2">
              <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-2">
                <Mic className="w-3.5 h-3.5" />
                Practice with Didi — she'll give you instant feedback on your answers!
              </p>
            </div>
            {current.topics.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-5 border-teal-100/30 dark:border-teal-900/10"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{topic.icon}</span>
                    <p className="font-semibold text-sm text-slate-800 dark:text-white">{topic.title}</p>
                  </div>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{topic.mastery}%</span>
                </div>
                <div className="h-2 bg-teal-100 dark:bg-teal-950/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.mastery}%` }}
                    transition={{ duration: 1, delay: idx * 0.12 }}
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 text-white text-sm font-semibold shadow-md hover:opacity-90 cursor-pointer transition-all">
              <Mic className="w-4 h-4" /> Start Mock Interview with Didi
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="growth" className="py-24 relative overflow-hidden bg-noise">
      {/* Background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-300/6 filter blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pink-300/6 filter blur-3xl -z-10 animate-float-slow" />

      {/* Floral accents */}
      <div className="absolute top-8 right-10 text-4xl opacity-8 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-10 left-8 text-3xl opacity-8 -rotate-6 select-none pointer-events-none">🌟</div>

      <div className="w-[92%] max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-300 uppercase bg-purple-100 dark:bg-purple-950/40 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-800/30">
            🌱 Weekly Growth Journey
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-rose-500">
              Personal Growth
            </span>{' '}
            With Didi
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            Didi becomes your long-term companion — setting goals, tracking habits, building confidence, and prepping you for your biggest life moments.
          </p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { emoji: '🔥', label: 'Day Streak', value: '12', color: 'text-orange-500' },
            { emoji: '✅', label: 'Goals Complete', value: '8', color: 'text-emerald-500' },
            { emoji: '💪', label: 'Habits Built', value: '5', color: 'text-pink-500' },
            { emoji: '🏆', label: 'XP Earned', value: '340', color: 'text-amber-500' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-4 text-center border-pink-100/30 dark:border-white/5 shadow-sm">
              <span className="text-2xl">{stat.emoji}</span>
              <p className={`font-display font-extrabold text-2xl mt-1 ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Track Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {journeyTracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeTrack === track.id
                  ? `bg-gradient-to-r ${track.color} text-white shadow-lg border-transparent scale-[1.04]`
                  : 'glass-panel border-pink-100/40 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-purple-200 dark:hover:border-purple-700'
              }`}
            >
              <span className="text-base">{track.emoji}</span>
              <span>{track.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Track description */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-3xl p-8 bg-gradient-to-br ${current.color} text-white shadow-xl relative overflow-hidden`}
              >
                {/* Background emoji pattern */}
                <div className="absolute top-4 right-4 text-7xl opacity-15 select-none">{current.emoji}</div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{current.emoji}</div>
                  <h3 className="font-display font-extrabold text-2xl mb-3">{current.label}</h3>
                  <p className="text-white/85 text-base leading-relaxed mb-6">{current.description}</p>
                  
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Tracked weekly with Didi</span>
                  </div>

                  <div className="mt-6 flex items-center gap-2 p-3 bg-white/15 backdrop-blur rounded-2xl">
                    <Trophy className="w-5 h-5 text-amber-300" />
                    <p className="text-xs font-semibold text-white/90">Earn badges as you grow! 🏆</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Interactive content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="#demo"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-semibold rounded-2xl shadow-lg shadow-pink-300/25 hover:shadow-xl hover:shadow-pink-400/35 hover:scale-[1.02] transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Start Your Growth Journey with Didi
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
            Free, anonymous, and designed just for you 🌸
          </p>
        </motion.div>

      </div>
    </section>
  );
}
