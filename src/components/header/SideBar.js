"use client"
import React, { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';

function SideBar({ isSidebarOpen, toggleSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuhome) => {
    setOpenMenu(openMenu === menuhome ? null : menuhome);
  };


  return (
    <div>
      <div id="side-bar" className={`side-bar header-two ${isSidebarOpen ? 'show' : ''}`}>
        <button className="close-icon-menu" aria-label="Close Menu" onClick={toggleSidebar}>
          <i className="far fa-times"></i>
        </button>
        <div className="mobile-menu-main">
          <nav className="nav-main mainmenu-nav mt--30">
            <ul className="mainmenu metismenu" id="mobile-menu-active">
              <li>
                <Link href="/" className="main">
                  Home
                </Link>
              </li>
              <li className="has-droupdown">
                <Link href="#" className="main" onClick={() => toggleMenu(2)}>
                  Company
                </Link>
                <ul className={`submenu ${openMenu === 2 ? 'mm-collapse mm-show' : 'mm-collapse'}`}>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/why-choose-us">Why Choose Us?</Link>
                  </li>
                  <li>
                    <Link href="/career">Career</Link>
                  </li>
                  <li>
                    <Link href="/testimonials">Testimonials</Link>
                  </li>
                  <li>
                    <Link href="/faq">Faq</Link>
                  </li>
                  <li>
                    <Link href="/industry">Industry</Link>
                  </li>
                  <li>
                    <Link href="/free-consultation">Free Consultation</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  
                </ul>
              </li>
<li className="has-droupdown">
                <Link href="#" className="main" onClick={() => toggleMenu(3)}>
                  Products
                </Link>
                <ul className={`submenu ${openMenu === 3 ? 'mm-collapse mm-show' : 'mm-collapse'}`}>
                  <li>
                    <Link href="/it-strategies">Hardware</Link>
                  </li>
                  <li>
                    <Link href="/development-service">Software</Link>
                  </li>
                  <li>
                    <Link href="/ai-learning-service">Services</Link>
                  </li>                  
                </ul>
              </li>
              <li>
                <Link href="/blog" className="main">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="contact" className="main">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="rts-social-border-area right-sidebar mt--80">
            <ul>
              <li>
                <Link href="#" aria-label="social link" data-description="social">
                  <i className="fa-brands fa-facebook-f" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="social link" data-description="social">
                  <i className="fa-brands fa-twitter" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="social link" data-description="social">
                  <i className="fa-brands fa-linkedin-in" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="social link" data-description="social">
                  <i className="fa-brands fa-pinterest" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="social link" data-description="social">
                  <i className="fa-brands fa-youtube" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* mobile menu area end */}
      </div>

    </div>
  )
}

export default SideBar