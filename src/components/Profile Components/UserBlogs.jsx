import React, { useEffect, useState } from 'react';
import { userPosts, editpost, deletePost } from '../../service/allapi';

const UserBlogs = () => {

    const [currentUSerPosts, setCurrentUserPosts] = useState([]);

    const [editInfo, setEditInfo] = useState({
        postId: null,
        editedTitle: '',
        editedContent: '',
    });

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const getUserPosts = async () => {
        const response = await userPosts(currentUser._id);
        setCurrentUserPosts(response.data);
    };

    const handleEdit = (postId, title, content) => {
        setEditInfo({ postId, editedTitle: title, editedContent: content });
    };

    const handleSaveEdit = async () => {
        const { postId, editedTitle, editedContent } = editInfo;

        const response = await editpost(postId, {
            title: editedTitle,
            content: editedContent,
        });

        console.log(response);

        if (response.status === 200) {
            getUserPosts();
            setEditInfo({ postId: null, editedTitle: '', editedContent: '' });
        }

    };

    const handlePostDelete = async (postId) => {

        const response = await deletePost(postId);

        if (response.status === 200) {
            getUserPosts();
        }

    }

    useEffect(() => {
        getUserPosts();
    }, []);

    return (
        <div>
            <div>
                <h2 className='text-center mb-5'>Your Blogs</h2>
            </div>

            {
                currentUSerPosts.length === 0 ? <div><h3>No Posts to show</h3></div> : ''
            }

            {currentUSerPosts.map((post, index) => (
                <div key={post._id} className='card blog-card bg-dark'>
                    <div className='card-header d-grid'>
                        <div>
                            {editInfo.postId === post._id ?
                                <input
                                    className='form-control title-edit-input'
                                    value={editInfo.editedTitle}
                                    onChange={(e) =>
                                        setEditInfo({
                                            postId: post._id,
                                            editedTitle: e.target.value,
                                            editedContent: editInfo.editedContent,
                                        })
                                    }
                                />
                                :

                                <h4>{post.title}
                                </h4>
                            }
                        </div>
                        <div className=''>
                            <small className='text-muted'>{post.date}</small>
                        </div>
                    </div>
                    <div className='card-body'>
                        {editInfo.postId === post._id ?
                            <textarea
                                className='form-control edit-textarea'
                                value={editInfo.editedContent}
                                onChange={(e) =>
                                    setEditInfo({
                                        postId: post._id,
                                        editedTitle: editInfo.editedTitle,
                                        editedContent: e.target.value,
                                    })
                                }
                            ></textarea>
                            :
                            <p className='card-text'>{post.content}</p>
                        }
                        <div className='d-flex'>
                            {editInfo.postId === post._id ? 
                                <div className='d-flex gap-3 mt-4'>
                                    <button className='btn btn-success' onClick={handleSaveEdit}>
                                        Save
                                    </button>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() =>
                                            setEditInfo({
                                                postId: null,
                                                editedTitle: '',
                                                editedContent: '',
                                            })
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                             : 
                                <div className='d-flex justify-content-between w-100'>

                                    <button
                                        className='btn btn-primary'
                                        onClick={() => handleEdit(post._id, post.title, post.content)}
                                    >
                                        Edit
                                    </button>

                                    <button className='btn btn-danger' onClick={() => handlePostDelete(post._id)}>
                                        Delete
                                    </button>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserBlogs;
