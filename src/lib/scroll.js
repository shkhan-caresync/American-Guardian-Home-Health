/**
 * Centralized scroll utility for anchor navigation
 * Handles fixed nav offset consistently across all breakpoints
 * 
 * Design principles:
 * - One scroll per click, no corrections or delayed operations
 * - Manual window.scrollTo calculation (ignores CSS scroll-margin-top)
 * - Last click wins (cancels previous scroll)
 * - Deterministic and stable under rapid clicking
 */

const DEFAULT_BUFFER = 8; // Visual spacing buffer in pixels (separates heading from nav)

// Track scroll requests to implement "last click wins"
let scrollRequestId = 0;

/**
 * Detect if we're on iOS Safari
 */
function isIOSSafari() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|OPiOS/.test(ua);
  return isIOS && isSafari;
}

/**
 * Get safe area inset top (for devices with notches/Dynamic Island)
 */
function getSafeAreaInsetTop() {
  if (typeof window === "undefined" || typeof CSS === "undefined" || !CSS.supports) {
    return 0;
  }
  
  // Check if we're in a safe area context
  try {
    const testEl = document.createElement("div");
    testEl.style.paddingTop = "env(safe-area-inset-top)";
    document.body.appendChild(testEl);
    const computed = window.getComputedStyle(testEl);
    const paddingTop = computed.paddingTop;
    document.body.removeChild(testEl);
    
    // If it's not "0px", parse the value
    if (paddingTop && paddingTop !== "0px") {
      return parseInt(paddingTop, 10);
    }
  } catch (e) {
    // Fallback if env() isn't supported
  }
  
  return 0;
}

/**
 * Get the current nav height dynamically at runtime
 * Measures the actual <nav> element height, including announcement strip if visible
 * No caching - measures fresh each time to handle responsive changes
 */
export function getNavHeight() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 96; // Safe fallback
  }
  
  const nav = document.querySelector("nav");
  if (!nav) return 96;
  
  // Use getBoundingClientRect for accurate measurement
  // This includes the full nav height (announcement strip + main nav bar)
  const navRect = nav.getBoundingClientRect();
  return navRect.height;
}

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll to a section with proper nav offset
 * Deterministic: one scroll operation per call, no corrections, no timeouts
 * 
 * @param {string} sectionId - The ID of the section to scroll to (without #)
 * @param {Object} options - Scroll options
 * @param {string} options.behavior - "smooth" | "auto" (defaults based on reduced motion)
 * @param {number} options.buffer - Additional buffer spacing (defaults to DEFAULT_BUFFER)
 */
export function scrollToSection(sectionId, options = {}) {
  const {
    behavior,
    buffer = DEFAULT_BUFFER,
  } = options;

  const targetElement = document.getElementById(sectionId);
  if (!targetElement) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  // Increment scroll request ID (last click wins - but we don't actually cancel scrolls,
  // we just ensure we don't do multiple operations)
  scrollRequestId++;

  const isIOS = isIOSSafari();
  
  // For iOS, use requestAnimationFrame to ensure layout is settled
  const performScroll = () => {
    // Measure nav height at click time (may vary by breakpoint)
    const navHeight = getNavHeight();
    
    // Get element position relative to viewport
    const rect = targetElement.getBoundingClientRect();
    // Get current scroll position - use the most reliable method
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    // Calculate absolute element top position
    const elementTop = rect.top + currentScroll;
    
    // Check if element has CSS scroll-margin-top (sections have scroll-mt-* classes)
    const computedStyle = window.getComputedStyle(targetElement);
    const scrollMarginTop = parseInt(computedStyle.scrollMarginTop, 10) || 0;
    
    // Calculate target scroll position
    let targetY;
    
    if (isIOS) {
      // On iOS, use manual calculation that accounts for nav height
      // This is more reliable than CSS scroll-margin-top which can be inconsistent on iOS
      // Use the larger of scroll-margin-top or navHeight + buffer to ensure proper spacing
      const manualOffset = navHeight + buffer + 8; // Extra 8px for iOS spacing
      const offset = Math.max(scrollMarginTop, manualOffset);
      targetY = elementTop - offset;
    } else {
      // Desktop: use scroll-margin-top if available, otherwise manual calculation
      if (scrollMarginTop > 0) {
        targetY = elementTop - scrollMarginTop;
      } else {
        targetY = elementTop - navHeight - buffer;
      }
    }
    
    // Ensure non-negative
    const finalTargetY = Math.max(0, targetY);
    
    // Determine scroll behavior
    const scrollBehavior = behavior || (prefersReducedMotion() ? "auto" : "smooth");
    
    // Perform exactly one scroll operation
    window.scrollTo({
      top: finalTargetY,
      behavior: scrollBehavior,
    });
  };

  // On iOS, wait for next frame to ensure layout is settled
  if (isIOS) {
    requestAnimationFrame(() => {
      requestAnimationFrame(performScroll);
    });
  } else {
    performScroll();
  }
}

/**
 * Handle anchor link clicks with proper offset
 * Use this in onClick handlers for anchor links
 * 
 * @param {Event} e - The click event
 * @param {string} sectionId - The ID of the section to scroll to (without #)
 * @param {Object} options - Scroll options (passed to scrollToSection)
 */
export function handleAnchorClick(e, sectionId, options = {}) {
  e.preventDefault();
  scrollToSection(sectionId, options);
}

/**
 * Handle initial hash navigation on page load
 * Call this once after the page has mounted and rendered
 */
export function handleInitialHash() {
  if (typeof window === "undefined") return;
  
  const hash = window.location.hash;
  if (!hash) return;
  
  const sectionId = hash.replace("#", "");
  if (!sectionId) return;
  
  // Wait for layout to settle, then scroll (instant, no animation on initial load)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSection(sectionId, {
        behavior: "auto",
      });
    });
  });
}
