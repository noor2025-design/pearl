'use client';

import { useState, useEffect, useCallback } from 'react';

const KEY = 'pearl_saved_stores';
const EVENT = 'pearl_saved_change';

function readSaved(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    setSaved(readSaved());

    // Sync across all components on the same page
    const onUpdate = () => setSaved(readSaved());
    window.addEventListener(EVENT, onUpdate);
    return () => window.removeEventListener(EVENT, onUpdate);
  }, []);

  const toggle = useCallback((storeId: string) => {
    const current = readSaved();
    const next = current.includes(storeId)
      ? current.filter((id) => id !== storeId)
      : [...current, storeId];
    localStorage.setItem(KEY, JSON.stringify(next));
    // Notify all useSaved instances on the page
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const isSaved = useCallback((storeId: string) => saved.includes(storeId), [saved]);

  return { saved, toggle, isSaved };
}
