import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatDemo from './components/ChatDemo';
import Features from './components/Features';
import DidiModes from './components/DidiModes';
import HowItWorks from './components/HowItWorks';
import EmotionalSupport from './components/EmotionalSupport';
import SOSGuidance from './components/SOSGuidance';
import Testimonials from './components/Testimonials';
import WeeklyGrowth from './components/WeeklyGrowth';
import SafetyPrivacy from './components/SafetyPrivacy';
import FutureVision from './components/FutureVision';
import FloatingChat from './components/FloatingChat';
import Footer from './components/Footer';
import AppModals from './components/AppModals';
import { UIProvider } from './context/UIContext';
import { isFirebaseConfigured, signOut as fbSignOut, watchAuth } from './lib/firebase';

const PETALS_DATA = Array.from({ length: 16 }).map((_, i) => ({
  left: Math.random() * 100,
  size: Math.random() * 8 + 8,
  duration: Math.random() * 8 + 8,
  delay: Math.random() * -16,
  id: i,
}));

// App states: 'loading' → 'login' → 'app'
export default function App() {
  const [appState, setAppState] = useState('loading');
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Subscribe to Firebase auth state when configured.
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsub = watchAuth((fbUser) => {
      if (fbUser) {
        const display = fbUser.displayName
          || (fbUser.email ? fbUser.email.split('@')[0] : null)
          || (fbUser.isAnonymous ? 'Guest' : 'Sister');
        setUser(display);
        setAppState((s) => (s === 'login' ? 'app' : s));
      } else if (appState === 'app') {
        setUser(null);
        setAppState('login');
      }
    });
    return () => unsub?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadDone = () => setAppState('login');

  const handleLogin = (userName) => {
    setUser(userName);
    setAppState('app');
  };

  const handleLogout = async () => {
    try { await fbSignOut(); } catch { /* ignore — fallback flow */ }
    setUser(null);
    setAppState('login');
  };

  const lightBg = 'from-[#fff7fb] via-[#fdf4ff] to-[#f7f2ff]';
  const darkBg = 'from-[#120417] via-[#1e0a29] to-[#0b020e]';

  return (
    <UIProvider>
      <AnimatePresence mode="wait">
        {appState === 'loading' && (
          <LoadingScreen key="loading" onDone={handleLoadDone} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {appState === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LoginPage onLogin={handleLogin} darkMode={darkMode} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {appState === 'app' && (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`min-h-screen bg-gradient-to-br ${darkMode ? darkBg : lightBg} text-slate-800 dark:text-slate-100 transition-colors duration-500 relative selection:bg-pink-500 selection:text-white overflow-hidden`}
          >
            {/* Falling Sakura Petals */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
              {PETALS_DATA.map(p => (
                <div
                  key={p.id}
                  className="petal"
                  style={{
                    left: `${p.left}%`,
                    width: `${p.size}px`,
                    height: `${p.size * 1.3}px`,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Ambient gradients */}
            <div className={`absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b pointer-events-none -z-20 ${darkMode ? 'from-pink-900/15 via-rose-900/8 to-transparent' : 'from-pink-200/30 via-rose-100/15 to-transparent'
              }`} />
            <div className={`absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t pointer-events-none -z-20 ${darkMode ? 'from-purple-900/10 to-transparent' : 'from-purple-100/20 to-transparent'
              }`} />

            {/* Navbar */}
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={handleLogout} />

            {/* Welcome toast */}
            <WelcomeToast user={user} />

            {/* Main content */}
            <main>
              <Hero user={user} />
              <ChatDemo />
              <DidiModes />
              <SOSGuidance />
              <WeeklyGrowth />
              <Features />
              <HowItWorks />
              <EmotionalSupport />
              <Testimonials />
              <SafetyPrivacy />
              <FutureVision />
            </main>

            <Footer />
            <FloatingChat user={user} />
          </motion.div>
        )}
      </AnimatePresence>

      <AppModals />
    </UIProvider>
  );
}

// ── Small welcome toast shown briefly after login ────────────
function WelcomeToast({ user }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="fixed top-24 left-1/2 z-50 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-sm font-semibold shadow-xl shadow-pink-400/30 flex items-center gap-2 whitespace-nowrap"
        >
          🌸 Welcome back, <strong>{user}</strong>! Didi is here for you 💕
          <button onClick={() => setVisible(false)} className="ml-2 opacity-70 hover:opacity-100 cursor-pointer text-white font-bold">×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
