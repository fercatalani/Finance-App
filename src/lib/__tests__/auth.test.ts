import { signIn, signUp, forgotPassword } from "../auth";

const originalFetch = global.fetch;

describe("auth lib", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("signIn returns null on non-OK response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const res = await signIn({ email: "test@example.com", password: "pass" });

    expect(res).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/signin",
      expect.any(Object),
    );
  });

  it("signUp returns parsed JSON on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const res = await signUp({
      firstName: "Jane",
      lastName: "Doe",
      email: "test@example.com",
      password: "password123",
    });

    expect(res).toEqual({ success: true });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/signup",
      expect.any(Object),
    );
  });

  it("forgotPassword calls correct endpoint", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const res = await forgotPassword({ email: "test@example.com" });

    expect(res).toEqual({ success: true });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/forgot-password",
      expect.any(Object),
    );
  });
});
