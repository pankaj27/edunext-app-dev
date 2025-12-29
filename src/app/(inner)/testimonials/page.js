
"use client"
import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";
import Testimonials from "@/components/testimonials/Testimonials";
import CtaOne from "@/components/cta/CtaOne";
import { ReactSVG } from 'react-svg';
export default function Home() {
    return (
        <div className='#'>
            <HeaderTwo />

            <>
                {/* banner content partner */}
                <div className="banner-content-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="banner-partner-inner-wrapper">
                                    <h1 className="title">
                                        Honoring Achievement <br /> A Community Celebration
                                    </h1>
                                    <p>
                                        Let's collaborate to accelerate innovation and engineer breakthrough technological solutions.
                                    </p>
                                    <div className="thumbnail-large jarallax" data-speed=".7">
                                        <img
                                            className="jarallax-img"
                                            src="assets/images/partner/testimonials-1.jpg"
                                            alt="partner"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 offset-lg-2">
                                <p>
                                    Since our inception in 2017, EduNextG India LLP’s journey has been driven by innovation, dedication, and meaningful impact in the education sector. Our technology-driven solutions and commitment to enhancing teaching-learning experiences have earned appreciation from industry leaders and educational institutions alike. This recognition reflects the trust placed in us by our partners and the relentless efforts of our passionate team. Each milestone motivates us to continuously evolve, deliver effective and sustainable education and IT solutions, and set higher standards in transforming the educational ecosystem across India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* banner content partner end */}
            </>
            <>
                {/* awards area start */}
                {/* <div className="awards-area-inner rts-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="award-area-inner-page">
                                    <h2 className="title">
                                        Celebrating Excellence with <br /> Our Community
                                    </h2>
                                    <div className="row g-5 mt--20">
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".1s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/01.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".3s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/02.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".5s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/03.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".7s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/04.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".9s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/05.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".1s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/06.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".3s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/07.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".5s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/08.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".7s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/09.webp" alt="award" />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-20 col-md-4 col-sm-6 col-6 wow fadeInUp"
                                            data-wow-delay=".9s"
                                        >
                                            <div className="single-awards">
                                                <img src="assets/images/award/10.webp" alt="award" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* awards area end */}
            </>




            <Testimonials />
            <div>

                {/* rts cta area start */}
                <div className="rts-cts-area rts-section-gapTop">
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
                                            A comprehensive platform that unifies innovation and end-to-end data management, enabling your team to address complex challenges with clarity and efficiency.
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
            <FooterOne />
            <BackToTop />
        </div>
    );
}
