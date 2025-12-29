import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hasPostgresConfig() {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL);
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value) {
  const v = normalizeText(value).toLowerCase();
  return v;
}

function normalizeInt(value, { min = 0 } = {}) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.trunc(n));
}

function normalizeProductType(value) {
  const v = normalizeText(value).toLowerCase();
  if (v === "hardware" || v === "software" || v === "service") return v;
  return "";
}

function normalizeDataUrl(value) {
  const v = typeof value === "string" ? value.trim() : "";
  if (!v) return "";
  if (!v.startsWith("data:")) return "";
  return v;
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

async function writeLocalOrders(orders) {
  const dir = path.dirname(localOrdersPath());
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(localOrdersPath(), JSON.stringify(orders, null, 2), "utf8");
}

function localProductsPath(type) {
  return path.join(process.cwd(), ".localdb", `${type}_products.json`);
}

async function readLocalProducts(type) {
  try {
    const json = await fs.readFile(localProductsPath(type), "utf8");
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

async function ensureProductTable(type) {
  const table =
    type === "hardware" ? "hardware_products" : type === "software" ? "software_products" : type === "service" ? "service_products" : "";
  if (!table) return;
  await sql`
    CREATE TABLE IF NOT EXISTS ${sql.identifier([table])} (
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

async function loadProductFromDb(type, productId) {
  const table =
    type === "hardware" ? "hardware_products" : type === "software" ? "software_products" : type === "service" ? "service_products" : "";
  if (!table) return null;
  await ensureProductTable(type);
  const { rows } = await sql`
    SELECT id, name, thumbnail_data_url, price
    FROM ${sql.identifier([table])}
    WHERE id = ${productId}
    LIMIT 1
  `;
  if (!rows?.length) return null;
  return {
    id: Number(rows[0].id) || 0,
    name: typeof rows[0].name === "string" ? rows[0].name : "",
    thumbnailDataUrl: typeof rows[0].thumbnail_data_url === "string" ? rows[0].thumbnail_data_url : "",
    price: Number(rows[0].price || 0),
  };
}

async function loadProductFromLocal(type, productId) {
  const list = await readLocalProducts(type);
  const found = list.find((p) => Number(p?.id) === productId);
  if (!found || typeof found !== "object") return null;
  const thumb = normalizeDataUrl(found.thumbnailDataUrl || found.thumbnail_data_url || found.thumbnail);
  const price = Number(found.price || 0);
  return {
    id: Number(found.id) || 0,
    name: normalizeText(found.name),
    thumbnailDataUrl: thumb,
    price: Number.isFinite(price) ? price : 0,
  };
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const productType = normalizeProductType(body?.productType);
    const productId = normalizeInt(body?.productId, { min: 1 });
    const quantity = normalizeInt(body?.quantity, { min: 1 });

    const firstName = normalizeText(body?.firstName);
    const lastName = normalizeText(body?.lastName);
    const email = normalizeEmail(body?.email);
    const contactNo = normalizeText(body?.contactNo);
    const deliveryLocation = normalizeText(body?.deliveryLocation);

    if (!productType) return NextResponse.json({ ok: false, error: "Invalid product type" }, { status: 400 });
    if (!productId) return NextResponse.json({ ok: false, error: "Invalid product id" }, { status: 400 });
    if (!firstName) return NextResponse.json({ ok: false, error: "First name is required" }, { status: 400 });
    if (!lastName) return NextResponse.json({ ok: false, error: "Last name is required" }, { status: 400 });
    if (!email) return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    if (!contactNo) return NextResponse.json({ ok: false, error: "Contact no is required" }, { status: 400 });
    if (!deliveryLocation) return NextResponse.json({ ok: false, error: "Delivery location is required" }, { status: 400 });

    const product = hasPostgresConfig()
      ? await loadProductFromDb(productType, productId)
      : await loadProductFromLocal(productType, productId);
    if (!product) return NextResponse.json({ ok: false, error: "Product not found" }, { status: 404 });

    const unitPrice = Number.isFinite(Number(product.price)) ? Number(product.price) : 0;
    const totalPrice = Number((unitPrice * quantity).toFixed(2));
    const productName = normalizeText(product.name);
    const productThumb = normalizeDataUrl(product.thumbnailDataUrl);

    if (!hasPostgresConfig()) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
      }
      const orders = await readLocalOrders();
      const now = new Date().toISOString();
      const nextId = orders.reduce((m, o) => Math.max(m, Number(o?.id) || 0), 0) + 1;
      const order = {
        id: nextId,
        productType,
        productId,
        productName,
        productThumbnailDataUrl: productThumb,
        unitPrice,
        quantity,
        totalPrice,
        firstName,
        lastName,
        email,
        contactNo,
        deliveryLocation,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };
      orders.unshift(order);
      await writeLocalOrders(orders);
      return NextResponse.json({ ok: true, data: order }, { status: 201 });
    }

    await ensureOrdersTable();
    const { rows } = await sql`
      INSERT INTO orders (
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
        updated_at
      )
      VALUES (
        ${productType},
        ${productId},
        ${productName},
        ${productThumb || null},
        ${unitPrice},
        ${quantity},
        ${totalPrice},
        ${firstName},
        ${lastName},
        ${email},
        ${contactNo},
        ${deliveryLocation},
        'pending',
        now()
      )
      RETURNING
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
    `;

    const r = rows[0];
    return NextResponse.json(
      {
        ok: true,
        data: {
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
        },
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to place order" }, { status: 500 });
  }
}

