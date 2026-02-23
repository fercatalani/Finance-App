import crypto from "crypto";
import argon2 from "argon2";
import prisma from "../store/prismaClient.js";

function getSessionTokenFromRequest(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const cookie = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("session="));
  if (!cookie) return null;
  return cookie.split("=")[1] || null;
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function createSession(userId) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 dias

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return { rawToken, expiresAt };
}

function setSessionCookie(res, rawToken, expiresAt) {
  const maxAgeSeconds = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
  const cookieParts = [
    `session=${rawToken}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${maxAgeSeconds}`,
    "SameSite=Lax",
  ];

  // Em produção, adicionar "Secure" quando estiver em HTTPS
  res.setHeader("Set-Cookie", cookieParts.join("; "));
}

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body || {};

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res
      .status(409)
      .json({ success: false, message: "Email already registered." });
  }

  const passwordHash = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
    },
  });

  const { rawToken, expiresAt } = await createSession(user.id);
  setSessionCookie(res, rawToken, expiresAt);

  return res.status(201).json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email or password." });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials." });
  }

  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials." });
  }

  const { rawToken, expiresAt } = await createSession(user.id);
  setSessionCookie(res, rawToken, expiresAt);

  return res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
};

export const getSession = async (req, res) => {
  const rawToken = getSessionTokenFromRequest(req);
  if (!rawToken) {
    return res.status(401).json({ user: null });
  }

  const tokenHash = hashToken(rawToken);
  const now = new Date();

  const stored = await prisma.refreshToken.findFirst({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: {
        gt: now,
      },
    },
    include: {
      user: true,
    },
  });

  if (!stored || !stored.user) {
    return res.status(401).json({ user: null });
  }

  const { user } = stored;

  return res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
};

export const signOut = async (req, res) => {
  const rawToken = getSessionTokenFromRequest(req);
  if (rawToken) {
    const tokenHash = hashToken(rawToken);
    await prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  res.setHeader(
    "Set-Cookie",
    "session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
  );
  return res.json({ success: true });
};

// Mantém endpoint de forgot-password como stub por enquanto
export const forgotPassword = async (req, res) => {
  const { email } = req.body || {};
  return res.json({
    success: true,
    message: "If this email exists, a reset link/code will be sent.",
    email,
  });
};
