import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    if (!hasPostgresConfig()) {
      const local = await readLocalSettings();
      return NextResponse.json({
        ok: true,
        dbConfigured: false,
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
      dbConfigured: true,
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
