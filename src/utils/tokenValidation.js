/**
 * Token Validation Utility
 * 
 * Lightweight client-side token validation for protected forms.
 * 
 * For production, consider adding a serverless function to validate tokens
 * against a database or secure token service.
 * 
 * Current implementation:
 * - Checks for token presence in URL
 * - Validates token format (basic check)
 * - Can be extended with serverless validation
 */

/**
 * Validate a token from URL parameters
 * 
 * @param {string} token - Token from URL query parameter
 * @returns {boolean} - Whether token is valid
 */
export function validateToken(token) {
  if (!token || typeof token !== "string") {
    return false;
  }

  // Basic format validation (adjust pattern as needed)
  // Tokens should be non-empty and contain alphanumeric/dash/underscore
  const tokenPattern = /^[a-zA-Z0-9_-]{20,}$/;
  
  if (!tokenPattern.test(token)) {
    return false;
  }

  // Optional: Add serverless validation here
  // Example:
  // const response = await fetch(`/api/validate-token?t=${token}`);
  // return response.ok;

  return true;
}

/**
 * Get token from URL query parameters
 * 
 * @returns {string | null} - Token value or null if not present
 */
export function getTokenFromURL() {
  if (typeof window === "undefined") return null;
  
  const params = new URLSearchParams(window.location.search);
  return params.get("t");
}

/**
 * Check if current route has valid token
 * 
 * @returns {boolean} - Whether valid token is present
 */
export function hasValidToken() {
  const token = getTokenFromURL();
  return validateToken(token);
}

/**
 * Redirect to contact page if token is invalid
 * (Optional - can be used for better UX)
 */
export function redirectToContact() {
  if (typeof window !== "undefined") {
    window.location.href = "/#contact";
  }
}

