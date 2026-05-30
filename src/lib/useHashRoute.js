import { useEffect, useState } from 'react';

// Returns the current hash route (without the leading "#").
// Components can render different views based on it.
// Usage: const route = useHashRoute(); // "" | "/diary" | "/chat/decision"
export default function useHashRoute() {
    const [route, setRoute] = useState(() => parseHash(window.location.hash));

    useEffect(() => {
        const handler = () => {
            const next = parseHash(window.location.hash);
            setRoute(next);
            // When entering a feature page, jump to top so the header is visible.
            // Browsers don't auto-scroll for hashes that aren't real anchor IDs.
            if (next) window.scrollTo({ top: 0, behavior: 'instant' });
        };
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);

    return route;
}

function parseHash(hash) {
    if (!hash) return '';
    // Skip anchor scrolls like "#home", only treat "#/foo" style as routes.
    if (!hash.startsWith('#/')) return '';
    return hash.slice(1); // -> "/foo" or "/foo/bar"
}

export function navigate(path) {
    if (!path.startsWith('/')) path = '/' + path;
    window.location.hash = path;
    // Make sure we land at the top of the new page even if the hash was already
    // matching (e.g. clicking the same link twice).
    window.scrollTo({ top: 0, behavior: 'instant' });
}

export function backToHome() {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'instant' });
}
