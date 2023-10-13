import moment from 'moment';
import React from 'react'

const Recomended = ({ recBlogs }) => {
    
    function shuffleArray(array) {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const maxContentLength = 70

    const truncateContent = (content) => {
        if (content.length <= maxContentLength) {
            return content;
        }
        return content.slice(0, maxContentLength) + '...';
    };

    const getFirstFiveBlogs = (blogs) => {
        return blogs.slice(0, 5);
    }

    const shuffledBlogs = shuffleArray(recBlogs);
    const firstFiveBlogs = getFirstFiveBlogs(shuffledBlogs);

    return (
        <div className='d-flex flex-column gap-4'>
            <h5 className='py-3'>Recommended for you ...</h5>
            {firstFiveBlogs.map((blog, index) => (
                <div className="card recomendation-card" style={{ width: "18rem" }} key={index}>
                    <div className="card-body">
                        <div className='d-grid'>
                            <h5 className="card-title ms-auto">{blog.title}</h5>
                            <h6 className="card-subtitle mb-2 ms-auto text-muted">{moment(blog.date, "MMMM Do YYYY, h:mm:ss a").fromNow()}</h6>
                        </div>
                        <hr className='m-0 pb-3' />
                        <p className="card-text">{truncateContent(blog.content)}</p>
                        <div className='d-flex'>
                            <a href="#" className="card-link ms-auto">Read More</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Recomended;
