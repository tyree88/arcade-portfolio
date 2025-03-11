'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  progress: number;
  isVisible: boolean;
}

/**
 * A stylized loading screen with PlayStation-inspired aesthetics
 * Shows loading progress and provides a smooth transition when loading completes
 */
export function LoadingScreen({ progress, isVisible }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  
  // Start fade out animation when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && isVisible) {
      // Small delay before starting fade out
      const timeout = setTimeout(() => {
        setFadeOut(true);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [progress, isVisible]);
  
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
