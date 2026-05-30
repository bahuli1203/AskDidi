import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import chatRouter from './routes/chat.js';
import voiceRouter from './routes/voice.js';
import emotionRouter from './routes/emotion.js';

const app = express();
const PORT = process.env.PORT || 5050;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: ALLOWED_ORIGIN, credentials: false }));
app.use(express.json({ limit: '2mb' }));

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
    console.log(`   CORS origin: ${ALLOWED_ORIGIN}`);
    if (!process.env.GROQ_API_KEY) {
        console.warn('   ⚠ GROQ_API_KEY missing — chat will use offline fallback.');
    }
    if (!process.env.HF_API_KEY) {
        console.warn('   ⚠ HF_API_KEY missing — emotion detection will use heuristic fallback.');
    }
});
