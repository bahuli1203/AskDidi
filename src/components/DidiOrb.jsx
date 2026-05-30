import React from 'react';

export default function DidiOrb({ mood = 'peaceful', size = 'medium' }) {
  // Map moods to gradient colors and glow shadows
  const moodStyles = {
    peaceful: {
      gradient: 'from-violet-400 via-purple-500 to-indigo-600',
      glow: 'shadow-[0_0_50px_20px_rgba(139,92,246,0.4)]',
      pulseSpeed: 'animate-orb-pulse-slow',
      orbBg: 'rgba(139, 92, 246, 0.2)',
      labelColor: 'text-purple-400'
    },
    reflective: {
      gradient: 'from-indigo-400 via-purple-600 to-pink-500',
      glow: 'shadow-[0_0_55px_22px_rgba(79,70,229,0.4)]',
      pulseSpeed: 'animate-orb-pulse',
      orbBg: 'rgba(79, 70, 229, 0.2)',
      labelColor: 'text-indigo-400'
    },
    happy: {
      gradient: 'from-pink-400 via-rose-400 to-amber-300',
      glow: 'shadow-[0_0_60px_25px_rgba(244,63,94,0.4)]',
      pulseSpeed: 'animate-orb-pulse-fast',
      orbBg: 'rgba(244, 63, 94, 0.2)',
      labelColor: 'text-rose-400'
    },
    anxious: {
      gradient: 'from-amber-200 via-pink-300 to-purple-400',
      glow: 'shadow-[0_0_40px_15px_rgba(251,191,36,0.3)]',
      pulseSpeed: 'animate-orb-pulse-fast',
      orbBg: 'rgba(251, 191, 36, 0.15)',
      labelColor: 'text-amber-500'
    },
    stressed: {
      gradient: 'from-red-400 via-orange-400 to-rose-600',
      glow: 'shadow-[0_0_65px_30px_rgba(239,68,68,0.5)]',
      pulseSpeed: 'animate-orb-pulse-fast',
      orbBg: 'rgba(239, 68, 68, 0.25)',
      labelColor: 'text-red-400'
    }
  };

  const currentStyle = moodStyles[mood] || moodStyles.peaceful;

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-48 h-48 md:w-56 md:h-56',
    large: 'w-64 h-64 md:w-80 md:h-80'
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer ambient glow blur */}
      <div 
        className={`absolute rounded-full filter blur-2xl opacity-70 transition-all duration-1000 ${sizeClasses[size]} bg-gradient-to-tr ${currentStyle.gradient} ${currentStyle.pulseSpeed}`}
      />
      
      {/* Glassmorphic border container */}
      <div 
        className={`relative flex items-center justify-center rounded-full border border-white/30 dark:border-white/10 p-4 transition-all duration-1000 backdrop-blur-xl ${sizeClasses[size]} ${currentStyle.glow}`}
        style={{ backgroundColor: currentStyle.orbBg }}
      >
        {/* Core glowing sphere */}
        <div 
          className={`w-full h-full rounded-full bg-gradient-to-tr ${currentStyle.gradient} opacity-90 relative overflow-hidden`}
        >
          {/* Inner glass highlight */}
          <div className="absolute top-2 left-4 right-4 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-full filter blur-[1px]" />
          
          {/* Moving liquid particle simulations (SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" viewBox="0 0 100 100">
            <path 
              d="M30,50 Q40,40 50,50 T70,50" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              className="wave-path"
              style={{ animationDuration: mood === 'stressed' || mood === 'anxious' ? '2s' : '5s' }}
            />
            <path 
              d="M20,60 Q35,70 50,60 T80,60" 
              fill="none" 
              stroke="white" 
              strokeWidth="1.5" 
              className="wave-path"
              style={{ animationDuration: mood === 'stressed' || mood === 'anxious' ? '3s' : '7s' }}
            />
          </svg>

          {/* Inner core pulse */}
          <div className="absolute inset-2 rounded-full bg-white/10 mix-blend-screen filter blur-[2px] animate-pulse" />
        </div>
      </div>

      {/* Interactive Mood Badge */}
      <span className={`mt-4 text-xs font-semibold tracking-widest uppercase transition-colors duration-1000 ${currentStyle.labelColor} flex items-center gap-1.5`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
        Didi State: {mood}
      </span>
    </div>
  );
}
