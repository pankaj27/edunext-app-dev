import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hasPostgresConfig() {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL);
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

export async function GET() {
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
      WHERE status = 'active'
      ORDER BY id DESC
    `;

    const data = (rows || []).map((r) => {
      let images = [];
      try {
        const parsed = JSON.parse(r.images_json || "[]");
        images = Array.isArray(parsed) ? parsed : [];
      } catch {
        images = [];
      }
      return {
        id: r.id,
        name: r.name,
        shortDesc: r.short_desc ?? "",
        longDesc: r.long_desc ?? "",
        thumbnailDataUrl: r.thumbnail_data_url ?? "",
        images,
        price: Number(r.price || 0),
        total: Number(r.total || 0),
        stock: Number(r.stock || 0),
        status: r.status === "inactive" ? "inactive" : "active",
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      };
    });

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load service products" }, { status: 500 });
  }
}
