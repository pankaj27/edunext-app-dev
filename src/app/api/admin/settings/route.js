import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { sql } from "@vercel/postgres";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hasPostgresConfig() {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL);
}

function localSettingsPath() {
  return path.join(process.cwd(), ".localdb", "website_settings.json");
}

async function readLocalSettings() {
  try {
    const json = await fs.readFile(localSettingsPath(), "utf8");
    const data = JSON.parse(json);
    return typeof data === "object" && data ? data : {};
  } catch {
    return {};
  }
}

async function writeLocalSettings(data) {
  const filePath = localSettingsPath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

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

function isAuthed(token) {
  if (!token || typeof token !== "string") return false;
  const [payloadBase64Url, signature] = token.split(".");
  if (!payloadBase64Url || !signature) return false;

  const expected = sign(payloadBase64Url, getSecret());
  if (!timingSafeEqual(signature, expected)) return false;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadBase64Url, "base64url").toString("utf8"));
  } catch {
    return false;
  }

  const exp = typeof payload?.exp === "number" ? payload.exp : 0;
  const email = typeof payload?.email === "string" ? payload.email : "";
  const nowSeconds = Math.floor(Date.now() / 1000);
  return Boolean(email) && exp > nowSeconds;
}

async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (isAuthed(token)) return null;
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

async function ensureTable() {
  await sql`
      CREATE TABLE IF NOT EXISTS website_settings (
        id integer PRIMARY KEY,
        logo_data_url text,
        favicon_data_url text,
        website_title text,
        address text,
        email text,
        contact_no text,
        updated_at timestamptz NOT NULL DEFAULT now()
      );
    `;
}

function normalizeText(value) {
  const v = typeof value === "string" ? value.trim() : "";
  return v.length ? v : null;
}

function normalizeDataUrl(value) {
  const v = typeof value === "string" ? value.trim() : "";
  if (!v) return null;
  if (!v.startsWith("data:")) return null;
  return v;
}

export async function GET(request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    if (!hasPostgresConfig()) {
      const local = await readLocalSettings();
      return NextResponse.json({
        ok: true,
        data: {
          logoDataUrl: typeof local.logoDataUrl === "string" ? local.logoDataUrl : "",
          faviconDataUrl: typeof local.faviconDataUrl === "string" ? local.faviconDataUrl : "",
          websiteTitle: typeof local.websiteTitle === "string" ? local.websiteTitle : "",
          address: typeof local.address === "string" ? local.address : "",
          email: typeof local.email === "string" ? local.email : "",
          contactNo: typeof local.contactNo === "string" ? local.contactNo : "",
        },
      });
    }

    await ensureTable();

    const { rows } = await sql`
      SELECT
        logo_data_url,
        favicon_data_url,
        website_title,
        address,
        email,
        contact_no
      FROM website_settings
      WHERE id = 1
    `;

    const row = rows?.[0] || null;

    return NextResponse.json({
      ok: true,
      data: {
        logoDataUrl: row?.logo_data_url ?? "",
        faviconDataUrl: row?.favicon_data_url ?? "",
        websiteTitle: row?.website_title ?? "",
        address: row?.address ?? "",
        email: row?.email ?? "",
        contactNo: row?.contact_no ?? "",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PUT(request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json().catch(() => null);
    const logoDataUrl = normalizeDataUrl(body?.logoDataUrl);
    const faviconDataUrl = normalizeDataUrl(body?.faviconDataUrl);
    const websiteTitle = normalizeText(body?.websiteTitle);
    const address = normalizeText(body?.address);
    const email = normalizeText(body?.email);
    const contactNo = normalizeText(body?.contactNo);

    if (!hasPostgresConfig()) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
      }
      await writeLocalSettings({
        logoDataUrl: logoDataUrl || "",
        faviconDataUrl: faviconDataUrl || "",
        websiteTitle: websiteTitle || "",
        address: address || "",
        email: email || "",
        contactNo: contactNo || "",
      });
      return NextResponse.json({ ok: true });
    }

    await ensureTable();
    await sql`
        INSERT INTO website_settings (
          id,
          logo_data_url,
          favicon_data_url,
          website_title,
          address,
          email,
          contact_no,
          updated_at
        )
        VALUES (
          1,
          ${logoDataUrl},
          ${faviconDataUrl},
          ${websiteTitle},
          ${address},
          ${email},
          ${contactNo},
          now()
        )
        ON CONFLICT (id)
        DO UPDATE SET
          logo_data_url = EXCLUDED.logo_data_url,
          favicon_data_url = EXCLUDED.favicon_data_url,
          website_title = EXCLUDED.website_title,
          address = EXCLUDED.address,
          email = EXCLUDED.email,
          contact_no = EXCLUDED.contact_no,
          updated_at = now()
      `;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save settings" }, { status: 500 });
  }
}
