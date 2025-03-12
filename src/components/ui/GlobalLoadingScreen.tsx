
'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface GlobalLoadingScreenProps {
  progress: number;
  isVisible: boolean;
  onLoadComplete?: () => void;
}

/**
 * A centralized, reusable loading screen with PlayStation-inspired aesthetics
 * Shows loading progress and provides a smooth transition when loading completes
 */
export function GlobalLoadingScreen({ progress, isVisible, onLoadComplete }: GlobalLoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  
  // Start fade out animation when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && isVisible) {
      // Small delay before starting fade out
      const timeout = setTimeout(() => {
        setFadeOut(true);
        
        // Allow time for fade out animation to complete before calling onLoadComplete
        const completeTimeout = setTimeout(() => {
          if (onLoadComplete) onLoadComplete();
        }, 800); // Match the fadeOut duration from CSS
        
        return () => clearTimeout(completeTimeout);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [progress, isVisible, onLoadComplete]);
  
  // Don't render if not visible and fade out is complete
  if (!isVisible && fadeOut) return null;
  
  return (
    <div className={`${styles.loadingScreen} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.arcadeText}>ARCADE</span>
          <span className={styles.portfolioText}>PORTFOLIO</span>
        </div>
        
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
          <div className={styles.progressText}>
            {progress < 100 ? 'LOADING...' : 'PRESS START'}
          </div>
        </div>
        
        <div className={styles.tips}>
          <p>TIP: Use mouse or touch to rotate the view</p>
          <p>TIP: Click on arcade cabinets to view projects</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Simplified loading indicator for inline use within components
 */
export function InlineLoadingIndicator({ progress }: { progress: number }) {
  return (
    <div className="bg-black/80 text-white p-4 rounded-lg max-w-xs text-center">
      <h3 className="text-lg font-bold mb-2">Loading Arcade Portfolio</h3>
      <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm opacity-80">{progress.toFixed(0)}% loaded</p>
    </div>
  );
}

/**
 * Hook to manage loading progress
 */
export function useLoadingProgress(initialDelay = 0) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Simulated loading if needed
    let timer: NodeJS.Timeout;
    
    if (initialDelay > 0) {
      timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 1;
          });
        }, 20);
        
        return () => clearInterval(interval);
      }, initialDelay);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [initialDelay]);
  
  return {
    progress,
    setProgress,
    isVisible,
    setIsVisible
  };
}
