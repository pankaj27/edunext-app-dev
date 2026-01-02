"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

function formatMoney(value) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "—";
  return `₹${n.toFixed(2)}`;
}

function formatType(value) {
  const v = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!v) return "—";
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function statusBadgeClass(status) {
  const v = typeof status === "string" ? status.trim().toLowerCase() : "";
  if (v === "delivered") return "bg-success-subtle text-success";
  if (v === "shipped") return "bg-primary-subtle text-primary";
  if (v === "processing") return "bg-warning-subtle text-warning";
  if (v === "cancelled") return "bg-danger-subtle text-danger";
  return "bg-secondary-subtle text-secondary";
}

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to load orders");
      }
      const data = await res.json().catch(() => null);
      setOrders(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const selectedDisplay = useMemo(() => {
    if (!selected || typeof selected !== "object") return null;
    const unitPrice = Number(selected.unitPrice || 0);
    const qty = Number(selected.quantity || 0);
    const totalPrice = Number(selected.totalPrice || 0);
    return {
      ...selected,
      unitPrice,
      quantity: qty,
      totalPrice,
    };
  }, [selected]);

  return (
    <div className="orders">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
            <div>
              <div className="h5 mb-1">Orderlist</div>
              <div className="text-muted small">Browse all orders here.</div>
            </div>
            <button type="button" className="btn btn-outline-secondary" onClick={load} disabled={isLoading}>
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {error ? (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              {error}
            </div>
          ) : null}
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: 90 }}>ID</th>
                <th>Product</th>
                <th style={{ width: 90 }}>Qty</th>
                <th style={{ width: 150 }}>Product Type</th>
                <th style={{ width: 150 }}>Product Price</th>
                <th style={{ width: 150 }}>Total Price</th>
                <th style={{ width: 220 }}>Delivery Location</th>
                <th style={{ width: 140 }}>Status</th>
                <th style={{ width: 140 }} className="text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-muted">
                    Loading...
                  </td>
                </tr>
              ) : orders.length ? (
                orders.map((o) => (
                  <tr key={o.id}>
                    <td className="fw-semibold">#{o.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className="tableImg">
                          {o.productThumbnailDataUrl ? (
                            <Image
                              src={o.productThumbnailDataUrl}
                              alt={o.productName || "Product"}
                              width={56}
                              height={56}
                              unoptimized
                            />
                          ) : (
                            <div className="tableImgFallback" />
                          )}
                        </div>
                        <div>
                          <div className="fw-semibold">{o.productName || "—"}</div>
                          <div className="text-muted small">Product ID: {o.productId || "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="fw-semibold">{o.quantity || 0}</td>
                    <td>{formatType(o.productType)}</td>
                    <td className="fw-semibold">{formatMoney(o.unitPrice)}</td>
                    <td className="fw-semibold">{formatMoney(o.totalPrice)}</td>
                    <td className="text-truncate" style={{ maxWidth: 220 }}>
                      {o.deliveryLocation || "—"}
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${statusBadgeClass(o.status)}`}>{formatType(o.status)}</span>
                    </td>
                    <td className="text-end">
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelected(o)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-muted">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDisplay ? (
        <>
          <div className="modal fade show" role="dialog" aria-modal="true" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <div className="h5 mb-0">Order #{selectedDisplay.id}</div>
                    <div className="text-muted small">{formatType(selectedDisplay.status)}</div>
                  </div>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelected(null)} />
                </div>
                <div className="modal-body">
                  <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
                    <div style={{ width: 88, height: 88, borderRadius: 12, overflow: "hidden", background: "#f2f2f2" }}>
                      {selectedDisplay.productThumbnailDataUrl ? (
                        <Image
                          src={selectedDisplay.productThumbnailDataUrl}
                          alt={selectedDisplay.productName || "Product"}
                          width={88}
                          height={88}
                          unoptimized
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "#e2e8f0" }} />
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{selectedDisplay.productName || "—"}</div>
                      <div className="text-muted small">Type: {formatType(selectedDisplay.productType)}</div>
                      <div className="text-muted small">Qty: {selectedDisplay.quantity}</div>
                    </div>
                    <div className="text-end">
                      <div className="text-muted small">Total</div>
                      <div className="h5 mb-0">{formatMoney(selectedDisplay.totalPrice)}</div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="text-muted small">Customer</div>
                      <div className="fw-semibold">
                        {(selectedDisplay.firstName || "") + " " + (selectedDisplay.lastName || "")}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="text-muted small">Email</div>
                      <div className="fw-semibold">{selectedDisplay.email || "—"}</div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="text-muted small">Contact no</div>
                      <div className="fw-semibold">{selectedDisplay.contactNo || "—"}</div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="text-muted small">Delivery location</div>
                      <div className="fw-semibold">{selectedDisplay.deliveryLocation || "—"}</div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="text-muted small">Product price</div>
                      <div className="fw-semibold">{formatMoney(selectedDisplay.unitPrice)}</div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="text-muted small">Quantity</div>
                      <div className="fw-semibold">{selectedDisplay.quantity}</div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="text-muted small">Total price</div>
                      <div className="fw-semibold">{formatMoney(selectedDisplay.totalPrice)}</div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setSelected(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelected(null)} />
        </>
      ) : null}

      <style jsx>{`
        .orders {
          max-width: 1200px;
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
        .btn-outline-primary {
          border: 1px solid #6366f1;
          color: #6366f1;
        }
        .btn-outline-primary:hover {
          background-color: #6366f1;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
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
          flex: 0 0 auto;
        }
        .tableImgFallback {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: #e2e8f0;
        }
      `}</style>
    </div>
  );
}
