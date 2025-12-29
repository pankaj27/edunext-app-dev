import React from 'react'

function ServiceList() {
  return (
<>
  {/* service-we-provice-area start */}
  <div className="rts-service-provide-area rts-section-gap">
    <div className="container-s-float">
      <div className="row">
        <div className="col-lg-12">
          <div
            className="single-service-list wow fadeInUp"
            data-wow-offset={120}
            data-wow-delay=".2s"
          >
            <div className="icon">
              <img src="assets/images/service/icons/42.svg" alt="service" />
            </div>
            <div className="main-information-area">
              <h3 className="title">Hardware Products</h3>
              <p className="disc">
                Smart classrooms, digital podiums, surveillance, and display solutions enhancing modern teaching environments.
              </p>
            </div>
            <a href="products/hardware" className="arrow-btn">
              <img src="assets/images/service/icons/13.svg" alt="service" />
            </a>
          </div>
          <div
            className="single-service-list wow fadeInUp"
            data-wow-offset={120}
            data-wow-delay=".4s"
          >
            <div className="icon">
              <img src="assets/images/service/icons/43.svg" alt="service" />
            </div>
            <div className="main-information-area">
              <h3 className="title">Software Products</h3>
              <p className="disc">
                ERP systems and digital platforms streamlining academic and administrative operations efficiently.
              </p>
            </div>
            <a href="products/software" className="arrow-btn">
              <img src="assets/images/service/icons/13.svg" alt="service" />
            </a>
          </div>
          <div
            className="single-service-list wow fadeInUp"
            data-wow-offset={120}
            data-wow-delay=".6s"
          >
            <div className="icon">
              <img src="assets/images/service/icons/44.svg" alt="service" />
            </div>
            <div className="main-information-area">
              <h3 className="title">Services Products</h3>
              <p className="disc">
                End-to-end consultation, installation, maintenance, and reliable onsite and online technical support.
              </p>
            </div>
            <a href="products/services" className="arrow-btn">
              <img src="assets/images/service/icons/13.svg" alt="service" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* service-we-provice-area end */}
</>

  )
}

export default ServiceList