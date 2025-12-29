import React from 'react'

function Wedo() {
    return (
        <div>
            {/* what we do area start */}
            <div className="what-we-do-area-start rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="what-we-do-wrapper-about">
                                <p className="disc">
                                    EduNextG is a technology-driven Indian company founded in 2017 with the mission of revolutionizing the education system by helping institutions use the latest technology for effective knowledge delivery. They focus on prsoviding innovative solutions to current and future educational barriers, aiming to improve the teaching-learning experience.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--40 g-5">
                        <div
                            className="col-lg-6 col-md-6 col-sm-12 wow fadeInUp"
                            data-wow-offset={120}
                            data-wow-delay=".2s"
                        >
                            <div className="what-we-do-main-wrapper">
                                <h5 className="title">What we do?</h5>
                                <p className="disc">
                                    Founded in 2017, EduNextG is an Indian technology company dedicated to revolutionizing education. They help institutions use the latest technology for effective knowledge delivery, improving the teaching-learning experience. Serving a broad clientele, including industry and government, EduNextG emphasizes that education is their primary mission, not just a business.
                                </p>
                                <a href="/why-choose-us" className="rts-btn btn-border btn-bold">
                                    Get in touch
                                    <img src="assets/images/service/icons/13.svg" alt="arrow" />
                                </a>
                            </div>
                        </div>
                        <div
                            className="col-lg-6 col-md-6 col-sm-12 wow fadeInUp"
                            data-wow-offset={120}
                            data-wow-delay=".6s"
                        >
                            <div className="what-we-do-main-wrapper">
                                <h5 className="title">Dedicated Support</h5>
                                <p className="disc">
                                    We have strong customer support facility with indigenous mobile application which provides real time solutions for each and every issue. Our experts walk that extra mile to protect the customer’s interest and that’s why we are unique.
                                </p>
                                <a href="/contact" className="rts-btn btn-border btn-bold">
                                    Career
                                    <img src="assets/images/service/icons/13.svg" alt="arrow" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* what we do area end */}
        </div>
    )
}

export default Wedo