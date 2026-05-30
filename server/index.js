import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import chatRouter from './routes/chat.js';
import voiceRouter from './routes/voice.js';
import emotionRouter from './routes/emotion.js';

const app = express();
const PORT = process.env.PORT || 5050;
// Comma-separated list of allowed origins. Default to localhost for dev.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, cb) {
        // Allow same-origin (no Origin header) and exact matches.
        if (!origin || ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*')) {
            return cb(null, true);
        }
        // Allow any *.vercel.app preview if we explicitly opt-in via "https://*.vercel.app".
        const wildcard = ALLOWED_ORIGINS.find((o) => o.startsWith('https://*.'));
        if (wildcard) {
            const suffix = wildcard.replace('https://*.', '.');
            if (origin.startsWith('https://') && origin.endsWith(suffix)) return cb(null, true);
        }
        cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: false,
}));
app.use(express.json({ limit: '2mb' }));

app.get('/', (_req, res) => {
    res.type('html').send(`<!doctype html>
<html><head><meta charset="utf-8"><title>Ask Didi API 🌸</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 3rem; max-width: 640px; margin: 0 auto; background: linear-gradient(135deg, #fff7fb, #fdf4ff); color: #1e1b2e; }
  h1 { font-size: 2rem; margin: 0 0 .5rem; }
  code { background: #fce7f3; padding: 2px 6px; border-radius: 4px; font-size: .85rem; }
  ul { line-height: 1.9; }
  a { color: #ec4899; }
</style></head><body>
  <h1>🌸 Ask Didi API</h1>
  <p>This is the backend service for the Ask Didi app. The website itself lives elsewhere.</p>
  <h3>Available endpoints</h3>
  <ul>
    <li><a href="/api/health">GET /api/health</a> — service status</li>
    <li><code>POST /api/chat</code> — Groq-powered chat</li>
    <li><code>POST /api/voice/transcribe</code> — Whisper transcription</li>
    <li><code>POST /api/emotion</code> — Hugging Face emotion detection</li>
  </ul>
  <p style="margin-top: 2rem; opacity: .6; font-size: .85rem;">Repo: <a href="https://github.com/bahuli1203/AskDidi">github.com/bahuli1203/AskDidi</a></p>
</body></html>`);
});

app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        service: 'ask-didi-server',
        time: new Date().toISOString(),
        integrations: {
            groq: Boolean(process.env.GROQ_API_KEY),
            huggingface: Boolean(process.env.HF_API_KEY),
        },
    });
});

app.use('/api/chat', chatRouter);
app.use('/api/voice', voiceRouter);
app.use('/api/emotion', emotionRouter);

app.use((err, _req, res, _next) => {
    console.error('[server error]', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

app.listen(PORT, () => {
    console.log(`🌸 Ask Didi backend listening on http://localhost:${PORT}`);
    console.log(`   CORS origins: ${ALLOWED_ORIGINS.join(', ')}`);
    if (!process.env.GROQ_API_KEY) {
        console.warn('   ⚠ GROQ_API_KEY missing — chat will use offline fallback.');
    }
    if (!process.env.HF_API_KEY) {
        console.warn('   ⚠ HF_API_KEY missing — emotion detection will use heuristic fallback.');
    }
});
