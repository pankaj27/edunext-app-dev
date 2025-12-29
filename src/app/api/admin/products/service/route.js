import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hasPostgresConfig() {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL);
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
    CREATE TABLE IF NOT EXISTS service_products (
      id serial PRIMARY KEY,
      name text NOT NULL,
      short_desc text,
      long_desc text,
      thumbnail_data_url text,
      images_json text,
      price numeric(12,2) NOT NULL DEFAULT 0,
      total numeric(12,2) NOT NULL DEFAULT 0,
      stock integer NOT NULL DEFAULT 0,
      status text NOT NULL DEFAULT 'active',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `;
}

function normalizeText(value) {
  const v = typeof value === "string" ? value.trim() : "";
  return v.length ? v : "";
}

function normalizeStatus(value) {
  return value === "inactive" ? "inactive" : "active";
}

function normalizeNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length) {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

function normalizeInt(value) {
  const n = normalizeNumber(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.trunc(n));
}

function normalizeDataUrl(value) {
  const v = typeof value === "string" ? value.trim() : "";
  if (!v) return "";
  if (!v.startsWith("data:")) return "";
  return v;
}

function normalizeImages(value) {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeDataUrl).filter(Boolean);
}

function mapRow(row) {
  let images = [];
  try {
    const parsed = JSON.parse(row?.images_json || "[]");
    images = Array.isArray(parsed) ? parsed : [];
  } catch {
    images = [];
  }
  return {
    id: row.id,
    name: row.name,
    shortDesc: row.short_desc || "",
    longDesc: row.long_desc || "",
    thumbnailDataUrl: row.thumbnail_data_url || "",
    images,
    price: Number(row.price || 0),
    total: Number(row.total || 0),
    stock: Number(row.stock || 0),
    status: row.status === "inactive" ? "inactive" : "active",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    if (!hasPostgresConfig()) {
      return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
    }

    await ensureTable();
    const { rows } = await sql`
      SELECT
        id,
        name,
        short_desc,
        long_desc,
        thumbnail_data_url,
        images_json,
        price,
        total,
        stock,
        status,
        created_at,
        updated_at
      FROM service_products
      ORDER BY id DESC
    `;
    return NextResponse.json({ ok: true, data: rows.map(mapRow) });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    if (!hasPostgresConfig()) {
      return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
    }

    const body = await request.json().catch(() => null);
    const name = normalizeText(body?.name);
    if (!name) return NextResponse.json({ ok: false, error: "Product name is required" }, { status: 400 });

    const shortDesc = normalizeText(body?.shortDesc);
    const longDesc = normalizeText(body?.longDesc);
    const thumbnailDataUrl = normalizeDataUrl(body?.thumbnailDataUrl);
    const images = normalizeImages(body?.images);
    const price = normalizeNumber(body?.price);
    const total = normalizeNumber(body?.total);
    const stock = normalizeInt(body?.stock);
    const status = normalizeStatus(body?.status);

    await ensureTable();
    const imagesJson = JSON.stringify(images);
    const { rows } = await sql`
      INSERT INTO service_products (
        name,
        short_desc,
        long_desc,
        thumbnail_data_url,
        images_json,
        price,
        total,
        stock,
        status,
        updated_at
      )
      VALUES (
        ${name},
        ${shortDesc || null},
        ${longDesc || null},
        ${thumbnailDataUrl || null},
        ${imagesJson},
        ${price},
        ${total},
        ${stock},
        ${status},
        now()
      )
      RETURNING
        id,
        name,
        short_desc,
        long_desc,
        thumbnail_data_url,
        images_json,
        price,
        total,
        stock,
        status,
        created_at,
        updated_at
    `;

    return NextResponse.json({ ok: true, data: mapRow(rows[0]) }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to add product" }, { status: 500 });
  }
}
