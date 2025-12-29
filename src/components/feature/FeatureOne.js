"use client";
import React from "react";
import { useEffect } from "react";
import Rellax from "rellax";
function FeatureOne() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            new Rellax(".rellax", { speed: 1 });
        }
    }, []);
    return (
        <div>

            {/* about-iamge-feature-area */}
            <div className="rts-image-feature-area">
                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-6">
                            {/* <div className="thumbnail-about-mid jarallax"> */}
                            <div className="">
                                <img
                                    className="jarallax-img"
                                    src="assets/images/about/team1.avif"
                                    alt="about"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {/* <div className="thumbnail-about-mid jarallax"> */}
                            <div className="">
                                <img
                                    className="jarallax-img"
                                    src="assets/images/about/team2.avif"
                                    alt="about"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about-iamge-feature-area end */}

        </div>
    )
}

export default FeatureOne