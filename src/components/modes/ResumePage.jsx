import React, { useState } from 'react';
import { Loader2, Sparkles, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithDidi } from '../../lib/api';
import { BackHeader, Header } from './DiaryPage';

export default function ResumePage() {
    const [text, setText] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);

    const analyze = async () => {
        if (!text.trim() || text.trim().length < 100) return;
        setLoading(true);
        setAnalysis('');
        try {
            const res = await chatWithDidi({
                message: `Please review my resume:\n\n${text.trim()}`,
                history: [],
                mode: 'resume',
                maxTokens: 1200,
            });
            setAnalysis(res.reply);
        } catch {
            setAnalysis("Couldn't reach Didi just now 🌸 — try again in a moment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <BackHeader />
                <Header emoji="📄" title="Resume Analyzer" subtitle="Paste your resume text — I'll score it, point out weak bullets, and rewrite the worst ones." gradient="from-blue-500 via-indigo-500 to-purple-500" />

                <div className="glass-panel-heavy rounded-3xl p-5 mb-6 border-pink-100/40 dark:border-white/10">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your full resume text here — bullets, sections, everything..."
                        rows={12}
                        className="w-full p-4 rounded-2xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm font-mono"
                    />
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-400">{text.length} characters · paste plain text from PDF/Word</span>
                        <button
                            onClick={analyze}
                            disabled={loading || text.trim().length < 100}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold shadow-md hover:opacity-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {loading ? 'Analyzing...' : 'Analyze'}
                        </button>
                    </div>
                    {text.trim().length > 0 && text.trim().length < 100 && (
                        <p className="text-xs text-amber-500 mt-2">Paste at least 100 characters for a meaningful review.</p>
                    )}
                </div>

                {analysis && (
                    <div className="glass-panel rounded-3xl p-6 border-pink-100/40 dark:border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-pink-500" />
                            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Didi's Review</h3>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-headings:my-3 prose-strong:text-pink-600 dark:prose-strong:text-pink-300">
                            <ReactMarkdown>{analysis}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
