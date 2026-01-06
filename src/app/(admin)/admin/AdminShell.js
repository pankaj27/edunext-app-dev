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
          <i className="fa-solid fa-chevron-right" />
        </span>
      </button>
      <div className="navSub">
        <div className="navSubInner">{children}</div>
      </div>
    </div>
  );
}

export default function AdminShell({ children, email }) {
  const pathname = usePathname() || "/admin";

  const isProductsActive = pathname.startsWith("/admin/products");
  const isOrdersActive = pathname.startsWith("/admin/orders");
  const isSettingsActive = pathname.startsWith("/admin/settings");
  const isDashboardActive = pathname === "/admin";

  // Initialize state based on current path to ensure correct initial expansion
  const [productsOpen, setProductsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);

  // Sync state with path changes
  useEffect(() => {
    if (isProductsActive) setProductsOpen(true);
    // else setProductsOpen(false); // Optional: auto-close if navigating away? keeping it manual is usually better UX
  }, [isProductsActive]);

  useEffect(() => {
    if (isOrdersActive) setOrdersOpen(true);
  }, [isOrdersActive]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        const json = await res.json().catch(() => null);
        if (!cancelled) setDbConfigured(Boolean(json?.dbConfigured));
      } catch {
        // Keep default true to avoid false warnings on temporary failures
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
            <span className="brandText">   </span>
            <Image src="/assets/images/logo/edunextg-logo.png" alt="EduNextG" width={140} height={28} />
          </Link>
        </div>

        <nav className="nav">
          {/* 1. Dashboard Button */}
          <NavItem
            href="/admin"
            iconClass="fa-solid fa-gauge"
            label="Dashboard"
            active={isDashboardActive}
          />

          {/* 2. Products Button (Expandable) */}
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

          {/* 3. Order Button (Expandable) */}
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

          {/* 4. Website Settings Button */}
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

        {!dbConfigured ? (
          <div className="envBanner" role="alert">
            <div className="envBannerIcon" aria-hidden="true">
              <i className="fa-solid fa-circle-info" />
            </div>
            <div className="envBannerText">
              Orders and product data are stored locally because the live database is not configured. Configure database env vars to enable persistent storage.
            </div>
          </div>
        ) : null}

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
          padding: 20px 16px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          box-shadow: 4px 0 24px rgba(0,0,0,0.02);
          transition: width 0.3s ease;
          z-index: 50;
        }
        
        .sidebar::-webkit-scrollbar {
          width: 5px;
        }
        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .brand {
          padding: 0 8px 24px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .brandLink {
          display: flex;
          align-items: center;
          gap: 12px;
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
          gap: 8px;
        }

        :global(.navItem) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px; /* Increased padding */
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
          position: relative;
          overflow: hidden;
        }

        :global(.navItem:hover) {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding-left: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        :global(.navItem.active) {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%); /* Gradient background */
          color: #ffffff;
          border-left-color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .navIcon {
          width: 24px; /* Slightly larger icon area */
          display: inline-flex;
          justify-content: center;
          opacity: 0.9;
          font-size: 16px;
        }

        .navGroup {
          border-radius: 12px;
          transition: all 0.2s ease;
          overflow: hidden; /* Contain children */
        }
        
        .navGroup.open {
           background: rgba(0, 0, 0, 0.08); /* Darken expanded group background */
        }

        .navGroupBtn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px; /* Increased padding matching navItems */
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.85);
          border-radius: 12px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
          text-align: left; /* Ensure text aligns left */
        }

        .navGroupBtn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding-left: 20px;
        }

        /* Active state for the parent button when a child is active */
        .activeGroup > .navGroupBtn {
          color: #ffffff;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
        }
        
        .navGroup.open > .navGroupBtn {
          background: transparent; /* Remove double background when open */
          padding-bottom: 10px; /* Space between title and list */
        }
        
        .navGroup.open > .navGroupBtn:hover {
           background: rgba(255, 255, 255, 0.05);
        }

        .navChevron {
          margin-left: auto;
          opacity: 0.7;
          font-size: 10px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
        }
        
        .navGroupBtn:hover .navChevron {
          background: rgba(255,255,255,0.2);
          opacity: 1;
        }
        
        .open .navChevron {
          transform: rotate(90deg);
          background: rgba(255,255,255,0.25);
          color: #fff;
        }

        /* Smooth accordion animation */
        .navSub {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .open .navSub {
          grid-template-rows: 1fr;
        }
        
        .navSubInner {
          overflow: hidden;
          padding: 0 0 8px 0;
        }

        .navSubInner :global(.navItem) {
          padding: 10px 16px 10px 48px; /* Deep indentation for hierarchy */
          font-size: 13px;
          font-weight: 500;
          border-radius: 0; /* Full width look inside group */
          margin-top: 2px;
          border-left: 0;
          position: relative;
        }
        
        .navSubInner :global(.navItem)::before {
          content: "";
          position: absolute;
          left: 28px;
          top: 50%;
          width: 4px;
          height: 4px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          transform: translateY(-50%);
          transition: all 0.2s;
        }
        
        .navSubInner :global(.navItem:hover) {
           padding-left: 52px;
           background: rgba(255, 255, 255, 0.05);
        }
        
        .navSubInner :global(.navItem:hover)::before {
           background: #fff;
        }
        
        .navSubInner :global(.navItem.active) {
           background: rgba(255, 255, 255, 0.1);
           box-shadow: none;
           color: #fff;
        }
        
        .navSubInner :global(.navItem.active)::before {
           background: #fff;
           width: 6px;
           height: 6px;
           box-shadow: 0 0 8px rgba(255,255,255,0.4);
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
          padding: 16px 24px;
          border-bottom: 1px solid #edf2f7;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }

        .welcomeTitle {
          font-weight: 800;
          color: #1e293b;
          font-size: 20px;
          line-height: 1.2;
        }

        .welcomeSub {
          color: #64748b;
          font-size: 13px;
          margin-top: 4px;
        }

        .topbarRight {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          width: 300px;
          transition: border-color 0.2s;
        }
        
        .search:focus-within {
          border-color: #0b6f6c;
          box-shadow: 0 0 0 2px rgba(11, 111, 108, 0.1);
        }

        .searchInput {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font-size: 14px;
          color: #0f172a;
        }

        .iconBtn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .iconBtn:hover {
          background: #f1f5f9;
          color: #0b6f6c;
          border-color: #cbd5e1;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 8px 6px 6px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          margin-left: 8px;
        }

        .userAvatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #0b6f6c;
          font-size: 16px;
        }

        .userMeta {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .userName {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .userRole {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }

        .logoutBtn {
          border: 0;
          background: #ffe4e6;
          color: #be123c;
          border-radius: 8px;
          padding: 8px 12px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s;
          margin-left: 8px;
        }

        .logoutBtn:hover {
          background: #fecdd3;
        }

        .crumbs {
          padding: 20px 24px 0;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
          font-size: 13px;
        }

        .crumb {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .sep {
          color: #cbd5e1;
          font-size: 11px;
        }

        .crumbLink {
          text-decoration: none;
          color: #64748b;
          font-weight: 600;
          transition: color 0.2s;
        }
        
        .crumbLink:hover {
          color: #0b6f6c;
        }

        .crumbLink.current {
          color: #0f172a;
          font-weight: 700;
          pointer-events: none;
        }

        .main {
          padding: 24px;
        }
        
        .envBanner {
          margin: 0 24px 8px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #fde68a;
          background: #fffbeb;
          color: #92400e;
          border-radius: 12px;
        }
        .envBannerIcon {
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fef3c7;
          border-radius: 50%;
          color: #b45309;
          font-size: 12px;
        }
        .envBannerText {
          font-size: 13px;
          font-weight: 600;
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
            padding: 16px 12px;
          }
          .welcome {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .sidebar {
            position: fixed;
            left: -280px;
            /* To do: Add mobile toggle logic if needed, but for now just hiding as per original */
          }
          .search {
            width: 160px;
          }
        }
      `}</style>
    </div>
  );
}
