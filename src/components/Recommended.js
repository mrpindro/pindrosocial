import React from 'react';
import { MdDelete } from 'react-icons/md';
import { deletePost } from '../actions/posts';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const Recommended = ({post}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <div className='recommended'>
            <div className="recomm-img-createdAt-creator">
                <img src={post.selectedFile} alt="postImage" />
                <h3 className='post-creator'>{post.creator}</h3>
                <p className='createdAt'>
                    {moment(post.createdAt).fromNow()}
                </p>
            </div>
            <div className="title-message-tags">
                <h3 className='title'>{post.title}</h3>
                <p className='message'>{post.message}</p>
                <p className='tags'>{post.tags.map(tag => `#${tag} `)}</p>
            </div>
            <div className='thumbs-delete'> 
                <p>Likes: {post.likes.length}</p>
                <div className='delete'>
                    {(user?.result?.googleId === post?.creator || 
                        user?.result?.name === post.creator) && (
                            <button
                                className='delete-icon'
                                onClick={() => dispatch(deletePost(post._id))}
                            >
                                <MdDelete className='icon-del' /> Delete
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Recommended;