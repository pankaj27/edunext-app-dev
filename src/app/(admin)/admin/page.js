"use client";

export default function Page() {
  return (
    <div className="dash">
      <div className="row g-3">
        <div className="col-12 col-xxl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <div className="sectionTitle">E-commerce</div>
                  <div className="cardTitle">Sales Chart</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="legendDot" aria-hidden="true" />
                  <span className="text-muted small">Revenue</span>
                  <div className="dropdown">
                    <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button">
                      Last Year
                    </button>
                  </div>
                </div>
              </div>

              <div className="chartWrap">
                <svg viewBox="0 0 740 280" className="chart">
                  <defs>
                    <linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#31b6b2" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#31b6b2" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="fillB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffb020" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffb020" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g opacity="0.35">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <line key={i} x1="0" y1={20 + i * 30} x2="740" y2={20 + i * 30} stroke="#cbd5e1" />
                    ))}
                  </g>
                  <path
                    d="M0 190 C 70 140, 120 160, 170 120 S 300 90, 350 110 S 450 150, 520 130 S 640 80, 740 95 L 740 280 L 0 280 Z"
                    fill="url(#fillA)"
                  />
                  <path
                    d="M0 190 C 70 140, 120 160, 170 120 S 300 90, 350 110 S 450 150, 520 130 S 640 80, 740 95"
                    fill="none"
                    stroke="#31b6b2"
                    strokeWidth="3"
                  />
                  <path
                    d="M0 210 C 70 200, 120 220, 170 190 S 300 210, 350 180 S 450 160, 520 170 S 640 130, 740 120 L 740 280 L 0 280 Z"
                    fill="url(#fillB)"
                  />
                  <path
                    d="M0 210 C 70 200, 120 220, 170 190 S 300 210, 350 180 S 450 160, 520 170 S 640 130, 740 120"
                    fill="none"
                    stroke="#ffb020"
                    strokeWidth="3"
                  />
                </svg>
                <div className="months">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                    (m) => (
                      <div key={m}>{m}</div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xxl-5">
          <div className="row g-3">
            <div className="col-12 col-md-6 col-xxl-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="kpiLabel">Total Revenue</div>
                    <button className="btn btn-link btn-sm p-0 kpiLink" type="button">
                      View Report
                    </button>
                  </div>
                  <div className="kpiValue">₹97,250.89</div>
                  <div className="kpiMeta">
                    <span className="text-success fw-semibold">60.00%</span>
                    <span className="text-muted ms-2">this month</span>
                  </div>
                  <div className="spark">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i} className="bar" style={{ height: 10 + ((i * 13) % 42) }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xxl-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="kpiLabel">Total Order</div>
                    <button className="btn btn-link btn-sm p-0 kpiLink" type="button">
                      View Report
                    </button>
                  </div>
                  <div className="kpiValue">35,452</div>
                  <div className="kpiMeta">
                    <span className="text-danger fw-semibold">15.00%</span>
                    <span className="text-muted ms-2">this month</span>
                  </div>
                  <div className="sparkLine" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card border-0 shadow-sm promo">
                <div className="card-body">
                  <div className="promoTitle">Today&apos;s Special Offer</div>
                  <div className="promoText">
                    You can flat get 20% off on your next pro version if your sale break your last record.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="stat">
                <div className="statIcon bg-soft-teal">
                  <i className="fa-solid fa-chart-simple" />
                </div>
                <div>
                  <div className="statLabel">Total Sales</div>
                  <div className="statValue">₹98,459</div>
                  <div className="statMeta text-muted">We have sale +18.2k this month.</div>
                </div>
              </div>
              <div className="stat">
                <div className="statIcon bg-soft-amber">
                  <i className="fa-solid fa-users" />
                </div>
                <div>
                  <div className="statLabel">Total Visitors</div>
                  <div className="statValue">54,156</div>
                  <div className="statMeta text-muted">Total visit +3.5k this month.</div>
                </div>
              </div>
              <div className="stat">
                <div className="statIcon bg-soft-indigo">
                  <i className="fa-solid fa-bag-shopping" />
                </div>
                <div>
                  <div className="statLabel">Total Orders</div>
                  <div className="statValue">5,125</div>
                  <div className="statMeta text-muted">Total order +5k this month.</div>
                </div>
              </div>
              <div className="stat">
                <div className="statIcon bg-soft-rose">
                  <i className="fa-solid fa-rotate-left" />
                </div>
                <div>
                  <div className="statLabel">Refunded</div>
                  <div className="statValue">₹20,000</div>
                  <div className="statMeta text-muted">We got +66k refund this month.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="cardTitle">Latest Orders</div>
                <div className="d-flex align-items-center gap-2">
                  <div className="text-muted small">Data updates every 3 hours</div>
                  <button className="btn btn-outline-secondary btn-sm" type="button">
                    Today
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Order</th>
                      <th scope="col">Billing Name</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-end">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "4859578", name: "Amit Shah", status: "Delivered", amount: "₹2,950" },
                      { id: "4875566", name: "Arlene McCoy", status: "Shipped", amount: "₹1,240" },
                      { id: "7894561", name: "Marvin McKinney", status: "Processing", amount: "₹3,110" },
                      { id: "1234567", name: "Annette Black", status: "Cancelled", amount: "₹720" },
                    ].map((o) => (
                      <tr key={o.id}>
                        <td>
                          <div className="fw-semibold">Order #{o.id}</div>
                          <div className="text-muted small">ID : {o.id}</div>
                        </td>
                        <td className="fw-semibold">{o.name}</td>
                        <td>
                          <span
                            className={`badge rounded-pill ${
                              o.status === "Delivered"
                                ? "bg-success-subtle text-success"
                                : o.status === "Shipped"
                                  ? "bg-warning-subtle text-warning"
                                  : o.status === "Cancelled"
                                    ? "bg-secondary-subtle text-secondary"
                                    : "bg-info-subtle text-info"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="text-end fw-semibold">{o.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dash {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sectionTitle {
          font-size: 12px;
          font-weight: 800;
          color: #0b6f6c;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .cardTitle {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin-top: 4px;
        }

        .legendDot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #ffb020;
          display: inline-block;
        }

        .chartWrap {
          border-radius: 14px;
          overflow: hidden;
        }

        .chart {
          width: 100%;
          height: auto;
          display: block;
        }

        .months {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 0;
          margin-top: 10px;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
        }

        .kpiLabel {
          font-size: 12px;
          font-weight: 800;
          color: #64748b;
        }

        .kpiLink {
          color: #0b6f6c;
          font-weight: 800;
          text-decoration: none;
        }

        .kpiValue {
          font-size: 22px;
          font-weight: 900;
          color: #0f172a;
        }

        .kpiMeta {
          font-size: 12px;
          margin-top: 2px;
        }

        .spark {
          margin-top: 10px;
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 56px;
        }

        .bar {
          width: 6px;
          border-radius: 999px;
          background: rgba(11, 111, 108, 0.25);
        }

        .sparkLine {
          height: 56px;
          margin-top: 10px;
          border-radius: 12px;
          background: radial-gradient(circle at 20% 40%, rgba(11, 111, 108, 0.22), transparent 45%),
            radial-gradient(circle at 60% 60%, rgba(255, 176, 32, 0.18), transparent 48%),
            radial-gradient(circle at 90% 35%, rgba(11, 111, 108, 0.22), transparent 45%);
          border: 1px solid #edf2f7;
        }

        .promo {
          background: linear-gradient(135deg, #0b6f6c, #17a2a0);
          color: #ffffff;
          border-radius: 16px;
          min-height: 140px;
        }

        .promoTitle {
          font-weight: 900;
          font-size: 18px;
        }

        .promoText {
          opacity: 0.95;
          font-size: 13px;
          margin-top: 8px;
          max-width: 420px;
        }

        .stat {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #edf2f7;
        }

        .stat:last-child {
          border-bottom: 0;
        }

        .statIcon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
        }

        .bg-soft-teal {
          background: rgba(11, 111, 108, 0.16);
          color: #0b6f6c;
        }

        .bg-soft-amber {
          background: rgba(255, 176, 32, 0.2);
          color: #a16207;
        }

        .bg-soft-indigo {
          background: rgba(79, 70, 229, 0.16);
          color: #4f46e5;
        }

        .bg-soft-rose {
          background: rgba(244, 63, 94, 0.16);
          color: #e11d48;
        }

        .statLabel {
          font-size: 12px;
          font-weight: 800;
          color: #64748b;
        }

        .statValue {
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
          margin-top: 2px;
        }

        .statMeta {
          font-size: 12px;
          margin-top: 2px;
        }

        :global(.card) {
          border-radius: 16px;
        }

        :global(.table) {
          font-size: 13px;
        }

        :global(.table thead th) {
          font-size: 12px;
          font-weight: 900;
          color: #334155;
        }
      `}</style>
    </div>
  );
}
