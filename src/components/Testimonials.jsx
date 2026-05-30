import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Star } from 'lucide-react';
import { testimonialsData } from '../data/dummyData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-noise">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-400/8 filter blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-pink-400/8 filter blur-3xl -z-10 animate-float-slow" />
      <div className="absolute top-20 right-1/3 w-64 h-64 bg-purple-300/5 filter blur-3xl -z-10" />

      {/* Floral decorations */}
      <div className="absolute top-10 left-10 text-5xl opacity-8 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-20 right-8 text-4xl opacity-8 -rotate-12 select-none pointer-events-none">🌷</div>
      <div className="absolute top-1/2 right-16 text-3xl opacity-6 rotate-6 select-none pointer-events-none">🌺</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
            🌸 Sisterhood Stories
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            Loved by Thousands of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">
              Sisters
            </span>
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            Hear from students, professionals, and young women who found guidance, clarity, and safety talking to Didi.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl p-8 glass-panel border-pink-200/20 dark:border-pink-900/10 shadow-md flex flex-col justify-between hover:shadow-xl hover:shadow-pink-200/25 dark:hover:shadow-pink-900/15 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Soft pink corner glow */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-400/10 rounded-full filter blur-xl transition-all duration-500 group-hover:scale-150" />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-rose-300/8 rounded-full filter blur-xl transition-all duration-500 group-hover:scale-150" />
              
              <div>
                {/* Quote Icon + Stars Row */}
                <div className="mb-6 flex justify-between items-center">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950/40 dark:to-rose-950/40 flex items-center justify-center text-pink-500 dark:text-pink-300 border border-pink-200/40 dark:border-pink-800/20">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div className="flex gap-0.5 text-rose-400">
                    {'★'.repeat(5).split('').map((star, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-sans text-sm md:text-base text-slate-600 dark:text-slate-300 italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-4 pt-5 border-t border-pink-100/50 dark:border-pink-900/20">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-400/40 dark:border-pink-600/30 shadow-sm"
                />
                <div>
                  <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm">
                    {item.author}
                  </h4>
                  <p className="text-xs text-pink-500 dark:text-pink-400 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivational bottom quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center max-w-xl mx-auto py-5 px-8 rounded-3xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border border-pink-200/50 dark:border-pink-800/20 flex items-center justify-center gap-3 shadow-sm"
        >
          <span className="text-xl">🌸</span>
          <span className="text-sm font-semibold text-pink-700 dark:text-pink-300 italic">
            "Because every girl deserves an elder sister who lifts her up."
          </span>
          <span className="text-xl">🌸</span>
        </motion.div>

      </div>
    </section>
  );
}
