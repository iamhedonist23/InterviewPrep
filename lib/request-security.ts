type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const MAX_JSON_BYTES = 128 * 1024;
const MAX_IMPORT_BYTES = 5 * 1024 * 1024;

export function requestSizeLimit(request: Request, maxBytes = MAX_JSON_BYTES) {
  const length = request.headers.get("content-length");
  return !length || Number(length) <= maxBytes;
}

export function rateLimit(request: Request, namespace: string, limit: number, windowMs: number) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = `${namespace}:${forwarded || request.headers.get("x-real-ip") || "unknown"}`;
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) { buckets.set(key, { count: 1, resetAt: now + windowMs }); return { allowed: true, retryAfter: windowMs }; }
  current.count += 1;
  return { allowed: current.count <= limit, retryAfter: Math.max(0, current.resetAt - now) };
}

export function tooManyRequests(retryAfter: number) { return Response.json({ error: "Too many requests. Please try again shortly." }, { status: 429, headers: { "retry-after": String(Math.ceil(retryAfter / 1000)) } }); }
export { MAX_IMPORT_BYTES };
