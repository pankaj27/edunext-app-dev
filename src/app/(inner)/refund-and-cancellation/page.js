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
                                        <h1 className="title">Refund & Cancellation Policy</h1>
                                        <p className="disc">
                                            EduNextG India LLP follows a transparent and fair refund and cancellation
                                            policy aligned with our education-first philosophy.
                                        </p>
                                    </div>
                                    <div className="mid-content">
                                        <p className="disc">
                                            At EduNextG India LLP, we provide customized education and IT solutions
                                            tailored to the specific requirements of educational institutions.
                                            Therefore, cancellations and refunds are governed by the nature of the
                                            product or service delivered.
                                        </p>
                                        <p className="disc">
                                            Once an order is confirmed or a project is initiated, cancellation
                                            requests may not be entertained, especially for customized hardware,
                                            software, or integrated solutions. Any cancellation request must be
                                            submitted in writing and will be reviewed on a case-by-case basis.
                                        </p>
                                        <p className="disc">
                                            Refunds, if applicable, will be processed only after evaluating the
                                            project status, resource allocation, and costs already incurred.
                                            Approved refunds will be processed within a reasonable timeframe.
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
                            Hardware products once delivered or installed are not eligible for
                            refunds unless there is a manufacturing defect or damage reported
                            within the specified warranty period.
                        </p>
                        <p className="disc">
                            Software solutions, digital platforms, and ERP services are non-refundable
                            once access credentials are shared or implementation has begun.
                            Service-related payments are non-refundable after service delivery.
                        </p>
                        <p className="disc">
                            EduNextG India LLP reserves the right to modify this refund and
                            cancellation policy at any time without prior notice. For queries,
                            institutions are encouraged to contact our support team directly.
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
