import { apiConfig } from "@/config/apiConfig";
import { TRPCError } from "@trpc/server";

class BackendProxy {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const endpoint = `${this.baseUrl}${path}`;
    console.debug('backend proxy request to endpoint: ', endpoint);

    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `HTTP ${response.status}: ${errorText}`,
            cause: errorText,
        });
    }
    return await response.json() as T;
  }
}

export const defaultBackendProxy = new BackendProxy(apiConfig.baseUrl);
