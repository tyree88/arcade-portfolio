
import { useState, useEffect } from 'react';
import { detectWebGLSupport, isMobileDevice } from '@/utils/webglCapabilities';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type PerformanceTier = 'low' | 'medium' | 'high';

interface ResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  performanceTier: PerformanceTier;
  hasWebGL2: boolean;
  supportsHDR: boolean;
  prefersReducedMotion: boolean;
}

export function useResponsive(): ResponsiveReturn {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('high');
  const [hasWebGL2, setHasWebGL2] = useState(false);
  const [supportsHDR, setSupportsHDR] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check device type based on screen width and device detection
    const checkDevice = () => {
      // Use the isMobileDevice utility for more accurate detection
      if (isMobileDevice()) {
        // Further distinguish between mobile and tablet based on width
        const width = window.innerWidth;
        if (width < 768) {
          setDeviceType('mobile');
        } else {
          setDeviceType('tablet');
        }
      } else {
        setDeviceType('desktop');
      }
    };

    // Check WebGL support
    const webGLSupport = detectWebGLSupport();
    setHasWebGL2(webGLSupport.hasWebGL2);

    // Check for HDR support
    setSupportsHDR(!!window.matchMedia?.('(dynamic-range: high)').matches);

    // Check for reduced motion preference
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery?.matches || false);
    
    // Handle motion preference changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery?.addEventListener?.('change', handleMotionChange);

    // Determine performance tier based on device and capabilities
    const determinePerformanceTier = () => {
      // Check for hardware concurrency (CPU cores)
      const cpuCores = navigator.hardwareConcurrency || 0;
      
      // Low-end devices
      if (
        !webGLSupport.hasWebGL2 ||
        (deviceType === 'mobile' && cpuCores <= 4) ||
        window.innerWidth < 500
      ) {
        setPerformanceTier('low');
        return;
      }
      
      // Mid-range devices
      if (
        (deviceType === 'mobile' && cpuCores > 4) ||
        (deviceType === 'tablet' && cpuCores <= 6)
      ) {
        setPerformanceTier('medium');
        return;
      }
      
      // High-end devices
      setPerformanceTier('high');
    };

    checkDevice();
    determinePerformanceTier();
    
    window.addEventListener('resize', () => {
      checkDevice();
      determinePerformanceTier();
    });
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      motionQuery?.removeEventListener?.('change', handleMotionChange);
    };
  }, [deviceType]);

  return {
    isMobile: isMounted && deviceType === 'mobile',
    isTablet: isMounted && deviceType === 'tablet',
    isDesktop: isMounted && deviceType === 'desktop',
    deviceType,
    performanceTier,
    hasWebGL2,
    supportsHDR,
    prefersReducedMotion
  };
}
