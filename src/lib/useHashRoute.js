import { useEffect, useState } from 'react';

// Returns the current hash route (without the leading "#").
// Components can render different views based on it.
// Usage: const route = useHashRoute(); // "" | "/diary" | "/chat/decision"
export default function useHashRoute() {
    const [route, setRoute] = useState(() => parseHash(window.location.hash));

    useEffect(() => {
        const handler = () => setRoute(parseHash(window.location.hash));
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
}

export function backToHome() {
    window.location.hash = '';
    // Scroll to top so users see hero.
    window.scrollTo({ top: 0, behavior: 'instant' });
}
