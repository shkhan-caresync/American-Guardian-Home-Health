/**
 * Performance optimization utilities
 * Helps ensure smooth animations and interactions
 */

/**
 * Throttle function calls to improve scroll performance
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function calls
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if device is low-end (for performance optimizations)
 */
export function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false;
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check device memory (if available)
  const memory = (navigator.deviceMemory || 4) * 1024; // Convert GB to MB
  
  // Low-end if: < 4 cores OR < 4GB RAM
  return cores < 4 || memory < 4096;
}

/**
 * Reduce animation complexity for low-end devices
 */
export function shouldReduceAnimations() {
  if (typeof window === 'undefined') return false;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return true;
  
  // Check for low-end device
  return isLowEndDevice();
}

/**
 * Get optimized blur value based on device performance
 */
export function getOptimizedBlur(baseBlur = 'xl') {
  if (shouldReduceAnimations()) {
    // Reduce blur intensity on low-end devices
    const blurMap = {
      '3xl': 'xl',
      '2xl': 'lg',
      'xl': 'md',
      'lg': 'sm',
      'md': 'sm',
    };
    return blurMap[baseBlur] || 'sm';
  }
  return baseBlur;
}

/**
 * Get optimized backdrop blur value
 */
export function getOptimizedBackdropBlur(baseBlur = 'xl') {
  if (shouldReduceAnimations()) {
    const blurMap = {
      '2xl': 'lg',
      'xl': 'md',
      'lg': 'sm',
      'md': 'sm',
    };
    return blurMap[baseBlur] || 'sm';
  }
  return baseBlur;
}



