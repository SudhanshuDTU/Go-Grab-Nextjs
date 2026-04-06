'use client';
// src/context/ModalContext.jsx
// ─────────────────────────────────────────────────────────────
//  Global modal context — any component anywhere can call
//  openModal() without prop-drilling through every page.
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children, openModal, closeModal }) {
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}