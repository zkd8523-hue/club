/**
 * Scroll utility functions for smooth navigation
 */

/**
 * Smoothly scrolls to an element with specified offset
 * @param elementId - The ID of the element to scroll to
 * @param offset - Offset from top in pixels (default: 80)
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Checks if current pathname is the home page
 * @param pathname - Current pathname from usePathname()
 */
export function isHomePage(pathname: string): boolean {
  return pathname === '/';
}
