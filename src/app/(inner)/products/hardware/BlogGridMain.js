"use client"

import Link from "next/link";


const BlogGridMain = (props) => {
    const { Slug, blogImage, blogTitle, description } = props;
    const href = `/products/hardware/${Slug}`;
    const imgValue = typeof blogImage === "string" ? blogImage.trim() : "";
    const imgSrc = imgValue
        ? imgValue.startsWith("data:")
            ? imgValue
            : imgValue.startsWith("/") || imgValue.startsWith("http")
                ? imgValue
                : `/assets/images/blog/${imgValue}`
        : "/assets/images/blog/01.webp";
    return (

        <>

        {/* GLOBAL CSS */}
      <style jsx global>{`
        .custom-btn {
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none !important;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .custom-btn-primary {
          background-color: #4f46e5;
          color: #ffffff !important;
          border: 1px solid #4f46e5;
          box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
        }

        .custom-btn-primary:hover {
          background-color: #4338ca;
          border-color: #4338ca;
          transform: translateY(-2px);
        }

        .custom-btn-secondary {
          background-color: #ffffff;
          color: #4f46e5 !important;
          border: 1px solid #4f46e5;
        }

        .custom-btn-secondary:hover {
          background-color: #f3f4f6;
          transform: translateY(-2px);
        }
      `}</style>
        <div>
            <Link href={href} className="thumbnail">
                <img src={imgSrc} alt={blogTitle || "Hardware product"} />
            </Link>
            <div className="inner-content-area">
                <div className="top-area">
                    <span>Hardware Products</span>
                    <Link href={href}>
                        <h3 className="title animated fadeIn">
                            {blogTitle ? blogTitle : 'How to growing your business'}
                        </h3>
                    </Link>
                    <p className="disc">
                        {description ? description : 'How do you create compelling presentations that wow your colleagues and impress your managers?'}
                        
                    </p>
                    <div className="bottom-author-area" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {/* <style jsx>{`
                            .custom-btn {
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                padding: 10px 24px;
                                border-radius: 8px;
                                font-weight: 600;
                                font-size: 14px;
                                transition: all 0.3s ease;
                                text-decoration: none;
                            }
                            .custom-btn-primary {
                                background-color: #4f46e5;
                                color: #ffffff !important;
                                border: 1px solid #4f46e5;
                                box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
                            }
                            .custom-btn-primary:hover {
                                background-color: #4338ca;
                                border-color: #4338ca;
                                transform: translateY(-2px);
                                box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.15), 0 3px 6px -1px rgba(79, 70, 229, 0.1);
                            }
                            .custom-btn-secondary {
                                background-color: #ffffff;
                                color: #4f46e5 !important;
                                border: 1px solid #4f46e5;
                                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                            }
                            .custom-btn-secondary:hover {
                                background-color: #f3f4f6;
                                transform: translateY(-2px);
                                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                            }
                        `}</style> */}
                        {/* <img src="assets/images/testimonials/01.png" alt="author" /> */}
                            {/* <Link href={href} className="custom-btn custom-btn-primary">Read More</Link> */}
                            <Link href={href} className="custom-btn custom-btn-secondary">View Products</Link>
                            <Link href={href} className="custom-btn custom-btn-primary">Buy Now</Link>

                            {/* ------------------------------ */}
                            
                    </div>
                </div>
            </div>

        </div></>
        
        
    )
}

export default BlogGridMain

