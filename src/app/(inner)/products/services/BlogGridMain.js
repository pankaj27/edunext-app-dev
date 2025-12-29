"use client"

import Link from "next/link";

const BlogGridMain = (props) => {
    const { Slug, blogImage, blogTitle, description } = props;
    const href = `/products/services/${Slug}`;
    const imgValue = typeof blogImage === "string" ? blogImage.trim() : "";
    const imgSrc = imgValue
        ? imgValue.startsWith("data:")
            ? imgValue
            : imgValue.startsWith("/") || imgValue.startsWith("http")
                ? imgValue
                : `/assets/images/blog/${imgValue}`
        : "/assets/images/blog/01.webp";
    return (
        <div>
            <Link href={href} className="thumbnail">
                <img src={imgSrc} alt={blogTitle || "Service product"} />
            </Link>
            <div className="inner-content-area">
                <div className="top-area">
                    <span>Service Products</span>
                    <Link href={href}>
                        <h3 className="title animated fadeIn">
                            {blogTitle ? blogTitle : 'How to growing your business'}
                        </h3>
                    </Link>
                    <p className="disc">
                        {description ? description : 'How do you create compelling presentations that wow your colleagues and impress your managers?'}
                        
                    </p>
                    <div className="bottom-author-area">
                        {/* <img src="assets/images/testimonials/01.png" alt="author" /> */}
                            <Link href={href} className="btn btn-link p-0">Read More</Link>
                            <Link href={href} className="btn btn-link p-0">View Products</Link>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default BlogGridMain
