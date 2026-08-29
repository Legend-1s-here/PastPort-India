/**
 * Supabase Backend Integration Module
 *
 * Implements End-to-End Architecture Data & Auth Flow:
 * - Supabase Auth (JWT User Session)
 * - RestAPI / Edge Functions Bridge
 * - Data Persistence (Favorites, Quiz Scores, Feedback)
 */

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  return {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://pastport-india.supabase.co',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key',
  };
};

/**
 * REST API End-to-End Edge Function Helper
 * Sends HTTPS requests with JWT Bearer tokens to Supabase Edge Functions
 */
export async function invokeEdgeFunction<T>(
  functionName: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, unknown>;
    jwtToken?: string;
  } = {}
): Promise<{ data: T | null; error: Error | null }> {
  const config = getSupabaseConfig();
  const endpoint = `${config.supabaseUrl}/functions/v1/${functionName}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': config.supabaseAnonKey,
  };

  if (options.jwtToken) {
    headers['Authorization'] = `Bearer ${options.jwtToken}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: options.method || 'POST',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Edge Function ${functionName} failed with status ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
