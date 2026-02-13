/**
 * Formatting utility functions
 */

/**
 * Formats a number as a price with currency symbol
 * @param price - The price to format
 * @param currency - Currency symbol (default: ₩)
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = '₩'): string {
  return `${currency}${price.toLocaleString()}`;
}

/**
 * Formats time string
 * @param time - Time string to format
 * @returns Formatted time string
 */
export function formatTime(time: string): string {
  return time; // Can add transformation logic if needed
}
