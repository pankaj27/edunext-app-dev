"use client"; // Add if you're using Next.js App Router

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Corrected import path
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialsThree() {
  const testimonials = [
    {
      text: "Edunextg provided us with a well-structured IT solution that improved our workflow significantly. Their team was clear in communication and very responsive throughout the project. The delivery was on time and met our expectations.",
      image: "/assets/images/testimonials/01.png",
      name: "Amit Sharma",
      position: "Delhi",
    },
    {
      text: "We had a smooth experience working with Edunextg. They understood our requirements in detail and suggested practical solutions rather than generic ones. Their technical support after delivery was also very reliable.",
      image: "/assets/images/testimonials/02.png",
      name: "Priya Banerjee",
      position: "Kolkata",
    },
    {
      text: "Edunextg impressed us with their professionalism and technical knowledge. The team handled our project efficiently and kept us updated at every stage. Overall, a dependable IT solutions partner.",
      image: "/assets/images/testimonials/02.png",
      name: "Rahul Verma",
      position: "Lucknow",
    },
    {
      text: "The solutions provided by Edunextg helped us streamline our digital systems. Their team is skilled, cooperative, and quick to resolve any issues. We are satisfied with both the quality and support.",
      image: "/assets/images/testimonials/02.png",
      name: "Sneha Iyer",
      position: "Bengaluru",
    },
    {
      text: "Working with Edunextg was a positive experience. They delivered a scalable and secure solution that aligned well with our business goals. The team was approachable and supportive throughout the process.",
      image: "/assets/images/testimonials/02.png",
      name: "Ankit Patel",
      position: "Ahmedabad",
    },
  ];

  return (
    <div className="rts-testimonials-area-about rts-section-gap bg-dark-1"  dir="ltr">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="testimonails-title-wrapper-between"> 
              <h2 className="title">What they said about us</h2>
              <div className="swiper-btn">
                <div className="swiper-button-next">
                  <i className="fa-regular fa-arrow-right"></i>
                </div>
                <div className="swiper-button-prev">
                  <i className="fa-regular fa-arrow-left"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt--55">
            <div className="swiper-area-main-wrapper mySwiper-testimonials-5  position-relative">
              <Swiper
                 modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={3}
                spaceBetween={18}
                loop={true}
                eed={700}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                className="mySwiper-testimonials-5"
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 25 },
                  768: { slidesPerView: 2, spaceBetween: 25 },
                  980: { slidesPerView: 2, spaceBetween: 25 },
                  1280: { slidesPerView: 3, spaceBetween: 25 },
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="single-testimonials-about">
                      <p className="disc">{testimonial.text}</p>
                      <div className="author-area">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="testimonial-image"
                        />
                        <div className="information">
                          <h5 className="title">{testimonial.name}</h5>
                          <p>{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
