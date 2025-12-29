"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("/admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) setRedirectTo(redirect);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Login failed");
        return;
      }

      router.replace(redirectTo);
    } catch {
      setError("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="authWrap">
      <div className="authInner">
        <div className="brand mb-4">
          <Image
            className="brandLogo"
            src="/assets/images/logo/edunextg-logo-blue.png"
            alt="EduNextG"
            width={210}
            height={34}
            priority
          />
        </div>

        <div className="card authCard border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <h1 className="h5 mb-1">Sign in to account</h1>
              <div className="text-muted small">Enter your email &amp; password to login</div>
            </div>

            {error ? (
              <div className="alert alert-danger py-2 small mb-3" role="alert">
                {error}
              </div>
            ) : null}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label authLabel">Email Address</label>
                <input
                  className="form-control authInput"
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  autoComplete="username"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label authLabel">Password</label>
                <input
                  className="form-control authInput"
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
                <label className="d-flex align-items-center gap-2 small text-muted m-0">
                  <input
                    className="form-check-input m-0"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember password
                </label>
              </div>

              <button className="btn authPrimaryBtn w-100" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              <div className="text-center text-muted small mt-3">
                <Link href="/" className="text-decoration-none text-muted">
                  Back to site
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .authWrap {
          min-height: 100vh;
          background: #f6f7fb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 16px;
          position: relative;
          overflow: hidden;
        }

        .authWrap::before,
        .authWrap::after {
          content: "";
          position: absolute;
          width: 260px;
          height: 140px;
          background-image: linear-gradient(135deg, rgba(16, 185, 129, 0.22) 25%, transparent 25%),
            linear-gradient(225deg, rgba(16, 185, 129, 0.22) 25%, transparent 25%),
            linear-gradient(45deg, rgba(16, 185, 129, 0.22) 25%, transparent 25%),
            linear-gradient(315deg, rgba(16, 185, 129, 0.22) 25%, transparent 25%);
          background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
          background-size: 16px 16px;
          opacity: 0.75;
          pointer-events: none;
        }

        .authWrap::before {
          top: 0;
          right: 0;
          transform: translate(28%, -28%) rotate(6deg);
          border-radius: 24px;
        }

        .authWrap::after {
          bottom: 0;
          left: 0;
          transform: translate(-28%, 28%) rotate(-6deg);
          border-radius: 24px;
        }

        .authInner {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 1;
        }

        .brand {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brandLogo {
          height: 34px;
          width: auto;
          display: block;
        }

        .authCard {
          border-radius: 10px;
        }

        .authLabel {
          font-size: 12px;
          color: #334155;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .authInput {
          background: #eef3f6;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 14px;
        }

        .authInput:focus {
          background: #ffffff;
          box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.6);
        }

        .authPrimaryBtn {
          background: #0f766e;
          border-color: #0f766e;
          color: #ffffff;
          font-weight: 600;
          padding: 10px 12px;
          border-radius: 6px;
        }

        .authPrimaryBtn:hover {
          background: #0b5f59;
          border-color: #0b5f59;
        }

        .authLink {
          color: #0f766e;
          text-decoration: none;
          font-weight: 600;
        }

        .authLink:hover {
          color: #0b5f59;
          text-decoration: underline;
        }

        .form-check-input:focus {
          box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.6);
        }
      `}</style>
    </div>
  );
}
