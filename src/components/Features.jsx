import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { featuresData } from '../data/dummyData';

// Dynamic icon resolver
const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Features() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 12 }
    }
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-noise">
      {/* Girlish background glows */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-pink-400/8 filter blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-rose-400/8 filter blur-3xl -z-10 animate-float-slow" />
      <div className="absolute top-0 left-1/2 w-[300px] h-[300px] rounded-full bg-purple-300/6 filter blur-3xl -z-10" />

      {/* Decorative floral accents */}
      <div className="absolute top-8 right-12 text-4xl opacity-10 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-12 left-8 text-3xl opacity-10 -rotate-6 select-none pointer-events-none">🌷</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-300 uppercase bg-pink-100 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/50 dark:border-pink-800/30">
            ✨ Core capabilities
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            Designed for Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500">
              Empowerment
            </span>{' '}
            & Peace of Mind
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            Didi is equipped with deep understanding, helpful advice, and practical tools to support you in every facet of your life.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuresData.map((feat) => (
            <motion.div
              key={feat.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.25 }
              }}
              className="group relative rounded-3xl glass-panel p-6 flex flex-col justify-between border-pink-200/30 dark:border-pink-900/20 shadow-md hover:shadow-xl hover:shadow-pink-200/30 dark:hover:shadow-pink-900/20 transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Outer soft hover glow border overlay */}
              <div className="absolute inset-0 border border-transparent group-hover:border-pink-300/40 dark:group-hover:border-pink-700/40 rounded-3xl transition-colors duration-300 pointer-events-none" />

              {/* Inner gradient backglow */}
              <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${feat.gradient} filter blur-xl transition-transform duration-500 group-hover:scale-150 -z-10`} />

              {/* Sparkle decoration on hover */}
              <div className="absolute top-3 right-3 text-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">✨</div>

              <div>
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/15 to-rose-500/15 dark:from-pink-400/15 dark:to-rose-400/15 flex items-center justify-center text-pink-600 dark:text-pink-300 mb-6 group-hover:scale-110 transition-transform duration-300 border border-pink-200/30 dark:border-pink-800/20">
                  <DynamicIcon name={feat.iconName} className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Card Footer Micro-interactive arrow */}
              <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-pink-500 dark:text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                <span>Explore</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
