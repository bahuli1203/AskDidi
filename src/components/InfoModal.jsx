import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Reusable modal used for Roadmap / Terms / Contact / Emergency dial.
export default function InfoModal({ open, onClose, title, eyebrow, children, accent = 'pink' }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    const accentMap = {
        pink: 'from-pink-500 via-rose-400 to-purple-500',
        rose: 'from-rose-500 to-pink-500',
        indigo: 'from-indigo-500 via-purple-500 to-pink-500',
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg glass-panel-heavy rounded-3xl overflow-hidden shadow-2xl shadow-pink-400/15"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className={`h-1.5 bg-gradient-to-r ${accentMap[accent] || accentMap.pink}`} />
                        <div className="px-6 pt-6 pb-2 flex items-start justify-between gap-4">
                            <div>
                                {eyebrow && (
                                    <span className="text-[10px] font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase">{eyebrow}</span>
                                )}
                                <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mt-1">{title}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl text-slate-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="px-6 pb-6 pt-2 max-h-[70vh] overflow-y-auto text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
