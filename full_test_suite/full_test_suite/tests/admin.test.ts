import { describe, it, expect, vi, beforeEach } from "vitest";

const getServerSession = vi.fn();
vi.mock("next-auth", () => ({ getServerSession }));

const redirect = vi.fn((url: string) => {
  throw new Error(`REDIRECT:${url}`);
});
vi.mock("next/navigation", () => ({ redirect }));

vi.mock("@/lib/auth", () => ({ authOptions: {} }));

const { requireAdmin, requireAdminApi } = await import("@/lib/admin");

beforeEach(() => {
  getServerSession.mockReset();
  redirect.mockClear();
});

describe("requireAdmin (page guard)", () => {
  it("redirects to login when there is no session", async () => {
    getServerSession.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/login?callbackUrl=/admin");
  });

  it("redirects to home when the user is not an admin", async () => {
    getServerSession.mockResolvedValue({ user: { id: "u1", role: "USER" } });
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/");
  });

  it("returns the session when the user is an admin", async () => {
    const session = { user: { id: "u1", role: "ADMIN" } };
    getServerSession.mockResolvedValue(session);
    await expect(requireAdmin()).resolves.toBe(session);
  });
});

describe("requireAdminApi (API guard)", () => {
  it("returns a 401 when there is no session", async () => {
    getServerSession.mockResolvedValue(null);
    const result = await requireAdminApi();
    expect(result.session).toBeNull();
    expect(result.response?.status).toBe(401);
  });

  it("returns a 403 when the user is not an admin", async () => {
    getServerSession.mockResolvedValue({ user: { id: "u1", role: "USER" } });
    const result = await requireAdminApi();
    expect(result.session).toBeNull();
    expect(result.response?.status).toBe(403);
  });

  it("returns the session with no response when the user is an admin", async () => {
    const session = { user: { id: "u1", role: "ADMIN" } };
    getServerSession.mockResolvedValue(session);
    const result = await requireAdminApi();
    expect(result.session).toBe(session);
    expect(result.response).toBeNull();
  });
});
