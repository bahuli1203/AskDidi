import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, LogOut, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { name: '✨ Hub', href: '#didi-hub' },
  { name: '💬 Chat', href: '#demo' },
  { name: '🌸 Modes', href: '#didi-modes' },
  { name: '🛡️ SOS', href: '#sos' },
  { name: '🌱 Growth', href: '#growth' },
  { name: '🔒 Privacy', href: '#privacy' },
];

export default function Navbar({ darkMode, setDarkMode, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initial = user ? user.charAt(0).toUpperCase() : 'G';

  return (
    <nav className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-50 transition-all duration-300 rounded-2xl ${scrolled
        ? 'glass-panel-heavy shadow-[0_8px_30px_rgba(244,114,182,0.12)] py-2'
        : 'bg-white/30 dark:bg-white/5 backdrop-blur-md py-3'
      }`}>
      <div className="px-5 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 font-display font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 dark:from-pink-400 dark:via-rose-300 dark:to-purple-400 shrink-0">
          <span className="animate-pulse text-xl">🌸</span>
          <span>Ask Didi</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50/70 dark:hover:bg-pink-950/20 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border border-pink-200/50 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-white/10 transition-colors cursor-pointer shadow-sm"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-pink-500" />}
          </button>

          {/* User pill — desktop */}
          {user && (
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowUserMenu(s => !s)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-400/10 dark:from-pink-500/20 dark:to-rose-400/20 border border-pink-200/50 dark:border-pink-700/30 text-sm font-semibold text-pink-700 dark:text-pink-300 hover:from-pink-500/20 hover:to-rose-400/20 transition-all cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 text-white text-xs font-bold flex items-center justify-center">
                  {initial}
                </span>
                <span className="max-w-[80px] truncate">{user}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-44 glass-panel-heavy rounded-2xl shadow-xl overflow-hidden border-pink-100/40 dark:border-white/5 p-1"
                  >
                    <div className="px-3 py-2 border-b border-pink-100/40 dark:border-white/5">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user}</p>
                    </div>
                    <button
                      onClick={() => { setShowUserMenu(false); onLogout?.(); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors cursor-pointer font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* CTA button — desktop */}
          <a
            href="#demo"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 transition-all shadow-md shadow-pink-400/20 hover:shadow-pink-400/35 hover:scale-[1.02] shrink-0"
          >
            Talk to Didi 🌸
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl border border-pink-200/50 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-5 pb-5 pt-3 border-t border-pink-100/30 dark:border-white/5 flex flex-col gap-1 mt-2">
              {/* User info mobile */}
              {user && (
                <div className="flex items-center gap-2 px-3 py-2 mb-2 bg-pink-50/60 dark:bg-pink-950/20 rounded-xl">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 text-white text-xs font-bold flex items-center justify-center">{initial}</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user}</span>
                </div>
              )}

              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-pink-600 hover:bg-pink-50/60 dark:hover:bg-pink-950/20 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#demo"
                onClick={() => setIsOpen(false)}
                className="mt-2 py-3 text-center text-sm font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 shadow-md"
              >
                💬 Talk to Didi
              </a>

              {user && (
                <button
                  onClick={() => { setIsOpen(false); onLogout?.(); }}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
