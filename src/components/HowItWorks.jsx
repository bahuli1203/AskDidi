import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, HeartHandshake, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Ask Freely",
      desc: "Share whatever is on your mind—career worries, personal problems, health questions, or safety fears. Speak via text or voice, 100% anonymously.",
      icon: MessageSquare,
      color: "from-pink-400 to-rose-500",
      glow: "shadow-pink-400/25",
      emoji: "💬"
    },
    {
      num: "02",
      title: "Get Sisterly Guidance",
      desc: "Didi responds immediately with deep empathy, clear perspectives, and actionable resources. No judgment, just pure, supportive big sister energy.",
      icon: HeartHandshake,
      color: "from-rose-400 to-purple-500",
      glow: "shadow-rose-400/25",
      emoji: "💕"
    },
    {
      num: "03",
      title: "Grow with Confidence",
      desc: "Work with Didi to break down huge challenges into easy, doable steps, construct goals, check-in daily, and navigate your future with clarity.",
      icon: Compass,
      color: "from-purple-400 to-pink-500",
      glow: "shadow-purple-400/25",
      emoji: "🌟"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-gradient-to-b from-rose-50/50 to-pink-50/30 dark:from-[#12041a] dark:to-[#070310] transition-colors duration-500 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-rose-300/8 filter blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300/8 filter blur-3xl -z-10" />
      <div className="absolute top-20 right-1/4 w-48 h-48 bg-purple-300/6 filter blur-3xl -z-10" />

      {/* Floral background accents */}
      <div className="absolute top-8 right-8 text-4xl opacity-8 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-12 left-8 text-3xl opacity-8 -rotate-6 select-none pointer-events-none">🌺</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
            🌸 The Journey
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">
              Ask Didi
            </span>{' '}
            Works
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            A simple, safe, and supportive three-step process built to guide you towards solutions and growth.
          </p>
        </div>

        {/* Desktop timeline path */}
        <div className="relative">
          {/* Horizontal line for desktop — pink gradient */}
          <div className="hidden lg:block absolute top-[90px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-pink-300 via-rose-400 to-purple-400 opacity-30 dark:opacity-20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Bubble Indicator */}
                  <div className="relative mb-8">
                    {/* Glowing outer shadow ring */}
                    <div className={`absolute inset-[-6px] rounded-full bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm -z-10`} />

                    {/* Step Icon Sphere */}
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-300 relative`}>
                      <Icon className="w-8 h-8" />
                      
                      {/* Number bubble */}
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-300 rounded-full font-sans text-xs font-bold flex items-center justify-center shadow-md border border-pink-100 dark:border-pink-800">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="glass-panel rounded-3xl p-8 border-pink-100/30 dark:border-pink-900/10 shadow-md group-hover:shadow-xl group-hover:shadow-pink-200/20 dark:group-hover:shadow-pink-900/15 transition-all duration-300 w-full flex-1">
                    {/* Emoji accent */}
                    <div className="text-2xl mb-3">{step.emoji}</div>
                    <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-4 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Mobile timeline helper indicators */}
                  {idx < 2 && (
                    <div className="lg:hidden my-6 text-pink-400 dark:text-pink-600 animate-bounce">
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Didi is available 24/7, every single day, for every single girl who needs her.
            <Sparkles className="w-4 h-4 text-pink-400" />
          </p>
        </motion.div>

      </div>
    </section>
  );
}
