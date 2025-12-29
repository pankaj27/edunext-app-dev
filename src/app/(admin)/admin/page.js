"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function MetricCard({ title, value, delta, iconClass, accent }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <div className="text-muted small">{title}</div>
              <div className="h4 mt-1 mb-2">{value}</div>
              <div className="small">
                <span className={delta.startsWith("+") ? "text-success" : "text-danger"}>
                  {delta}
                </span>{" "}
                <span className="text-muted">vs last week</span>
              </div>
            </div>
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, background: accent }}
            >
              <i className={iconClass} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [nowIso, setNowIso] = useState("");

  useEffect(() => {
    setNowIso(new Date().toISOString());
    const id = setInterval(() => setNowIso(new Date().toISOString()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const metrics = useMemo(
    () => [
      {
        title: "Website Visits",
        value: "12,480",
        delta: "+8.2%",
        iconClass: "fa-solid fa-globe",
        accent: "rgba(13,110,253,0.1)",
      },
      {
        title: "Leads",
        value: "324",
        delta: "+3.4%",
        iconClass: "fa-solid fa-user-plus",
        accent: "rgba(25,135,84,0.12)",
      },
      {
        title: "Contact Requests",
        value: "58",
        delta: "-1.9%",
        iconClass: "fa-solid fa-envelope-open-text",
        accent: "rgba(220,53,69,0.12)",
      },
      {
        title: "Uptime",
        value: "99.98%",
        delta: "+0.1%",
        iconClass: "fa-solid fa-shield",
        accent: "rgba(111,66,193,0.12)",
      },
    ],
    [],
  );

  return (
    <div className="d-flex flex-column gap-3 gap-lg-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div>
            <div className="h5 mb-1">Overview</div>
            <div className="text-muted small">
              {nowIso ? nowIso.slice(0, 10) : ""} • {nowIso ? nowIso.slice(11, 16) : ""}
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link className="btn btn-outline-secondary btn-sm" href="/admin">
              Refresh
            </Link>
            <Link className="btn btn-primary btn-sm" href="/admin">
              Create report
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {metrics.map((m) => (
          <MetricCard key={m.title} {...m} />
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="h6 mb-0">Activity</div>
                <Link className="small text-decoration-none" href="/admin">
                  View all
                </Link>
              </div>
              <div className="list-group list-group-flush">
                <div className="list-group-item px-0 d-flex align-items-start justify-content-between">
                  <div className="me-3">
                    <div className="fw-semibold">New lead submitted</div>
                    <div className="text-muted small">Contact form submission from website</div>
                  </div>
                  <div className="text-muted small">2m</div>
                </div>
                <div className="list-group-item px-0 d-flex align-items-start justify-content-between">
                  <div className="me-3">
                    <div className="fw-semibold">Newsletter signup</div>
                    <div className="text-muted small">A new user subscribed</div>
                  </div>
                  <div className="text-muted small">18m</div>
                </div>
                <div className="list-group-item px-0 d-flex align-items-start justify-content-between">
                  <div className="me-3">
                    <div className="fw-semibold">Page performance</div>
                    <div className="text-muted small">Largest Contentful Paint improved</div>
                  </div>
                  <div className="text-muted small">1h</div>
                </div>
                <div className="list-group-item px-0 d-flex align-items-start justify-content-between">
                  <div className="me-3">
                    <div className="fw-semibold">Deployment successful</div>
                    <div className="text-muted small">Vercel build completed</div>
                  </div>
                  <div className="text-muted small">3h</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="h6 mb-3">Quick Actions</div>
              <div className="d-grid gap-2">
                <Link className="btn btn-outline-primary" href="/admin">
                  Manage content
                </Link>
                <Link className="btn btn-outline-primary" href="/admin">
                  Review messages
                </Link>
                <Link className="btn btn-outline-primary" href="/admin">
                  Update settings
                </Link>
              </div>
              <hr />
              <div className="small text-muted">
                This dashboard is optimized for deployment on Vercel using Next.js route handlers and cookies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
