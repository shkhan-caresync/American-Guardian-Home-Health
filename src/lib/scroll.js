/**
 * Centralized scroll utility for anchor navigation
 * Handles fixed nav offset consistently across all breakpoints
 */

/**
 * Get the current nav height dynamically
 * Accounts for announcement strip and main nav bar
 */
export function getNavHeight() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 120; // fallback
  }
  
  const nav = document.querySelector("nav");
  if (!nav) return 120;
  
  return nav.offsetHeight;
}

/**
 * Scroll to a section with proper nav offset
 * @param {string} sectionId - The ID of the section to scroll to (without #)
 * @param {Object} options - Scroll options
 */
export function scrollToSection(sectionId, options = {}) {
  const {
    behavior = "smooth",
    offset = 0, // Additional offset if needed
  } = options;

  const targetElement = document.getElementById(sectionId);
  if (!targetElement) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  const navHeight = getNavHeight();
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = targetPosition - navHeight - offset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior,
  });
}

/**
 * Handle anchor link clicks with proper offset
 * Use this in onClick handlers for anchor links
 */
export function handleAnchorClick(e, sectionId, options = {}) {
  e.preventDefault();
  scrollToSection(sectionId, options);
}

