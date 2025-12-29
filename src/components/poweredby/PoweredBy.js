"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Install Swiper modules

const PoweredBy = () => {
    const brandImages = [
        "assets/images/powered-by/powered-by-1.png",
        "assets/images/powered-by/powered-by-2.png",
        "assets/images/powered-by/powered-by-3.png",
        "assets/images/powered-by/powered-by-4.png",
        "assets/images/powered-by/powered-by-5.png",
        "assets/images/powered-by/powered-by-6.png",
        "assets/images/powered-by/powered-by-7.png",
        "assets/images/powered-by/powered-by-8.png",
        "assets/images/powered-by/powered-by-9.png",
        "assets/images/powered-by/powered-by-10.png",
        "assets/images/powered-by/powered-by-11.png",
        "assets/images/powered-by/powered-by-12.png",
        "assets/images/powered-by/powered-by-13.png",
        "assets/images/powered-by/powered-by-14.png",
        "assets/images/powered-by/powered-by-15.png",
        "assets/images/powered-by/powered-by-16.png",
        "assets/images/powered-by/powered-by-17.png",
        "assets/images/powered-by/powered-by-18.png",
        "assets/images/powered-by/powered-by-19.png",
        
        
    ];

    return (
        <div className="rts-brand-area-start pt--80" dir="ltr">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-style-4-center pb--55">
                            <h2 className="title">Powered By</h2>
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

export default PoweredBy;
