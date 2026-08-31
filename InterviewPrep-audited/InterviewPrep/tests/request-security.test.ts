import { describe, it, expect } from "vitest";
import { rateLimit, requestSizeLimit, tooManyRequests, MAX_IMPORT_BYTES } from "@/lib/request-security";

function makeRequest(headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/test", { headers });
}

describe("requestSizeLimit", () => {
  it("allows a request with no content-length header", () => {
    expect(requestSizeLimit(makeRequest())).toBe(true);
  });

  it("allows a request under the default 128KB limit", () => {
    expect(requestSizeLimit(makeRequest({ "content-length": "1000" }))).toBe(true);
  });

  it("rejects a request over the default 128KB limit", () => {
    expect(requestSizeLimit(makeRequest({ "content-length": String(129 * 1024) }))).toBe(false);
  });

  it("allows exactly the limit", () => {
    expect(requestSizeLimit(makeRequest({ "content-length": String(128 * 1024) }))).toBe(true);
  });

  it("respects a custom max size", () => {
    expect(requestSizeLimit(makeRequest({ "content-length": "1000" }), 500)).toBe(false);
    expect(requestSizeLimit(makeRequest({ "content-length": "1000" }), 2000)).toBe(true);
  });

  it("exposes the 5MB import file limit constant", () => {
    expect(MAX_IMPORT_BYTES).toBe(5 * 1024 * 1024);
  });
});

describe("rateLimit", () => {
  it("allows the first request in a window", () => {
    const result = rateLimit(makeRequest({ "x-forwarded-for": "1.1.1.1" }), "test-first", 5, 60_000);
    expect(result.allowed).toBe(true);
  });

  it("allows requests up to the limit and blocks the next one", () => {
    const req = makeRequest({ "x-forwarded-for": "2.2.2.2" });
    const namespace = "test-limit";
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(req, namespace, 3, 60_000).allowed).toBe(true);
    }
    expect(rateLimit(req, namespace, 3, 60_000).allowed).toBe(false);
  });

  it("tracks separate IPs independently", () => {
    const namespace = "test-ip-isolation";
    const reqA = makeRequest({ "x-forwarded-for": "3.3.3.3" });
    const reqB = makeRequest({ "x-forwarded-for": "4.4.4.4" });
    for (let i = 0; i < 2; i++) rateLimit(reqA, namespace, 2, 60_000);
    expect(rateLimit(reqA, namespace, 2, 60_000).allowed).toBe(false);
    expect(rateLimit(reqB, namespace, 2, 60_000).allowed).toBe(true);
  });

  it("tracks separate namespaces independently for the same IP", () => {
    const req = makeRequest({ "x-forwarded-for": "5.5.5.5" });
    for (let i = 0; i < 2; i++) rateLimit(req, "namespace-a", 2, 60_000);
    expect(rateLimit(req, "namespace-a", 2, 60_000).allowed).toBe(false);
    expect(rateLimit(req, "namespace-b", 2, 60_000).allowed).toBe(true);
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const req = makeRequest({ "x-real-ip": "6.6.6.6" });
    expect(rateLimit(req, "test-real-ip", 1, 60_000).allowed).toBe(true);
    expect(rateLimit(req, "test-real-ip", 1, 60_000).allowed).toBe(false);
  });

  it("takes the first IP when x-forwarded-for has a chain", () => {
    const namespace = "test-chain";
    const reqChain = makeRequest({ "x-forwarded-for": "7.7.7.7, 8.8.8.8" });
    const reqDirect = makeRequest({ "x-forwarded-for": "7.7.7.7" });
    rateLimit(reqChain, namespace, 1, 60_000);
    // Same leading IP should share the same bucket even with a different chain tail.
    expect(rateLimit(reqDirect, namespace, 1, 60_000).allowed).toBe(false);
  });

  it("treats requests with no identifying header as a shared 'unknown' bucket", () => {
    const namespace = "test-unknown";
    expect(rateLimit(makeRequest(), namespace, 1, 60_000).allowed).toBe(true);
    expect(rateLimit(makeRequest(), namespace, 1, 60_000).allowed).toBe(false);
  });

  it("resets the count after the window elapses", async () => {
    const req = makeRequest({ "x-forwarded-for": "9.9.9.9" });
    const namespace = "test-window-reset";
    expect(rateLimit(req, namespace, 1, 20).allowed).toBe(true);
    expect(rateLimit(req, namespace, 1, 20).allowed).toBe(false);
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(rateLimit(req, namespace, 1, 20).allowed).toBe(true);
  });
});

describe("tooManyRequests", () => {
  it("returns a 429 response with a retry-after header in seconds", async () => {
    const response = tooManyRequests(5000);
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("5");
    const body = await response.json();
    expect(body.error).toMatch(/too many requests/i);
  });

  it("rounds retry-after up to the nearest second", () => {
    const response = tooManyRequests(500);
    expect(response.headers.get("retry-after")).toBe("1");
  });
});
