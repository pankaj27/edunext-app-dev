"use client"

const BlogGridMain = (props) => {
    const { Slug, blogImage, blogTitle, description } = props;
    return (
        <div>
            <a href={`/blog-grid/${Slug}`} className="thumbnail">
                <img src={`/assets/images/blog/${blogImage}`} alt="blog_iamge" />
            </a>
            <div className="inner-content-area">
                <div className="top-area">
                    <span>Services Products</span>
                    <a href={`/blog-grid/${Slug}`}>
                        <h3 className="title animated fadeIn">
                            {blogTitle ? blogTitle : 'How to growing your business'}
                        </h3>
                    </a>
                    <p className="disc">
                        {description ? description : 'How do you create compelling presentations that wow your colleagues and impress your managers?'}
                        
                    </p>
                    <div className="bottom-author-area">
                        {/* <img src="assets/images/testimonials/01.png" alt="author" /> */}
                            <button>Read More</button>
                            <button>View Products</button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default BlogGridMain