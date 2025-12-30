/**
 * Backend base URL
 * Local default, prod via env
 */
export const SERVER_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "http://localhost:3001";
