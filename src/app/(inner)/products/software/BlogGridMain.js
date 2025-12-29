"use client"

import Link from "next/link";

const BlogGridMain = (props) => {
    const { Slug, blogImage, blogTitle, description } = props;
    const href = `/products/software/${Slug}`;
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
                <img src={imgSrc} alt={blogTitle || "Software product"} />
            </Link>
            <div className="inner-content-area">
                <div className="top-area">
                    <span>Software Products</span>
                    <Link href={href}>
                        <h3 className="title animated fadeIn">
                            {blogTitle ? blogTitle : "Software product"}
                        </h3>
                    </Link>
                    <p className="disc">
                        {description ? description : ""}
                    </p>
                    <div className="bottom-author-area">
                        <Link href={href} className="btn btn-link p-0">View Details</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BlogGridMain
