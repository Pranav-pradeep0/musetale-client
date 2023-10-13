import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../service/baseurl';
import ReactPaginate from 'react-paginate'

const Blogs = ({ blogs }) => {

    const maxContentLength = 500;
    const blogsPerPage = 10;

    const truncateContent = content => {
        if (content.length <= maxContentLength) {
            return content;
        }
        return content.slice(0, maxContentLength) + '...';
    };

    const [currentPage, setCurrentPage] = useState(0);

    const truncatedBlogs = blogs.map(blog => ({
        ...blog,
        content: truncateContent(blog.content)
    }));

    const pageCount = Math.ceil(truncatedBlogs.length / blogsPerPage);
    const offset = currentPage * blogsPerPage;

    const currentBlogs = truncatedBlogs.slice(offset, offset + blogsPerPage);

    const handlePageClick = data => {
        setCurrentPage(data.selected);
    };

    return (
        <>
            {
                blogs.length > 0 ?

                    <div>
                        <h1 className='pb-5 ps-4'>Tales</h1>
                        <div className='d-flex flex-column gap-5 mb-5'>
                            {currentBlogs.map((blog, index) => (
                                <div key={index} className='card blog-card bg-dark'>
                                    <div className='card-header d-flex justify-content-between'>
                                        <div className='d-grid'>
                                            <h4>{blog.title}</h4>
                                            <small className='text-muted'>Written by : {blog.author.username}</small>
                                        </div>

                                        <ul class="navbar-nav flex-row">
                                            <li class="nav-item me-3 me-lg-1">
                                                <span class="nav-link d-sm-flex align-items-sm-center">
                                                    <img
                                                        src={`${BASE_URL}/uploads/${blog.author.profilePic}`}
                                                        class="rounded-circle"
                                                        height="40"
                                                        loading="lazy"
                                                    />
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='card-body'>
                                        {/* <h5 className='card-title'>{blog.title}</h5> */}
                                        <p className='card-text'>{truncateContent(blog.content)}</p>
                                        <div className='d-flex'>
                                            <button class="btn btn-primary ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasBottom-${index}`} aria-controls={`offcanvasBottom-${index}`}>Read More</button>
                                        </div>
                                    </div>
                                    <div class="offcanvas offcanvas-bottom bg-dark" data-bs-scroll="true" tabindex="-1" id={`offcanvasBottom-${index}`} aria-labelledby={`offcanvasBottomLabel-${index}`}>
                                        <div class="offcanvas-header mx-4 mt-5">
                                            <div className='ms-2'>
                                                <h2 class="offcanvas-title text-uppercase" id="offcanvasBottomLabel">{blog.title}</h2>
                                                <p className='small disabled mx-1 my-2'>By {blog.author.name} <p>On {blog.date}</p></p>
                                            </div>
                                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <hr className='m-0' />
                                        <div class="offcanvas-body px-5 py-4">
                                            {blog.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='d-flex mx-auto justify-content-center'>
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        </div>

                    </div>




                    :

                    <div>
                        <h1 className='pb-5 ps-4'>Tales</h1>
                        <div className='d-flex flex-column blog-card gap-5 mb-5'>
                            <h5 className='text-center'>No blogs found.</h5>
                        </div>
                    </div>

            }
        </>
    );
}

export default Blogs;
