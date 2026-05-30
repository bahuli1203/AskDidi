import { Router } from 'express';
import { getModePrompt } from '../lib/modePrompts.js';
import { heuristicReply, heuristicEmotion, emotionToMood } from '../lib/fallbacks.js';

const router = Router();

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

router.post('/', async (req, res, next) => {
    try {
        const { message, history = [], mode = 'default', maxTokens } = req.body || {};
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'message (string) is required' });
        }

        const localEmotion = heuristicEmotion(message);
        const orbMood = emotionToMood(localEmotion.top.label);

        if (!process.env.GROQ_API_KEY) {
            return res.json({
                reply: heuristicReply(message),
                mood: orbMood,
                emotion: localEmotion.top,
                source: 'fallback',
            });
        }

        const messages = [
            { role: 'system', content: getModePrompt(mode) },
            ...history
                .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
                .slice(-12),
            { role: 'user', content: message },
        ];

        const groqResp = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
                messages,
                temperature: mode === 'resume' || mode === 'money' ? 0.5 : 0.8,
                max_tokens: typeof maxTokens === 'number' ? Math.min(maxTokens, 2000) : 700,
            }),
        });

        if (!groqResp.ok) {
            const errText = await groqResp.text();
            console.warn('[chat] Groq error', groqResp.status, errText);
            return res.json({
                reply: heuristicReply(message),
                mood: orbMood,
                emotion: localEmotion.top,
                source: 'fallback',
                upstreamStatus: groqResp.status,
            });
        }

        const data = await groqResp.json();
        const reply = data?.choices?.[0]?.message?.content?.trim() || heuristicReply(message);

        res.json({
            reply,
            mood: orbMood,
            emotion: localEmotion.top,
            mode,
            source: 'groq',
            model: data?.model,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
