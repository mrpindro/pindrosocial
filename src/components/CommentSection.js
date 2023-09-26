import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { postComment } from '../actions/posts';

const CommentSection = ({ post }) => {
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(postComment(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className='comment-sect-con'>
            <div className='comment-display'>
                <h4>Comments:</h4>
                {comments?.map((comment, index) => (
                    <p key={index}>
                        <strong>{comment.split(': ')[0]}</strong>
                        {comment.split(':')[1]}
                    </p>
                ))}
                <div ref={commentsRef} />
            </div>
            {user?.result?.name && (
                <div className='write-comment'>
                    <h4>Write a comment:</h4>
                    <div className='comment-label-textarea'>
                        <label htmlFor="comment"></label>
                        <textarea 
                            name="comment" id="comment" cols='30' rows='5'
                            placeholder='Comment...'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        className='comment-btn'
                        onClick={handleClick}
                    >
                        Comment
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommentSection;