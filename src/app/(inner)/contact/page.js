
"use client"
import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ReactSVG } from 'react-svg';
export default function Home() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault(); // Prevent default form submission

        emailjs
            .sendForm(
                "your_service_id", // Replace with your Service ID
                "your_template_id", // Replace with your Template ID
                form.current,
                "your_public_key"  // Replace with your Public Key
            )
            .then(
                (result) => {
                    console.log(result.text);
                    alert("Message sent successfully!");
                    form.current.reset(); // Reset the form after submission
                },
                (error) => {
                    console.log(error.text);
                    alert("Failed to send the message. Please try again later.");
                }
            );
    };
    return (
        <div className='#'>
            <HeaderTwo />

            <>
                {/* contact banner areas start */}
                <div className="contact-page-banner jarallax bg_iamge"></div>
                {/* contact banner areas end */}
                {/* contact area form wrapper start */}
                <div className="contact-area-form-wrapper rts-section-gapTop">
                    <div className="container-contact">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center-title-bg-white">
                                    <h2 className="title">Get in touch</h2>
                                    <p>We’d love to hear from you. Please fill out this form.</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <form
                                    ref={form}
                                    onSubmit={sendEmail}
                                    className="contact-form"
                                    id="contact-form"
                                >
                                    <div className="half-input-wrapper">
                                        <div className="single">
                                            <label htmlFor="name">First name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="first_name"
                                                placeholder="First name"
                                                required
                                            />
                                        </div>
                                        <div className="single">
                                            <label htmlFor="last">Last name</label>
                                            <input
                                                type="text"
                                                id="last"
                                                name="last_name"
                                                placeholder="Last name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="single">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                    <div className="single">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="single">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Leave us a message..."
                                            required
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="defaultCheck1"
                                            name="agree"
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            You agree to our friendly privacy policy.
                                        </label>
                                    </div>
                                    <button type="submit" className="rts-btn btn-primary">
                                        Send message
                                        <ReactSVG
                                            src="assets/images/service/icons/13.svg"
                                            alt="arrow"
                                        />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* contact area form wrapper end */}
                {/* Google Map Area Start */}
                <div className="rts-google-map-area rts-section-gapTop">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="google-map-wrapper">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.500331509641!2d88.42815741496003!3d22.597784185169797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM1JzUyLjAiTiA4OMKwMjUnNDkuMyJF!5e0!3m2!1sen!2sin!4v1633611900926!5m2!1sen!2sin"
                                        width={600}
                                        height={500}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Google Map Area End */}
                {/* rts location area start */}
                {/* 3 card Section Start  */}
                <div className="rts-location-contact-area pt--70">
                    <div className="container">
                        <div className="row section-seperator-b pb--90 g-5">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="single-location-area-contact">
                                    <div className="icon">
                                        <i className="fa-sharp fa-regular fa-location-dot" />
                                    </div>
                                    <p>Address</p>
                                    <span>AF-333, Rabindrapally, Talbagan, P.O. Prafulla Kanan, Kolkata-700101</span>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="single-location-area-contact">
                                    <div className="icon">
                                        <i className="fa-sharp fa-regular fa-location-dot" />
                                    </div>
                                    <p>Send us Mail</p>
                                    <a href="mailto:edunextg@gmail.com"><span>edunextg@gmail.com</span></a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="single-location-area-contact">
                                    <div className="icon">
                                        <i className="fa-sharp fa-regular fa-location-dot" />
                                    </div>
                                    <p>Contacts</p>
                                    <a href="tel:03340447558"> <span>033-40447558</span></a>  <br/>
                                    <a href="tel:919088399919"> <span>+91 908 839 9919</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 3 card Section Start  */}

                {/* rts location area end */}
            </>




            <FooterOne />
            <BackToTop />
        </div>
    );
}
