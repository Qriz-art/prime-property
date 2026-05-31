const buckets = new Map();

export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimit(request, options = {}) {
  const ip = getClientIp(request);
  const key = options.key ? `${options.key}:${ip}` : ip;

  const now = Date.now();
  const windowMs = options.windowMs || 60 * 1000;
  const maxRequests = options.maxRequests || 100;

  const history = buckets.get(key) || [];
  const recentHistory = history.filter((time) => now - time < windowMs);

  if (recentHistory.length >= maxRequests) {
    return false;
  }

  buckets.set(key, [...recentHistory, now]);
  return true;
}