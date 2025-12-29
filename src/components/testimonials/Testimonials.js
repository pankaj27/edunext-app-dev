"use client"
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, Autoplay } from "swiper/react";
function Testimonials() {
    return (
        <div>
            {/* testimonials area start */}
            <div className="testimonials-area-start rts-section-gapTop bg-primary position-relative">
                <div className="shape-top-right wow slideInLeft" data-wow-offset={160}>
                    <img
                        loading="lazy"
                        rel="preload"
                        src="assets/images/testimonials/03.png"
                        alt="testimopnials"
                    />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-wrapper">
                                <h2 className="title">Client Testimonials</h2>
                                <p className="disc">
                                    At Edunextg, we take pride in the positive impact
                                    we had on our clients businesses. Here are some testimonials
                                    from our satisfied customers:
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--80">
                        <div className="col-lg-12 ">
                            <div className="swiper mySwiper-Testimonials" dir="ltr">

                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={0}
                                    loop={true}
                                    autoplay={{
                                        delay: 500,
                                        disableOnInteraction: false,
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
                                            spaceBetween: 0,
                                        },
                                    }}
                                    speed={1000}
                                >
                                    <SwiperSlide>
                                        <div className="single-testimonials-area-one">
                                            <p className="disc">
                                                “Edunextg provided us with a well-structured IT solution that improved our workflow significantly. Their team was clear in communication and very responsive throughout the project. The delivery was on time and met our expectations.”
                                            </p>
                                            <div className="author-wrapper">
                                                <div className="avatar">
                                                    <imgs

                                                        src="assets/images/testimonials/01.webp"
                                                        alt="testimonails-avatar"
                                                    />
                                                </div>
                                                <div className="information">
                                                    <h6 className="title">Amit Sharma</h6>
                                                    <span className="desig">Delhi</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-testimonials-area-one">
                                            <p className="disc">
                                                 “We had a smooth experience working with Edunextg. They understood our requirements in detail and suggested practical solutions rather than generic ones. Their technical support after delivery was also very reliable.”
                                            </p>
                                            <div className="author-wrapper">
                                                <div className="avatar">
                                                    <img

                                                        src="assets/images/testimonials/02.webp"
                                                        alt="testimonails-avatar"
                                                    />
                                                </div>
                                                <div className="information">
                                                    <h6 className="title">Priya Banerjee</h6>
                                                    <span className="desig">Kolkata</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-testimonials-area-one">
                                            <p className="disc">
                                                 “Edunextg impressed us with their professionalism and technical knowledge. The team handled our project efficiently and kept us updated at every stage. Overall, a dependable IT solutions partner.”
                                            </p>
                                            <div className="author-wrapper">
                                                <div className="avatar">
                                                    <img

                                                        src="assets/images/testimonials/01.webp"
                                                        alt="testimonails-avatar"
                                                    />
                                                </div>
                                                <div className="information">
                                                    <h6 className="title">Rahul Verma</h6>
                                                    <span className="desig">Lucknow</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-testimonials-area-one">
                                            <p className="disc">
                                               “The solutions provided by Edunextg helped us streamline our digital systems. Their team is skilled, cooperative, and quick to resolve any issues. We are satisfied with both the quality and support.”
                                            </p>
                                            <div className="author-wrapper">
                                                <div className="avatar">
                                                    <img

                                                        src="assets/images/testimonials/02.webp"
                                                        alt="testimonails-avatar"
                                                    />
                                                </div>
                                                <div className="information">
                                                    <h6 className="title">Sneha Iyer</h6>
                                                    <span className="desig">Bengaluru</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-testimonials-area-one">
                                            <p className="disc">
                                                “Working with Edunextg was a positive experience. They delivered a scalable and secure solution that aligned well with our business goals. The team was approachable and supportive throughout the process.”
                                            </p>
                                            <div className="author-wrapper">
                                                <div className="avatar">
                                                    <img

                                                        src="assets/images/testimonials/02.webp"
                                                        alt="testimonails-avatar"
                                                    />
                                                </div>
                                                <div className="information">
                                                    <h6 className="title">Ankit Patel</h6>
                                                    <span className="desig">Ahmedabad</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* testimonials area end */}
        </div>
    )
}

export default Testimonials