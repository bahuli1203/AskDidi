// Thin client for the Ask Didi backend.
// All endpoints fall back gracefully if the server is unreachable.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

async function jsonFetch(path, options = {}) {
    const resp = await fetch(`${API_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });
    const text = await resp.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch { /* ignore */ }
    if (!resp.ok) {
        const err = new Error(data.error || `Request failed: ${resp.status}`);
        err.status = resp.status;
        err.data = data;
        throw err;
    }
    return data;
}

export async function chatWithDidi({ message, history = [] }) {
    return jsonFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, history }),
    });
}

export async function detectEmotion(text) {
    return jsonFetch('/api/emotion', {
        method: 'POST',
        body: JSON.stringify({ text }),
    });
}

export async function transcribeAudio(blob, { language } = {}) {
    const form = new FormData();
    // Whisper accepts webm/ogg/mp3/wav. Browsers usually give us webm/opus.
    form.append('audio', blob, 'recording.webm');
    if (language) form.append('language', language);

    const resp = await fetch(`${API_URL}/api/voice/transcribe`, {
        method: 'POST',
        body: form,
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
        const err = new Error(data.error || `Transcription failed: ${resp.status}`);
        err.status = resp.status;
        throw err;
    }
    return data;
}

export async function checkHealth() {
    try { return await jsonFetch('/api/health'); }
    catch { return { ok: false }; }
}
