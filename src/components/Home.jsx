import React, { useEffect, useState } from 'react'
import '../css/home.css'
import Navbar from './Home Components/Navbar'
import Blogs from './Home Components/Blogs'
import Recomended from './Home Components/Recomended'
import CreateArea from './Home Components/CreateArea'
import { getAllblogs, newPost, registerLogic } from '../service/allapi'

const Home = () => {

    const [allBlogs, setallBlogs] = useState([])

    const getallTales = async () => {
        const response = await getAllblogs()
        setallBlogs(response.data)
        // console.log(response.data);
    }

    const handleBlogSubmit = (blogContent) => {
        // console.log('Blog content to be submitted:', blogContent);
        newBlog(blogContent)
    };

    const newBlog = async (blogContent) => {
        const response = await newPost(blogContent)
        // console.log(response);
        getallTales()
    }

    // console.log(allBlogs);

    useEffect(() => {
        getallTales();
    },[])


    return (
        <>
            <div><Navbar></Navbar></div>

            <div><CreateArea onBlogSubmit={handleBlogSubmit}></CreateArea></div>

            <hr className='mb-5'/>

            <div className='unregistered-home-contents'>
                <div className='blogs-display'>
                    <Blogs blogs={allBlogs}></Blogs>
                </div>
                <div className='divider'></div>
                <div className='recomended'>
                    <Recomended recBlogs={allBlogs}></Recomended>
                </div>
            </div>
        </>
    )
}

export default Home