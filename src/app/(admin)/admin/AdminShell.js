"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function NavItem({ href, iconClass, label, active }) {
  return (
    <Link href={href} className={`navItem ${active ? "active" : ""}`}>
      <span className="navIcon" aria-hidden="true">
        <i className={iconClass} />
      </span>
      <span className="navLabel">{label}</span>
    </Link>
  );
}

function NavGroup({ iconClass, label, open, onToggle, children, active }) {
  return (
    <div className={`navGroup ${open ? "open" : ""} ${active ? "activeGroup" : ""}`}>
      <button type="button" className="navGroupBtn" onClick={onToggle} aria-expanded={open}>
        <span className="navIcon" aria-hidden="true">
          <i className={iconClass} />
        </span>
        <span className="navLabel">{label}</span>
        <span className="navChevron" aria-hidden="true">
          <i className={`fa-solid ${open ? "fa-chevron-down" : "fa-chevron-right"}`} />
        </span>
      </button>
      <div className="navSub">{children}</div>
    </div>
  );
}

export default function AdminShell({ children, email }) {
  const pathname = usePathname() || "/admin";

  const isProductsActive = pathname.startsWith("/admin/products");
  const isOrdersActive = pathname.startsWith("/admin/orders");
  const isSettingsActive = pathname.startsWith("/admin/settings");
  const isDashboardActive = pathname === "/admin";

  const [productsOpen, setProductsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  useEffect(() => {
    if (isProductsActive) setProductsOpen(true);
    if (isOrdersActive) setOrdersOpen(true);
  }, [isProductsActive, isOrdersActive]);

  const breadcrumbs = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const items = [{ label: "Dashboard", href: "/admin" }];
    if (parts[1] === "products") {
      items.push({ label: "Products", href: "/admin/products/hardware" });
      if (parts[2]) items.push({ label: parts[2], href: pathname });
    } else if (parts[1] === "orders") {
      items.push({ label: "Order", href: "/admin/orders/today" });
      if (parts[2]) items.push({ label: parts[2], href: pathname });
    } else if (parts[1] === "settings") {
      items.push({ label: "Website settings", href: "/admin/settings" });
    }
    return items;
  }, [pathname]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <Link href="/admin" className="brandLink">
            <Image src="/assets/images/logo/onlylogo.png" alt="EduNextG" width={28} height={28} />
            <span className="brandText">EduNextG</span>
          </Link>
        </div>

        <nav className="nav">
          <NavItem
            href="/admin"
            iconClass="fa-solid fa-gauge"
            label="Dashboard"
            active={isDashboardActive}
          />

          <NavGroup
            iconClass="fa-solid fa-boxes-stacked"
            label="Products"
            open={productsOpen}
            active={isProductsActive}
            onToggle={() => setProductsOpen((v) => !v)}
          >
            <NavItem
              href="/admin/products/hardware"
              iconClass="fa-regular fa-circle"
              label="Hardware"
              active={pathname === "/admin/products/hardware"}
            />
            <NavItem
              href="/admin/products/software"
              iconClass="fa-regular fa-circle"
              label="Software"
              active={pathname === "/admin/products/software"}
            />
            <NavItem
              href="/admin/products/service"
              iconClass="fa-regular fa-circle"
              label="Service"
              active={pathname === "/admin/products/service"}
            />
          </NavGroup>

          <NavGroup
            iconClass="fa-solid fa-bag-shopping"
            label="Order"
            open={ordersOpen}
            active={isOrdersActive}
            onToggle={() => setOrdersOpen((v) => !v)}
          >
            <NavItem
              href="/admin/orders/today"
              iconClass="fa-regular fa-circle"
              label="Today Order"
              active={pathname === "/admin/orders/today"}
            />
            <NavItem
              href="/admin/orders/list"
              iconClass="fa-regular fa-circle"
              label="Orderlist"
              active={pathname === "/admin/orders/list"}
            />
          </NavGroup>

          <NavItem
            href="/admin/settings"
            iconClass="fa-solid fa-gear"
            label="Website settings"
            active={isSettingsActive}
          />
        </nav>
      </aside>

      <div className="content">
        <header className="topbar">
          <div className="welcome">
            <div className="welcomeTitle">Welcome {email?.split("@")[0] || "Admin"}</div>
            <div className="welcomeSub">Here&apos;s what&apos;s happening with your store today.</div>
          </div>

          <div className="topbarRight">
            <div className="search">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <input className="searchInput" placeholder="Search" />
            </div>

            <button type="button" className="iconBtn" aria-label="Notifications">
              <i className="fa-regular fa-bell" />
            </button>
            <button type="button" className="iconBtn" aria-label="Settings">
              <i className="fa-regular fa-star" />
            </button>

            <div className="user">
              <div className="userAvatar" aria-hidden="true">
                <i className="fa-regular fa-user" />
              </div>
              <div className="userMeta">
                <div className="userName">{email || "Admin"}</div>
                <div className="userRole">Admin</div>
              </div>
              <form action="/api/admin/logout" method="post">
                <button className="logoutBtn" type="submit">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="crumbs">
          {breadcrumbs.map((b, idx) => (
            <div key={`${b.href}-${idx}`} className="crumb">
              <Link href={b.href} className={`crumbLink ${idx === breadcrumbs.length - 1 ? "current" : ""}`}>
                {b.label}
              </Link>
              {idx < breadcrumbs.length - 1 ? <span className="sep">/</span> : null}
            </div>
          ))}
        </div>

        <main className="main">{children}</main>
      </div>

      <style jsx>{`
        .shell {
          min-height: 100vh;
          display: flex;
          background: #f6f7fb;
        }

        .sidebar {
          width: 270px;
          background: #0b6f6c;
          color: #eaf7f7;
          padding: 16px 12px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: auto;
        }

        .brand {
          padding: 6px 8px 14px;
          margin-bottom: 10px;
        }

        .brandLink {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #ffffff;
          font-weight: 800;
          letter-spacing: 0.2px;
        }

        .brandText {
          font-size: 18px;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        :global(.navItem) {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 10px;
          border-radius: 10px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 14px;
        }

        :global(.navItem:hover) {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        :global(.navItem.active) {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }

        .navIcon {
          width: 22px;
          display: inline-flex;
          justify-content: center;
          opacity: 0.95;
        }

        .navGroup {
          border-radius: 12px;
        }

        .navGroupBtn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 10px;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
        }

        .navGroupBtn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .activeGroup .navGroupBtn {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .navChevron {
          margin-left: auto;
          opacity: 0.9;
          font-size: 12px;
        }

        .navSub {
          display: none;
          padding: 6px 0 8px 16px;
        }

        .open .navSub {
          display: block;
        }

        .navSub :global(.navItem) {
          padding: 9px 10px;
          font-weight: 600;
          font-size: 13px;
          border-radius: 10px;
        }

        .content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 16px 18px;
          border-bottom: 1px solid #edf2f7;
        }

        .welcomeTitle {
          font-weight: 800;
          color: #0f172a;
          font-size: 18px;
          line-height: 1.1;
        }

        .welcomeSub {
          color: #64748b;
          font-size: 12px;
          margin-top: 4px;
        }

        .topbarRight {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 8px 12px;
          width: 320px;
        }

        .searchInput {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font-size: 13px;
          color: #0f172a;
        }

        .iconBtn {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
        }

        .iconBtn:hover {
          background: #f8fafc;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          margin-left: 4px;
        }

        .userAvatar {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #0f172a;
        }

        .userMeta {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .userName {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          max-width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .userRole {
          font-size: 11px;
          color: #64748b;
        }

        .logoutBtn {
          border: 0;
          background: #0b6f6c;
          color: #ffffff;
          border-radius: 10px;
          padding: 8px 10px;
          font-weight: 700;
          font-size: 12px;
        }

        .logoutBtn:hover {
          background: #095d5a;
        }

        .crumbs {
          padding: 14px 18px 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 12px;
        }

        .crumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .sep {
          color: #cbd5e1;
        }

        .crumbLink {
          text-decoration: none;
          color: #64748b;
          font-weight: 700;
          text-transform: capitalize;
        }

        .crumbLink.current {
          color: #0f172a;
        }

        .main {
          padding: 18px;
        }

        @media (max-width: 1100px) {
          .search {
            width: 220px;
          }
          .userMeta {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .sidebar {
            width: 240px;
          }
          .welcome {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .sidebar {
            display: none;
          }
          .search {
            width: 180px;
          }
        }
      `}</style>
    </div>
  );
}
