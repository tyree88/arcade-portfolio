/**
 * WebGL Detection Utility
 * 
 * This module provides functions to detect WebGL support and capabilities in the browser.
 * It helps diagnose 3D rendering issues by checking if WebGL is available and what level
 * of support the browser provides.
 */

/**
 * Checks if WebGL is supported in the current browser
 * 
 * @returns {boolean} True if WebGL is supported, false otherwise
 */
export function isWebGLSupported(): boolean {
  // Only run this check in the browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  
  try {
    // Try to create a WebGL context on a temporary canvas
    const canvas = document.createElement('canvas');
    // Use explicit type casting to WebGLRenderingContext
    const gl = (
      canvas.getContext('webgl') || 
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;
    
    // If we got a context, WebGL is supported
    return gl !== null;
  } catch (e) {
    console.error('Error checking WebGL support:', e);
    return false;
  }
}

/**
 * Gets detailed information about WebGL capabilities
 * 
 * @returns {Object} Object containing WebGL support details
 */
export function getWebGLInfo(): {
  supported: boolean;
  renderer?: string;
  vendor?: string;
  version?: string;
  shadingLanguageVersion?: string;
  extensions?: string[];
  maxTextureSize?: number;
} {
  // Only run this check in the browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { supported: false };
  }
  
  try {
    const canvas = document.createElement('canvas');
    // Use explicit type casting to WebGLRenderingContext
    const gl = (
      canvas.getContext('webgl') || 
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;
    
    if (!gl) {
      return { supported: false };
    }
    
    // Get WebGL information
    // Use explicit constants from WebGLRenderingContext
    const info = {
      supported: true,
      renderer: gl.getParameter(gl.RENDERER),
      vendor: gl.getParameter(gl.VENDOR),
      version: gl.getParameter(gl.VERSION),
      shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      extensions: gl.getSupportedExtensions() || [],
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE)
    };
    
    return info;
  } catch (e) {
    console.error('Error getting WebGL info:', e);
    return { supported: false };
  }
}

/**
 * Logs WebGL information to the console for debugging
 */
export function logWebGLInfo(): void {
  // Only run this check in the browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.log('WebGL check skipped - not in browser environment');
    return;
  }
  
  const info = getWebGLInfo();
  
  if (info.supported) {
    console.log('WebGL is supported');
    console.log('Renderer:', info.renderer);
    console.log('Vendor:', info.vendor);
    console.log('Version:', info.version);
    console.log('Shading Language Version:', info.shadingLanguageVersion);
    console.log('Max Texture Size:', info.maxTextureSize);
    console.log('Extensions:', info.extensions);
  } else {
    console.error('WebGL is not supported in this browser');
  }
}

/**
 * Checks if the device likely has sufficient GPU power for complex 3D scenes
 * 
 * @returns {boolean} True if the device likely has good GPU capabilities
 */
export function hasGoodGPUCapabilities(): boolean {
  // Only run this check in the browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  
  const info = getWebGLInfo();
  
  if (!info.supported) {
    return false;
  }
  
  // Check for some indicators of good GPU capabilities
  // This is a simple heuristic and may need adjustment
  // Ensure we have a boolean by using !! to convert any truthy/falsy value to a boolean
  const hasGoodMaxTextureSize = !!(info.maxTextureSize && info.maxTextureSize >= 8192);
  
  // Check if extensions exist and include the required ones
  // Use !! to ensure we return a boolean value
  const hasRequiredExtensions = !!(
    info.extensions && 
    info.extensions.includes('WEBGL_depth_texture') && 
    info.extensions.includes('OES_texture_float')
  );
    
  // Both conditions must be true
  return hasGoodMaxTextureSize && hasRequiredExtensions;
} 