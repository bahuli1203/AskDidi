import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Sparkles, Shield, Heart, AlertTriangle } from 'lucide-react';
import { signIn, signUp, signInAsGuest, signInWithGoogle, isFirebaseConfigured } from '../lib/firebase';

const PETALS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 8 + 7,
  duration: Math.random() * 6 + 7,
  delay: Math.random() * -10,
}));

const trustBadges = [
  { icon: Shield, text: '100% Private' },
  { icon: Heart, text: 'Judgment Free' },
  { icon: Sparkles, text: 'AI-Powered' },
];

export default function LoginPage({ onLogin, darkMode }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'What should Didi call you?';
    if (!form.email.includes('@')) e.email = 'Please enter a valid email.';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    // If Firebase isn't configured, keep the local-only flow so the demo still runs.
    if (!isFirebaseConfigured) {
      setTimeout(() => {
        setLoading(false);
        onLogin(form.name || form.email.split('@')[0]);
      }, 800);
      return;
    }

    try {
      const user = mode === 'signup'
        ? await signUp({ email: form.email, password: form.password, name: form.name })
        : await signIn({ email: form.email, password: form.password });
      const displayName = user.displayName || form.name || user.email?.split('@')[0] || 'Sister';
      onLogin(displayName);
    } catch (err) {
      const msg = friendlyAuthError(err);
      setErrors({ form: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    if (!isFirebaseConfigured) {
      setTimeout(() => { setLoading(false); onLogin('Guest'); }, 600);
      return;
    }
    try {
      await signInAsGuest();
      onLogin('Guest');
    } catch (err) {
      setErrors({ form: friendlyAuthError(err) });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErrors({});
    if (!isFirebaseConfigured) {
      setErrors({ form: 'Add Firebase keys to .env to enable Google sign-in.' });
      return;
    }
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      const displayName = user.displayName || user.email?.split('@')[0] || 'Sister';
      onLogin(displayName);
    } catch (err) {
      // popup-closed is normal user behaviour, don't shout
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        // silent
      } else {
        setErrors({ form: friendlyAuthError(err) });
      }
    } finally {
      setLoading(false);
    }
  };

  function friendlyAuthError(err) {
    const code = err?.code || '';
    if (code.includes('email-already-in-use')) return 'That email is already registered. Try signing in instead.';
    if (code.includes('invalid-credential') || code.includes('wrong-password')) return 'Email or password is incorrect.';
    if (code.includes('user-not-found')) return "We couldn't find that account. Try signing up?";
    if (code.includes('weak-password')) return 'Password is too weak — try at least 6 characters.';
    if (code.includes('network-request-failed')) return 'Network problem — please check your connection.';
    if (code.includes('operation-not-allowed')) return 'This sign-in method is disabled in Firebase. Enable it in Firebase Console → Authentication → Sign-in method.';
    if (code.includes('popup-blocked')) return 'Your browser blocked the Google sign-in popup. Please allow popups and try again.';
    if (code.includes('unauthorized-domain')) return 'This domain is not authorized in Firebase. Add localhost in Firebase Console → Authentication → Settings → Authorized domains.';
    return err?.message || 'Something went wrong. Please try again.';
  }

  const bg = darkMode
    ? 'from-[#120417] via-[#1e0a29] to-[#0b020e]'
    : 'from-[#fff7fb] via-[#fdf4ff] to-[#f7f2ff]';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg} flex items-center justify-center relative overflow-hidden px-4`}>
      {/* Petals */}
      {PETALS.map(p => (
        <div key={p.id} className="petal fixed" style={{ left: `${p.left}%`, width: `${p.size}px`, height: `${p.size * 1.3}px`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
      ))}

      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-400/10 dark:bg-pink-700/12 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-400/8 dark:bg-purple-700/10 filter blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass-panel-heavy rounded-[2rem] overflow-hidden shadow-2xl shadow-pink-400/10 dark:shadow-pink-900/20">

          {/* Top gradient banner */}
          <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500" />

          <div className="px-8 pt-8 pb-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-400 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-pink-400/25 mb-3">
                🌸
              </div>
              <h1 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">Ask Didi</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Your AI Big Sister, Anytime 💕</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-slate-100/80 dark:bg-white/5 rounded-2xl p-1 mb-7">
              {['login', 'signup'].map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setErrors({}); }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer capitalize ${mode === m
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-300/30'
                    : 'text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400'
                    }`}
                >
                  {m === 'login' ? '👋 Sign In' : '✨ Join Free'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Config notice */}
              {!isFirebaseConfigured && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 text-[11px] text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Demo mode — add <code className="font-mono">VITE_FIREBASE_*</code> keys to <code className="font-mono">.env</code> for real auth.</span>
                </div>
              )}

              {/* Form-level error */}
              {errors.form && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/30 text-xs text-rose-600 dark:text-rose-300">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Name — signup only */}
              <AnimatePresence>
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      What's your name? 🌸
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya, Ananya, Meera..."
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-white/90 dark:bg-white/5 text-slate-800 dark:text-white placeholder-pink-300/70 dark:placeholder-slate-500 focus:outline-none transition-colors ${errors.name ? 'border-red-400' : 'border-pink-200/60 dark:border-white/10 focus:border-pink-400 dark:focus:border-pink-500'
                        }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-white/90 dark:bg-white/5 text-slate-800 dark:text-white placeholder-pink-300/70 dark:placeholder-slate-500 focus:outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-pink-200/60 dark:border-white/10 focus:border-pink-400 dark:focus:border-pink-500'
                    }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm bg-white/90 dark:bg-white/5 text-slate-800 dark:text-white placeholder-pink-300/70 dark:placeholder-slate-500 focus:outline-none transition-colors ${errors.password ? 'border-red-400' : 'border-pink-200/60 dark:border-white/10 focus:border-pink-400 dark:focus:border-pink-500'
                      }`}
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-500 transition-colors cursor-pointer p-1">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                {mode === 'login' && (
                  <button type="button" className="text-xs text-pink-500 hover:text-pink-600 mt-1 cursor-pointer">Forgot password?</button>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-400/25 hover:opacity-95 hover:shadow-pink-400/40 transition-all cursor-pointer disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </span>
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In to Didi 🌸' : 'Create My Account ✨'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200/60 dark:via-white/10 to-transparent" />
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200/60 dark:via-white/10 to-transparent" />
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full py-3 mb-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2.5 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
              </svg>
              Continue with Google
            </button>

            {/* Guest */}
            <button
              onClick={handleGuest}
              disabled={loading}
              className="w-full py-3 rounded-xl border border-pink-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-pink-50 dark:hover:bg-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-all cursor-pointer disabled:opacity-60"
            >
              👤 Continue as Guest (No signup needed)
            </button>

            {/* Trust Badges */}
            <div className="flex justify-center gap-5 mt-6">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1">
                  <Icon className="w-4 h-4 text-pink-400" />
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-600 mt-4">
          By continuing, you agree that Didi keeps all conversations private 🔒
        </p>
      </motion.div>
    </div>
  );
}
