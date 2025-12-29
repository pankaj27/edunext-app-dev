"use client"
import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";
import Testimonials from "@/components/testimonials/Testimonials";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Home() {
    useEffect(() => {
        AOS.init({
            disableMutationObserver: true,
            once: true,
        });
    }, []);
    return (
        <div className='#'>
            <HeaderTwo />

            <>
                <div className="rts-career-banner-area rts-section-gap">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="career-banner-wrapper">
                                    <h1 className="title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                                        Free Education Technology Consultation
                                    </h1>
                                    <p className="disc" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                        At EduNextG India LLP, we believe every educational institution has unique challenges and goals. Our free consultation is designed to understand your specific requirements and recommend the most effective, customized education and IT solutions. With our expertise in digital education, infrastructure, and institutional systems, we help you leverage the right technology to enhance teaching, learning, and operational efficiency—without any obligation. Let’s work together to build a smarter, future-ready educational ecosystem.
                                    </p>
                                    <a href="/about" className="rts-btn btn-primary btn-bold" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                        Know More About Us
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6 pl--30 pl_md--15 pl_sm--10 mt_md--30 mt_sm--30">
                                <div
                                    className="thumbnail-top thumbnail-consultancy" data-aos="zoom-out" data-aos-duration="1000" data-aos-delay="100"
                                >
                                    <img
                                        className="jarallax-img"
                                        src="assets/images/consultancy/free6.jpg"
                                        alt="career"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="consultancy-bottom rts-section-gapBottom career-two-section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 pr--40 pr_md--15 pr_sm--10">
                                <div className="thumbnail-consultancy" data-aos="zoom-out" data-aos-duration="1000" data-aos-delay="100">
                                    <img
                                        className="jarallax-img"
                                        src="assets/images/consultancy/free5.avif"
                                        alt="consultancy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 pt_md--50 mt_sm--30">
                                <div className="career-right-two-wrapper">
                                    <h2 className="title">
                                        Our IT Consulting &amp; <br /> Advisory Services
                                    </h2>
                                    <p>
                                        EduNextG India LLP offers a free consultation to help educational institutions identify the right technology and infrastructure solutions. We analyze your academic and operational needs and recommend customized, future-ready solutions that enhance teaching, learning, and efficiency—guided by our belief that education is not just a business.
                                    </p>
                                    <div className="check-wrapper-main">
                                        <div className="single-wrapper">
                                            <div className="check-wrapper">
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p> Trusted by leading institutions</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Customized, scalable solutions</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Strong digital education expertise</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>End-to-end institutional support</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Reliable onsite and online assistance</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rts-solution-area rts-section-gapBottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title-center-style-two">
                                    <h2 className="title">Step-by-Step to Excellence</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-consulting mt--80 mt_sm--30">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="consulting-step">
                                    <div className="timeline-line" />
                                    <div className="single-consulting-one">
                                        <div className="thumbnail">
                                            <img src="assets/images/consultancy/free-4.jpg" alt="consulting" />
                                        </div>
                                        <div className="right-area">
                                            <h4 className="title">Discovery Phase</h4>
                                            <p>
                                                Understanding your business <br /> goals and challenges for precise, effective solutions.
                                            </p>
                                        </div>
                                        <div className="timeline-dot">
                                            <div className="time-line-circle" />
                                        </div>
                                    </div>
                                    <div className="single-consulting-one">
                                        <div className="thumbnail">
                                            <img src="assets/images/consultancy/free-3.jpg" alt="consulting" />
                                        </div>
                                        <div className="right-area">
                                            <h4 className="title">Analysis</h4>
                                            <p>
                                                Starting in knowing your business goals and challenges.
                                            </p>
                                        </div>
                                        <div className="timeline-dot">
                                            <div className="time-line-circle" />
                                        </div>
                                    </div>
                                    <div className="single-consulting-one">
                                        <div className="thumbnail">
                                            <img src="assets/images/consultancy/free-2.jpg" alt="consulting" />
                                        </div>
                                        <div className="right-area">
                                            <h4 className="title">Implementation</h4>
                                            <p>
                                                Deploy solutions seamlessly with expert technical support.
                                            </p>
                                        </div>
                                        <div className="timeline-dot">
                                            <div className="time-line-circle" />
                                        </div>
                                    </div>
                                    <div className="single-consulting-one">
                                        <div className="thumbnail">
                                            <img src="assets/images/consultancy/free-1.jpg" alt="consulting" />
                                        </div>
                                        <div className="right-area">
                                            <h4 className="title">Support</h4>
                                            <p>
                                                Ensure continuous performance through dedicated ongoing assistance.
                                            </p>
                                        </div>
                                        <div className="timeline-dot">
                                            <div className="time-line-circle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>





            <Testimonials />
            <div>
                <>
                    {/* shedule a  consultation start */}
                    <div className="shedule-a-consultation rts-section-gapTop">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <div className="shedule-consulting-left">
                                        <h2 className="title">
                                            Let’s Bring Your <br /> Vision to Life
                                        </h2>
                                        <p className="disc">
                                            We’re here to help you tackle challenges, explore possibilities,
                                            and achieve your goals with tailored solutions. Take the first
                                            step by scheduling a free consultation with our experts.
                                        </p>
                                        <div className="check-wrapper">
                                            <p className="top">What’s Included in Your Free Consultation?</p>
                                            <div className="single-wrapper">
                                                <div className="check-wrapper">
                                                    <div className="single-check">
                                                        <img src="assets/images/service/01.svg" alt="service" />
                                                        <p> A personalized session to understand your needs.</p>
                                                    </div>
                                                    <div className="single-check">
                                                        <img src="assets/images/service/01.svg" alt="service" />
                                                        <p>Professional insights and recommendations.</p>
                                                    </div>
                                                    <div className="single-check">
                                                        <img src="assets/images/service/01.svg" alt="service" />
                                                        <p>No obligation—just valuable guidance.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="call">
                                                Call us at:
                                            </p>
                                            <p className="call">
                                                <a href="tel:033-40447558">033-4044-7558</a> <br/> <a href="tel:919088399919">+91 90883 99919</a> <br/> <a href="tel:918509707959">+91 85097 07959</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 offset-lg-1 mt_sm--30">
                                    <form action="#" className="consulting-form">
                                        <p>Schedule a Free Consultation</p>
                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <input type="text" placeholder="First name" required="" />
                                            </div>
                                            <div className="single">
                                                <input type="text" placeholder="Last name" required="" />
                                            </div>
                                        </div>
                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <input type="text" placeholder="Company email" required="" />
                                            </div>
                                            <div className="single">
                                                <input type="text" placeholder="Phone Number" />
                                            </div>
                                        </div>
                                        <input type="text" placeholder="How can we Help You?" />
                                        <textarea
                                            name=""
                                            id=""
                                            placeholder="Write a Message "
                                            required=""
                                            defaultValue={""}
                                        />
                                        <button className="rts-btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* shedule a  consultation end */}
                </>


            </div>
            <FooterOne />
            <BackToTop />
        </div>
    );
}
