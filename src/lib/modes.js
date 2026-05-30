// Metadata for every Didi mode shown in the Hub.

export const MODES = [
    { key: 'diary', title: 'Didi Diary', emoji: '💬', desc: 'Private journal with AI insights.', route: '#/diary', kind: 'page', color: 'from-pink-400 to-rose-400' },
    { key: 'mood', title: 'Mood Tracker', emoji: '😊', desc: 'Log how you feel and see emotional trends.', route: '#/mood', kind: 'page', color: 'from-orange-400 to-pink-400' },
    { key: 'goals', title: 'Goal Planner', emoji: '🎯', desc: 'Track career, study, fitness, personal goals.', route: '#/goals', kind: 'page', color: 'from-purple-400 to-indigo-400' },
    { key: 'roadmap', title: 'Life Roadmap', emoji: '🛣️', desc: 'A custom 6-month or 1-year growth plan.', route: '#/chat/roadmap', kind: 'chat', color: 'from-emerald-400 to-teal-400' },
    { key: 'decision', title: "What Would Didi Do?", emoji: '🤔', desc: 'Stuck on a tough call? Pros, cons, gut-check.', route: '#/chat/decision', kind: 'chat', color: 'from-indigo-400 to-purple-400' },
    { key: 'voice', title: 'Voice Notes', emoji: '🎤', desc: 'Record voice notes — Whisper transcribes them.', route: '#/chat/default', kind: 'chat', color: 'from-rose-400 to-pink-500' },
    { key: 'language', title: 'Regional Languages', emoji: '🌐', desc: 'Hindi, Hinglish, Tamil, Bengali — Didi follows.', route: '#/chat/default', kind: 'chat', color: 'from-sky-400 to-indigo-400' },
    { key: 'scholarship', title: 'Opportunity Finder', emoji: '📚', desc: 'Scholarships, internships, jobs for women.', route: '#/chat/scholarship', kind: 'chat', color: 'from-amber-400 to-orange-400' },
    { key: 'confidence', title: 'Confidence Coach', emoji: '🧠', desc: 'Daily affirmations + 5-min confidence drills.', route: '#/chat/confidence', kind: 'chat', color: 'from-pink-500 to-purple-500' },
    { key: 'interview', title: 'Interview Practice', emoji: '🎭', desc: 'AI mock interviews with STAR feedback.', route: '#/chat/interview', kind: 'chat', color: 'from-violet-400 to-pink-400' },
    { key: 'money', title: 'Money Mentor', emoji: '💰', desc: 'Budget, save, invest — plain-language coaching.', route: '#/chat/money', kind: 'chat', color: 'from-green-400 to-emerald-400' },
    { key: 'safety', title: 'Safety Shield', emoji: '🛡️', desc: 'Harassment, legal awareness, emergency steps.', route: '#/chat/safety', kind: 'chat', color: 'from-rose-500 to-red-500' },
    { key: 'wellness', title: "Women's Wellness", emoji: '👩‍⚕️', desc: 'Period, sleep, hormones, mental health.', route: '#/chat/wellness', kind: 'chat', color: 'from-teal-400 to-cyan-400' },
    { key: 'community', title: 'Community Circles', emoji: '👭', desc: 'Anonymous women support groups.', route: '#/community', kind: 'page', color: 'from-fuchsia-400 to-pink-400' },
    { key: 'checkin', title: 'Daily Check-In', emoji: '📅', desc: '1-minute sisterly hello, every day.', route: '#/checkin', kind: 'page', color: 'from-rose-300 to-pink-400' },
    { key: 'achievements', title: 'Streaks & Badges', emoji: '🏆', desc: 'Gamified progress and growth streaks.', route: '#/achievements', kind: 'page', color: 'from-yellow-400 to-amber-500' },
    { key: 'resume', title: 'Resume Analyzer', emoji: '📄', desc: 'Paste your resume — get specific rewrites.', route: '#/resume', kind: 'page', color: 'from-blue-400 to-indigo-500' },
    { key: 'futureMe', title: 'Future Me Simulator', emoji: '🔮', desc: 'Three vivid versions of you, two years from now.', route: '#/futureMe', kind: 'page', color: 'from-purple-500 to-pink-500' },
];

export const MODE_BY_KEY = Object.fromEntries(MODES.map((m) => [m.key, m]));
