// Heuristic fallbacks used when API keys are missing or upstream calls fail,
// so the UI keeps feeling alive instead of throwing errors.

export function heuristicReply(userText = '') {
    const t = userText.toLowerCase();

    if (/(suicide|kill myself|end my life|self.?harm|harm myself)/.test(t)) {
        return "Please pause for a moment, sister. What you're feeling is real, and you don't have to carry it alone. Call AASRA at 9820466627 or iCall at 9152987821 right now — they are kind, free, and confidential. I'll stay right here while you do. 🤍";
    }
    if (/(unsafe|threat|stalk|harass|danger|attack)/.test(t)) {
        return "Your safety comes first, always. If you are in immediate danger, dial 112 or 1091 (Women's Helpline). Get to a public or trusted place if you can, and screenshot any threats. I'm here — tell me what's happening and we'll work through it together. 🛡️";
    }
    if (/(sad|cry|lonely|alone|hurt|depressed|heartbroken)/.test(t)) {
        return "Oh sweetheart, biggest hug. 💕 You don't have to be strong every minute. Tell me a little more about what's hurting — sometimes saying it out loud is the first kindness we give ourselves.";
    }
    if (/(stress|exam|study|burnout|tired|exhausted|overwhelm)/.test(t)) {
        return "I feel that weight, sister. Drop your shoulders, unclench your jaw, take one slow breath. You're doing enough. What's the one thing we can take off your plate today? 🌸";
    }
    if (/(anxious|scared|fear|panic|nervous|worry)/.test(t)) {
        return "Slow breath in for 4, hold for 4, out for 6. Look around — name 5 things you can see. You're safe in this moment. Tell me what's making your heart race and we'll untangle it together.";
    }
    if (/(happy|excited|won|success|good|amazing|great|passed)/.test(t)) {
        return "Yesss! 🎉 I am so proud of you. You worked for this and you deserve every bit of it. Tell me everything — let me celebrate with you.";
    }
    if (/(career|job|negotiate|resume|interview|salary|boss|workplace)/.test(t)) {
        return "Workplace stuff can be heavy. You deserve to be respected and paid your worth. Tell me where you are right now — offer letter, interview prep, conflict — and we'll plan the next step together.";
    }
    return "I'm listening, sister. That sounds like a lot. What would help most right now — to vent, to plan, or just to feel heard? 🌸";
}

const EMOTION_KEYWORDS = {
    sadness: /(sad|cry|lonely|alone|hurt|depressed|heartbroken|miss)/,
    fear: /(anxious|scared|fear|panic|nervous|worry|afraid|terrified)/,
    anger: /(angry|mad|furious|hate|annoyed|frustrat)/,
    joy: /(happy|excited|won|success|amazing|great|passed|love|grateful)/,
    surprise: /(shocked|surprised|wow|unexpected)/,
    disgust: /(disgust|gross|sick|horrible)/,
};

export function heuristicEmotion(text = '') {
    const t = text.toLowerCase();
    const scores = {};
    let top = { label: 'neutral', score: 0.6 };
    for (const [label, re] of Object.entries(EMOTION_KEYWORDS)) {
        const matches = t.match(re);
        const score = matches ? Math.min(0.95, 0.55 + matches.length * 0.1) : 0;
        scores[label] = score;
        if (score > top.score) top = { label, score };
    }
    scores.neutral = top.label === 'neutral' ? 0.6 : 0.2;
    return { top, scores };
}

// Map an emotion label → orb mood used by the frontend DidiOrb.
export function emotionToMood(label = 'neutral') {
    const map = {
        sadness: 'reflective',
        fear: 'anxious',
        anger: 'stressed',
        joy: 'happy',
        surprise: 'peaceful',
        disgust: 'reflective',
        neutral: 'peaceful',
    };
    return map[label] || 'peaceful';
}
