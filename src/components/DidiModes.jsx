import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, TrendingUp, Heart, Users, ShieldAlert, Sparkles, ArrowRight, MessageCircle
} from 'lucide-react';

const modes = [
  {
    id: 'career',
    emoji: '💼',
    icon: Briefcase,
    label: 'Career Didi',
    tagline: 'Your Professional Power Coach',
    color: 'from-violet-400 to-purple-600',
    lightBg: 'bg-violet-50',
    lightBorder: 'border-violet-200',
    lightText: 'text-violet-700',
    lightBadge: 'bg-violet-100 text-violet-700',
    darkBadge: 'dark:bg-violet-950/40 dark:text-violet-300',
    hoverGlow: 'hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30',
    description: 'Nail your next interview, negotiate your salary like a boss, get career roadmap advice, and overcome workplace challenges with confidence.',
    prompts: ['Help me negotiate my salary 💪', 'How do I ace a tech interview?', 'I want to switch careers at 28', 'How to handle a toxic manager?']
  },
  {
    id: 'finance',
    emoji: '💰',
    icon: TrendingUp,
    label: 'Finance Didi',
    tagline: 'Your Smart Money Mentor',
    color: 'from-emerald-400 to-teal-600',
    lightBg: 'bg-emerald-50',
    lightBorder: 'border-emerald-200',
    lightText: 'text-emerald-700',
    lightBadge: 'bg-emerald-100 text-emerald-700',
    darkBadge: 'dark:bg-emerald-950/40 dark:text-emerald-300',
    hoverGlow: 'hover:shadow-emerald-200/40 dark:hover:shadow-emerald-900/30',
    description: 'Learn to budget, invest, save, and build financial independence. Because financial freedom is the ultimate form of self-care.',
    prompts: ['How do I start investing at 22?', 'Help me create a monthly budget', 'What is an emergency fund?', 'SIP vs lump sum for beginners']
  },
  {
    id: 'wellness',
    emoji: '🌿',
    icon: Heart,
    label: 'Wellness Didi',
    tagline: 'Your Mental Health Guardian',
    color: 'from-pink-400 to-rose-600',
    lightBg: 'bg-pink-50',
    lightBorder: 'border-pink-200',
    lightText: 'text-pink-700',
    lightBadge: 'bg-pink-100 text-pink-700',
    darkBadge: 'dark:bg-pink-950/40 dark:text-pink-300',
    hoverGlow: 'hover:shadow-pink-200/40 dark:hover:shadow-pink-900/30',
    description: 'Process your emotions, manage anxiety, build self-love habits, and find peace in the chaos. Your mental health matters deeply.',
    prompts: ['I feel anxious all the time', 'Guide me through a breathing exercise', 'How to practice self-love?', 'I am feeling lonely and lost']
  },
  {
    id: 'relationships',
    emoji: '💕',
    icon: Users,
    label: 'Relationship Didi',
    tagline: 'Your Heart-Wise Companion',
    color: 'from-rose-400 to-pink-600',
    lightBg: 'bg-rose-50',
    lightBorder: 'border-rose-200',
    lightText: 'text-rose-700',
    lightBadge: 'bg-rose-100 text-rose-700',
    darkBadge: 'dark:bg-rose-950/40 dark:text-rose-300',
    hoverGlow: 'hover:shadow-rose-200/40 dark:hover:shadow-rose-900/30',
    description: 'Navigate friendships, family dynamics, romantic relationships, and heartbreaks with wisdom and your best interests at heart.',
    prompts: ['My friend betrayed my trust', 'How do I set healthy boundaries?', 'Going through a breakup 💔', 'Family pressure about marriage']
  },
  {
    id: 'safety',
    emoji: '🛡️',
    icon: ShieldAlert,
    label: 'Safety Didi',
    tagline: 'Your Protector & Legal Guide',
    color: 'from-orange-400 to-red-500',
    lightBg: 'bg-orange-50',
    lightBorder: 'border-orange-200',
    lightText: 'text-orange-700',
    lightBadge: 'bg-orange-100 text-orange-700',
    darkBadge: 'dark:bg-orange-950/40 dark:text-orange-300',
    hoverGlow: 'hover:shadow-orange-200/40 dark:hover:shadow-orange-900/30',
    description: 'Understand your legal rights, get safety protocols for harassment or abuse, access emergency helplines, and know how to protect yourself.',
    prompts: ['I am being harassed at work', 'What are my legal rights?', 'I feel unsafe right now', 'How to file a complaint?']
  }
];

export default function DidiModes() {
  const [activeMode, setActiveMode] = useState('career');
  const current = modes.find(m => m.id === activeMode);

  return (
    <section id="didi-modes" className="py-24 relative overflow-hidden bg-noise">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/8 filter blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-300/8 filter blur-3xl -z-10 animate-float-slow" />

      {/* Floral accents */}
      <div className="absolute top-10 left-10 text-4xl opacity-8 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-12 right-10 text-3xl opacity-8 -rotate-12 select-none pointer-events-none">✨</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
            🌸 Choose Your Didi
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            Meet Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">
              5 Didi Modes
            </span>
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            Switch between expert AI personas tailored to your specific need — each one designed to feel like a real elder sister who truly gets it.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                  activeMode === mode.id
                    ? `bg-gradient-to-r ${mode.color} text-white shadow-lg border-transparent scale-[1.04]`
                    : 'glass-panel border-pink-100/40 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-pink-200 dark:hover:border-pink-700'
                }`}
              >
                <span className="text-base">{mode.emoji}</span>
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Mode Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left: Mode Info Card */}
            <div className="lg:col-span-5">
              <div className={`h-full rounded-3xl p-8 bg-gradient-to-br ${current.color} text-white shadow-xl relative overflow-hidden`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 text-8xl">{current.emoji}</div>
                  <div className="absolute bottom-4 left-4 text-6xl opacity-50">{current.emoji}</div>
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 shadow-lg">
                    {current.emoji}
                  </div>
                  
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl mb-2">
                    {current.label}
                  </h3>
                  <p className="text-white/70 text-sm font-medium mb-6 tracking-wide">
                    {current.tagline}
                  </p>
                  <p className="text-white/90 text-base leading-relaxed mb-8">
                    {current.description}
                  </p>

                  <a
                    href="#demo"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:scale-[1.03] border border-white/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Talk to {current.label}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Sample Prompts Grid */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="glass-panel rounded-3xl p-6 border-pink-100/30 dark:border-white/5">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <h4 className="font-display font-bold text-slate-800 dark:text-white text-base">
                    Try asking {current.label}...
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.prompts.map((prompt, idx) => (
                    <motion.a
                      key={idx}
                      href="#demo"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`group flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-sm hover:shadow-md ${
                        current.lightBadge
                      } ${current.lightBorder} ${current.darkBadge} dark:border-white/5 ${current.hoverGlow}`}
                    >
                      <span className="text-lg shrink-0">💬</span>
                      <span className="text-sm font-medium leading-relaxed">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick mode switch hint */}
              <div className="glass-panel rounded-2xl p-4 border-pink-100/30 dark:border-white/5 flex items-center gap-3">
                <span className="text-xl">💡</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-700 dark:text-slate-200">Tip:</strong> You can switch Didi's mode any time mid-conversation. Just say <em>"Switch to Finance Didi"</em> and she'll adapt instantly!
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
