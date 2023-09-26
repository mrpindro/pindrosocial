// import React, { useEffect } from 'react';
// import Post from './posts/post/Post';
import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';
import { deletePost, getPost, getPostBySearch, likePost } from '../actions/posts';
import { Link, useParams } from 'react-router-dom';
import EditForm from './form/EditForm';
import ClipLoader from 'react-spinners/ClipLoader';
import DataContext from '../context/ContextProvider';
import Recommended from './Recommended';
import CommentSection from './CommentSection';

const PostPage = () => {
    const { posts, post, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const [currentId, setCurrentId ] = useState(null);
    const { id } = useParams();
    // const post = posts.find((post) => (post._id) === id)
    const user = JSON.parse(localStorage.getItem('profile'));
    const { visible, setVisible } = useContext(DataContext);

    const [likes, setLikes] = useState(post?.likes);
    const userId = user?.result?.googleId || user?.result?._id
    const hasLikedPost = post?.likes.find((like) => like === userId)

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    }

    const Likes = () => {
        if (likes?.length > 0) {
            return likes.find((like) => like === (userId)) ?
            (
                <>
                    <FaThumbsUp size={18} className='icon' color='#ff0000' /> 
                    {
                        likes.length > 2 ? `You and ${likes.length -1} others` : 
                        `${likes.length} Like${likes.length > 1 ? 's' : ''}`
                    }
                </>
            ) : (
                <>
                    <FaThumbsUp size={18} className='icon' /> 
                    {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }

        return <><FaThumbsUp size={18} className='icon' /> Like </>
    }
    
    const navEdit = () => {
        setVisible(true)
        setCurrentId(post._id);
    }

    useEffect(() => {
        if(post) {
            dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',')}))
        }
    }, [post, dispatch]);

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    if (!post) {
        return null;
    }

    if (isLoading) {
        return (
            <ClipLoader />
        )
    }

    const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

    return (
        <div className='main-con'>
            { (user?.result?.googleId === post?.creator || user?.result?.name === post?.creator) &&
                (<div className='home-edit'>
                    {/* <EditForm currentId={currentId} setCurrentId={setCurrentId} /> */}
                    {visible && (
                        <EditForm currentId={currentId} setCurrentId={setCurrentId} />
                    )}
                </div>)
            }

            {post && (
                <div className='post-con'>
                    <div className='single-post'>
                        <div className='single-post-img'>
                            <img className='post-image' src={post.selectedFile} alt='post' />
                        </div>
                        <div className='single-post-props'>
                            <div className='single-post-creator-createdAt'>
                                <p className='single-post-creator'>Created by:  
                                    <span>{post.creator}</span></p>
                                <p className='single-post-createdAt'>
                                    {moment(post.createdAt).fromNow()}
                                </p>
                            </div>
                            {(user?.result?.googleId === post?.creator || 
                                user?.result?.name === post.creator) && (
                                    <button
                                        className='single-post-edit-btn'
                                        // onClick={() => setCurrentId(post._id)}
                                        onClick={navEdit}
                                    >
                                        Modify
                                    </button>
                                )
                            }
                            <div className='single-post-content'>
                                <p className='single-post-hashtag'>
                                    {post.tags.map((tag) => `#${tag} `)}
                                </p>
                                <h3 className='single-post-title'>{post.title}</h3>
                                <p className='single-post-message'>
                                    {post.message}
                                </p>
                            </div>
                            <div className='single-post-like-delete'> 
                                <button
                                    className='thumb-icon'
                                    onClick={handleLike}
                                    disabled={!user?.result}
                                >
                                    <Likes />
                                </button>
                                {(user?.result?.googleId === post?.creator || 
                                    user?.result?.name === post.creator) && (
                                        <button
                                            className='single-post-delete-btn'
                                            onClick={() => dispatch(deletePost(post._id))}
                                        >
                                            Delete
                                        </button>
                                    )
                                }
                            </div>
                            <hr />
                            <div className="post-comment">
                                <CommentSection post={post} />
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

            )}
            {recommendedPosts?.length && (
                <div className="recommendation-con">
                    <h3>You might also like:</h3>
                    <hr />
                    <div className='recommended-con'>
                        {recommendedPosts.map(post => (
                            <Link 
                                className='nav-links' to={`/post/${post._id}`}
                                key={post._id}
                            >
                                <Recommended post={post} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostPage;