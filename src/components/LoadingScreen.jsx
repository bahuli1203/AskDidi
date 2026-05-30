import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PETAL_COUNT = 14;
const PETALS = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 10 + 8,
  duration: Math.random() * 4 + 5,
  delay: Math.random() * 2,
}));

const loadingSteps = [
  'Waking Didi up… 🌸',
  'Brewing some chai for you… ☕',
  'Didi is ready to listen… 💕',
];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 1.8;
      });
    }, 40);

    // Step messages
    const t1 = setTimeout(() => setStepIndex(1), 900);
    const t2 = setTimeout(() => setStepIndex(2), 1800);
    // Done after ~2.8s
    const t3 = setTimeout(() => onDone(), 2900);

    return () => { clearInterval(interval); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#120417] via-[#1e0a29] to-[#0b020e] overflow-hidden"
    >
      {/* Falling petals */}
      {PETALS.map(p => (
        <div
          key={p.id}
          className="petal absolute"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Background glows */}
      <div className="absolute w-96 h-96 rounded-full bg-pink-600/15 filter blur-3xl top-1/4 left-1/3 animate-pulse" />
      <div className="absolute w-72 h-72 rounded-full bg-purple-600/10 filter blur-3xl bottom-1/4 right-1/3 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8">
        {/* Logo orb */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 14 }}
          className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-pink-500 via-rose-400 to-purple-600 flex items-center justify-center text-5xl shadow-2xl shadow-pink-500/30"
        >
          🌸
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-display font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400">
            Ask Didi
          </h1>
          <p className="text-white/50 text-sm mt-1 font-sans">Your AI Big Sister, Anytime</p>
        </motion.div>

        {/* Step message */}
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-white/60 text-sm font-sans"
          >
            {loadingSteps[stepIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
