"use client";
import BackToTop from "@/components/common/BackToTop";
import React, { useEffect, useState } from "react";
import HeaderTwo from "@/components/header/HeaderTwo";
import FooterOne from "@/components/footer/FooterOne";
import BlogGridMain from "./BlogGridMain";
function page() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch("/api/products/hardware", { cache: "no-store" });
                const json = await res.json().catch(() => null);
                if (!res.ok || !json || json.ok !== true) {
                    const message = json?.error || "Failed to load hardware products";
                    throw new Error(message);
                }
                if (!cancelled) setProducts(Array.isArray(json.data) ? json.data : []);
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load hardware products");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <HeaderTwo />
            <>
                <div className="career-single-banner-area ptb--70 blog-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="career-page-single-banner blog-page">
                                    <h1 className="title">Hardware Products</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rts-blog-area rts-section-gapTop position-relative">
                    <div className="container">
                        {error ? (
                            <div className="row">
                                <div className="col-12">
                                    <div className="alert alert-danger mb-0" role="alert">
                                        {error}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className="row g-5">
                            {isLoading
                                ? Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="single-blog-area-start border-none">
                                            <div className="thumbnail">
                                                <div style={{ width: "100%", height: 220, background: "#f2f2f2" }} />
                                            </div>
                                            <div className="inner-content-area">
                                                <div className="top-area">
                                                    <div style={{ height: 18, width: "60%", background: "#f2f2f2" }} />
                                                    <div style={{ height: 14, width: "90%", background: "#f2f2f2", marginTop: 12 }} />
                                                    <div style={{ height: 14, width: "70%", background: "#f2f2f2", marginTop: 8 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : products.map((product) => {
                                return (
                                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="single-blog-area-start border-none">
                                            {
                                                <BlogGridMain
                                                    Slug={product.id}
                                                    blogImage={product.thumbnailDataUrl || (Array.isArray(product.images) ? product.images[0] : "")}
                                                    blogTitle={product.name}
                                                    description={product.shortDesc || product.longDesc}
                                                />
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                            {/* }).slice(0, 6)} */}
                        </div>
                        {/* <div className="row mt--50">
                            <div className="col-lg-12">
                                <div className="pagination-one">
                                    <ul className=" justify-content-center">
                                        <li>
                                            <button className="active">01</button>
                                        </li>
                                        <li>
                                            <button>02</button>
                                        </li>
                                        <li>
                                            <button>03</button>
                                        </li>
                                        <li>
                                            <button>04</button>
                                        </li>
                                        <li>
                                            <button className="next-page">
                                                <i className="fa-solid fa-chevrons-right" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </>

            <BackToTop />
            <FooterOne />
        </>

    )
}

export default page
