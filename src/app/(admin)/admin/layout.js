import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import AdminShell from "./AdminShell";

export const dynamic = "force-dynamic";

function timingSafeEqual(a, b) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function getSecret() {
  return process.env.ADMIN_AUTH_SECRET || "dev-admin-auth-secret";
}

function sign(payloadBase64Url, secret) {
  return crypto.createHmac("sha256", secret).update(payloadBase64Url).digest("base64url");
}

function readSessionEmail(token) {
  if (!token || typeof token !== "string") return null;
  const [payloadBase64Url, signature] = token.split(".");
  if (!payloadBase64Url || !signature) return null;

  const expected = sign(payloadBase64Url, getSecret());
  if (!timingSafeEqual(signature, expected)) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadBase64Url, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  const exp = typeof payload?.exp === "number" ? payload.exp : 0;
  const email = typeof payload?.email === "string" ? payload.email : null;
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (!email || exp <= nowSeconds) return null;

  return email;
}

export default async function layout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const email = readSessionEmail(token);
  if (!email) redirect("/admin/login?redirect=/admin");

  return <AdminShell email={email}>{children}</AdminShell>;
}
