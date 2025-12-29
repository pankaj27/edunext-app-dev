import { NextResponse } from "next/server";
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

async function readLocalDb() {
  try {
    const json = await fs.readFile(localDbPath(), "utf8");
    const data = JSON.parse(json);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
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


export async function GET() {
  try {
    if (!hasPostgresConfig()) {
      const local = await readLocalDb();
      const active = local
        .map((p) => {
          const obj = p && typeof p === "object" ? p : {};
          return {
            id: Number(obj.id) || 0,
            name: typeof obj.name === "string" ? obj.name : "",
            shortDesc:
              typeof obj.shortDesc === "string" ? obj.shortDesc : typeof obj.short_desc === "string" ? obj.short_desc : "",
            longDesc: typeof obj.longDesc === "string" ? obj.longDesc : typeof obj.long_desc === "string" ? obj.long_desc : "",
            thumbnailDataUrl:
              typeof obj.thumbnailDataUrl === "string"
                ? obj.thumbnailDataUrl
                : typeof obj.thumbnail_data_url === "string"
                  ? obj.thumbnail_data_url
                  : typeof obj.thumbnail === "string"
                    ? obj.thumbnail
                    : "",
            images: Array.isArray(obj.images) ? obj.images : Array.isArray(obj.images_json) ? obj.images_json : [],
            price: Number(obj.price) || 0,
            total: Number(obj.total) || 0,
            stock: Number.isFinite(Number(obj.stock)) ? Math.max(0, Math.trunc(Number(obj.stock))) : 0,
            status: obj.status === "inactive" ? "inactive" : "active",
            createdAt: typeof obj.createdAt === "string" ? obj.createdAt : typeof obj.created_at === "string" ? obj.created_at : "",
            updatedAt: typeof obj.updatedAt === "string" ? obj.updatedAt : typeof obj.updated_at === "string" ? obj.updated_at : "",
          };
        })
        .filter((p) => p.id > 0 && p.status === "active");
      return NextResponse.json({ ok: true, data: active });
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
      FROM software_products
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
    return NextResponse.json({ ok: false, error: "Failed to load software products" }, { status: 500 });
  }
}
