"use client"
import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";
import { ReactSVG } from 'react-svg';
export default function Home() {
    return (
        <div className='#'>
            <HeaderTwo />

            <>
                <div className="container-large">
                    {/* service area start */}
                    <div
                        className="service-single-area-banner bg_image jarallax"
                        data-jarallax="1.5"
                    ></div>
                    {/* service area end */}
                </div>
                <div className="service-area-details-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="inner-content">
                                    <div className="top">
                                        <h1 className="title">Terms & Conditions</h1>
                                        <p className="disc">
                                            These terms govern the use of EduNextG India LLP’s
                                            education and technology-driven products and services.
                                        </p>
                                    </div>
                                    <div className="mid-content">
                                        <p className="disc">
                                            Welcome to EduNextG India LLP. By accessing or using our
                                            solutions, you agree to comply with these Terms and
                                            Conditions. Our offerings are designed to support
                                            educational institutions through innovative, reliable,
                                            and customized technology solutions.
                                        </p>
                                        <p className="disc">
                                            EduNextG India LLP provides smart class solutions,
                                            digital podiums, ERP systems, surveillance solutions,
                                            and institutional infrastructure services. All products
                                            and services are delivered as per mutually agreed
                                            specifications, timelines, and commercial terms.
                                        </p>
                                        <p className="disc">
                                            Our hardware and software solutions are intended solely
                                            for educational and institutional use. Unauthorized
                                            copying, resale, modification, or distribution without
                                            written permission from EduNextG India LLP is strictly
                                            prohibited.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

<div className="service-area-details-wrapper border-bottom">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="inner-content">
                    <div className="mid-content pt--0">
                        <p className="disc">
                            EduNextG India LLP provides both online and onsite
                            technical support as per agreed service terms. While we
                            ensure quality and timely assistance, service timelines
                            may vary based on location, operational conditions, and
                            project complexity.
                        </p>
                        <p className="disc">
                            All intellectual property, including software,
                            documentation, designs, and branding, remains the
                            property of EduNextG India LLP unless stated otherwise.
                            Any unauthorized use or reproduction is prohibited.
                        </p>
                        <p className="disc">
                            These terms are governed by the laws of India. EduNextG
                            India LLP reserves the right to update or modify these
                            Terms and Conditions at any time. Continued use of our
                            services constitutes acceptance of the updated terms.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

                {/* rts call to action area start */}
                <div className="rts-call-to-action-area-about rts-section-gapTop">
                    <div className="container pb--80">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="title">Book a Free Consultation</h2>
                                <p className="disc">
                                    Schedule a no-obligation consultation to discuss your unique needs
                                    and how Luminous can elevate your business technology.
                                </p>
                                <a
                                    href="/free-consultation"
                                    className="rts-btn btn-primary wow fadeInUp"
                                    data-wow-delay=".5s"
                                >
                                    View Solutions
                                    <ReactSVG
                                        src="assets/images/service/icons/13.svg"
                                        alt="arrow"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>



            <FooterOne />
            <BackToTop />
        </div>
    );
}
