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
            <div>
                <>
                    {/* shedule a  consultation start */}
                    <div className="shedule-a-consultation rts-section-gapTop">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <div className="shedule-consulting-left">
                                        <h2 className="title">
                                            Register for Vendor
                                        </h2>
                                        <p className="disc">
                                            We have strong customer support facility with indigenous mobile application which provides real time solutions for each and every issue. Our experts walk that extra mile to protect the customer’s interest and that’s why we are unique.
                                        </p>
                                        <div className="check-wrapper">
                                            <p className="top">What makes vendors choose us?</p>
                                            <div className="single-wrapper">
                                                <div className="check-wrapper">
                                                    <div className="single-check">
                                                        <img src="assets/images/service/01.svg" alt="service" />
                                                        <p> Partner with a trusted education technology leader</p>
                                                    </div>
                                                    <div className="single-check">
                                                        <img src="assets/images/service/01.svg" alt="service" />
                                                        <p>Opportunities for long-term business collaboration</p>
                                                    </div>
                                                    <div className="single-check">
                                                        <img src="assets/images/service/01.svg" alt="service" />
                                                        <p>Transparent, ethical, and reliable partnership process</p>
                                                    </div>
                                                    <div className="single-check">
                                                        <img src="assets/images/service/01.svg" alt="service" />
                                                        <p>Grow together in the education ecosystem across India</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="call">
                                                Address:
                                            </p>
                                            <p className="call">
                                                AF-333, Rabindrapally, Talbagan, P.O. Prafulla Kanan, Kolkata-700101
                                            </p>
                                            <p className="call">
                                                Email:
                                            </p>
                                            <p className="call">
                                                <a href="mailto:edunextg@gmail.com">edunextg@gmail.com</a>
                                            </p>
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

                                        {/* Vendor Details */}
                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="Vendor Name"
                                                    required
                                                />
                                            </div>
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="Contact Person Name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <select required>
                                                    <option value="">GST Registered?</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="PAN No."
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="TAN No."
                                            required
                                        />

                                        {/* Contact Details */}
                                        <p>Contact Details</p>

                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <input
                                                    type="tel"
                                                    placeholder="Contact No"
                                                    required
                                                />
                                            </div>
                                            <div className="single">
                                                <input
                                                    type="tel"
                                                    placeholder="Alternate Contact No"
                                                />
                                            </div>
                                        </div>

                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <input
                                                    type="email"
                                                    placeholder="Email Id"
                                                    required
                                                />
                                            </div>
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="Pin Code"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    required
                                                />
                                            </div>
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="District"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="input-half-wrapper">
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    required
                                                />
                                            </div>
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="Latitude"
                                                />
                                            </div>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Longitude"
                                        />

                                        <textarea
                                            placeholder="Address"
                                            required
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
