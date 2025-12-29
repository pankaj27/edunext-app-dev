"use client"
import React, { useEffect } from 'react';
// import SVGInject from 'svg-injector';
import AOS from "aos";
import "aos/dist/aos.css";
import { ReactSVG } from 'react-svg';
function CtaOne() {
    // useEffect(() => {
    //     // SVGInject will inject SVGs in images with the class 'injectable'
    //     SVGInject(document.querySelectorAll("img.injectable"));
    // }, []); // Empty dependency array means it runs once when the component mounts
    useEffect(() => {
        AOS.init({
            disableMutationObserver: true,
            once: true,
        });
    }, []);
    return (
        <div>

            {/* rts cta area start */}
            <div className="rts-cts-area" data-aos="zoom-in" data-aos-delay="300">
                <div className="container">
                    <div className="row">
                        <div className="col-gl-12">
                            <div className="cta-one-wrapper">
                                <div className="shape-area">
                                    <img
                                        loading="lazy"
                                        rel="preload"
                                        src="assets/images/cta/02.png"
                                        alt="cta-area"
                                    />
                                </div>
                                <div className="left-area">
                                    <h3 className="title wow fadeInUp" data-wow-delay=".1s">
                                        Book a Free Consultation
                                    </h3>
                                    <p className="wow fadeInUp" data-wow-delay=".3s">
                                        Delivers a single, integrated platform that drives innovation and enables seamless end-to-end data management. Discover how we empower your team to overcome today’s most critical challenges.
                                    </p>
                                    <a
                                        href="/contact"
                                        className="rts-btn btn-primary wow fadeInUp"
                                        data-wow-delay=".5s"
                                    >
                                        Schedule Now
                                        <ReactSVG
                                            src="assets/images/service/icons/13.svg"
                                            alt="arrow"
                                        />
                                    </a>
                                </div>
                                <div className="right wow move-out" data-wow-offset={140}>
                                    <img
                                        src="assets/images/cta/01.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* rts cta area end */}

        </div>
    )
}

export default CtaOne