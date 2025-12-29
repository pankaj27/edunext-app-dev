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

function localOrdersPath() {
  return path.join(process.cwd(), ".localdb", "orders.json");
}

async function readLocalOrders() {
  try {
    const json = await fs.readFile(localOrdersPath(), "utf8");
    const data = JSON.parse(json);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function ensureOrdersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id serial PRIMARY KEY,
      product_type text NOT NULL,
      product_id integer NOT NULL,
      product_name text NOT NULL,
      product_thumbnail_data_url text,
      unit_price numeric(12,2) NOT NULL DEFAULT 0,
      quantity integer NOT NULL DEFAULT 1,
      total_price numeric(12,2) NOT NULL DEFAULT 0,
      first_name text,
      last_name text,
      email text,
      contact_no text,
      delivery_location text,
      status text NOT NULL DEFAULT 'pending',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `;
}

function normalizeStatus(value) {
  const v = typeof value === "string" ? value.trim().toLowerCase() : "";
  return v || "pending";
}

function mapLocalOrder(o) {
  const obj = o && typeof o === "object" ? o : {};
  return {
    id: Number(obj.id) || 0,
    productType: typeof obj.productType === "string" ? obj.productType : "",
    productId: Number(obj.productId) || 0,
    productName: typeof obj.productName === "string" ? obj.productName : "",
    productThumbnailDataUrl: typeof obj.productThumbnailDataUrl === "string" ? obj.productThumbnailDataUrl : "",
    unitPrice: Number(obj.unitPrice || 0),
    quantity: Number(obj.quantity || 0),
    totalPrice: Number(obj.totalPrice || 0),
    firstName: typeof obj.firstName === "string" ? obj.firstName : "",
    lastName: typeof obj.lastName === "string" ? obj.lastName : "",
    email: typeof obj.email === "string" ? obj.email : "",
    contactNo: typeof obj.contactNo === "string" ? obj.contactNo : "",
    deliveryLocation: typeof obj.deliveryLocation === "string" ? obj.deliveryLocation : "",
    status: normalizeStatus(obj.status),
    createdAt: typeof obj.createdAt === "string" ? obj.createdAt : typeof obj.created_at === "string" ? obj.created_at : "",
    updatedAt: typeof obj.updatedAt === "string" ? obj.updatedAt : typeof obj.updated_at === "string" ? obj.updated_at : "",
  };
}

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    if (!hasPostgresConfig()) {
      const local = await readLocalOrders();
      return NextResponse.json({ ok: true, data: local.map(mapLocalOrder).filter((o) => o.id > 0) });
    }

    await ensureOrdersTable();
    const { rows } = await sql`
      SELECT
        id,
        product_type,
        product_id,
        product_name,
        product_thumbnail_data_url,
        unit_price,
        quantity,
        total_price,
        first_name,
        last_name,
        email,
        contact_no,
        delivery_location,
        status,
        created_at,
        updated_at
      FROM orders
      ORDER BY id DESC
    `;

    const data = (rows || []).map((r) => ({
      id: Number(r.id) || 0,
      productType: r.product_type,
      productId: Number(r.product_id) || 0,
      productName: r.product_name,
      productThumbnailDataUrl: r.product_thumbnail_data_url ?? "",
      unitPrice: Number(r.unit_price || 0),
      quantity: Number(r.quantity || 0),
      totalPrice: Number(r.total_price || 0),
      firstName: r.first_name ?? "",
      lastName: r.last_name ?? "",
      email: r.email ?? "",
      contactNo: r.contact_no ?? "",
      deliveryLocation: r.delivery_location ?? "",
      status: r.status ?? "pending",
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load orders" }, { status: 500 });
  }
}

