import { useEffect, useRef, useState } from 'react';

// Tiny hook around MediaRecorder. Returns { isRecording, isSupported, start, stop, error }.
// stop() resolves with the recorded Blob.
export default function useVoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);
    const streamRef = useRef(null);
    const stopResolverRef = useRef(null);

    const isSupported = typeof window !== 'undefined'
        && typeof navigator !== 'undefined'
        && navigator.mediaDevices?.getUserMedia
        && typeof window.MediaRecorder !== 'undefined';

    useEffect(() => () => {
        streamRef.current?.getTracks?.().forEach((t) => t.stop());
    }, []);

    async function start() {
        setError(null);
        if (!isSupported) {
            setError('Your browser does not support voice recording.');
            throw new Error('MediaRecorder unsupported');
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const mime = pickMime();
            const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
            chunksRef.current = [];
            rec.ondataavailable = (e) => { if (e.data?.size > 0) chunksRef.current.push(e.data); };
            rec.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
                streamRef.current?.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
                recorderRef.current = null;
                setIsRecording(false);
                stopResolverRef.current?.(blob);
                stopResolverRef.current = null;
            };
            rec.start();
            recorderRef.current = rec;
            setIsRecording(true);
        } catch (err) {
            setError(err.name === 'NotAllowedError'
                ? 'Microphone permission was denied.'
                : 'Could not access the microphone.');
            throw err;
        }
    }

    function stop() {
        return new Promise((resolve) => {
            const rec = recorderRef.current;
            if (!rec) { resolve(null); return; }
            stopResolverRef.current = resolve;
            try { rec.stop(); } catch { resolve(null); }
        });
    }

    return { isRecording, isSupported, start, stop, error };
}

function pickMime() {
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
    if (typeof MediaRecorder === 'undefined') return '';
    return candidates.find((m) => MediaRecorder.isTypeSupported?.(m)) || '';
}
