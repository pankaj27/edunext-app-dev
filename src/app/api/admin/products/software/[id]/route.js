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

function localDbPath() {
  return path.join(process.cwd(), ".localdb", "software_products.json");
}

async function readLocalProducts() {
  try {
    const json = await fs.readFile(localDbPath(), "utf8");
    const data = JSON.parse(json);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeLocalProducts(products) {
  const filePath = localDbPath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf8");
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
    CREATE TABLE IF NOT EXISTS software_products (
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

function hasOwn(obj, key) {
  return Boolean(obj) && Object.prototype.hasOwnProperty.call(obj, key);
}

function parseImagesFromUnknown(value) {
  if (Array.isArray(value)) return normalizeImages(value);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return normalizeImages(parsed);
    } catch {}
  }
  return [];
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

export async function PUT(request, { params }) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const id = Number(params?.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid product id" }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => null);
    const incoming = body && typeof body === "object" ? body : {};

    if (!hasPostgresConfig()) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
      }
      const products = await readLocalProducts();
      const idx = products.findIndex((p) => Number(p?.id) === id);
      if (idx === -1) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

      const existing = products[idx] && typeof products[idx] === "object" ? products[idx] : {};
      const name = hasOwn(incoming, "name") ? normalizeText(incoming.name) : normalizeText(existing.name);
      if (!name) return NextResponse.json({ ok: false, error: "Product name is required" }, { status: 400 });

      const shortDesc = hasOwn(incoming, "shortDesc") ? normalizeText(incoming.shortDesc) : normalizeText(existing.shortDesc);
      const longDesc = hasOwn(incoming, "longDesc") ? normalizeText(incoming.longDesc) : normalizeText(existing.longDesc);
      const incomingThumb = hasOwn(incoming, "thumbnailDataUrl")
        ? incoming.thumbnailDataUrl
        : hasOwn(incoming, "thumbnail")
          ? incoming.thumbnail
          : undefined;
      const thumbnailDataUrl =
        incomingThumb === undefined
          ? normalizeDataUrl(existing.thumbnailDataUrl || existing.thumbnail_data_url || existing.thumbnail)
          : normalizeDataUrl(incomingThumb);
      const images = hasOwn(incoming, "images") ? parseImagesFromUnknown(incoming.images) : parseImagesFromUnknown(existing.images || existing.images_json);
      const price = hasOwn(incoming, "price") ? normalizeNumber(incoming.price) : normalizeNumber(existing.price);
      const total = hasOwn(incoming, "total") ? normalizeNumber(incoming.total) : normalizeNumber(existing.total);
      const stock = hasOwn(incoming, "stock") ? normalizeInt(incoming.stock) : normalizeInt(existing.stock);
      const status = hasOwn(incoming, "status") ? normalizeStatus(incoming.status) : normalizeStatus(existing.status);

      const now = new Date().toISOString();
      const updated = {
        ...products[idx],
        name,
        shortDesc,
        longDesc,
        thumbnailDataUrl,
        images,
        price,
        total,
        stock,
        status,
        updatedAt: now,
      };
      products[idx] = updated;
      await writeLocalProducts(products);
      return NextResponse.json({ ok: true, data: updated });
    }

    await ensureTable();
    const { rows: existingRows } = await sql`
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
      FROM software_products
      WHERE id = ${id}
      LIMIT 1
    `;
    if (!existingRows?.length) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    const existing = mapRow(existingRows[0]);
    const name = hasOwn(incoming, "name") ? normalizeText(incoming.name) : normalizeText(existing.name);
    if (!name) return NextResponse.json({ ok: false, error: "Product name is required" }, { status: 400 });

    const shortDesc = hasOwn(incoming, "shortDesc") ? normalizeText(incoming.shortDesc) : normalizeText(existing.shortDesc);
    const longDesc = hasOwn(incoming, "longDesc") ? normalizeText(incoming.longDesc) : normalizeText(existing.longDesc);
    const incomingThumb = hasOwn(incoming, "thumbnailDataUrl")
      ? incoming.thumbnailDataUrl
      : hasOwn(incoming, "thumbnail")
        ? incoming.thumbnail
        : undefined;
    const thumbnailDataUrl =
      incomingThumb === undefined ? normalizeDataUrl(existing.thumbnailDataUrl) : normalizeDataUrl(incomingThumb);
    const images = hasOwn(incoming, "images") ? parseImagesFromUnknown(incoming.images) : parseImagesFromUnknown(existing.images);
    const price = hasOwn(incoming, "price") ? normalizeNumber(incoming.price) : normalizeNumber(existing.price);
    const total = hasOwn(incoming, "total") ? normalizeNumber(incoming.total) : normalizeNumber(existing.total);
    const stock = hasOwn(incoming, "stock") ? normalizeInt(incoming.stock) : normalizeInt(existing.stock);
    const status = hasOwn(incoming, "status") ? normalizeStatus(incoming.status) : normalizeStatus(existing.status);

    const imagesJson = JSON.stringify(images);
    const { rows } = await sql`
      UPDATE software_products
      SET
        name = ${name},
        short_desc = ${shortDesc || null},
        long_desc = ${longDesc || null},
        thumbnail_data_url = ${thumbnailDataUrl || null},
        images_json = ${imagesJson},
        price = ${price},
        total = ${total},
        stock = ${stock},
        status = ${status},
        updated_at = now()
      WHERE id = ${id}
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

    return NextResponse.json({ ok: true, data: mapRow(rows[0]) });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const id = Number(params?.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid product id" }, { status: 400 });
  }

  try {
    if (!hasPostgresConfig()) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
      }
      const products = await readLocalProducts();
      const next = products.filter((p) => Number(p?.id) !== id);
      if (next.length === products.length) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
      await writeLocalProducts(next);
      return NextResponse.json({ ok: true });
    }

    await ensureTable();
    const { rowCount } = await sql`DELETE FROM software_products WHERE id = ${id}`;
    if (!rowCount) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to delete product" }, { status: 500 });
  }
}

