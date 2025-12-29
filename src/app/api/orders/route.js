import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

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

function isEmailSendable(value) {
  const v = normalizeEmail(value);
  return Boolean(v) && v.includes("@") && v.includes(".");
}

function escapeHtml(value) {
  const v = typeof value === "string" ? value : String(value ?? "");
  return v.replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return "&amp;";
    if (ch === "<") return "&lt;";
    if (ch === ">") return "&gt;";
    if (ch === '"') return "&quot;";
    if (ch === "'") return "&#39;";
    return ch;
  });
}

function smtpPort() {
  const raw = process.env.SMTP_PORT;
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) && n > 0 ? n : 587;
}

function smtpSecure() {
  const raw = (process.env.SMTP_SECURE || "").toLowerCase();
  if (raw === "true" || raw === "1" || raw === "yes") return true;
  if (raw === "false" || raw === "0" || raw === "no") return false;
  if (raw === "tls" || raw === "starttls") return false;
  if (raw === "ssl") return true;
  return smtpPort() === 465;
}

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function mailFromAddress() {
  const v = normalizeText(process.env.SMTP_FROM);
  return v || normalizeText(process.env.SMTP_USER) || "no-reply@example.com";
}

function appName() {
  const v = normalizeText(process.env.APP_NAME);
  return v || "EduNextG";
}

function shouldLogEmail() {
  return process.env.NODE_ENV !== "production";
}

function transport() {
  if (!hasSmtpConfig()) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort(),
    secure: smtpSecure(),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function emailSubject(order) {
  const orderId = Number(order?.id) || 0;
  const type = normalizeText(order?.productType).toLowerCase();
  const subjectBase = type === "service" ? "Booking confirmed" : "Order confirmed";
  const suffix = orderId > 0 ? ` (Ref #${orderId})` : "";
  return `${appName()} - ${subjectBase}${suffix}`;
}

function emailHtml(order) {
  const type = normalizeText(order?.productType).toLowerCase();
  const label = type === "service" ? "Booking details" : "Order details";
  const orderId = Number(order?.id) || 0;
  const createdAt = normalizeText(order?.createdAt);
  const createdAtDisplay = createdAt ? new Date(createdAt).toLocaleString() : "";
  const productName = escapeHtml(normalizeText(order?.productName));
  const productType = escapeHtml(type ? type[0].toUpperCase() + type.slice(1) : "");
  const unitPrice = Number(order?.unitPrice || 0);
  const quantity = Number(order?.quantity || 0) || 1;
  const totalPrice = Number(order?.totalPrice || 0);
  const fullName = escapeHtml(`${normalizeText(order?.firstName)} ${normalizeText(order?.lastName)}`.trim());
  const email = escapeHtml(normalizeText(order?.email));
  const contactNo = escapeHtml(normalizeText(order?.contactNo));
  const location = escapeHtml(normalizeText(order?.deliveryLocation));
  const status = escapeHtml(normalizeText(order?.status) || "pending");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <div style="max-width:720px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
        <div style="padding:20px 22px;background:linear-gradient(135deg, rgba(13,110,253,0.12), rgba(13,110,253,0));border-bottom:1px solid #e2e8f0;">
          <div style="font-size:18px;font-weight:800;">${escapeHtml(appName())}</div>
          <div style="margin-top:4px;color:#475569;font-size:13px;">${escapeHtml(label)}</div>
        </div>
        <div style="padding:22px;">
          <div style="font-size:14px;line-height:1.6;color:#0f172a;">
            <div>Hi ${fullName || "there"},</div>
            <div style="margin-top:8px;">We have received your ${type === "service" ? "booking request" : "order request"}. Our team will contact you shortly.</div>
          </div>

          <div style="margin-top:18px;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
            <div style="padding:12px 14px;background:#f8fafc;font-weight:700;font-size:13px;">Summary</div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Reference</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${orderId ? `#${orderId}` : "-"}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Product type</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${productType || "-"}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Product</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${productName || "-"}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Unit price</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">₹${unitPrice.toFixed(2)}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Quantity</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${quantity}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Total</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:800;">₹${totalPrice.toFixed(2)}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Status</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${status}</td></tr>
              ${createdAtDisplay ? `<tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Created</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${escapeHtml(createdAtDisplay)}</td></tr>` : ""}
            </table>
          </div>

          <div style="margin-top:18px;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
            <div style="padding:12px 14px;background:#f8fafc;font-weight:700;font-size:13px;">Customer</div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Name</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${fullName || "-"}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Email</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${email || "-"}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Contact</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${contactNo || "-"}</td></tr>
              <tr><td style="padding:10px 14px;border-top:1px solid #e2e8f0;color:#475569;">Delivery / Location</td><td style="padding:10px 14px;border-top:1px solid #e2e8f0;font-weight:700;">${location || "-"}</td></tr>
            </table>
          </div>

          <div style="margin-top:18px;color:#64748b;font-size:12px;line-height:1.6;">
            If you didn’t make this request, please reply to this email.
          </div>
        </div>
      </div>
      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:14px 0;">
        © ${new Date().getFullYear()} ${escapeHtml(appName())}
      </div>
    </div>
  </body>
</html>`;
}

function emailText(order) {
  const type = normalizeText(order?.productType).toLowerCase();
  const label = type === "service" ? "BOOKING CONFIRMATION" : "ORDER CONFIRMATION";
  const orderId = Number(order?.id) || 0;
  const productName = normalizeText(order?.productName);
  const unitPrice = Number(order?.unitPrice || 0);
  const quantity = Number(order?.quantity || 0) || 1;
  const totalPrice = Number(order?.totalPrice || 0);
  const fullName = `${normalizeText(order?.firstName)} ${normalizeText(order?.lastName)}`.trim();
  const email = normalizeText(order?.email);
  const contactNo = normalizeText(order?.contactNo);
  const location = normalizeText(order?.deliveryLocation);
  const status = normalizeText(order?.status) || "pending";
  const createdAt = normalizeText(order?.createdAt);
  const createdAtDisplay = createdAt ? new Date(createdAt).toLocaleString() : "";

  return [
    `${appName()} - ${label}`,
    "",
    `Reference: ${orderId ? `#${orderId}` : "-"}`,
    `Product type: ${type || "-"}`,
    `Product: ${productName || "-"}`,
    `Unit price: ₹${unitPrice.toFixed(2)}`,
    `Quantity: ${quantity}`,
    `Total: ₹${totalPrice.toFixed(2)}`,
    `Status: ${status}`,
    createdAtDisplay ? `Created: ${createdAtDisplay}` : "",
    "",
    "Customer",
    `Name: ${fullName || "-"}`,
    `Email: ${email || "-"}`,
    `Contact: ${contactNo || "-"}`,
    `Delivery / Location: ${location || "-"}`,
    "",
    "If you didn’t make this request, please reply to this email.",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendOrderConfirmationEmail(order) {
  const to = normalizeEmail(order?.email);
  if (!isEmailSendable(to)) return { ok: false, skipped: true, reason: "invalid_email" };

  const t = transport();
  if (!t) return { ok: false, skipped: true, reason: "smtp_not_configured" };

  const from = mailFromAddress();
  const replyTo = normalizeText(process.env.SMTP_REPLY_TO);
  const message = {
    from,
    to,
    subject: emailSubject(order),
    text: emailText(order),
    html: emailHtml(order),
    ...(replyTo ? { replyTo } : {}),
  };

  const info = await t.sendMail(message);
  return { ok: true, info };
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
      try {
        const result = await sendOrderConfirmationEmail(order);
        if (shouldLogEmail()) {
          if (result?.ok)
            console.info(
              `Order email sent ${JSON.stringify({ orderId: order.id, to: order.email, messageId: result?.info?.messageId || "" })}`
            );
          else if (result?.skipped) console.info(`Order email skipped ${JSON.stringify({ orderId: order.id, to: order.email, reason: result?.reason })}`);
        }
      } catch (e) {
        console.error("Order email failed", e instanceof Error ? e.message : e);
      }
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
    const data = {
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
    };

    try {
      const result = await sendOrderConfirmationEmail(data);
      if (shouldLogEmail()) {
        if (result?.ok)
          console.info(`Order email sent ${JSON.stringify({ orderId: data.id, to: data.email, messageId: result?.info?.messageId || "" })}`);
        else if (result?.skipped) console.info(`Order email skipped ${JSON.stringify({ orderId: data.id, to: data.email, reason: result?.reason })}`);
      }
    } catch (e) {
      console.error("Order email failed", e instanceof Error ? e.message : e);
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to place order" }, { status: 500 });
  }
}
