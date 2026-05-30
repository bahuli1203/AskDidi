import React from 'react';
import ModeChat from './ModeChat';

const META = {
    default: {
        title: 'Didi 🌸',
        emoji: '🌸',
        subtitle: 'Talk in any language — English, Hindi, Hinglish, Tamil, Bengali. Didi follows your lead.',
        intro: "Hey sister 🌸 What's on your mind today? Type or hit the mic — I'll reply in the same language you write in.",
        suggestions: ['Mujhe aaj bahut anxious lag raha hai', 'Help me prepare a tough conversation', 'Suggest a 5-min self-care break'],
    },
    decision: {
        title: 'What Would Didi Do? 🤔',
        emoji: '🤔',
        subtitle: 'Stuck between two choices? Lay it out — I\'ll weigh both and tell you what I\'d lean towards.',
        intro: "Tell me the choice you're weighing — what are the options, and what's pulling you in each direction? 🌸",
        suggestions: [
            'Should I take the higher-paying job in a new city?',
            'Should I tell my best friend the truth?',
            'Should I quit my job to start my own thing?',
        ],
    },
    confidence: {
        title: 'Confidence Coach 🧠',
        emoji: '🧠',
        subtitle: 'Daily affirmations + 5-minute drills, tailored to what you\'re actually facing.',
        intro: "Hi gorgeous 🌸 What's making you doubt yourself today? I'll send you an affirmation and a tiny exercise built just for it.",
        suggestions: ['I have a presentation tomorrow', "I feel like an imposter at work", "I can't speak up in meetings"],
    },
    interview: {
        title: 'Interview Practice 🎭',
        emoji: '🎭',
        subtitle: 'Behavioural, technical, salary negotiation — I ask, you answer, I score using STAR.',
        intro: "Welcome to mock interview practice! 🌸 Tell me the role + level you're prepping for, and I'll start asking. Or paste an answer you've already written and I'll score it.",
        suggestions: ['Frontend SDE-1 at a startup', 'Product Manager intern at Google', 'Salary negotiation for a counter-offer'],
    },
    money: {
        title: 'Money Mentor 💰',
        emoji: '💰',
        subtitle: 'Plain-language coaching on budgets, savings, SIPs and salary negotiation.',
        intro: "Hi sister 🌸 Tell me where you are — your monthly income, expenses, current savings, and what you want to learn. I'll keep it simple, honest, and INR-friendly.",
        suggestions: ['Explain SIP like I\'m 12', 'How do I budget on ₹40k/month in Bangalore?', 'How much should I save for an emergency fund?'],
    },
    safety: {
        title: 'Safety Shield 🛡️',
        emoji: '🛡️',
        subtitle: 'Harassment, legal awareness, emergency steps. I\'m here, judgement-free.',
        intro: "I'm here, sister 🌸 First — are you safe right now? Tell me what's happening and we'll work through the next steps together. For immediate emergencies: 112 or 1091.",
        suggestions: ['Someone at work is making me uncomfortable', 'I think I\'m being stalked', 'How do I file a POSH complaint?'],
    },
    wellness: {
        title: "Women's Wellness 👩‍⚕️",
        emoji: '👩‍⚕️',
        subtitle: 'Period care, sleep, hormones, anxiety, PCOS — judgment-free conversation.',
        intro: 'Hi sister 🌸 What part of your wellness are we looking at today — body, sleep, period stuff, mood? Tell me and I\'ll share kind, practical guidance.',
        suggestions: ['My periods are super irregular', "I'm exhausted no matter how much I sleep", 'Tips for handling period cramps at work'],
    },
    scholarship: {
        title: 'Scholarship & Opportunity Finder 📚',
        emoji: '📚',
        subtitle: 'Tell me your field, level, country — I\'ll list real opportunities.',
        intro: "Tell me three things, sister 🌸: what you study (or do), your level (school / undergrad / grad / professional), and which country. I'll pull a list of scholarships, grants, and women-only opportunities.",
        suggestions: ['CS undergrad in India looking for women-in-tech scholarships', 'MBA grad school grants for Indian women', 'Internships for first-year engineering students'],
    },
    roadmap: {
        title: 'Life Roadmap Generator 🛣️',
        emoji: '🛣️',
        subtitle: 'A custom 6-month or 1-year growth plan — month by month.',
        intro: "Let's build your roadmap, sister 🌸 Share three things: 1) Your goal (the one big thing). 2) Where you are today. 3) Your timeline (3 / 6 / 12 months). I'll generate a month-by-month plan with skills, habits, and milestones.",
        suggestions: [
            'Goal: become a frontend developer in 6 months from zero',
            'Goal: crack a govt exam in 12 months',
            'Goal: start a side hustle while keeping my 9-5',
        ],
    },
};

export default function ChatModePage({ modeKey = 'default' }) {
    const m = META[modeKey] || META.default;
    return <ModeChat mode={modeKey} {...m} />;
}
