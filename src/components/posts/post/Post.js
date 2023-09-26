import { FaThumbsUp } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
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

    const navEdit = () => {
        setCurrentId(post._id);
    }

    const Likes = () => {
        if (likes?.length > 0) {
            return likes.find((like) => like === (userId)) ?
            (
                <div className='post-like'>
                    <FaThumbsUp className='like-icon' color='#ff0000' /> 
                    {
                        likes.length > 2 ? `You and ${likes.length -1} others` : 
                        `${likes.length} Like${likes.length > 1 ? 's' : ''}`
                    }
                </div>
            ) : (
                <div className='post-like'>
                    <FaThumbsUp className='like-icon' /> 
                    {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                </div>
            )
        }

        return <><FaThumbsUp className='like-icon' /> Like </>
    }

    return (
        <div className='post-con'>
            <div className='post'>
                <Link to={`/post/${post._id}`} className='nav-links post-img-title'>
                    <img className='post-image' src={post.selectedFile} alt='post' />
                    <h3 className='post-title'>{post.title}</h3>
                </Link>
                <div className='post-creator-createdAt'>
                    <p className='post-creator'>{post.creator}</p>
                    <p className='post-createdAt'>{moment(post.createdAt).fromNow()}</p>
                </div>
                <div className='post-props'>
                    {(user?.result?.googleId === post?.creator || 
                        user?.result?.name === post.creator) && (
                            <button
                                className='post-more-btn'
                                onClick={navEdit}
                            >
                                <FiMoreHorizontal size={30} />
                            </button>
                        )
                    }
                    <Link to={`/post/${post._id}`} className='nav-links post-content'>
                        <p className='post-content-para'>
                            {post.message.substring(0, 75)}...
                        </p>
                        {/* <div className='post-content'>
                        </div> */}
                    </Link>
                    <div className='post-hashtags'>
                        <p className='hashtag'>
                            {post.tags.map((tag) => `#${tag} `)}
                        </p>
                    </div>      
                    <div className='post-thumbs'> 
                        <button
                            className='thumb-icon'
                            onClick={handleLike}
                            disabled={!user?.result}
                        >
                            <Likes />
                        </button>
                    </div>
                    <div className='post-delete'>
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
        </div>
    );
}

export default Post;