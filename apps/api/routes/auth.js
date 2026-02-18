import express from "express";

const router = express.Router();

// POST /api/auth/signin
router.post("/signin", express.json(), (req, res) => {
  const { email, password } = req.body || {};

  // Log incoming request body for easier dev debugging
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[dev] /api/auth/signin body:", req.body);
  }

  const isDevValid = process.env.NODE_ENV === "development" && email === "test@example.com";
  const isValid = email === "test@example.com" && password === "password123";

  if (isValid || isDevValid) {
    res.setHeader(
      "Set-Cookie",
      "session=fake-session; HttpOnly; Path=/; Max-Age=3600",
    );
    return res.json({
      success: true,
      token: "fake-jwt-token",
      user: { id: "1", firstName: "Jane", lastName: "Doe", email },
    });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials." });
});

// POST /api/auth/signup
router.post("/signup", express.json(), (req, res) => {
  const { firstName, lastName, email, password } = req.body || {};
  return res.json({
    success: true,
    user: { id: "2", firstName, lastName, email, password },
  });
});

// POST /api/auth/forgot-password
router.post("/forgot-password", express.json(), (req, res) => {
  const { email } = req.body || {};
  return res.json({
    success: true,
    message: "Reset code sent to your email.",
    resetCode: "123456",
  });
});

// GET /api/auth/session
router.get("/session", (req, res) => {
  // In dev we return a mock user — you can later check cookies
  const mockUser = {
    id: "1",
    firstName: "Jane",
    lastName: "Doe",
    email: "test@example.com",
  };
  return res.json({ user: mockUser });
});

// POST /api/auth/signout
router.post("/signout", (req, res) => {
  res.setHeader("Set-Cookie", "session=; HttpOnly; Path=/; Max-Age=0");
  return res.json({ success: true });
});

export default router;
