"use client"
import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";
import CtaSeven from "@/components/cta/CtaSeven";
import Accordion from "react-bootstrap/Accordion";
export default function Home() {
    const styling = {
        backgroundImage: `url(assets/images/career/career3.avif)`,
    };
    return (
        <div className='#'>
            <HeaderTwo />

            <>
                {/* rts career banner area start */}
                <div className="rts-career-banner-area rts-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="career-banner-wrapper">
                                    <h1 className="title">
                                        Build Your Career with Purpose at EduNextG India LLP
                                    </h1>
                                    <p className="disc">
                                        At EduNextG India LLP, we don’t just create technology—we shape the future of education. Since our founding in 2017, we have been driven by the belief that education is not just a business, but a responsibility. We offer a dynamic, growth-oriented workplace where innovation, collaboration, and integrity are valued. Our team works closely with educational institutions, government offices, and industry leaders to deliver impactful, sustainable solutions. At EduNextG, you’ll find opportunities to learn, lead, and make a real difference in the lives of students and educators across India. If you are passionate about technology, education, and creating meaningful change, we invite you to grow your career with us and be part of a mission that truly matters.
                                    </p>
                                    <a href="why-choose-us" className="rts-btn btn-primary btn-bold">
                                        Why Choose EduNextG ?
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6 mt_md--30 mt_sm--30 wow fadeInRight">
                                <div className="thumbnail-top">
                                    <img src="assets/images/career/career2.jpg" alt="career" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* rts career banner area send */}
                <div className="rts-section-gap-top career-two-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="thumbnail-career-two wow fadeInLeft">
                                    <img src="assets/images/career/career1.jpg" alt="career" />
                                </div>
                            </div>
                            <div className="col-lg-6 pl--50 pl_md--15 pl_sm--10 mt_md--30 pt_sm--30">
                                <div className="career-right-two-wrapper">
                                    <h2 className="title">Why Work With Us?</h2>
                                    <p>
                                        EduNextG India LLP empowers educational institutions with innovative, reliable, and customized technology solutions. Driven by the belief that education is not just a business, we enhance teaching-learning experiences through quality products, strong support, and long-term partnerships across India.
                                    </p>
                                    <div className="check-wrapper-main">
                                        <div className="single-wrapper">
                                            <div className="check-wrapper">
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Education-first, not profit-first approach</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Trusted since 2017</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Customized solutions for institutions</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Advanced digital education technologies</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>End-to-end education ecosystem support</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single-wrapper">
                                            <div className="check-wrapper">
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Strong hardware and software protection</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Online and onsite support team</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Scalable, future-ready solutions</p>
                                                </div>
                                                <div className="single-check">
                                                    <img src="assets/images/service/01.svg" alt="service" />
                                                    <p>Focused on long-term institutional growth</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* career video area start */}
                <div className="career-video-area-large-3 rts-section-gapTop">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div
                                    className="career-video-area-large position-relative bg_image" style={styling}
                                    data-speed=".8"
                                >
                                    <div className="vedio-icone">
                                        <a
                                            className="video-play-button play-video popup-video"
                                            href="assets/videos/edunextg-video.mp4"
                                        >
                                            <span />
                                        </a>
                                        <div className="video-overlay">
                                            <a className="video-overlay-close">×</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* career video area end */}
                {/* company values area start */}
                <div className="company-values-area rts-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title-between-area-wrapper-main">
                                    <div className="title-left-area">
                                        <h2 className="title">Our Values in Action</h2>
                                    </div>
                                    <p className="disc">
                                        Our values form the backbone of EduNextG India LLP and guide every decision we take. Rooted in trust, quality, and long-term commitment to education, these principles shape our culture, strengthen partnerships, and enable us to deliver meaningful, sustainable solutions for the educational ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row g-5 mt--30">
                            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".1s">
                                <div className="single-values-in-action">
                                    <div className="icon">
                                        <img src="assets/images/career/01.svg" alt="icon" />
                                    </div>
                                    <div className="information">
                                        <h6 className="title">Integrity</h6>
                                        <p>
                                            We operate with transparency, ethics, and trust across all stakeholders.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
                                <div className="single-values-in-action">
                                    <div className="icon">
                                        <img src="assets/images/career/02.svg" alt="icon" />
                                    </div>
                                    <div className="information">
                                        <h6 className="title">Innovation</h6>
                                        <p>
                                            We continuously evolve with technology to enhance education delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".5s">
                                <div className="single-values-in-action">
                                    <div className="icon">
                                        <img src="assets/images/career/03.svg" alt="icon" />
                                    </div>
                                    <div className="information">
                                        <h6 className="title">Collaboration</h6>
                                        <p>
                                            We build strong, long-term partnerships with institutions and stakeholders.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".1s">
                                <div className="single-values-in-action">
                                    <div className="icon">
                                        <img src="assets/images/career/04.svg" alt="icon" />
                                    </div>
                                    <div className="information">
                                        <h6 className="title">Excellence</h6>
                                        <p>
                                            We deliver high-quality, reliable, and sustainable education solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
                                <div className="single-values-in-action">
                                    <div className="icon">
                                        <img src="assets/images/career/05.svg" alt="icon" />
                                    </div>
                                    <div className="information">
                                        <h6 className="title">Customer Focus</h6>
                                        <p>
                                            We customize solutions to meet each institution’s unique needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".5s">
                                <div className="single-values-in-action">
                                    <div className="icon">
                                        <img src="assets/images/career/06.svg" alt="icon" />
                                    </div>
                                    <div className="information">
                                        <h6 className="title">Accountability</h6>
                                        <p>
                                            We take ownership of our commitments, performance, and outcomes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* company values area end */}
                {/* job opening area start */}
                {/* <div className="job-opening-area rts-section-gapBottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title-center-style-two">
                                    <h2 className="title">Current Openings</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row g-5 mt--30">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".1s">
                                <div className="single-job-opening-card">
                                    <h4 className="title">IT Consultant</h4>
                                    <p>
                                        Responsibilities: Work with clients to assess their IT needs,
                                        develop strategic roadmaps, and implement tailored solutions.
                                    </p>
                                    <p>
                                        Qualifications: Strong analytical skills, excellent communication
                                        abilities, and a background in IT strategy and implementation.
                                    </p>
                                    <div className="tag-wrapper">
                                        <div className="single">
                                            <span>IT Consulting</span>
                                        </div>
                                        <div className="single">
                                            <span>IT Solutions</span>
                                        </div>
                                        <div className="single">
                                            <span>Consulting Services</span>
                                        </div>
                                    </div>
                                    <div className="bottom-area">
                                        <div className="selary-range">
                                            <p>
                                                $1000 - $12000 <span>USD/month</span>
                                            </p>
                                        </div>
                                        <a href="#" className="rts-btn btn-primary btn-bold">
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                                <div className="single-job-opening-card">
                                    <h4 className="title">Help Desk Technician</h4>
                                    <p>
                                        <span>Responsibilities:</span> Work with clients to assess their
                                        IT needs, develop strategic roadmaps, and implement tailored
                                        solutions.
                                    </p>
                                    <p>
                                        <span>Qualifications:</span> Strong analytical skills, excellent
                                        communication abilities, and a background in IT strategy and
                                        implementation.
                                    </p>
                                    <div className="tag-wrapper">
                                        <div className="single">
                                            <span>IT Consulting</span>
                                        </div>
                                        <div className="single">
                                            <span>IT Solutions</span>
                                        </div>
                                        <div className="single">
                                            <span>Consulting Services</span>
                                        </div>
                                    </div>
                                    <div className="bottom-area">
                                        <div className="selary-range">
                                            <p>
                                                $1000 - $12000 <span>USD/month</span>
                                            </p>
                                        </div>
                                        <a href="#" className="rts-btn btn-primary btn-bold">
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* job opening area end */}
                {/* why choose us sectiona area start */}
                <div className="faqs-section rts-section-gapBottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h2 className="title">FAQs</h2>
                            </div>
                            <div className="col-lg-6">
                                <div className="faq-why-choose-left-accordion">
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                        What is EduNextG India LLP and when was it founded?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                        EduNextG India LLP is a technology-driven educational solutions company founded in February 2017. It focuses on addressing current and future challenges in education through innovative and customized digital and IT solutions for educational institutions across India.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                        What is the core vision of EduNextG India LLP?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                        EduNextG believes that “Education is not just a business.” The company’s vision is to enhance teaching and learning experiences by integrating meaningful technology that creates long-term value for educational institutions, students, and educators.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>What types of institutions does EduNextG serve?</Accordion.Header>
                                        <Accordion.Body>
                                        EduNextG caters to a wide range of educational institutions across India, including schools, colleges, training institutes, and government offices. Its clientele includes reputed institutions and industry leaders from various sectors.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* why choose us sectiona area end */}
            </>



            <CtaSeven />
            <FooterOne />
            <BackToTop />
        </div>
    );
}
