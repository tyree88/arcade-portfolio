
import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
}

export function useResponsive(): ResponsiveReturn {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    isMobile: isMounted && deviceType === 'mobile',
    isTablet: isMounted && deviceType === 'tablet',
    isDesktop: isMounted && deviceType === 'desktop',
    deviceType: deviceType
  };
}
