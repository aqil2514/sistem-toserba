/**
 * Generate ID khusus untuk mode DEMO
 * - Aman untuk React Strict Mode
 * - Tidak menggunakan Date.now / Math.random
 * - Stabil & collision-safe
 */
export function generateDemoId(prefix = "demo"): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
