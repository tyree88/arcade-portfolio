/**
 * WebGL Capabilities Detection
 * 
 * This module provides functions to detect WebGL capabilities and performance tiers
 * to help optimize rendering based on device capabilities.
 */

/**
 * Detects WebGL support and capabilities
 * @returns Object with WebGL support information
 */
export function detectWebGLSupport(): {
  hasWebGL: boolean;
  hasWebGL2: boolean;
  maxTextureSize: number;
  maxTextures: number;
  maxVertexUniforms: number;
  devicePixelRatio: number;
  isHighPerformance: boolean;
} {
  // Default values for non-browser environments
  const defaults = {
    hasWebGL: false,
    hasWebGL2: false,
    maxTextureSize: 0,
    maxTextures: 0,
    maxVertexUniforms: 0,
    devicePixelRatio: 1,
    isHighPerformance: false
  };
  
  // Skip if not in browser
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return defaults;
  }
  
  try {
    // Create temporary canvas for testing
    const canvas = document.createElement('canvas');
    
    // Check for WebGL2 support first
    const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    
    if (gl2) {
      return {
        hasWebGL: true,
        hasWebGL2: true,
        maxTextureSize: gl2.getParameter(gl2.MAX_TEXTURE_SIZE),
        maxTextures: gl2.getParameter(gl2.MAX_TEXTURE_IMAGE_UNITS),
        maxVertexUniforms: gl2.getParameter(gl2.MAX_VERTEX_UNIFORM_VECTORS),
        devicePixelRatio: window.devicePixelRatio || 1,
        isHighPerformance: detectHighPerformanceGPU(gl2)
      };
    }
    
    // Fall back to WebGL1
    const gl = (
      canvas.getContext('webgl') || 
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;
    
    if (gl) {
      return {
        hasWebGL: true,
        hasWebGL2: false,
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxTextures: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
        maxVertexUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
        devicePixelRatio: window.devicePixelRatio || 1,
        isHighPerformance: detectHighPerformanceGPU(gl)
      };
    }
    
    return defaults;
  } catch (e) {
    console.error('Error detecting WebGL capabilities:', e);
    return defaults;
  }
}

/**
 * Attempts to detect if the device has a high-performance GPU
 * @param gl WebGL context
 * @returns Boolean indicating if the device likely has a high-performance GPU
 */
function detectHighPerformanceGPU(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  // Check for extensions that typically exist on higher-end GPUs
  const extensions = gl.getSupportedExtensions() || [];
  
  // Check texture size (higher = better GPU generally)
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  
  // Check for hardware concurrency (CPU cores)
  const cpuCores = navigator.hardwareConcurrency || 0;
  
  // Check for key extensions that indicate better GPUs
  const hasKeyExtensions = 
    extensions.includes('EXT_texture_filter_anisotropic') &&
    extensions.includes('WEBGL_compressed_texture_s3tc');
  
  // Combine factors to determine if this is likely a high-performance device
  return (
    maxTextureSize >= 8192 && 
    hasKeyExtensions && 
    cpuCores >= 4
  );
}

/**
 * Gets the recommended pixel ratio based on device capabilities
 * @returns Optimized device pixel ratio
 */
export function getOptimizedPixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  
  const capabilities = detectWebGLSupport();
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  // For mobile devices or low-performance devices, reduce the pixel ratio
  if (isMobileDevice() || !capabilities.isHighPerformance) {
    return Math.min(devicePixelRatio, 1.5);
  }
  
  // For high-performance devices, allow higher pixel ratio but cap it
  return Math.min(devicePixelRatio, 2);
}

/**
 * Detects if the current device is a mobile device
 * @returns Boolean indicating if the device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  
  // Check for mobile user agent
  const userAgent = navigator.userAgent || navigator.vendor || ((window as Window & { opera?: string }).opera) || '';
  
  // Check for touch support as an additional indicator
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check screen size
  const isSmallScreen = window.innerWidth < 768;
  
  // Check for mobile user agent patterns
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUserAgent = mobileRegex.test(userAgent);
  
  // Combine factors - if user agent indicates mobile OR (has touch AND small screen)
  return isMobileUserAgent || (hasTouchSupport && isSmallScreen);
}
