"use client"
import React from 'react'
import Link from 'next/link';
function FooterOne() {
    return (
        <div>

            {/* rts footer area start */}
            <div className="rts-footer-area rts-section-gapTop pb--80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            <div className="logo-area">
                                <Link href="/#" className="logo">
                                    <img src="/assets/images/logo/edunextg-logo-blue.png" alt="logo" width={160} />
                                </Link>
                                <p className="disc">
                                    EduNextG is a technology driven Company catering to the specific requirements of the Educational Institutions across India. We are a fast growing educational enterprise focusing on the present and future educational barriers and evolving with innovative solutions.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row g-5">
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="single-nav-area-footer">
                            <p className="parent">Products</p>
                            <ul>
                                <li>
                                <Link href="/technologies-service">Hardware Solution</Link>
                                </li>
                                <li>
                                <Link href="/ai-learning-service">Software Solution</Link>
                                </li>
                                <li>
                                <Link href="/it-strategies">Services</Link>
                                </li>
                                
                            </ul>
                        </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="single-nav-area-footer">
                                    <p className="parent">Company</p>
                                    <ul>
                                        <li>
                                        <Link href="/about">About us</Link>
                                        </li>
                                        <li>
                                        <Link href="/career">Careers</Link>
                                        </li>
                                        <li>
                                        <Link href="/why-choose-us">Why Choose Us</Link>
                                        </li>
                                        <li>
                                        <Link href="/testimonials">Testimonials</Link>
                                        </li>
                                        <li>
                                        <Link href="/faq">FAQ</Link>
                                        </li>
                                        
                                    </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="single-nav-area-footer">
                                    <p className="parent">Important Links</p>
                                    <ul>
                                        <li>
                                        <Link href="/free-consultation">Free Consultation</Link>
                                        </li>
                                        <li>
                                        <Link href="/organization-registration">Organization Registration</Link>
                                        </li>
                                        <li>
                                            <Link href="/vendor-registration">Vendor Registration</Link>
                                        </li>
                                        <li>
                                        <Link href="/contact">Contact</Link>
                                        </li>
                                        <li>
                                        <Link href="#">Blog</Link>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* rts footer area end */}
            {/* rts copyright area start */}
            <div className="rts-copyright-area-one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="copyright-wrapper">
                                <p>© 2026 Edunextg. All rights reserved.</p>
                                <div className="social-copyright-area">
                                    <ul>
                                        <li>
                                            <Link href="/privacy-policy">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/terms-and-conditions">
                                                Terms & Conditions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/refund-and-cancellation">
                                                Refund & Cancellation
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="social-copyright-area">
                                    <ul>
                                    <li>
                                        <Link href="https://www.facebook.com/EDUNextG/">
                                        <i className="fa-brands fa-facebook-f" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://x.com/EduNextG">
                                        <i className="fa-brands fa-twitter" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.youtube.com/channel/UC5estb9VaTKaS4c-rpu38SQ">
                                        <i className="fa-brands fa-youtube" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.instagram.com/edunextg_group/">
                                        <i className="fa-brands fa-instagram" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/#">
                                        <i className="fa-brands fa-linkedin" />
                                        </Link>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* rts copyright area end */}

        </div>
    )
}

export default FooterOne
