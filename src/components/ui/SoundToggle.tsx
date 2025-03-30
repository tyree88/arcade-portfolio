'use client';

import React from 'react';
import { usePortfolioStore } from '@/stores/portfolioStore';

export default function SoundToggle() {
  const isSoundEnabled = usePortfolioStore((state) => state.isSoundEnabled);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);

  return (
    <button
      onClick={toggleSound}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '8px 12px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: '1px solid white',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 100, // Ensure it's above the canvas
      }}
      aria-label={isSoundEnabled ? "Mute sound" : "Unmute sound"}
    >
      {isSoundEnabled ? 'Sound ON' : 'Sound OFF'}
    </button>
  );
}