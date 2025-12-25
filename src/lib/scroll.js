/**
 * Centralized scroll utility for anchor navigation
 * Handles fixed nav offset consistently across all breakpoints
 * 
 * Features:
 * - Dynamic nav height measurement
 * - Consistent buffer for visual spacing
 * - Post-scroll correction to handle layout shifts
 * - Supports reduced motion preferences
 */

const DEFAULT_BUFFER = 16; // Visual spacing buffer in pixels
const POST_SCROLL_DELAY = 150; // Delay before post-scroll correction (ms)
const CORRECTION_THRESHOLD = 4; // Minimum offset difference to trigger correction (px)

/**
 * Get the current nav height dynamically
 * Accounts for announcement strip and main nav bar
 * Measures at call time to handle responsive nav height changes
 */
export function getNavHeight() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 120; // fallback
  }
  
  const nav = document.querySelector("nav");
  if (!nav) return 120;
  
  // Get actual rendered height
  return nav.offsetHeight;
}

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Perform a single scroll operation
 * @private
 */
function performScroll(targetY, behavior) {
  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: behavior || (prefersReducedMotion() ? "auto" : "smooth"),
  });
}

/**
 * Calculate the target scroll position for a section
 * @private
 */
function calculateTargetPosition(element, navHeight, buffer) {
  const rect = element.getBoundingClientRect();
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = rect.top + currentScroll;
  const targetY = elementTop - navHeight - buffer;
  return targetY;
}

/**
 * Scroll to a section with proper nav offset and post-scroll correction
 * @param {string} sectionId - The ID of the section to scroll to (without #)
 * @param {Object} options - Scroll options
 * @param {string} options.behavior - "smooth" | "auto" (defaults based on reduced motion)
 * @param {number} options.buffer - Additional buffer spacing (defaults to DEFAULT_BUFFER)
 * @param {boolean} options.correctAfterScroll - Enable post-scroll correction (default: true)
 */
export function scrollToSection(sectionId, options = {}) {
  const {
    behavior,
    buffer = DEFAULT_BUFFER,
    correctAfterScroll = true,
  } = options;

  const targetElement = document.getElementById(sectionId);
  if (!targetElement) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  // Measure nav height at click time (may vary by breakpoint)
  const navHeight = getNavHeight();
  
  // Calculate target position
  const targetY = calculateTargetPosition(targetElement, navHeight, buffer);
  
  // Determine scroll behavior
  const scrollBehavior = behavior || (prefersReducedMotion() ? "auto" : "smooth");
  
  // Perform initial scroll
  performScroll(targetY, scrollBehavior);

  // Post-scroll correction for layout shifts (fonts, images, animations)
  // Only if smooth scrolling and correction is enabled
  if (correctAfterScroll && scrollBehavior === "smooth" && !prefersReducedMotion()) {
    // Wait for scroll to complete and layout to settle
    setTimeout(() => {
      // Re-measure after potential layout shifts
      const newNavHeight = getNavHeight();
      const newTargetY = calculateTargetPosition(targetElement, newNavHeight, buffer);
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const offsetDifference = Math.abs(currentScroll - newTargetY);
      
      // If we're off by more than threshold, correct it
      if (offsetDifference > CORRECTION_THRESHOLD) {
        performScroll(newTargetY, "auto"); // Use auto for correction (instant)
      }
    }, POST_SCROLL_DELAY);
  }
}

/**
 * Handle anchor link clicks with proper offset
 * Use this in onClick handlers for anchor links
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
  
  // Wait for layout to settle, then scroll
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSection(sectionId, {
        behavior: "auto", // Instant scroll on initial load
        correctAfterScroll: false, // No correction needed for initial load
      });
    });
  });
}
