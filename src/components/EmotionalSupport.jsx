import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Sparkles, Smile, RefreshCw, Volume2 } from 'lucide-react';
import { affirmations } from '../data/dummyData';

export default function EmotionalSupport() {
  const [mood, setMood] = useState('peaceful');
  const [stressScore, setStressScore] = useState(30);
  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: 'bg-rose-500/20 text-rose-700 dark:text-rose-300' },
    { id: 'stressed', emoji: '🤯', label: 'Overwhelmed', color: 'bg-red-500/20 text-red-700 dark:text-red-300' },
    { id: 'anxious', emoji: '🥺', label: 'Anxious', color: 'bg-amber-500/20 text-amber-700 dark:text-amber-300' },
    { id: 'reflective', emoji: '💭', label: 'Reflective', color: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300' },
    { id: 'peaceful', emoji: '🍃', label: 'Peaceful', color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' }
  ];

  // Stress-related comments from Didi
  const getStressComment = (score) => {
    if (score < 20) return "You are in a wonderful, calm state, sister. Keep nurturing this peace.";
    if (score < 40) return "Just a little tension. Keep breathing slowly. You've got everything under control.";
    if (score < 60) return "I see a bit of stress building up. How about standing up, rolling your shoulders, and drinking a glass of water?";
    if (score < 80) return "Burnout warning light! ⚠️ It's time to take a step back. Close your eyes, inhale for 4 seconds, hold for 4, and exhale for 4.";
    return "Emergency shutdown mode! 🛑 Didi orders you to close your work/study laptop for at least 15 minutes. Nothing is more important than your health right now. Let's do a breathing session together.";
  };

  // Get color gradient based on stress score
  const getStressColor = (score) => {
    if (score < 30) return 'from-teal-400 to-emerald-500';
    if (score < 60) return 'from-amber-400 to-orange-500';
    return 'from-orange-500 to-rose-600';
  };

  // Get wave animation duration based on stress score (lower score = slower, calmer wave)
  const getWaveDuration = (score) => {
    const minDur = 0.8; // fast pulse
    const maxDur = 4.0; // slow calm pulse
    const duration = maxDur - ((score / 100) * (maxDur - minDur));
    return `${Math.max(minDur, duration)}s`;
  };

  const handleNextAffirmation = () => {
    setIsRotating(true);
    setTimeout(() => {
      setAffirmationIdx((prev) => (prev + 1) % affirmations.length);
      setIsRotating(false);
    }, 4000);
  };

  const getMoodResponse = (selectedMood) => {
    switch (selectedMood) {
      case 'happy': return "Yay! I am celebrating your happiness! Double tap this joy and spread some kindness today.";
      case 'stressed': return "I hear you, sweetheart. Drop your shoulders and let me carry the weight for a second.";
      case 'anxious': return "You are safe, you are protected, and you are worthy. This moment will pass.";
      case 'reflective': return "Self-reflection is the key to growth. Let your thoughts flow without judgment.";
      case 'peaceful': return "What a beautiful state to be in. Breathe it in, you've earned this tranquility.";
      default: return "";
    }
  };

  return (
    <section id="wellness" className="py-24 relative overflow-hidden bg-noise">
      {/* Visual glowing blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-400/6 filter blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-rose-400/6 filter blur-3xl -z-10 animate-float-slow" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-300/5 filter blur-3xl -z-10" />

      {/* Floral accents */}
      <div className="absolute top-8 right-10 text-4xl opacity-8 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-10 left-8 text-3xl opacity-8 -rotate-6 select-none pointer-events-none">🌷</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
            🌸 Emotional Wellness
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            Your Sisterly{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">Sanctuary</span>
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            A safe interactive dashboard designed to help you check in with yourself, regulate stress, and receive positive affirmations.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Mood tracker + affirmations */}
          <div className="lg:col-span-6 flex flex-col gap-8 justify-between">
            {/* Widget 1: Mood Tracker */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border-white/20 dark:border-white/5 shadow-md flex-1">
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                <Smile className="w-5 h-5 text-purple-500" /> How are you feeling right now?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Tell Didi your mood to adjust her glowing presence and receive a supportive message.
              </p>

              {/* Mood Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`py-3.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border cursor-pointer ${
                      mood === m.id
                        ? 'bg-gradient-to-tr from-pink-400/20 to-rose-400/20 border-pink-400 dark:border-pink-700 shadow-md shadow-pink-200/30 scale-[1.04]'
                        : 'bg-white/80 dark:bg-pink-950/10 border-pink-100/50 dark:border-pink-900/20 hover:border-pink-300/60 dark:hover:border-pink-700/50'
                    }`}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Mood Vibe Statement */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={mood}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-pink-50/80 to-rose-50/80 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200/40 dark:border-pink-800/20 text-sm font-medium text-pink-900 dark:text-pink-200 italic flex items-center gap-2"
                >
                  <span className="text-lg">🌸</span>
                  <span>"{getMoodResponse(mood)}"</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Widget 2: Affirmations Generator */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border-white/20 dark:border-white/5 shadow-md flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" /> Daily Sisterly Affirmation
                </h3>
                <button
                  onClick={handleNextAffirmation}
                  className="p-2 rounded-xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200/50 dark:border-pink-800/30 text-pink-500 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-200 transition-all cursor-pointer"
                  title="Next affirmation"
                >
                  <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="min-h-[120px] flex items-center justify-center p-6 rounded-2xl bg-gradient-to-r from-pink-50/80 to-rose-50/80 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200/40 dark:border-pink-800/20">
                <p className="font-serif italic text-base md:text-lg text-center text-pink-900 dark:text-pink-100 leading-relaxed max-w-md">
                  "{affirmations[affirmationIdx]}"
                </p>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Affirmation {affirmationIdx + 1} of {affirmations.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Stress meter + heartbeat wave */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 md:p-8 border-white/20 dark:border-white/5 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-500 animate-pulse" /> Sisterly Stress Regulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">
                Drag the slider to define your current stress level and check out Didi's custom prescription.
              </p>

              {/* Stress Level indicator */}
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm font-bold text-slate-500">Current Stress Level</span>
                <span className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${getStressColor(stressScore)}`}>
                  {stressScore}%
                </span>
              </div>

              {/* Slider */}
              <div className="relative mb-8">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stressScore}
                  onChange={(e) => setStressScore(Number(e.target.value))}
                  className="w-full h-3 rounded-lg bg-pink-100 dark:bg-pink-950/30 appearance-none cursor-pointer accent-pink-500 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 px-1">
                  <span>Tranquil (0)</span>
                  <span>Moderate (50)</span>
                  <span>Overwhelmed (100)</span>
                </div>
              </div>

              {/* Didi's comment */}
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-black/30 border border-slate-100 dark:border-white/5 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">Didi's Diagnosis:</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    stressScore < 30 ? 'bg-teal-500/10 text-teal-600' :
                    stressScore < 60 ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'
                  }`}>
                    {stressScore < 30 ? 'Low' : stressScore < 60 ? 'Medium' : stressScore < 80 ? 'High' : 'Critical'}
                  </span>
                </div>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{getStressComment(stressScore)}"
                </p>
              </div>
            </div>

            {/* Simulated Heartbeat Wave graphic */}
            <div className="w-full rounded-2xl bg-white/40 dark:bg-black/20 p-4 border border-white/20 dark:border-white/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Heartbeat Regulation Wave</span>
                <span className="text-[10px] text-slate-500">Regulating frequency...</span>
              </div>
              
              <div className="w-full h-24 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(124, 58, 237, 0.05)" strokeDasharray="5,5" />
                  
                  {/* Calming wave path */}
                  <path
                    d="M0,50 Q40,10 80,50 T160,50 T240,50 T320,50 T400,50 T480,50 L500,50"
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="wave-path"
                    style={{ animationDuration: getWaveDuration(stressScore) }}
                  />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="50%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="text-[10px] text-center text-slate-400 mt-2">
                {stressScore > 60 
                  ? "⚠️ High activity detected. Inhale slowly to steady the flow." 
                  : "✨ Perfect rhythm. Your nervous system is aligned."}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
