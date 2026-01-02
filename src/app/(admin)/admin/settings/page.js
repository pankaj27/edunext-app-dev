"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const initialForm = {
  logoDataUrl: "",
  faviconDataUrl: "",
  websiteTitle: "",
  address: "",
  email: "",
  contactNo: "",
};

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function isValidEmail(value) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Page() {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailValid = useMemo(() => isValidEmail(form.email), [form.email]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/settings", { cache: "no-store" });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Failed to load settings");
        }
        const data = await res.json();
        if (!alive) return;
        setForm({ ...initialForm, ...(data?.data || {}) });
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load settings");
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function onPickLogo(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setForm((f) => ({ ...f, logoDataUrl: dataUrl }));
  }

  async function onPickFavicon(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setForm((f) => ({ ...f, faviconDataUrl: dataUrl }));
  }

  async function onSave(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to save settings");
      }
      setSuccess("Settings saved successfully.");
    } catch (e2) {
      setError(e2?.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="settings">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
            <div>
              <div className="h5 mb-1">Website Settings</div>
              <div className="text-muted small">Update branding and contact details used across the website.</div>
            </div>
          </div>

          {error ? (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="alert alert-success mt-3 mb-0" role="alert">
              {success}
            </div>
          ) : null}

          <form className="mt-4" onSubmit={onSave}>
            <div className="row g-4">
              <div className="col-12 col-xl-6">
                <div className="sectionCard">
                  <div className="sectionHead">
                    <div className="sectionTitle">Branding</div>
                    <div className="text-muted small">Logo and favicon preview before saving.</div>
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Website Logo</label>
                      <div className="uploadRow">
                        <div className="previewBox">
                          {form.logoDataUrl ? (
                            <Image
                              className="previewImg"
                              src={form.logoDataUrl}
                              alt="Logo preview"
                              width={240}
                              height={120}
                              unoptimized
                            />
                          ) : (
                            <div className="previewPlaceholder">No logo</div>
                          )}
                        </div>

                        <div className="flex-grow-1">
                          <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={onPickLogo}
                            disabled={isLoading || isSaving}
                          />
                          <div className="text-muted small mt-2">Recommended: transparent PNG/SVG, height ~40px.</div>
                          <div className="d-flex gap-2 mt-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => setForm((f) => ({ ...f, logoDataUrl: "" }))}
                              disabled={isLoading || isSaving || !form.logoDataUrl}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Favicon</label>
                      <div className="uploadRow">
                        <div className="previewBox smallBox">
                          {form.faviconDataUrl ? (
                            <Image
                              className="previewImg"
                              src={form.faviconDataUrl}
                              alt="Favicon preview"
                              width={72}
                              height={72}
                              unoptimized
                            />
                          ) : (
                            <div className="previewPlaceholder">No icon</div>
                          )}
                        </div>

                        <div className="flex-grow-1">
                          <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={onPickFavicon}
                            disabled={isLoading || isSaving}
                          />
                          <div className="text-muted small mt-2">Recommended: 32×32 or 48×48 PNG/ICO.</div>
                          <div className="d-flex gap-2 mt-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => setForm((f) => ({ ...f, faviconDataUrl: "" }))}
                              disabled={isLoading || isSaving || !form.faviconDataUrl}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Website Title</label>
                      <input
                        className="form-control"
                        value={form.websiteTitle}
                        onChange={(e) => setForm((f) => ({ ...f, websiteTitle: e.target.value }))}
                        placeholder="EduNextG"
                        disabled={isLoading || isSaving}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-6">
                <div className="sectionCard">
                  <div className="sectionHead">
                    <div className="sectionTitle">Contact Details</div>
                    <div className="text-muted small">Shown on the website footer and contact pages.</div>
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Address</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={form.address}
                        onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                        placeholder="Enter full office address"
                        disabled={isLoading || isSaving}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Email ID</label>
                      <input
                        className={`form-control ${emailValid ? "" : "is-invalid"}`}
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="support@edunextg.com"
                        disabled={isLoading || isSaving}
                      />
                      {!emailValid ? <div className="invalid-feedback">Invalid email address</div> : null}
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Contact No.</label>
                      <input
                        className="form-control"
                        value={form.contactNo}
                        onChange={(e) => setForm((f) => ({ ...f, contactNo: e.target.value }))}
                        placeholder="+91 98765 43210"
                        disabled={isLoading || isSaving}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="d-flex align-items-center justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setForm(initialForm)}
                    disabled={isLoading || isSaving}
                  >
                    Reset
                  </button>
                  <button className="btn btn-primary" type="submit" disabled={isLoading || isSaving}>
                    {isSaving ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .settings {
          max-width: 1100px;
        }
        /* Enhanced Form Styles */
        .form-control,
        .form-select {
          font-size: 16px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background-color: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }
        .form-control:focus,
        .form-select:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
          outline: none;
        }
        .form-control::placeholder {
          color: #94a3b8;
        }
        .form-label {
          margin-bottom: 8px;
          color: #475569;
          font-weight: 600;
          font-size: 14px;
        }
        /* Enhanced Button Styles */
        .btn {
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background-color: #4f46e5;
          border-color: #4f46e5;
          box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
        }
        .btn-primary:hover {
          background-color: #4338ca;
          border-color: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.15), 0 3px 6px -1px rgba(79, 70, 229, 0.1);
        }
        .btn-outline-secondary {
          border: 1px solid #cbd5e1;
          color: #475569;
        }
        .btn-outline-secondary:hover {
          background-color: #f1f5f9;
          border-color: #94a3b8;
          color: #1e293b;
          transform: translateY(-1px);
        }
        .sectionCard {
          border: 1px solid #edf2f7;
          border-radius: 16px;
          padding: 16px;
          background: #ffffff;
        }
        .sectionHead {
          margin-bottom: 12px;
        }
        .sectionTitle {
          font-weight: 900;
          color: #0f172a;
        }
        .uploadRow {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .previewBox {
          width: 140px;
          height: 72px;
          border-radius: 14px;
          border: 1px dashed #cbd5e1;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex: 0 0 auto;
        }
        .smallBox {
          width: 72px;
          height: 72px;
        }
        .previewImg {
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
      `}</style>
    </div>
  );
}
