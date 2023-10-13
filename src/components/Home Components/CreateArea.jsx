import React, { useState } from 'react'

const CreateArea = ({onBlogSubmit}) => {

    const [blogContent, setBlogContent] = useState({
        title:'',
        content:'',
        authorid:''
    })

    const responseUserObjectparsed = JSON.parse(localStorage.getItem('user'));

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setBlogContent({
            ...blogContent,
            [name]: value,
            authorid: responseUserObjectparsed._id
        })
    };

    const handlePost = () => {
        onBlogSubmit(blogContent);
        setBlogContent({
            title: '',
            content: '',
            authorid: ''
        });
    };

    return (
        <div className='mx-3'>
            {

                responseUserObjectparsed ?

                    <div class="card create-card bg-dark mx-auto my-5">
                        <div class="card-body">
                            <h5 class="card-title ps-4 pt-4 pb-3 text-center">Write a blog</h5>
                            <p class="card-text "><input className='form-control' placeholder='Title' type="text" value={blogContent.title} name='title' onChange={handleInputChange}/></p>
                            <p class="card-text"><textarea className='form-control' type="text" placeholder='....' value={blogContent.content} name='content' onChange={handleInputChange}/></p>
                            <div className='d-flex '>
                                <button class="btn btn-outline-primary ms-auto me-4" onClick={handlePost}>Post</button>
                            </div>
                        </div>
                    </div>

                    :

                    <div class="card create-card bg-dark mx-auto my-5">
                        <div class="card-body">
                            <h5 class="card-title ps-4 pt-4 pb-3">Write and Inspire</h5>
                            <p class="card-text ps-4">Start a blog on musetale rightaway, start now with just one click</p>
                            <div className='d-flex '>
                                <a class="btn btn-outline-primary ms-auto me-4">Login Or Signup to Get Started</a>
                            </div>
                        </div>
                    </div>

            }
        </div>
    )
}

export default CreateArea