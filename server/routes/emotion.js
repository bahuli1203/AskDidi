import { Router } from 'express';
import { heuristicEmotion, emotionToMood } from '../lib/fallbacks.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { text } = req.body || {};
        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'text (string) is required' });
        }

        if (!process.env.HF_API_KEY) {
            const local = heuristicEmotion(text);
            return res.json({
                emotion: local.top,
                scores: local.scores,
                mood: emotionToMood(local.top.label),
                source: 'fallback',
            });
        }

        const model = process.env.HF_EMOTION_MODEL || 'j-hartmann/emotion-english-distilroberta-base';
        const url = `https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`;

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
        });

        if (!resp.ok) {
            const errText = await resp.text();
            console.warn('[emotion] HF error', resp.status, errText);
            const local = heuristicEmotion(text);
            return res.json({
                emotion: local.top,
                scores: local.scores,
                mood: emotionToMood(local.top.label),
                source: 'fallback',
                upstreamStatus: resp.status,
            });
        }

        const data = await resp.json();
        // HF returns either [[{label, score}, ...]] or [{label, score}, ...]
        const list = Array.isArray(data?.[0]) ? data[0] : Array.isArray(data) ? data : [];
        const sorted = [...list].sort((a, b) => (b.score || 0) - (a.score || 0));
        const top = sorted[0] || { label: 'neutral', score: 0.5 };
        const scores = Object.fromEntries(sorted.map((d) => [d.label, d.score]));

        res.json({
            emotion: { label: top.label, score: top.score },
            scores,
            mood: emotionToMood(top.label),
            source: 'huggingface',
            model,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
