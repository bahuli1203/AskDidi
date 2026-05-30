import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock, Heart } from 'lucide-react';
import { safetyPoints } from '../data/dummyData';

export default function SafetyPrivacy() {
  return (
    <section id="privacy" className="py-24 relative bg-gradient-to-b from-pink-50/60 to-rose-50/40 dark:from-[#12041a] dark:to-[#070310] transition-colors duration-500 overflow-hidden">
      {/* Background radial effects — switched to rose/pink */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pink-300/8 dark:bg-pink-950/8 filter blur-3xl -z-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-300/6 filter blur-3xl -z-10" />

      {/* Floral background accents */}
      <div className="absolute top-10 left-10 text-5xl opacity-8 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-12 right-12 text-4xl opacity-8 -rotate-6 select-none pointer-events-none">💮</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Security Lock Visual */}
          <div className="lg:col-span-5 relative flex justify-center py-10 lg:py-0">
            {/* Outer ambient pink ring */}
            <div className="absolute w-72 h-72 rounded-full bg-pink-400/12 dark:bg-pink-900/15 filter blur-2xl animate-pulse" />
            
            {/* Shield and Lock Mockup */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[40px] glass-panel border-pink-200/30 dark:border-pink-800/10 flex flex-col items-center justify-center shadow-xl shadow-pink-200/20 dark:shadow-pink-900/10">
              
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-pink-400 via-rose-400 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-pink-400/30 mb-4 animate-float">
                <Lock className="w-12 h-12 md:w-16 md:h-16" />
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                </span>
              </div>

              <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-800 dark:text-white text-center">
                Secure & Private
              </h3>
              <p className="text-[11px] text-pink-500 dark:text-pink-300 uppercase tracking-widest font-bold mt-2">
                🌸 Your Safe Space
              </p>
            </div>

            {/* Float tags */}
            <motion.div
              className="absolute top-4 left-6 px-3 py-1.5 rounded-full glass-panel-heavy shadow-md text-xs font-semibold text-pink-700 dark:text-pink-200 border-pink-100/50"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              🔒 No Logs Kept
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-8 px-3 py-1.5 rounded-full glass-panel-heavy shadow-md text-xs font-semibold text-rose-700 dark:text-rose-200 border-rose-100/50"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              🌸 Anonymous
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-4 px-3 py-1.5 rounded-full glass-panel-heavy shadow-md text-xs font-semibold text-purple-700 dark:text-purple-200 border-purple-100/50"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              💕 Judgment-Free
            </motion.div>
          </div>

          {/* Right Column: Key Promises */}
          <div className="lg:col-span-7 text-left">
            <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
              🛡️ Privacy First Shield
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
              A Bulletproof Promise of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">
                Confidentiality
              </span>
            </h2>
            <p className="font-sans text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
              We understand that talking about personal struggles, safety issues, or career anxieties requires absolute security. Here is how we ensure this platform remains your confidential sanctuary:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {safetyPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950/40 dark:to-rose-950/40 flex items-center justify-center text-pink-500 dark:text-pink-300 shrink-0 border border-pink-200/40 dark:border-pink-800/20 group-hover:scale-110 transition-transform duration-200">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-800 dark:text-white text-base mb-1.5">
                      {point.title}
                    </h4>
                    <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200/40 dark:border-pink-800/20 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
              <EyeOff className="w-5 h-5 text-pink-400 shrink-0 animate-pulse" />
              <span>
                <strong className="text-pink-600 dark:text-pink-300">Incognito Friendly:</strong> Open this website in private/incognito mode for maximum browser privacy. Your conversation history resides purely in memory and vanishes when the tab closes.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
