import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Users } from 'lucide-react';
import DidiOrb from './DidiOrb';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const floatingBadges = [
    { text: 'Safe 🔒', delay: 0, position: 'top-8 left-0 md:-left-8' },
    { text: 'Anonymous 🤫', delay: 1, position: 'bottom-16 left-6 md:-left-12' },
    { text: '24/7 Support 🌙', delay: 2, position: 'top-12 right-0 md:-right-8' },
    { text: 'Women First 🌸', delay: 1.5, position: 'bottom-24 right-4 md:-right-12' },
    { text: 'Judgment Free 🤝', delay: 0.5, position: 'bottom-2 left-1/3' }
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-noise">
      {/* Decorative Blob backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-pink-300/25 dark:bg-pink-900/10 filter blur-3xl animate-float-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-rose-300/25 dark:bg-rose-900/10 filter blur-3xl animate-float -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink-200/20 dark:bg-pink-950/5 filter blur-3xl -z-10" />

      <div className="w-[92%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copywriting */}
        <motion.div
          className="lg:col-span-7 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/40 dark:border-white/5 text-xs md:text-sm font-semibold text-pink-700 dark:text-pink-300 mb-6 glow-secondary">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>A Safe sanctuary built just for you</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6"
          >
            Your AI Big Sister,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 dark:from-pink-400 dark:via-rose-300 dark:to-purple-400">
              Anytime.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl"
          >
            Ask anything about life, career, wellness, relationships, safety, or your future. Didi is here to listen, support, and guide you with love and zero judgment.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <a
              href="#didi-hub"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 hover:from-pink-600 hover:via-rose-500 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Didi Hub</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#demo"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-didi-card-dark/45 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/80 dark:hover:bg-didi-card-dark/80 transition-all cursor-pointer"
            >
              Talk to Didi
            </a>
          </motion.div>

          {/* Trust points */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-10 mt-10 border-t border-slate-200/50 dark:border-white/5"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">Pure Empathy</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">By Women</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive Orb & Mockup */}
        <motion.div
          className="lg:col-span-5 relative flex justify-center items-center py-10 lg:py-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.3 }}
        >
          {/* Glowing Ring around Mockup */}
          <div className="absolute w-[320px] h-[480px] md:w-[380px] md:h-[550px] rounded-[36px] bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-indigo-500/20 filter blur-xl -z-10 animate-pulse-glow" />

          {/* Floating Emotional Keywords */}
          {floatingBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              className={`absolute z-20 ${badge.position} px-4 py-2 rounded-full glass-panel-heavy shadow-md text-xs font-semibold text-purple-950 dark:text-purple-100 border-white/50 cursor-default`}
              animate={{
                y: [0, -10, 0],
                rotate: [0, idx % 2 === 0 ? 2 : -2, 0]
              }}
              transition={{
                duration: 4,
                delay: badge.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {badge.text}
            </motion.div>
          ))}

          {/* Glass Phone Mockup */}
          <div className="relative w-[280px] h-[480px] md:w-[340px] md:h-[550px] rounded-[32px] glass-panel p-4 flex flex-col items-center justify-between border-white/30 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
            {/* Phone notch */}
            <div className="w-32 h-4 bg-slate-900/10 dark:bg-white/10 rounded-full mb-4 shrink-0" />

            {/* Didi Header inside Mockup */}
            <div className="w-full flex items-center justify-between px-2 pb-3 border-b border-white/20 dark:border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 dark:text-white">Didi AI</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full font-bold">Online</span>
            </div>

            {/* Orb Component centered in Mockup */}
            <div className="my-auto transform scale-85 md:scale-95">
              <DidiOrb mood="peaceful" size="medium" />
            </div>

            {/* Prompt Preview */}
            <div className="w-full glass-panel-heavy rounded-2xl p-3 text-left border-white/50 dark:border-white/5 shrink-0">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Didi says:</p>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "Take a deep breath, sister. You don't have to carry it all today. Tell me what's on your mind."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
