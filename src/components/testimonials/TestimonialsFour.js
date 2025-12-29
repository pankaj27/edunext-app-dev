"use client"
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Import modules
import "swiper/css/navigation";
function Testimonials() {
    return (
        <div>
            <div className="rts-testimonials-area rts-section-gap bg-solution">
                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="swiper-testimonials-wrapper-full-center">
                                <div className="swiper mySwiper-testimonials-4" dir="ltr">


                                    <Swiper
                                        slidesPerView={2.4}
                                        spaceBetween={150}
                                        loop={true}
                                        centeredSlides={true}
                                        modules={[Navigation, Autoplay]}
                                        autoplay={{
                                            delay: 3500,
                                            disableOnInteraction: false,
                                        }}
                                        speed={1000}
                                        navigation={{
                                            nextEl: ".swiper-button-next",
                                            prevEl: ".swiper-button-prev",
                                        }}
                                        breakpoints={{
                                            // When the viewport is >= 640px
                                            240: {
                                                slidesPerView: 1,
                                                spaceBetween: 0,
                                            },
                                            // When the viewport is >= 768px
                                            768: {
                                                slidesPerView: 1,
                                                spaceBetween: 0,
                                            },
                                            // When the viewport is >= 1024px
                                            1024: {
                                                slidesPerView: 2,
                                                spaceBetween: 150,
                                            },
                                        }}
                                    >
                                        <SwiperSlide>
                                            <div className="single-testimonials-4">
                                                <p className="disc">
                                                    “Edunextg provided us with a well-structured IT solution that improved our workflow significantly. Their team was clear in communication and very responsive throughout the project. The delivery was on time and met our expectations.”
                                                </p>
                                                <div className="user-area">
                                                    <img
                                                        src="assets/images/testimonials/09.png"
                                                        alt="testimonials"
                                                    />
                                                    <div className="info-area">
                                                        <h6 className="title">Amit Sharma</h6>
                                                        <span>Delhi</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="single-testimonials-4">
                                                <p className="disc">
                                                    “We had a smooth experience working with Edunextg. They understood our requirements in detail and suggested practical solutions rather than generic ones. Their technical support after delivery was also very reliable.”
                                                </p>
                                                <div className="user-area">
                                                    <img
                                                        src="assets/images/testimonials/08.png"
                                                        alt="testimonials"
                                                    />
                                                    <div className="info-area">
                                                        <h6 className="title">Priya Banerjee</h6>
                                                        <span>Kolkata</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="single-testimonials-4">
                                                <p className="disc">
                                                    “The solutions provided by Edunextg helped us streamline our digital systems. Their team is skilled, cooperative, and quick to resolve any issues. We are satisfied with both the quality and support.”
                                                </p>
                                                <div className="user-area">
                                                    <img
                                                        src="assets/images/testimonials/07.png"
                                                        alt="testimonials"
                                                    />
                                                    <div className="info-area">
                                                        <h6 className="title">Sneha Iyer</h6>
                                                        <span>Bengaluru</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="single-testimonials-4">
                                                <p className="disc">
                                                    “Working with Edunextg was a positive experience. They delivered a scalable and secure solution that aligned well with our business goals. The team was approachable and supportive throughout the process.”
                                                </p>
                                                <div className="user-area">
                                                    <img
                                                        src="assets/images/testimonials/01.png"
                                                        alt="testimonials"
                                                    />
                                                    <div className="info-area">
                                                        <h6 className="title">Ankit Patel</h6>
                                                        <span>Ahmedabad</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="single-testimonials-4">
                                                <p className="disc">
                                                    “Edunextg offered us reliable IT services with clear guidance from start to finish. Their timely response and attention to detail made the entire process stress-free. We would definitely recommend their services.”
                                                </p>
                                                <div className="user-area">
                                                    <img
                                                        src="assets/images/testimonials/02.png"
                                                        alt="testimonials"
                                                    />
                                                    <div className="info-area">
                                                        <h6 className="title">Neha Singh</h6>
                                                        <span>Patna</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>


                                    </Swiper>
                                    <div className="swiper-button-next" />
                                    <div className="swiper-button-prev" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Testimonials