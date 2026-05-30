import React, { useState } from 'react';
import { Sparkles, Mail, Send, Heart } from 'lucide-react';
import { useUI } from '../context/UIContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { openModal } = useUI();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-gradient-to-b from-pink-50/60 to-rose-50/40 dark:from-[#12041a] dark:to-[#070310] border-t border-pink-100/50 dark:border-pink-900/20 pt-20 pb-10 transition-colors duration-500 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-300/8 filter blur-3xl -z-10" />
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-rose-300/8 filter blur-3xl -z-10" />

      {/* Floral decorations */}
      <div className="absolute top-10 left-8 text-5xl opacity-6 rotate-12 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-20 right-8 text-4xl opacity-6 -rotate-12 select-none pointer-events-none">🌷</div>
      <div className="absolute top-1/2 right-24 text-3xl opacity-5 rotate-6 select-none pointer-events-none">💮</div>

      <div className="w-[92%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">

          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-5 text-left">
            <a href="#home" className="flex items-center gap-2 font-display font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 dark:from-pink-400 dark:via-rose-300 dark:to-purple-400 mb-6 hover:opacity-90 transition-opacity">
              <span className="text-2xl">🌸</span>
              <span>Ask Didi</span>
            </a>

            <p className="font-serif italic text-lg text-slate-700 dark:text-slate-200 mb-6 leading-relaxed max-w-sm">
              "Because Every Girl Deserves Someone to Ask." 💕
            </p>

            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              Ask Didi is a secure, anonymous, and judgment-free space built by women, for women. Whether you are dealing with career struggles, emotional wellness, or safety concerns, Didi is your digital elder sister, 24/7.
            </p>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-pink-300/30 to-transparent" />
              <span className="text-lg">🌸</span>
              <div className="h-px flex-1 bg-gradient-to-l from-rose-300/30 to-transparent" />
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 text-left grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest mb-6">
                Navigation
              </h4>
              <ul className="space-y-4">
                <li><a href="#home" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors">Home</a></li>
                <li><a href="#demo" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors">Chat Demo</a></li>
                <li><a href="#features" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors">Features</a></li>
                <li><a href="#wellness" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors">Wellness</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest mb-6">
                Sisterhood
              </h4>
              <ul className="space-y-4">
                <li><a href="#privacy" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors">Privacy Promise</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => openModal('roadmap')}
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    Roadmap
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openModal('terms')}
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    Terms of Use
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openModal('contact')}
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    Contact Didi
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter Sign Up */}
          <div className="lg:col-span-4 text-left">
            <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest mb-6">
              🌸 Didi's Love Letters
            </h4>

            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Subscribe to receive weekly sisterly advice, mental wellness affirmations, and career growth tip guides directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email, sister..."
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-pink-200/50 dark:border-pink-800/30 bg-white/80 dark:bg-pink-950/20 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-pink-600 focus:outline-none focus:border-pink-400 dark:focus:border-pink-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl hover:opacity-95 shadow-md shadow-pink-200/40 dark:shadow-pink-900/20 flex items-center justify-center transition-all cursor-pointer hover:scale-[1.03]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs font-semibold text-pink-500 mt-3 flex items-center gap-1">
                <span>🌸</span>
                Subscribed! Didi's love letter is on its way to you.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Socials & Copy */}
        <div className="pt-8 border-t border-pink-100/40 dark:border-pink-900/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            © {new Date().getFullYear()} Ask Didi. Made with <Heart className="w-3.5 h-3.5 inline text-pink-400 fill-current animate-pulse" /> for an empowered sisterhood.
          </p>

          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a href="#" className="p-2.5 rounded-full border border-pink-200/50 dark:border-pink-800/30 text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 hover:border-pink-300/60 dark:hover:border-pink-700/50 hover:bg-pink-50/50 dark:hover:bg-pink-950/20 transition-all shadow-sm bg-white/60 dark:bg-pink-950/10" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="p-2.5 rounded-full border border-pink-200/50 dark:border-pink-800/30 text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 hover:border-pink-300/60 dark:hover:border-pink-700/50 hover:bg-pink-50/50 dark:hover:bg-pink-950/20 transition-all shadow-sm bg-white/60 dark:bg-pink-950/10" aria-label="Twitter">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="p-2.5 rounded-full border border-pink-200/50 dark:border-pink-800/30 text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 hover:border-pink-300/60 dark:hover:border-pink-700/50 hover:bg-pink-50/50 dark:hover:bg-pink-950/20 transition-all shadow-sm bg-white/60 dark:bg-pink-950/10" aria-label="Linkedin">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="p-2.5 rounded-full border border-pink-200/50 dark:border-pink-800/30 text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-300 hover:border-pink-300/60 dark:hover:border-pink-700/50 hover:bg-pink-50/50 dark:hover:bg-pink-950/20 transition-all shadow-sm bg-white/60 dark:bg-pink-950/10" aria-label="Pinterest">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.867 3.136-4.562 0-2.387-1.715-4.052-4.164-4.052-2.838 0-4.502 2.129-4.502 4.332 0 .858.33 1.776.742 2.278a.3.3 0 0 1 .069.286c-.076.312-.244.995-.276 1.134-.044.183-.146.222-.336.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
