// Firebase auth — initialised lazily so the app still runs without env keys
// (in which case auth falls back to a local "guest" mode).

import { initializeApp, getApps } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInAnonymously,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as fbSignOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId
);

let _auth = null;
function ensureAuth() {
    if (!isFirebaseConfigured) {
        throw new Error('Firebase is not configured. Add VITE_FIREBASE_* keys to .env to enable real auth.');
    }
    if (!_auth) {
        const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        _auth = getAuth(app);
    }
    return _auth;
}

export async function signIn({ email, password }) {
    const auth = ensureAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

export async function signUp({ email, password, name }) {
    const auth = ensureAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
        try { await updateProfile(cred.user, { displayName: name }); } catch { /* non-fatal */ }
    }
    return cred.user;
}

export async function signInAsGuest() {
    const auth = ensureAuth();
    const cred = await signInAnonymously(auth);
    return cred.user;
}

export async function signInWithGoogle() {
    const auth = ensureAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
}

export async function signOut() {
    if (!isFirebaseConfigured) return;
    const auth = ensureAuth();
    await fbSignOut(auth);
}

export function watchAuth(callback) {
    if (!isFirebaseConfigured) return () => { };
    const auth = ensureAuth();
    return onAuthStateChanged(auth, callback);
}
