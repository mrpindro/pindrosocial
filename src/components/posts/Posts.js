import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post/Post';
import ClipLoader from 'react-spinners/ClipLoader';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);

    if(!posts.length && !isLoading) {
        return (
            <div className='main-con'>
                <h3>No posts</h3>
            </div>
        )
    }

    return (
        isLoading ? <ClipLoader /> : (
            <div className='posts-con'>
                <div className='posts'>
                    {
                        posts.map((post) => (
                            <div className='post' key={post._id}
                            >
                                <Post post={post} setCurrentId={setCurrentId} />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    );
}

export default Posts;