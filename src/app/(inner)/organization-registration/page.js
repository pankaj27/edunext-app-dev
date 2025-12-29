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
                                            Register for Organization
                                        </h2>
                                        <p className="disc">
                                            EduNextG is a technology-driven Indian company founded in 2017 with the mission of revolutionizing the education system by helping institutions use the latest technology for effective knowledge delivery. They focus on prsoviding innovative solutions to current and future educational barriers, aiming to improve the teaching-learning experience.
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
                                                <input
                                                    type="text"
                                                    placeholder="Organization Name"
                                                    required
                                                />
                                            </div>
                                            <div className="single">
                                                <input
                                                    type="text"
                                                    placeholder="Representative Name"
                                                    required
                                                />
                                            </div>
                                        </div>

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

                                        <input
                                            type="text"
                                            placeholder="City"
                                            required
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
