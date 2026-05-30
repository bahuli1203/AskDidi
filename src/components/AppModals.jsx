import React, { useEffect, useState } from 'react';
import InfoModal from './InfoModal';
import { useUI } from '../context/UIContext';
import { Phone, Copy, Check } from 'lucide-react';

// Renders the global Roadmap / Terms / Contact / Call modals based on UI context.
export default function AppModals() {
    const { modal, closeModal } = useUI();

    if (!modal) return <InfoModal open={false} onClose={closeModal} title="" />;

    if (typeof modal === 'object' && modal.type === 'call') {
        return <CallModal number={modal.number} label={modal.label} onClose={closeModal} />;
    }

    if (modal === 'roadmap') {
        return (
            <InfoModal open onClose={closeModal} eyebrow="What's next" title="Didi's Roadmap 🌸">
                <ul className="space-y-3 list-none">
                    <li><strong className="text-slate-800 dark:text-white">Q1 — Voice Companion.</strong> Real-time speech with adaptive tone for stressed moments.</li>
                    <li><strong className="text-slate-800 dark:text-white">Q2 — Sisterly Journal.</strong> Mood-aware journaling with private weekly reflections.</li>
                    <li><strong className="text-slate-800 dark:text-white">Q3 — Smart Life Planner.</strong> Career, finance and wellness milestones with gentle reminders.</li>
                    <li><strong className="text-slate-800 dark:text-white">Q4 — Mentorship Bridge.</strong> Moderated, opt-in connections to women mentors in your field.</li>
                    <li><strong className="text-slate-800 dark:text-white">Always — Safety first.</strong> Continually expanding emergency, legal and helpline coverage.</li>
                </ul>
            </InfoModal>
        );
    }

    if (modal === 'terms') {
        return (
            <InfoModal open onClose={closeModal} eyebrow="Promise to you" title="Terms of Use" accent="indigo">
                <p className="mb-3">Ask Didi is a <strong>supportive companion</strong>, not a substitute for medical, legal or emergency services. By using this app you agree to the following:</p>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>Conversations are sent to AI providers (Groq, Hugging Face) for generating responses. Don't share information you don't want processed by them.</li>
                    <li>Emergencies need humans. If you're in danger, call 112 or 1091 — Didi is here alongside that, not in place of it.</li>
                    <li>Didi cannot diagnose, prescribe or give legal counsel. Treat suggestions as a starting point, not a verdict.</li>
                    <li>Be kind. Misuse, abuse, or attempts to manipulate Didi for harmful content may result in your access being revoked.</li>
                    <li>You're 16+ to use this service. Younger sisters: please talk to a parent or trusted adult first 🤍</li>
                </ol>
                <p className="mt-4 text-xs text-slate-400">Last updated: 2026 — full policy available on request.</p>
            </InfoModal>
        );
    }

    if (modal === 'contact') {
        return (
            <InfoModal open onClose={closeModal} eyebrow="Say hi 💌" title="Contact Didi">
                <p className="mb-4">We'd love to hear from you. Whether it's feedback, a partnership, or an idea for how Didi can support more sisters — drop us a line.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="mailto:hello@askdidi.app" className="px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm text-center shadow-md shadow-pink-300/30 hover:opacity-95 transition-opacity">
                        ✉️ hello@askdidi.app
                    </a>
                    <a href="mailto:safety@askdidi.app" className="px-4 py-3 rounded-xl border border-rose-200/60 dark:border-rose-800/30 bg-white/70 dark:bg-pink-950/20 text-slate-700 dark:text-slate-200 font-semibold text-sm text-center hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors">
                        🛡️ safety@askdidi.app
                    </a>
                </div>
                <p className="text-xs text-slate-400 mt-4">For urgent help, please call 112 or 1091 — emails are read during working hours.</p>
            </InfoModal>
        );
    }

    return null;
}

function CallModal({ number, label, onClose }) {
    const [copied, setCopied] = useState(false);
    // On mobile we just trigger the dialer.
    useEffect(() => {
        const ua = navigator.userAgent || '';
        const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
        if (isMobile) {
            window.location.href = `tel:${number}`;
            // close after a moment so the user returns to a clean view
            const t = setTimeout(onClose, 800);
            return () => clearTimeout(t);
        }
    }, [number, onClose]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(number);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard might be blocked */ }
    };

    return (
        <InfoModal open onClose={onClose} eyebrow="Emergency" title={label || 'Call now'} accent="rose">
            <div className="flex flex-col items-center text-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-rose-300/30">
                    <Phone className="w-7 h-7" />
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-rose-500">Dial this number</p>
                <p className="font-display font-extrabold text-4xl text-slate-800 dark:text-white tracking-wider my-3">{number}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-5">
                    On mobile we'll open your dialer automatically. On a laptop, dial from your phone or copy the number below.
                </p>
                <div className="flex gap-2 w-full sm:w-auto">
                    <a
                        href={`tel:${number}`}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-300/30 hover:opacity-95 transition-opacity"
                    >
                        <Phone className="w-4 h-4" />
                        Call {number}
                    </a>
                    <button
                        onClick={copy}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-rose-200/60 dark:border-rose-800/30 bg-white/70 dark:bg-pink-950/20 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-rose-50 dark:hover:bg-pink-950/30 transition-colors cursor-pointer"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>
        </InfoModal>
    );
}
