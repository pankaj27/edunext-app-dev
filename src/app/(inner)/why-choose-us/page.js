"use client"
import React from 'react'
import HeaderTwo from "@/components/header/HeaderTwo";
import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";
import CtaOne from "@/components/cta/CtaOne";
import Accordion from "react-bootstrap/Accordion";
function page() {
    return (
        <>

            <HeaderTwo />
            {/* why choose us banner area  */}
            <div className="banner-why-choose-us">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner-inner-why-choose-us">
                                <h1 className="title">Experience the Difference with Edunextg</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-4">
                            <div className="thumbnail-banner-choose-us jarallax" data-speed=".8">
                                <img
                                    src="assets/images/banner/banner-image-1.avif"
                                    className="jarallax-img"
                                    alt="banner"
                                />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="thumbnail-banner-choose-us jarallax" data-speed=".8">
                                <img
                                    src="assets/images/banner/banner-image-2.avif"
                                    className="jarallax-img"
                                    alt="banner"
                                />
                            </div>
                        </div>
                        <div className="col-lg-9 mt--50">
                            <div className="why-choose-intro-disc">
                                <p>
                                    EduNextG India LLP partners with educational institutions to deliver innovative, reliable, and customized education and IT solutions. Guided by our belief that education is not just a business, we focus on enhancing teaching-learning experiences, protecting institutional investments, and building long-term relationships through quality products and dedicated support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* why choose us banner area end */}
            {/* luminos solution key */}
            <div className="luminos-solution-key-feature mt--50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="luminos-main-solutioin-key">
                                <h3 className="title">Why Choose EduNextG India LLP</h3>
                                <div className="check-wrapper">
                                    <div className="single-check">
                                        <img src="assets/images/service/01.svg" alt="service" />
                                        <p>Education-first philosophy</p>
                                    </div>
                                    <div className="single-check">
                                        <img src="assets/images/service/01.svg" alt="service" />
                                        <p>Customized, future-ready education solutions</p>
                                    </div>
                                    <div className="single-check">
                                        <img src="assets/images/service/01.svg" alt="service" />
                                        <p>Strong focus on quality and ROI</p>
                                    </div>
                                    <div className="single-check">
                                        <img src="assets/images/service/01.svg" alt="service" />
                                        <p>Reliable online and onsite support</p>
                                    </div>
                                </div>
                                <div className="tag-wrapper">
                                    <div className="single-tag">
                                        <span>Asset Management</span>
                                    </div>
                                    <div className="single-tag">
                                        <span>IT Solutions</span>
                                    </div>
                                    <div className="single-tag">
                                        <span>Consulting Services</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="thumbnail-main-wrapper-choose-us">
                                <img src="assets/images/service/whychooseus1.jpg" alt="service" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* luminos solution key end */}
            {/* working process area why choose us */}
            <div className="why-choose-us-working-process rts-section-gap">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 pr--50">
                            <div className="why-choose-process-left pb--50">
                                <div className="text-left-title-bg-white">
                                    <h2 className="title">
                                        Strategic IT Consulting to Drive Innovation and Growth
                                    </h2>
                                    <p>
                                        EduNextG India LLP is a fast-growing education technology company delivering innovative, customized solutions to educational institutions across India, with strong industry credibility and government project experience.
                                    </p>
                                </div>
                            </div>
                            <div className="thumbnail-working-process">
                                <img src="assets/images/service/whychooseus2.avif" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-working-process-choose-us wow fadeInUp">
                                <h5 className="title">
                                    Know more about Edunextg India LLP
                                </h5>
                                <p>
                                    Guided by the belief that education is not just a business, EduNextG focuses on improving teaching-learning experiences through sustainable, quality-driven, and future-ready education and IT solutions.
                                </p>
                                <div className="tag-wrapper">
                                    <div className="single">
                                        <span>Education-First</span>
                                    </div>
                                    <div className="single">
                                        <span>Visionary</span>
                                    </div>
                                    <div className="single">
                                        <span>Impact-Driven</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="single-working-process-choose-us wow fadeInUp"
                                data-wow-delay=".2s"
                            >
                                <h5 className="title">
                                    Our Trusted Services
                                </h5>
                                <p>
                                    We offer smart classrooms, digital podiums, ERP, surveillance, and institutional solutions including furniture, uniforms, and stationery, providing a complete ecosystem for modern educational institutions.
                                </p>
                                <div className="tag-wrapper">
                                    <div className="single">
                                        <span>Digital Education</span>
                                    </div>
                                    <div className="single">
                                        <span>Infrastructure</span>
                                    </div>
                                    <div className="single">
                                        <span>End-to-End</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="single-working-process-choose-us wow fadeInUp"
                                data-wow-delay=".4s"
                            >
                                <h5 className="title">
                                    Why Choose EduNextG India LLP ?
                                </h5>
                                <p>
                                    EduNextG delivers tailored solutions, strong hardware and software protection, and dedicated online and onsite support, ensuring long-term value, operational efficiency, and measurable returns for institutions.
                                </p>
                                <div className="tag-wrapper">
                                    <div className="single">
                                        <span>Trusted Partner</span>
                                    </div>
                                    <div className="single">
                                        <span>Customized</span>
                                    </div>
                                    <div className="single">
                                        <span>Reliable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* working process area why choose us end */}
            {/* why choose us faq area start */}
            <div className="why-choose-us-faq-area rts-section-gap">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="faq-why-choose-left-accordion">
                                <h2 className="title">
                                    Our Service Process Frequently Asked Questions
                                </h2>
                                <p>
                                    At EduNextG India LLP, we aim to provide clear and transparent information about our solutions, services, and approach. These FAQs address common queries to help educational institutions understand how we support technology adoption, improve learning outcomes, and build long-term partnerships across India.
                                </p>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                        What type of solutions does EduNextG India LLP offer?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                        EduNextG provides comprehensive education and IT solutions, including smart class solutions, digital podiums, ERP systems, surveillance, and institutional infrastructure such as furniture, uniforms, and stationery.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                        Who can benefit from EduNextG’s services?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                        Our solutions are designed for schools, colleges, training institutes, and government offices seeking technology-driven, customized, and scalable education solutions.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Does EduNextG provide installation and ongoing support?</Accordion.Header>
                                        <Accordion.Body>
                                        Yes, we offer end-to-end support including installation, maintenance, and both online and onsite technical assistance to ensure long-term reliability and performance.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>What makes EduNextG different from other education technology providers?</Accordion.Header>
                                        <Accordion.Body>
                                        EduNextG follows an education-first philosophy, delivers customized solutions, protects institutional investments, and builds long-term relationships focused on quality, sustainability, and measurable outcomes.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="why-choose-faq-thumbnail">
                                <img src="assets/images/service/whychooseus3.jpg" alt="why" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* why choose us faq area end */}
{/* key benefits area start */}
            <div className="keybenefits-area rts-section-gapTop">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="benefits-area-title-wrapper">
                                <h3 className="title">Key offer we deliver on this project</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 mt--15">
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="100">
                            <div className="single-benefits-area-wrapper bg-light">
                                <div className="icon">
                                    <img src="assets/images/about/icons/01.svg" alt="benefits" />
                                </div>
                                <h5 className="title">Accelerate Growth</h5>
                            </div>
                        </div>
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="200">
                            <div className="single-benefits-area-wrapper">
                                <div className="icon">
                                    <img src="assets/images/about/icons/02.svg" alt="benefits" />
                                </div>
                                <h5 className="title">Boost Efficiency</h5>
                            </div>
                        </div>
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="300">
                            <div className="single-benefits-area-wrapper bg-light">
                                <div className="icon">
                                    <img src="assets/images/about/icons/03.svg" alt="benefits" />
                                </div>
                                <h5 className="title">Collaboration</h5>
                            </div>
                        </div>
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="400">
                            <div className="single-benefits-area-wrapper">
                                <div className="icon">
                                    <img src="assets/images/about/icons/04.svg" alt="benefits" />
                                </div>
                                <h5 className="title">Reduce Costs</h5>
                            </div>
                        </div>
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="100">
                            <div className="single-benefits-area-wrapper">
                                <div className="icon">
                                    <img src="assets/images/about/icons/05.svg" alt="benefits" />
                                </div>
                                <h5 className="title">Netwroking</h5>
                            </div>
                        </div>
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="200">
                            <div className="single-benefits-area-wrapper  bg-light">
                                <div className="icon">
                                    <img src="assets/images/about/icons/06.svg" alt="benefits" />
                                </div>
                                <h5 className="title">Global Translations</h5>
                            </div>
                        </div>
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="300">
                            <div className="single-benefits-area-wrapper">
                                <div className="icon">
                                    <img src="assets/images/about/icons/07.svg" alt="benefits" />
                                </div>
                                <h5 className="title">Enhance Security</h5>
                            </div>
                        </div>
                        <div className="col-lg-3" data-aos-duration="1000" data-aos-delay="400">
                            <div className="single-benefits-area-wrapper  bg-light">
                                <div className="icon">
                                    <img src="assets/images/about/icons/08.svg" alt="benefits" />
                                </div>
                                <h5 className="title">In-house techs</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* key benefits area end */}
            <CtaOne />
            <FooterOne />
            <BackToTop />
        </>

    )
}

export default page