/**
 * Helper functions for parsing and handling stored data from MMKV or other storage solutions
 */

/**
 * Safely parses a stored JSON string into an array
 * @param storedValue - The stored string value from MMKV or similar storage
 * @returns Parsed array or empty array if parsing fails
 */
export function parseStoredArray<T = any>(storedValue: string | undefined): T[] {
  if (!storedValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedValue);
    if (Array.isArray(parsed)) {
      return parsed as T[];
    }
    console.warn("Stored value is not an array:", parsed);
    return [];
  } catch (error) {
    console.error("Failed to parse stored array:", error);
    return [];
  }
}