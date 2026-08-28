import { describe, it, expect, vi, beforeEach } from "vitest";

const findUnique = vi.fn();
vi.mock("@/lib/prisma", () => ({ prisma: { user: { findUnique } } }));

const compare = vi.fn();
vi.mock("bcryptjs", () => ({ compare }));

// next-auth / adapter internals aren't relevant to authorize() logic and pull
// in a lot of unrelated machinery, so they're stubbed out.
vi.mock("@next-auth/prisma-adapter", () => ({ PrismaAdapter: () => ({}) }));
vi.mock("next-auth/providers/google", () => ({ default: (config: unknown) => ({ id: "google", config }) }));
vi.mock("next-auth/providers/credentials", () => ({
  default: (config: { authorize: (credentials: unknown) => unknown }) => ({ id: "credentials", authorize: config.authorize }),
}));

const { authOptions } = await import("@/lib/auth");

// The credentials provider is the second entry in authOptions.providers.
const credentialsProvider = authOptions.providers[1] as unknown as { authorize: (credentials: { email?: string; password?: string } | undefined) => Promise<unknown> };

beforeEach(() => {
  findUnique.mockReset();
  compare.mockReset();
});

describe("credentials authorize()", () => {
  it("rejects when email is missing", async () => {
    const result = await credentialsProvider.authorize({ password: "password123" });
    expect(result).toBeNull();
    expect(findUnique).not.toHaveBeenCalled();
  });

  it("rejects when password is missing", async () => {
    const result = await credentialsProvider.authorize({ email: "user@example.com" });
    expect(result).toBeNull();
  });

  it("rejects when the user does not exist", async () => {
    findUnique.mockResolvedValue(null);
    const result = await credentialsProvider.authorize({ email: "nobody@example.com", password: "password123" });
    expect(result).toBeNull();
  });

  it("rejects when the account is disabled, even with the correct password", async () => {
    findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", passwordHash: "hash", isDisabled: true });
    compare.mockResolvedValue(true);
    const result = await credentialsProvider.authorize({ email: "user@example.com", password: "correct-password" });
    expect(result).toBeNull();
  });

  it("rejects a Google-only account with no password set", async () => {
    findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", passwordHash: null, isDisabled: false });
    const result = await credentialsProvider.authorize({ email: "user@example.com", password: "anything" });
    expect(result).toBeNull();
    expect(compare).not.toHaveBeenCalled();
  });

  it("rejects an incorrect password", async () => {
    findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", passwordHash: "hash", isDisabled: false });
    compare.mockResolvedValue(false);
    const result = await credentialsProvider.authorize({ email: "user@example.com", password: "wrong-password" });
    expect(result).toBeNull();
  });

  it("accepts a correct email and password for an active account", async () => {
    findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", name: "Jane", role: "USER", passwordHash: "hash", isDisabled: false });
    compare.mockResolvedValue(true);
    const result = await credentialsProvider.authorize({ email: "user@example.com", password: "correct-password" });
    expect(result).toEqual({ id: "u1", email: "user@example.com", name: "Jane", role: "USER" });
  });

  it("normalizes email casing and whitespace before lookup", async () => {
    findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", passwordHash: "hash", isDisabled: false });
    compare.mockResolvedValue(true);
    await credentialsProvider.authorize({ email: "  USER@Example.com  ", password: "correct-password" });
    expect(findUnique).toHaveBeenCalledWith({ where: { email: "user@example.com" } });
  });
});
