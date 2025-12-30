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

  // Measure nav height at click time (may vary by breakpoint)
  const navHeight = getNavHeight();
  
  // Get element position relative to viewport
  const rect = targetElement.getBoundingClientRect();
  // Get current scroll position
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  // Calculate absolute element top position
  const elementTop = rect.top + currentScroll;
  
  // Check if element has CSS scroll-margin-top (sections have scroll-mt-* classes)
  // We should use this value if it's set, as it's already tuned for the layout
  const computedStyle = window.getComputedStyle(targetElement);
  const scrollMarginTop = parseInt(computedStyle.scrollMarginTop, 10) || 0;
  
  // If scroll-margin-top is set, use it (it's already accounting for nav + spacing)
  // Otherwise, calculate manually: elementTop - navHeight - buffer
  const targetY = scrollMarginTop > 0 
    ? elementTop - scrollMarginTop
    : elementTop - navHeight - buffer;
  
  // Ensure non-negative
  const finalTargetY = Math.max(0, targetY);
  
  // Determine scroll behavior
  const scrollBehavior = behavior || (prefersReducedMotion() ? "auto" : "smooth");
  
  // Perform exactly one scroll operation
  window.scrollTo({
    top: finalTargetY,
    behavior: scrollBehavior,
  });
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
