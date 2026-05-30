# 🌸 Ask Didi

Your AI big sister — a warm, anonymous, judgment-free space for women and young girls to talk about career, wellness, relationships, and safety.

## Architecture

```
ask-didi/
├── src/                  # React + Vite + Tailwind frontend
│   ├── components/       # UI: ChatDemo, FloatingChat, SOSGuidance, …
│   ├── lib/
│   │   ├── api.js              # Backend client (chat / voice / emotion)
│   │   ├── firebase.js         # Firebase auth wrapper
│   │   └── useVoiceRecorder.js # MediaRecorder hook for mic input
│   └── context/UIContext.jsx   # Modals (Roadmap / Terms / Contact / Call)
└── server/               # Node + Express backend
    ├── index.js
    ├── routes/
    │   ├── chat.js       # POST /api/chat   → Groq (LLM)
    │   ├── voice.js      # POST /api/voice/transcribe → Whisper
    │   └── emotion.js    # POST /api/emotion → Hugging Face
    └── lib/
        ├── didiPrompt.js # System prompt persona
        └── fallbacks.js  # Heuristics when API keys are missing
```

## 1 · Install

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

## 2 · Configure secrets

Copy the env templates and fill in your keys:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

### Frontend `.env` — Firebase (optional)

```
VITE_API_URL=http://localhost:5050
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_APP_ID=1:...
```

Get these from [Firebase Console](https://console.firebase.google.com) → Project settings → General → Your apps. Enable **Email/Password** and **Anonymous** sign-in under Authentication → Sign-in method.

If you skip Firebase, the login screen falls back to a local-only flow so the app still runs.

### Backend `server/.env`

```
GROQ_API_KEY=gsk_...        # https://console.groq.com/keys
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_WHISPER_MODEL=whisper-large-v3

HF_API_KEY=hf_...           # https://huggingface.co/settings/tokens
HF_EMOTION_MODEL=j-hartmann/emotion-english-distilroberta-base

PORT=5050
ALLOWED_ORIGIN=http://localhost:5173
```

If a key is missing, the matching endpoint falls back to a sensible heuristic so the UI still feels alive.

## 3 · Run

In two terminals:

```bash
# Terminal 1 — backend
cd server
npm run dev          # http://localhost:5050

# Terminal 2 — frontend
npm run dev          # http://localhost:5173
```

## API summary

| Method | Path                      | Powered by               | Notes |
|--------|---------------------------|--------------------------|-------|
| GET    | `/api/health`             | —                        | Status + integration flags |
| POST   | `/api/chat`               | Groq (Llama 3.3)         | `{ message, history }` → `{ reply, mood, emotion }` |
| POST   | `/api/voice/transcribe`   | Groq Whisper             | `multipart/form-data` field `audio` |
| POST   | `/api/emotion`            | Hugging Face Inference   | `{ text }` → `{ emotion, scores, mood }` |

The frontend's `DidiOrb` reacts to `mood` returned from the backend, so every reply visually changes the orb's vibe.

## Safety

- SOS panel detects phrases like "I feel unsafe" and surfaces helplines, legal rights and a WhatsApp location-share widget.
- The system prompt instructs Didi to direct users to AASRA / iCall / 112 / 1091 in crisis scenarios.
- The "Call 112" / "Call 1091" buttons trigger the dialer on mobile and show a copy-friendly dialog on desktop.

## License

MIT — built with care for an empowered sisterhood. 💕
