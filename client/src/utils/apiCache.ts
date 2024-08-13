// src/utils/apiCache.ts

// Define an in-memory cache object to store API responses
const cache: Record<string, any> = {};

/**
 * Caches the result of an API call to prevent redundant requests.
 *
 * @param key - A unique string identifier for the cached API response.
 *              This key will be used to retrieve the cached result.
 * @param apiCall - A function that returns a promise, which resolves to the API response.
 *
 * @returns A promise that resolves to the API response. If the result is already cached,
 *          it returns the cached result; otherwise, it performs the API call and caches the result.
 */
export const cachedApiCall = async (
  key: string, // Unique identifier for the cache
  apiCall: () => Promise<any> // Function that performs the API call
): Promise<any> => {
  // Check if the result for this key is already in the cache
  if (cache[key]) {
    // Return the cached result if it exists
    return cache[key];
  }

  // Perform the API call and wait for the result
  const result = await apiCall();

  // Store the result in the cache with the given key
  cache[key] = result;

  // Return the result of the API call
  return result;
};
