const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  // Safe conversion of standard HeadersInit to satisfy strict TypeScript definitions
  const incomingHeaders = options.headers ? Object.fromEntries(new Headers(options.headers).entries()) : {};

  const headers: Record<string, string> = {
    'Content-Type': 'application/json', // Added missing string quotes here!
    ...incomingHeaders,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Extract text safely first to avoid crashing if the server sends back an empty response
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong across the network.');
    }

    return data;
  } catch (error: any) {
    console.error(`🚨 [API Error]: ${error.message}`);
    throw error;
  }
};