import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
    const [modal, setModal] = useState(null); // 'roadmap' | 'terms' | 'contact' | { type: 'call', number, label } | null

    const openModal = useCallback((value) => setModal(value), []);
    const closeModal = useCallback(() => setModal(null), []);

    return (
        <UIContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error('useUI must be used within UIProvider');
    return ctx;
}
