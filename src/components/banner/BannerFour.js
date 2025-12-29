"use client"
import React from 'react'
import { useEffect } from "react";
import AOS from "aos";
import { ReactSVG } from 'react-svg';
import "aos/dist/aos.css";
function BannerFour() {
    useEffect(() => {
        AOS.init({
            disableMutationObserver: true,
            once: true,
        });
    }, []);
    return (
        <div>

            {/* rts banner four start */}
            <div className="banner-four-area banner-four-bg rts-section-gap jarallax">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner-four-wrapper">
                                <div className="inner-left">
                                    <h1
                                        className="title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                                        Your Challenge is our Progress
                                    </h1>
                                    <p
                                        className="disc" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000"
                                    >
                                        Committed to Lifelong Learning Platform In A Caring Environment. 
                                Lead The Way To A Brighter Day With Innovation. We teach, model, and encourage a love of learning collaboration. Building community by honoring all transactions.
                                                    

                            
                                    </p>
                                </div>
                                <div
                                    className="right-inner-button" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000"
                                >
                                    <a href="contact.html">
                                        <img src="assets/images/service/icons/04.png" alt="img" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shape wow toBottomLeft">
                    <img src="assets/images/banner/01.png" alt="banner" />
                </div>
                {/* <div className='bg_image-b-4'>
                <img src="assets/images/banner/04.webp" alt="banner" />
            </div> */}
            </div>
            {/* rts banner four end */}

        </div>
    )
}

export default BannerFour