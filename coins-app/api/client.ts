const baseUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
if (!baseUrl) throw new Error('EXPO_PUBLIC_API_URL is required');

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`);
  if (!res.ok) throw new Error('Could not load. Check your connection.');
  return res.json() as Promise<T>;
}
