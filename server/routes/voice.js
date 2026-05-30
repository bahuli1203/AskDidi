import { Router } from 'express';
import multer from 'multer';

const router = Router();

// Accept up to 25 MB audio (Whisper API limit).
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024 },
});

const GROQ_TRANSCRIBE_URL = 'https://api.groq.com/openai/v1/audio/transcriptions';

router.post('/transcribe', upload.single('audio'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'audio file (form field "audio") is required' });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(503).json({
                error: 'Transcription unavailable — GROQ_API_KEY missing on server.',
            });
        }

        const { buffer, originalname, mimetype } = req.file;
        const filename = originalname || 'audio.webm';
        const type = mimetype || 'audio/webm';

        const form = new FormData();
        form.append('file', new Blob([buffer], { type }), filename);
        form.append('model', process.env.GROQ_WHISPER_MODEL || 'whisper-large-v3');
        if (req.body?.language) form.append('language', req.body.language);
        form.append('response_format', 'json');

        const resp = await fetch(GROQ_TRANSCRIBE_URL, {
            method: 'POST',
            headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
            body: form,
        });

        if (!resp.ok) {
            const errText = await resp.text();
            console.warn('[voice] Whisper error', resp.status, errText);
            return res.status(resp.status).json({ error: 'Transcription failed', detail: errText });
        }

        const data = await resp.json();
        res.json({ text: data.text || '', source: 'groq-whisper' });
    } catch (err) {
        next(err);
    }
});

export default router;
