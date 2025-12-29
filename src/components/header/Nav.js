"use client"
import React from 'react'
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
function Nav() {
    return (
        <div>
            <div className="nav-area">
                <nav>
                    <ul>
                        <li>
                            <Link className="nav-link" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="has-dropdown position-static with-megamenu margin-single-0">
                            <Link className="nav-link" href="/#">
                                Company
                                <i className="fa-duotone fa-regular fa-chevron-down" />
                            </Link>
                            <div className="submenu">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                <li>
                                                    <Link href="/about">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        About
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/why-choose-us">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Why Choose Us?
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/organization-registration">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Organization Registration
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                <li>
                                                    <Link href="/career">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Career
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/testimonials">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Testimonials
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/vendor-registration">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Vendor Registration
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                
                                                <li>
                                                    <Link href="/faq">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Faq
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/free-consultation">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Free Consultation
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/terms-and-conditions">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Terms & Conditions
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                
                                                <li>
                                                    <Link href="/privacy-policy">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Privacy Policy
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contact">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Enquire Us
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/refund-and-cancellation">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Refund & Cancellation
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        {/* <li className="has-dropdown position-static with-megamenu margin-single-0">
                            <Link className="nav-link" href="/#">
                                Pages
                                <i className="fa-duotone fa-regular fa-chevron-down" />
                            </Link>
                            <div className="submenu">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                <li>
                                                    <Link href="/about">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        About
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/service">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Services
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/service-single">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Services Single
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/case-studies">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Case Studies
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/privacy-policy">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Privacy Policy
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                <li>
                                                    <Link href="/case-studies-single">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Case Studies Single
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/why-choose-us">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Why Choose Us
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/career">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Career
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/career-single">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Career Single
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/industry">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Industry
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                <li>
                                                    <Link href="/apply">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Apply
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/team">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Team
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/team-single">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Team Single
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/faq">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Faq
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/coming-soon">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Coming Soon
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                <li>
                                                    <Link href="/partner">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Our Partner
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/award">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Award
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/free-consultation">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Free Consultation
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/terms-of-use">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Terms Of Use
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/404">
                                                        <i className="fa-sharp fa-regular fa-chevron-right" />
                                                        Error
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li> */}
                        {/* <li>
                            <Link className="nav-link" href="/case-studies">
                                Case Studies
                            </Link>
                        </li> */}
                        <li className="has-dropdown position-static with-megamenu">
                            <Link className="nav-link" href="/service">
                                Products{" "}
                                <i className="fa-duotone fa-regular fa-chevron-down" />
                            </Link>
                            <div className="submenu">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                {/* <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/service-single"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/22.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">Cloud Migration</h4>
                                                            <p>Moving data to cloud infrastructure.</p>
                                                        </div>
                                                    </Link>
                                                </li> */}
                                                <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/products/hardware"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/23.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">Hardware</h4>
                                                            <p>Alignment, Innovation Scalability.</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                {/* <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/cyber-security-service"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/24.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">Cyber Security</h4>
                                                            <p>Protecting data software and networks.</p>
                                                        </div>
                                                    </Link>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                {/* <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/technologies-service"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/25.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">Technologies</h4>
                                                            <p>Empowering, innovative, transformative.</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/it-consulting-service"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/26.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">
                                                                IT Consulting Service
                                                            </h4>
                                                            <p>
                                                                Expertise-driven technology problem-solving.
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li> */}
                                                <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/products/software"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/27.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">Software</h4>
                                                            <p>
                                                                Creating innovative solutions through
                                                                technology.
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav">
                                                <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/products/services"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/28.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">Services</h4>
                                                            <p>
                                                                Empowering machines to mimic intelligence.
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                {/* <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/management-service"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/29.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">Management</h4>
                                                            <p>Organizing resources to achieve goals</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="single-service-area-wrapper"
                                                        href="/it-innovations"
                                                    >
                                                        <div className="icon">
                                                            <img
                                                                src="/assets/images/service/icons/30.svg"
                                                                alt="service"
                                                            />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className="title">IT Innovations</h4>
                                                            <p>
                                                                Transforming ideas into digital solutions.
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <ul className="single-menu parent-nav industry-signle-menu">
                                                {/* <li className="parent-top-industry">
                                                    <p>Industries</p>
                                                </li> */}
                                                <li>
                                                    <Link
                                                        className="industries"
                                                        href="/"
                                                    >
                                                        <ReactSVG
                                                            src="/assets/images/icons/arrow-right.svg"
                                                            alt="arrow"
                                                        />
                                                        Home
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="industries"
                                                        href="/blog"
                                                    >
                                                        <ReactSVG
                                                            src="/assets/images/icons/arrow-right.svg"
                                                            alt="arrow"
                                                        />
                                                        Blog
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="industries"
                                                        href="/free-consultation"
                                                    >
                                                        <ReactSVG
                                                            src="/assets/images/icons/arrow-right.svg"
                                                            alt="arrow"
                                                        />
                                                        Free Consultation
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="industries"
                                                        href="/contact"
                                                    >
                                                        <ReactSVG
                                                            src="/assets/images/icons/arrow-right.svg"
                                                            alt="arrow"
                                                        />
                                                        Contact
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link className="nav-link" href="/blog">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" href="/contact">
                                Contact
                            </Link>
                        </li>
                        {/* <li>
                            <Link className="nav-link" href="/blog-grid">
                                Contact
                            </Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Nav