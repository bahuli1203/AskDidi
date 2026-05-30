import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Mic, BookOpen, Calendar, Users2 } from 'lucide-react';
import { futureVisionData } from '../data/dummyData';

export default function FutureVision() {
  const getIcon = (idx) => {
    switch(idx) {
      case 0: return <Mic className="w-6 h-6 text-pink-400" />;
      case 1: return <BookOpen className="w-6 h-6 text-rose-400" />;
      case 2: return <Calendar className="w-6 h-6 text-purple-400" />;
      case 3: return <Users2 className="w-6 h-6 text-pink-500" />;
      default: return <Cpu className="w-6 h-6 text-rose-400" />;
    }
  };

  const cardEmojis = ['🎤', '📖', '🗓️', '👭'];

  return (
    <section id="future" className="py-24 relative overflow-hidden bg-noise">
      {/* Dynamic blob background elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-pink-400/6 filter blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-rose-400/6 filter blur-3xl -z-10 animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-300/5 filter blur-3xl -z-10" />

      {/* Floral decorations */}
      <div className="absolute top-8 left-1/4 text-4xl opacity-8 rotate-6 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-12 right-1/4 text-3xl opacity-8 -rotate-12 select-none pointer-events-none">🌷</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
            ✨ Future Roadmap
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            The Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">
              Sisterly AI
            </span>{' '}
            Support
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            We are continuously building and expanding Didi's capabilities. Check out what is arriving next in our development pipeline.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {futureVisionData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative rounded-3xl p-8 glass-panel border border-pink-200/20 dark:border-pink-900/10 shadow-lg overflow-hidden flex flex-col md:flex-row gap-6 items-start hover:shadow-xl hover:shadow-pink-200/20 dark:hover:shadow-pink-900/15 transition-all duration-300 cursor-default"
            >
              {/* Top ambient pink/rose color dot overlay */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-tr from-pink-400/10 to-rose-400/10 rounded-bl-full filter blur-md pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-300/8 to-pink-300/8 rounded-tr-full filter blur-md pointer-events-none" />

              {/* Emoji + Icon Container */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 flex items-center justify-center shadow-md border border-pink-100/50 dark:border-pink-800/20 shrink-0">
                <span className="text-2xl">{cardEmojis[idx]}</span>
              </div>

              {/* Card Copy */}
              <div className="text-left flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">
                    {item.title}
                  </h3>
                  <span className="text-[9px] px-2.5 py-1 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-950/40 dark:to-rose-950/40 text-pink-600 dark:text-pink-300 rounded-full font-bold uppercase tracking-wider border border-pink-200/40 dark:border-pink-800/20">
                    Coming Soon 🌸
                  </span>
                </div>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            Built by women, for women — with love and intention
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          </p>
        </motion.div>

      </div>
    </section>
  );
}
