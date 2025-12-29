"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Install Swiper modules

const BrandArea = () => {
    const brandImages = [
        "assets/images/brand/edunextg-1.png",
        "assets/images/brand/edunextg-2.png",
        "assets/images/brand/edunextg-3.png",
        "assets/images/brand/edunextg-4.png",
        "assets/images/brand/edunextg-5.png",
        "assets/images/brand/edunextg-6.png",
        "assets/images/brand/edunextg-7.png",
        "assets/images/brand/edunextg-8.png",
        "assets/images/brand/edunextg-9.png",
        "assets/images/brand/edunextg-10.png",
        "assets/images/brand/edunextg-11.png",
        "assets/images/brand/edunextg-12.png",
        "assets/images/brand/edunextg-13.png",
        "assets/images/brand/edunextg-14.png",
        "assets/images/brand/edunextg-15.png",
        "assets/images/brand/edunextg-16.png",
        "assets/images/brand/edunextg-17.png",
        "assets/images/brand/edunextg-18.jpg",
        "assets/images/brand/edunextg-19.png",
        "assets/images/brand/edunextg-20.png",
        
    ];

    return (
        <div className="rts-brand-area-start pb--80" dir="ltr">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-style-4-center pb--55">
                            <h2 className="title">Our Exclusive Clients</h2>
                        </div>
                        <div className="brand-area-main-wrapper">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={5}
                                loop={true}
                                breakpoints={{
                                    320: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {brandImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="single-brand">
                                            <img src={image} alt={`brand-${index + 1}`} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandArea;
