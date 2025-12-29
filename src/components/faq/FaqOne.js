"use client"
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

function FaqOne() {
    return (
        <div>
            <>
                {/* commercial faq area */}
                <div className="professional-faq-area rts-section-gap position-relative">
                    <div className="shape-top">
                        <img
                            loading="lazy"
                            rel="preload"
                            src="assets/images/video/shape/01.png"
                            alt=""
                            className="wow move-right"
                            data-wow-offset={120}
                        />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center-title-bg-white">
                                    <h2 className="title" style={{ fontSize: 40 }}>
                                        Common questions
                                    </h2>
                                    <p>
                                        Delivers a single, integrated platform that drives innovation and enables seamless end-to-end data management. Discover how we empower your team to overcome today’s most critical challenges.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt--80">
                            <div className="col-lg-12">
                                <div className="accordion-container-one">

                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>What is EduNextG India LLP and when was it founded?</Accordion.Header>
                                            <Accordion.Body>
                                                EduNextG India LLP is a technology-driven educational solutions company founded in February 2017. It focuses on addressing current and future challenges in education through innovative and customized digital and IT solutions for educational institutions across India.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>What is the core vision of EduNextG India LLP?</Accordion.Header>
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
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>Does EduNextG provide post-implementation support?</Accordion.Header>
                                            <Accordion.Body>
                                                Yes, EduNextG provides comprehensive online and onsite support. Its dedicated support team ensures proper maintenance and protection of both hardware and software to deliver long-term reliability and performance.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>What solutions and products does EduNextG offer?</Accordion.Header>
                                            <Accordion.Body>
                                                EduNextG offers a diverse portfolio of solutions, including Smart Class Solutions, Digital Podiums, Digital Notice Boards, ERP Solutions, Surveillance Systems, and also non-digital offerings such as Stationery, Uniform, and Furniture Solutions.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>How does EduNextG ensure quality and sustainability in its solutions?</Accordion.Header>
                                            <Accordion.Body>
                                                EduNextG emphasizes quality, sustainability, and customization in all its offerings. The company carefully designs solutions to be effective, scalable, and aligned with institutional needs while ensuring maximum return on investment (ROI).
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="6">
                                            <Accordion.Header>What makes EduNextG different from other education technology companies?</Accordion.Header>
                                            <Accordion.Body>
                                                EduNextG stands out due to its strong entrepreneurial vision, deep industry expertise, customized approach, and commitment to building long-term relationships with stakeholders. The company focuses on transforming education rather than merely selling products.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header>How does EduNextG contribute to the Indian education ecosystem?</Accordion.Header>
                                            <Accordion.Body>
                                                EduNextG plays a key role in modernizing the education system by offering innovative technology solutions that improve knowledge delivery, student engagement, and institutional efficiency, positively impacting students’ lives across India.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        <div className="row mt--80">
                            <div className="col-lg-12 text-center">
                                <p>
                                    Still have a question?{" "}
                                    <a
                                        href="/free-consultation"
                                        style={{ color: "var(--color-primary)" }}
                                    >
                                        Feel free to ask
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* commercial faq area end */}
            </>

        </div>
    )
}

export default FaqOne