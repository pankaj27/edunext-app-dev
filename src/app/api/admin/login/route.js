import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

function getSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET || "dev-admin-auth-secret";
  return secret;
}

function sign(payloadBase64Url, secret) {
  return crypto.createHmac("sha256", secret).update(payloadBase64Url).digest("base64url");
}

function createSessionToken({ email, expiresAtSeconds }) {
  const payloadBase64Url = Buffer.from(
    JSON.stringify({ email, exp: expiresAtSeconds }),
    "utf8",
  ).toString("base64url");

  const secret = getSecret();
  const signature = sign(payloadBase64Url, secret);
  return `${payloadBase64Url}.${signature}`;
}

export async function POST(request) {
  const body = await request.json().catch(() => null);

  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const allowedEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const allowedPassword = process.env.ADMIN_PASSWORD || "password123";

  if (email !== allowedEmail || password !== allowedPassword) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const expiresAtSeconds = nowSeconds + 60 * 60 * 8;
  const token = createSessionToken({ email, expiresAtSeconds });

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "admin_session",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAtSeconds * 1000),
  });

  return response;
}

