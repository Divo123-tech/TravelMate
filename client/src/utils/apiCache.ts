// src/utils/apiCache.ts

const cache: Record<string, any> = {};

export const cachedApiCall = async (
  key: string,
  apiCall: () => Promise<any>
) => {
  if (cache[key]) {
    return cache[key];
  }
  const result = await apiCall();
  cache[key] = result;
  return result;
};
