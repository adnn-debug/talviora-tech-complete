/**
 * Lightweight, in-memory sliding-window rate limiter for Next.js API routes.
 * Provides application-layer protection against spam and resource exhaustion.
 */

interface RateLimitConfig {
  /** Maximum number of requests permitted in the window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  remaining: number;
  retryAfter: number; // Seconds until next available slot
}

// In-memory sliding window cache: IP -> array of request timestamps (epoch ms)
const requestMap = new Map<string, number[]>();

// Periodic garbage collection every 5 minutes to prevent memory leaks
let lastCleanup = Date.now();
function cleanupExpired(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return; // run at most once per minute
  lastCleanup = now;

  for (const [ip, timestamps] of requestMap.entries()) {
    const valid = timestamps.filter((t) => now - t < windowMs * 2);
    if (valid.length === 0) {
      requestMap.delete(ip);
    } else {
      requestMap.set(ip, valid);
    }
  }
}

/**
 * Extracts a best-effort client IP address from request headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}

/**
 * Checks if the incoming request is within configured rate limits.
 */
export function checkRateLimit(
  req: Request,
  config: RateLimitConfig = { limit: 20, windowSeconds: 60 }
): RateLimitResult {
  const ip = getClientIp(req);
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;

  cleanupExpired(windowMs);

  const timestamps = requestMap.get(ip) || [];
  // Filter timestamps within the current sliding window
  const activeTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (activeTimestamps.length >= config.limit) {
    const oldest = activeTimestamps[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return {
      allowed: false,
      currentCount: activeTimestamps.length,
      remaining: 0,
      retryAfter,
    };
  }

  // Record this request
  activeTimestamps.push(now);
  requestMap.set(ip, activeTimestamps);

  return {
    allowed: true,
    currentCount: activeTimestamps.length,
    remaining: config.limit - activeTimestamps.length,
    retryAfter: 0,
  };
}
