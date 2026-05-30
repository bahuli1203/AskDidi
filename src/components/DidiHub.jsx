import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { MODES } from '../lib/modes';
import { navigate } from '../lib/useHashRoute';

// Card grid linking to every Didi feature.
export default function DidiHub() {
    return (
        <section id="didi-hub" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 via-white/0 to-purple-50/40 dark:from-[#1a0a25] dark:via-[#120417] dark:to-[#1a0a25] -z-10" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-pink-300/10 dark:bg-pink-900/8 filter blur-3xl -z-10" />
            <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-purple-300/10 dark:bg-purple-900/8 filter blur-3xl -z-10" />

            <div className="w-[92%] max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
                        <Sparkles className="w-3 h-3 inline mb-0.5" /> Everything Didi can do
                    </span>
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-4 leading-tight">
                        Your AI sister, in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">
                            every form you need
                        </span>
                    </h2>
                    <p className="font-sans text-slate-600 dark:text-slate-300 text-base md:text-lg">
                        Pick the mode that fits the moment. From mood tracking to interview practice, Didi adapts to be exactly what you need today.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {MODES.map((m, idx) => (
                        <motion.button
                            key={m.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 8) * 0.04 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            onClick={() => navigate(m.route.replace(/^#/, ''))}
                            className="text-left group relative glass-panel rounded-3xl p-5 border-pink-100/40 dark:border-white/10 hover:shadow-xl hover:shadow-pink-200/25 dark:hover:shadow-pink-900/20 transition-all cursor-pointer overflow-hidden"
                        >
                            {/* Hover gradient bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                                {m.emoji}
                            </div>
                            <h3 className="font-display font-bold text-slate-800 dark:text-white text-base mb-1">
                                {m.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {m.desc}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-pink-500 group-hover:text-pink-600">
                                Open →
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
}
