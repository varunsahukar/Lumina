const FALSE_VALUES = new Set(['0', 'false', 'no', 'off']);

/**
 * Returns whether Redis-backed queues and cache should be initialized.
 */
export function isRedisEnabled(): boolean {
  const value = process.env.ENABLE_REDIS ?? process.env.REDIS_ENABLED;
  if (!value) return true;
  return !FALSE_VALUES.has(value.trim().toLowerCase());
}
