import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, Phone, Scale, MapPin, MessageSquare,
  ChevronDown, ChevronUp, AlertTriangle, Heart,
  ExternalLink, Send, Loader, CheckCircle2, X
} from 'lucide-react';
import { useUI } from '../context/UIContext';

const helplines = [
  { name: "Women's Helpline", number: "1091", emoji: "📞", available: "24/7", desc: "National helpline for women in distress" },
  { name: "Police Emergency", number: "100", emoji: "🚔", available: "24/7", desc: "Immediate police assistance" },
  { name: "iCall — Mental Health", number: "9152987821", emoji: "💬", available: "Mon–Sat", desc: "Free psychological counseling" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", emoji: "🌿", available: "24/7", desc: "Mental health & crisis support" },
  { name: "NCW Helpline", number: "7827170170", emoji: "⚖️", available: "Mon–Sat", desc: "National Commission for Women" },
  { name: "AASRA (Crisis)", number: "9820466627", emoji: "🆘", available: "24/7", desc: "Emotional support & suicide prevention" }
];

const safetySteps = [
  {
    icon: "📍",
    title: "Get to a Safe Location",
    steps: ["Move to a public area or trusted neighbour's home", "Lock yourself in a room if indoors", "Alert someone you trust via message"]
  },
  {
    icon: "📱",
    title: "Document Everything",
    steps: ["Screenshot messages, calls, and threats", "Note date, time, and witnesses", "Save evidence in cloud storage — iCloud, Google Drive"]
  },
  {
    icon: "⚖️",
    title: "Know Your Legal Rights",
    steps: ["You can file an FIR at any police station 24/7", "Domestic violence is a criminal offense (PWDVA 2005)", "Sexual harassment at workplace — POSH Act 2013 protects you"]
  },
  {
    icon: "💬",
    title: "Reach Out for Support",
    steps: ["Call a trusted friend or family member", "Contact a helpline above immediately", "Seek professional counseling when safe to do so"]
  }
];

const triggerPhrases = [
  "I feel unsafe right now",
  "Someone is threatening me",
  "I'm being harassed",
  "I need emergency help",
  "I don't know what to do"
];

// ── WhatsApp Location Share Widget ─────────────────────────
function WhatsAppLocShare() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | locating | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [coords, setCoords] = useState(null);
  const [showWidget, setShowWidget] = useState(false);

  const handleShare = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    setErrorMsg('');
    setStatus('locating');

    // Add India country code if 10-digit number provided
    const fullNumber = digits.length === 10 ? `91${digits}` : digits;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        const rawMessage =
          `🆘 *EMERGENCY — I Need Help!*\n\nI am sharing my current location with you via Ask Didi.\n\n📍 *My Location:* ${mapsLink}\n\nPlease reach me or call emergency services immediately. 🙏`;

        // Use api.whatsapp.com/send — more reliable on both mobile & desktop
        // IMPORTANT: Use a hidden <a> tag click instead of window.open()
        // because browsers block window.open() in async callbacks (geolocation is async)
        const waUrl = `https://api.whatsapp.com/send?phone=${fullNumber}&text=${encodeURIComponent(rawMessage)}`;

        const anchor = document.createElement('a');
        anchor.href = waUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        setStatus('success');
        // Reset after 6s
        setTimeout(() => { setStatus('idle'); setPhone(''); }, 6000);
      },
      (err) => {
        setStatus('error');
        if (err.code === 1) {
          setErrorMsg('Location access denied. Please allow location in your browser settings and try again.');
        } else if (err.code === 2) {
          setErrorMsg('Could not get your location. Please check GPS/network and try again.');
        } else {
          setErrorMsg('Location request timed out. Please try again.');
        }
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };


  if (!showWidget) {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowWidget(true)}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-green-300/30 hover:shadow-green-400/40 transition-all cursor-pointer"
      >
        {/* WhatsApp logo */}
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        🆘 Share My Live Location on WhatsApp
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="rounded-2xl overflow-hidden border border-green-200/60 dark:border-green-800/30 shadow-lg shadow-green-100/40 dark:shadow-green-900/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-sm font-bold">Share Live Location on WhatsApp</span>
        </div>
        <button onClick={() => { setShowWidget(false); setStatus('idle'); setErrorMsg(''); }} className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 bg-white dark:bg-green-950/10">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          Enter a trusted contact's number. Didi will get your GPS location and open WhatsApp with a pre-filled emergency message + Google Maps link.
        </p>

        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setErrorMsg(''); }}
              placeholder="Trusted contact number"
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-green-200/60 dark:border-green-800/30 bg-white dark:bg-green-950/20 text-slate-800 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-green-400 dark:focus:border-green-500 transition-colors"
              disabled={status === 'locating'}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            disabled={status === 'locating'}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-60 cursor-pointer transition-all shadow-md shadow-green-200/40"
          >
            {status === 'locating'
              ? <Loader className="w-4 h-4 animate-spin" />
              : <Send className="w-4 h-4" />
            }
            {status === 'locating' ? 'Locating...' : 'Send'}
          </motion.button>
        </div>

        {/* Error */}
        {errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 px-3 py-2 rounded-lg flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {errorMsg}
          </motion.p>
        )}

        {/* Success */}
        {status === 'success' && coords && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/20 border border-green-200/60 dark:border-green-800/30 px-3 py-2 rounded-lg flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            WhatsApp opened! Your location has been pre-filled. Just hit Send. 💚
          </motion.p>
        )}

        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 text-center">
          🔒 Your location is only shared via WhatsApp — never stored by Didi.
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────────────
export default function SOSGuidance() {
  const [expandedStep, setExpandedStep] = useState(null);
  const { openModal } = useUI();

  const callNumber = (number, label) => (e) => {
    // On desktop, browsers can't dial. Show a copy/dial dialog instead.
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
    if (!isMobile) {
      e.preventDefault();
      openModal({ type: 'call', number, label });
    }
    // On mobile, the default tel: behaviour opens the dialer.
  };

  return (
    <section id="sos" className="py-24 relative overflow-hidden">
      {/* Urgent but calm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 via-orange-50/40 to-pink-50/60 dark:from-[#1a0a08] dark:via-[#12040c] dark:to-[#0e0318] -z-10" />
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-rose-300/10 dark:bg-rose-900/8 filter blur-3xl -z-10 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-200/15 dark:bg-pink-900/6 filter blur-3xl -z-10" />

      <div className="w-[92%] max-w-7xl mx-auto">

        {/* Emergency Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white flex flex-col sm:flex-row items-center gap-4 shadow-xl shadow-rose-400/25"
        >
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">🆘 Are you in immediate danger?</p>
              <p className="text-white/80 text-xs">Call 112 (Emergency) or 1091 (Women's Helpline) immediately</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            <a href="tel:112" onClick={callNumber('112', 'Emergency Services (112)')} className="px-4 py-2 bg-white text-rose-600 font-bold rounded-xl text-sm hover:bg-rose-50 transition-colors shadow-sm">
              📞 Call 112
            </a>
            <a href="tel:1091" onClick={callNumber('1091', "Women's Helpline (1091)")} className="px-4 py-2 bg-white/20 backdrop-blur text-white font-semibold rounded-xl text-sm hover:bg-white/30 transition-colors border border-white/30">
              📞 Call 1091
            </a>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-rose-600 dark:text-rose-300 uppercase bg-rose-100 dark:bg-rose-950/40 px-4 py-1.5 rounded-full border border-rose-200/50 dark:border-rose-800/30">
            🛡️ SOS Guidance — Always Here For You
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-5 mb-6 leading-tight">
            When You Need{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400">
              Immediate Help
            </span>
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            Didi recognizes phrases like "I'm unsafe" or "I'm being threatened" and immediately provides safety steps, legal resources, helpline numbers — and can share your live location with a trusted contact.
          </p>
        </div>

        {/* Trigger phrases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-panel rounded-3xl p-6 border-rose-200/30 dark:border-rose-900/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-rose-500" />
            <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">
              Didi Detects These Phrases Instantly
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {triggerPhrases.map((phrase, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/30">
                💬 "{phrase}"
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700">
              ...and many more
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Safety Steps */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Step-by-Step Safety Protocol
            </h3>
            {safetySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden border-rose-100/30 dark:border-rose-900/10 shadow-sm"
              >
                <button
                  onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-950/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Step {idx + 1}</span>
                      <h4 className="font-display font-bold text-slate-800 dark:text-white">{step.title}</h4>
                    </div>
                  </div>
                  {expandedStep === idx
                    ? <ChevronUp className="w-5 h-5 text-rose-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  }
                </button>
                <AnimatePresence>
                  {expandedStep === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 space-y-2 border-t border-rose-100/30 dark:border-rose-900/20">
                        {step.steps.map((s, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-[10px] font-bold text-rose-600 dark:text-rose-300 shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* ── WhatsApp Location Share ────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-green-500" />
                <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">
                  Share Your Location Instantly
                </h3>
              </div>
              <WhatsAppLocShare />
            </motion.div>
          </div>

          {/* Right: Helplines + Legal */}
          <div className="lg:col-span-5">
            <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-pink-500" />
              Emergency Helplines
            </h3>
            <div className="space-y-3">
              {helplines.map((h, idx) => (
                <motion.a
                  key={idx}
                  href={`tel:${h.number}`}
                  onClick={callNumber(h.number, h.name)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel border-rose-100/30 dark:border-rose-900/15 shadow-sm hover:shadow-md hover:shadow-rose-200/20 dark:hover:shadow-rose-900/15 cursor-pointer transition-all group"
                >
                  <span className="text-2xl shrink-0">{h.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white truncate">{h.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full font-bold shrink-0">{h.available}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{h.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-rose-600 dark:text-rose-400 text-sm group-hover:text-rose-500">{h.number}</p>
                    <ExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 ml-auto mt-0.5" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Legal rights */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-200/40 dark:border-rose-800/20">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-rose-500" />
                <p className="text-sm font-bold text-slate-800 dark:text-white">Your Rights — Quick Reference</p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-1.5"><span className="text-rose-400 mt-0.5">•</span> File an FIR at <strong className="text-slate-700 dark:text-slate-300">any police station</strong>, any time</li>
                <li className="flex items-start gap-1.5"><span className="text-rose-400 mt-0.5">•</span> <strong className="text-slate-700 dark:text-slate-300">POSH Act 2013</strong> — Workplace harassment protection</li>
                <li className="flex items-start gap-1.5"><span className="text-rose-400 mt-0.5">•</span> <strong className="text-slate-700 dark:text-slate-300">PWDVA 2005</strong> — Domestic violence is a crime</li>
                <li className="flex items-start gap-1.5"><span className="text-rose-400 mt-0.5">•</span> You have the right to <strong className="text-slate-700 dark:text-slate-300">free legal aid</strong></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center py-6 px-8 rounded-3xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-200/30 dark:border-rose-800/20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Heart className="w-6 h-6 text-rose-400 fill-current animate-pulse shrink-0" />
          <p className="font-serif italic text-slate-700 dark:text-slate-200 text-base md:text-lg">
            "You are not alone. Didi is always by your side — no matter what you are going through."
          </p>
          <Heart className="w-6 h-6 text-rose-400 fill-current animate-pulse shrink-0" />
        </motion.div>

      </div>
    </section>
  );
}
