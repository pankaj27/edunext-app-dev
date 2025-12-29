"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const initialForm = {
  name: "",
  shortDesc: "",
  longDesc: "",
  thumbnailDataUrl: "",
  images: [],
  price: "",
  total: "",
  stock: "",
  status: "active",
};

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function formatMoney(value) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "—";
  return `₹${n.toFixed(2)}`;
}

export default function Page() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products/software", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to load products");
      }
      const data = await res.json();
      setItems(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      setError(e?.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onPickThumbnail(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setForm((f) => ({ ...f, thumbnailDataUrl: dataUrl }));
  }

  async function onPickImages(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const urls = await Promise.all(files.map(fileToDataUrl));
    setForm((f) => ({ ...f, images: [...f.images, ...urls].filter(Boolean) }));
  }

  function startEdit(item) {
    setSuccess("");
    setError("");
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      shortDesc: item.shortDesc || "",
      longDesc: item.longDesc || "",
      thumbnailDataUrl: item.thumbnailDataUrl || "",
      images: Array.isArray(item.images) ? item.images : [],
      price: item.price ?? "",
      total: item.total ?? "",
      stock: item.stock ?? "",
      status: item.status === "inactive" ? "inactive" : "active",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    const name = String(form.name || "").trim();
    if (!name) {
      setError("Product name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...form,
        name,
        price: form.price === "" ? 0 : Number(form.price),
        total: form.total === "" ? 0 : Number(form.total),
        stock: form.stock === "" ? 0 : Number(form.stock),
      };

      const url = isEditing ? `/api/admin/products/software/${editingId}` : "/api/admin/products/software";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Save failed");
      }

      setSuccess(isEditing ? "Product updated successfully." : "Product added successfully.");
      resetForm();
      await load();
    } catch (e2) {
      setError(e2?.message || "Save failed");
    } finally {
      setIsSaving(false);
    }
  }

  async function onDelete(item) {
    setSuccess("");
    setError("");
    const ok = window.confirm(`Delete "${item?.name || "this product"}"?`);
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/products/software/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Delete failed");
      }
      if (editingId === item.id) resetForm();
      await load();
      setSuccess("Product deleted.");
    } catch (e) {
      setError(e?.message || "Delete failed");
    }
  }

  return (
    <div className="software">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="p-4 p-lg-5 pb-3 d-flex align-items-start justify-content-between gap-3 flex-wrap">
            <div>
              <div className="h6 mb-1">Software Products</div>
              <div className="text-muted small">All software products list and management.</div>
            </div>
            {isEditing ? (
              <button type="button" className="btn btn-outline-secondary" onClick={resetForm} disabled={isSaving}>
                Cancel Edit
              </button>
            ) : null}
          </div>

          <div className="px-4 px-lg-5 pb-4">
            {error ? (
              <div className="alert alert-danger mb-0" role="alert">
                {error}
              </div>
            ) : null}
            {success ? (
              <div className="alert alert-success mb-0" role="alert">
                {success}
              </div>
            ) : null}

            <div className="formCard mt-3">
              <div className="d-flex align-items-start justify-content-between gap-2 flex-wrap mb-3">
                <div>
                  <div className="h5 mb-1">Software Product</div>
                  <div className="text-muted small">Add and manage software products.</div>
                </div>
              </div>

              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-lg-6">
                    <label className="form-label fw-semibold">Product Name</label>
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Enter product name"
                      disabled={isSaving}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      className="form-select"
                      value={form.status}
                      onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                      disabled={isSaving}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Product Short Description</label>
                    <input
                      className="form-control"
                      value={form.shortDesc}
                      onChange={(e) => setForm((f) => ({ ...f, shortDesc: e.target.value }))}
                      placeholder="Short one-line description"
                      disabled={isSaving}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Product Long Description</label>
                    <textarea
                      className="form-control longDesc"
                      rows={6}
                      value={form.longDesc}
                      onChange={(e) => setForm((f) => ({ ...f, longDesc: e.target.value }))}
                      placeholder="Write a detailed, professional description of the product..."
                      disabled={isSaving}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label fw-semibold">Product Thumbnail</label>
                    <div className="uploadRow">
                      <div className="previewBox">
                        {form.thumbnailDataUrl ? (
                          <Image
                            className="previewImg"
                            src={form.thumbnailDataUrl}
                            alt="Thumbnail preview"
                            width={240}
                            height={160}
                            unoptimized
                          />
                        ) : (
                          <div className="previewPlaceholder">No thumbnail</div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*"
                          onChange={onPickThumbnail}
                          disabled={isSaving}
                        />
                        <div className="d-flex gap-2 mt-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setForm((f) => ({ ...f, thumbnailDataUrl: "" }))}
                            disabled={isSaving || !form.thumbnailDataUrl}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label fw-semibold">Product Images (Multiple)</label>
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={onPickImages}
                      disabled={isSaving}
                    />
                    <div className="imagesGrid mt-2">
                      {form.images.map((src, idx) => (
                        <div className="imgTile" key={`${idx}-${src.slice(0, 24)}`}>
                          <Image className="tileImg" src={src} alt={`Product ${idx + 1}`} width={140} height={110} unoptimized />
                          <button
                            type="button"
                            className="btn btn-sm btn-light tileBtn"
                            onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))}
                            disabled={isSaving}
                            aria-label="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Product Price</label>
                    <input
                      className="form-control"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      placeholder="0.00"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Total</label>
                    <input
                      className="form-control"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.total}
                      onChange={(e) => setForm((f) => ({ ...f, total: e.target.value }))}
                      placeholder="0.00"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Stock</label>
                    <input
                      className="form-control"
                      type="number"
                      step="1"
                      min="0"
                      value={form.stock}
                      onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                      placeholder="0"
                      disabled={isSaving}
                    />
                  </div>

                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <button type="button" className="btn btn-outline-secondary" onClick={resetForm} disabled={isSaving}>
                        Reset
                      </button>
                      <button className="btn btn-primary" type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 90 }}>Product Image</th>
                  <th>Product Name</th>
                  <th style={{ width: 160 }}>Product Price</th>
                  <th style={{ width: 140 }}>Status</th>
                  <th style={{ width: 170 }} className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-muted">
                      Loading...
                    </td>
                  </tr>
                ) : items.length ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="tableImg">
                          {item.thumbnailDataUrl ? (
                            <Image src={item.thumbnailDataUrl} alt={item.name} width={56} height={56} unoptimized />
                          ) : (
                            <div className="tableImgFallback" />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="fw-semibold">{item.name}</div>
                        {item.shortDesc ? <div className="text-muted small text-truncate">{item.shortDesc}</div> : null}
                      </td>
                      <td className="fw-semibold">{formatMoney(item.price)}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            item.status === "inactive" ? "bg-secondary-subtle text-secondary" : "bg-success-subtle text-success"
                          }`}
                        >
                          {item.status === "inactive" ? "Inactive" : "Active"}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => startEdit(item)}>
                            Edit
                          </button>
                          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDelete(item)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-muted">
                      No software products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .software {
          max-width: 1200px;
        }
        .formCard {
          border: 1px solid #eef2f7;
          border-radius: 16px;
          padding: 18px;
          background: #ffffff;
        }
        .longDesc {
          resize: vertical;
        }
        .uploadRow {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .previewBox {
          width: 160px;
          height: 110px;
          border-radius: 14px;
          border: 1px dashed #cbd5e1;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex: 0 0 auto;
        }
        :global(.previewImg) {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #ffffff;
        }
        .previewPlaceholder {
          font-size: 12px;
          font-weight: 800;
          color: #64748b;
        }
        .imagesGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .imgTile {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          background: #ffffff;
        }
        :global(.tileImg) {
          width: 100%;
          height: 110px;
          object-fit: cover;
          display: block;
        }
        .tileBtn {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          line-height: 1;
          padding: 0;
          font-weight: 900;
        }
        .tableImg {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tableImgFallback {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: #e2e8f0;
        }
        @media (max-width: 992px) {
          .imagesGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 520px) {
          .imagesGrid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
