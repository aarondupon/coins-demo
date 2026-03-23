const baseUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
if (!baseUrl) throw new Error('EXPO_PUBLIC_API_URL is required');

export async function apiGet<T>(path: string, options?: { signal?: AbortSignal }): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, { signal: options?.signal });
  if (!res.ok) throw new Error('Could not load. Check your connection.');
  return res.json() as Promise<T>;
}
