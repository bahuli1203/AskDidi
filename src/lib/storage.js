// Tiny localStorage wrapper that survives parse errors and namespaces all keys.

const PREFIX = 'askdidi:';

export function loadJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(PREFIX + key);
        if (raw == null) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function saveJSON(key, value) {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

export function removeKey(key) {
    try { localStorage.removeItem(PREFIX + key); return true; } catch { return false; }
}

// Track a "streak" — increment if last activity was yesterday, reset if older,
// keep same if today. Returns { current, longest, lastDate }.
export function bumpStreak(streakKey = 'streak') {
    const today = new Date().toISOString().slice(0, 10);
    const state = loadJSON(streakKey, { current: 0, longest: 0, lastDate: null });
    if (state.lastDate === today) return state; // already counted today
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const next = {
        current: state.lastDate === yesterday ? state.current + 1 : 1,
        longest: Math.max(state.longest, state.lastDate === yesterday ? state.current + 1 : 1),
        lastDate: today,
    };
    saveJSON(streakKey, next);
    return next;
}
