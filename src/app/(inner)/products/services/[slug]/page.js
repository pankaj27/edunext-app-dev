"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeaderTwo from "@/components/header/HeaderTwo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";

export default function ServiceProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState("");
  const [orderForm, setOrderForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    deliveryLocation: "",
  });

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    function slugify(value) {
      const v = typeof value === "string" ? value.trim().toLowerCase() : "";
      return v.replace(/[^a-z0-9]+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    }

    async function load() {
      try {
        setIsLoading(true);
        setLoadError("");
        const res = await fetch("/api/products/service", { cache: "no-store" });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json || json.ok !== true) {
          const message = json?.error || "Failed to load product";
          throw new Error(message);
        }
        const list = Array.isArray(json.data) ? json.data : [];
        const slugValue = Array.isArray(slug) ? slug[0] : slug;
        const numericId = Number(slugValue);
        const found =
          Number.isFinite(numericId) && String(numericId) === String(slugValue)
            ? list.find((p) => Number(p?.id) === numericId)
            : list.find((p) => slugify(p?.name) === String(slugValue || ""));
        if (!cancelled) setProduct(found || null);
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : "Failed to load product");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="">
        <HeaderTwo />
        <div className="rts-blog-list-area rts-section-gapTop">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-info mb-0" role="alert">
                  Loading...
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <FooterOne />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="">
        <HeaderTwo />
        <div className="rts-blog-list-area rts-section-gapTop">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger mb-0" role="alert">
                  {loadError}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <FooterOne />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="">
        <HeaderTwo />
        <div className="rts-blog-list-area rts-section-gapTop">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-warning mb-0" role="alert">
                  Product not found
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <FooterOne />
      </div>
    );
  }

  const unitPrice = Number(product?.price || 0);
  const qtyNumber = 1;
  const totalPrice = Number(unitPrice.toFixed(2));
  const shortDesc = typeof product?.shortDesc === "string" ? product.shortDesc.trim() : "";
  const longDescText = typeof product?.longDesc === "string" ? product.longDesc.trim() : "";
  const longDescParts = longDescText
    ? longDescText
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];
  const productImages = Array.isArray(product?.images) ? product.images.filter((s) => typeof s === "string" && s.trim()) : [];
  const sliderImages = productImages.length ? productImages : ["/assets/images/blog/01.webp"];
  const sliderShouldLoop = sliderImages.length > 1;

  const openOrder = () => {
    setOrderError("");
    setOrderSuccess("");
    setIsOrderOpen(true);
  };

  const closeOrder = () => {
    if (isPlacingOrder) return;
    setIsOrderOpen(false);
  };

  const onOrderFieldChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    setOrderError("");
    setOrderSuccess("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "service",
          productId: product.id,
          firstName: orderForm.firstName,
          lastName: orderForm.lastName,
          email: orderForm.email,
          contactNo: orderForm.contactNo,
          deliveryLocation: orderForm.deliveryLocation,
          quantity: qtyNumber,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json || json.ok !== true) {
        throw new Error(json?.error || "Failed to place order");
      }
      setOrderSuccess("Booking submitted successfully");
      setOrderForm({
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        deliveryLocation: "",
      });
      setIsOrderOpen(false);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="">
      <HeaderTwo />

      <>
        <div className="career-single-banner-area ptb--70 blog-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="career-page-single-banner blog-page">
                  <h1 className="title">{product.name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rts-blog-list-area rts-section-gapTop">
          <div className="container">
            <div className="row g-5">
              <div className="col-xl-8 col-md-12 col-sm-12 col-12">
                <div className="blog-single-post-listing details mb--0">
                  <div className="thumbnail">
                    <Swiper
                      slidesPerView={1}
                      loop={sliderShouldLoop}
                      navigation={sliderShouldLoop}
                      pagination={{ clickable: true }}
                      modules={[Navigation, Pagination]}
                      className="productImageSwiper"
                    >
                      {sliderImages.map((src) => (
                        <SwiperSlide key={src}>
                          <div className="productImageSlide">
                            <img src={src} alt={product.name} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="blog-listing-content">
                    {orderSuccess ? (
                      <div className="alert alert-success" role="alert">
                        {orderSuccess}
                      </div>
                    ) : null}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                      <div>
                        <div className="text-muted small">Price</div>
                        <div className="h5 mb-0">₹{unitPrice.toFixed(2)}</div>
                      </div>
                      <button type="button" className="rts-btn btn-primary" onClick={openOrder}>
                        Book Now
                      </button>
                    </div>
                    <h3 className="title animated fadeIn">{product.name}</h3>
                    {shortDesc ? <p className="disc para-1">{shortDesc}</p> : null}
                    {longDescParts.length
                      ? longDescParts.map((text, idx) => (
                          <p key={`${idx}-${text.slice(0, 12)}`} className="disc">
                            {text}
                          </p>
                        ))
                      : null}

                    <div className="row g-3 mt-4">
                      <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body p-3">
                            <div className="text-muted small">Product Type</div>
                            <div className="fw-semibold">Service</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body p-3">
                            <div className="text-muted small">Status</div>
                            <div className="fw-semibold">{product.status === "inactive" ? "Inactive" : "Active"}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body p-3">
                            <div className="text-muted small">Stock</div>
                            <div className="fw-semibold">{Number(product.stock || 0)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <style jsx>{`
                      :global(.productImageSwiper) {
                        width: 100%;
                      }
                      .productImageSlide {
                        width: 100%;
                        height: 420px;
                        border-radius: 14px;
                        overflow: hidden;
                        background: #f1f5f9;
                        border: 1px solid #e2e8f0;
                      }
                      .productImageSlide img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: block;
                      }
                      @media (max-width: 768px) {
                        .productImageSlide {
                          height: 280px;
                        }
                      }
                    `}</style>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-12 col-sm-12 col-12  pd-control-bg--40">
                <div className="rts-single-wized search">
                  <div className="wized-header">
                    <h5 className="title">Search Hear</h5>
                  </div>
                  <div className="wized-body">
                    <div className="rts-search-wrapper">
                      <input className="Search" type="text" placeholder="Enter Keyword" />
                      <button>
                        <i className="fal fa-search" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rts-single-wized Categories">
                  <div className="wized-header">
                    <h5 className="title">Categories</h5>
                  </div>
                  <div className="wized-body">
                    <ul className="single-categories">
                      <li>
                        <a href="#">
                          Business Solution <i className="far fa-long-arrow-right" />
                        </a>
                      </li>
                    </ul>
                    <ul className="single-categories">
                      <li>
                        <a href="#">
                          Strategy Growth
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </li>
                    </ul>
                    <ul className="single-categories">
                      <li>
                        <a href="#">
                          Finance Solution
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </li>
                    </ul>
                    <ul className="single-categories">
                      <li>
                        <a href="#">
                          Investment Policy
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </li>
                    </ul>
                    <ul className="single-categories">
                      <li>
                        <a href="#">
                          Tax Managment
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rts-single-wized Recent-post">
                  <div className="wized-header">
                    <h5 className="title">Recent Posts</h5>
                  </div>
                  <div className="wized-body">
                    <div className="recent-post-single">
                      <div className="thumbnail">
                        <a href="#">
                          <img src="/assets/images/blog/sm/01.jpg" alt="Blog_post" />
                        </a>
                      </div>
                      <div className="content-area">
                        <div className="user">
                          <i className="fal fa-clock" />
                          <span>15 Jan, 2023</span>
                        </div>
                        <a className="post-title" href="#">
                          <h6 className="title">We would love to share a similar experience</h6>
                        </a>
                      </div>
                    </div>
                    <div className="recent-post-single">
                      <div className="thumbnail">
                        <a href="#">
                          <img src="/assets/images/blog/sm/02.jpg" alt="Blog_post" />
                        </a>
                      </div>
                      <div className="content-area">
                        <div className="user">
                          <i className="fal fa-clock" />
                          <span>15 Jan, 2023</span>
                        </div>
                        <a className="post-title" href="#">
                          <h6 className="title">We would love to share a similar experience</h6>
                        </a>
                      </div>
                    </div>
                    <div className="recent-post-single">
                      <div className="thumbnail">
                        <a href="#">
                          <img src="/assets/images/blog/sm/03.jpg" alt="Blog_post" />
                        </a>
                      </div>
                      <div className="content-area">
                        <div className="user">
                          <i className="fal fa-clock" />
                          <span>15 Jan, 2023</span>
                        </div>
                        <a className="post-title" href="#">
                          <h6 className="title">We would love to share a similar experience</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rts-single-wized Recent-post">
                  <div className="wized-header">
                    <h5 className="title">Gallery Posts</h5>
                  </div>
                  <div className="wized-body">
                    <div className="gallery-inner">
                      <div className="row-1 single-row">
                        <a href="#">
                          <img src="/assets/images/blog/sm/04.jpg" alt="Gallery" />
                        </a>
                        <a href="#">
                          <img src="/assets/images/blog/sm/05.jpg" alt="Gallery" />
                        </a>
                        <a href="#">
                          <img src="/assets/images/blog/sm/06.jpg" alt="Gallery" />
                        </a>
                      </div>
                      <div className="row-2 single-row">
                        <a href="#">
                          <img src="/assets/images/blog/sm/07.jpg" alt="Gallery" />
                        </a>
                        <a href="#">
                          <img src="/assets/images/blog/sm/08.jpg" alt="Gallery" />
                        </a>
                        <a href="#">
                          <img src="/assets/images/blog/sm/09.jpg" alt="Gallery" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rts-single-wized">
                  <div className="wized-header">
                    <h5 className="title">Popular Tags</h5>
                  </div>
                  <div className="wized-body">
                    <div className="tags-wrapper">
                      <a href="#">Services</a>
                      <a href="#">Business</a>
                      <a href="#">Growth</a>
                      <a href="#">Finance</a>
                      <a href="#">UI/UX Design</a>
                      <a href="#">Solution</a>
                      <a href="#">Speed</a>
                      <a href="#">Strategy</a>
                      <a href="#">Technology</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {isOrderOpen ? (
        <>
          <div className="modal fade show" role="dialog" aria-modal="true" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content modalOrder">
                <div className="modal-header modalOrderHeader">
                  <div className="d-flex align-items-center gap-3">
                    <div className="modalOrderIcon" aria-hidden="true">
                      <i className="fa-solid fa-bag-shopping" />
                    </div>
                    <div>
                      <div className="h5 mb-0">Book your service</div>
                      <div className="text-muted small">Fill in your details to confirm</div>
                    </div>
                  </div>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeOrder} disabled={isPlacingOrder} />
                </div>
                <form onSubmit={submitOrder}>
                  <div className="modal-body">
                    {orderError ? (
                      <div className="alert alert-danger" role="alert">
                        {orderError}
                      </div>
                    ) : null}
                    <div className="row g-4">
                      <div className="col-12 col-lg-7">
                        <div className="modalSectionTitle mb-3">Customer details</div>
                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">First name</label>
                            <input
                              className="form-control"
                              name="firstName"
                              value={orderForm.firstName}
                              onChange={onOrderFieldChange}
                              placeholder="Enter first name"
                              required
                              disabled={isPlacingOrder}
                            />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Last name</label>
                            <input
                              className="form-control"
                              name="lastName"
                              value={orderForm.lastName}
                              onChange={onOrderFieldChange}
                              placeholder="Enter last name"
                              required
                              disabled={isPlacingOrder}
                            />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Email id</label>
                            <div className="input-group">
                              <span className="input-group-text" aria-hidden="true">
                                <i className="fa-regular fa-envelope" />
                              </span>
                              <input
                                className="form-control"
                                name="email"
                                type="email"
                                value={orderForm.email}
                                onChange={onOrderFieldChange}
                                placeholder="name@example.com"
                                required
                                disabled={isPlacingOrder}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Contact no</label>
                            <div className="input-group">
                              <span className="input-group-text" aria-hidden="true">
                                <i className="fa-solid fa-phone" />
                              </span>
                              <input
                                className="form-control"
                                name="contactNo"
                                type="tel"
                                value={orderForm.contactNo}
                                onChange={onOrderFieldChange}
                                placeholder="Enter contact number"
                                required
                                disabled={isPlacingOrder}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <label className="form-label fw-semibold">Delivery location</label>
                            <div className="input-group">
                              <span className="input-group-text" aria-hidden="true">
                                <i className="fa-solid fa-location-dot" />
                              </span>
                              <input
                                className="form-control"
                                name="deliveryLocation"
                                value={orderForm.deliveryLocation}
                                onChange={onOrderFieldChange}
                                placeholder="Enter full delivery location"
                                required
                                disabled={isPlacingOrder}
                              />
                            </div>
                          </div>
                          <div className="col-12 d-flex align-items-end">
                            <div className="text-muted small">By placing the order, you confirm your details are correct.</div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-lg-5">
                        <div className="modalSectionTitle mb-3">Booking summary</div>
                        <div className="card border-0 shadow-sm modalSummaryCard">
                          <div className="card-body p-3 p-md-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="summaryThumb">
                                <img src={sliderImages[0]} alt={product.name} />
                              </div>
                              <div className="flex-grow-1">
                                <div className="fw-semibold">{product.name}</div>
                                <div className="text-muted small">Product Type: Service</div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="d-flex justify-content-between mb-2">
                                <div className="text-muted">Unit price</div>
                                <div className="fw-semibold">₹{unitPrice.toFixed(2)}</div>
                              </div>
                              <div className="modalDivider my-3" />
                              <div className="d-flex justify-content-between">
                                <div className="fw-semibold">Total price</div>
                                <div className="h5 mb-0">₹{totalPrice.toFixed(2)}</div>
                              </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-end gap-2 mt-4 modalActions">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm px-3"
                                onClick={closeOrder}
                                disabled={isPlacingOrder}
                              >
                                Cancel
                              </button>
                              <button type="submit" className="btn btn-primary btn-sm px-3" disabled={isPlacingOrder}>
                                {isPlacingOrder ? "Booking..." : "Book Now"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={closeOrder} style={{ backgroundColor: "#000", opacity: 0.6 }} />
          <style jsx>{`
            :global(.modalOrder) {
              border-radius: 18px;
              overflow: hidden;
            }
            :global(.modalOrderHeader) {
              background: linear-gradient(135deg, rgba(13, 110, 253, 0.10), rgba(13, 110, 253, 0));
              border-bottom: 1px solid rgba(226, 232, 240, 0.9);
              padding: 18px 20px;
            }
            :global(.modalOrderIcon) {
              width: 44px;
              height: 44px;
              border-radius: 14px;
              background: rgba(13, 110, 253, 0.12);
              color: #0d6efd;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              flex: 0 0 auto;
            }
            :global(.modalSectionTitle) {
              font-weight: 800;
              letter-spacing: 0.2px;
            }
            :global(.modalSummaryCard) {
              border-radius: 16px;
            }
            :global(.summaryThumb) {
              width: 70px;
              height: 70px;
              border-radius: 14px;
              overflow: hidden;
              background: #f1f5f9;
              border: 1px solid #e2e8f0;
              flex: 0 0 auto;
            }
            :global(.summaryThumb img) {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
            :global(.modalDivider) {
              height: 1px;
              background: #e2e8f0;
            }
            :global(.modalActions) {
              flex-wrap: wrap;
            }
            @media (max-width: 991px) {
              :global(.modalOrderHeader) {
                padding: 16px 16px;
              }
            }
          `}</style>
        </>
      ) : null}

      <FooterOne />
      <BackToTop />
    </div>
  );
}

