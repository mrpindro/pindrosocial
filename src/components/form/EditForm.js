import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/posts';
// import { useNavigate } from 'react-router-dom';

const EditForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ 
        title: '', message: '', tags: ''
    });

    const post = useSelector((state) => currentId ? 
        state.posts.posts.find((post) => post._id === currentId) : null)
    ;

    // const { posts } = useSelector((state) => state.posts)
    // const post = currentId ? posts.find(post => post._id === currentId) : null;

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '' });
    }

    useEffect(() => {
        if (post) {
           setPostData(post)
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, }));
            clear()
            window.location.reload();
        }
    }


    return (
        <div className='form-con'>
            <form onSubmit={handleSubmit} className='edit-form'>
                <h2>Edit Post</h2>
                <div className="edit-form-groups">
                    <div className="form-group">
                        <label htmlFor="title">Enter a title</label>
                        <input 
                            type="text"
                            placeholder='Enter Title'
                            required
                            name='title' 
                            id='title'
                            className='form-control'
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group with-textarea">
                        <label htmlFor="message">Add a message</label>
                        <textarea 
                            placeholder='Add a message'
                            required
                            name='message' 
                            id='message'
                            className='form-control'
                            value={postData.message}
                            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">
                            Add Tags (separate with a comma ,)
                        </label>
                        <input 
                            type="text"
                            placeholder='Add Tags (separate with a comma ,)'
                            required
                            name='tags' 
                            id='tags'
                            className='form-control'
                            value={postData.tags}
                            onChange={(e) => setPostData({
                                ...postData, tags: e.target.value.split(',')
                            })}
                        />
                    </div>
                </div>
                <div className="form-edit-btns">
                    <div className='form-group'>
                        <input  
                            className='form-btn'
                            type='submit'
                            value="Submit Post"
                        />
                    </div>
                    <div className='form-group'>
                        <button className='form-btn-clear' type='button' onClick={clear}>
                            Clear
                        </button>
                    </div>
                </div>

                {/* <div className="progress-bar-msg">
                    {progress && <progress max='100' value={progress.pc}></progress> }
                    {msg && <span>{msg}</span> }
                </div> */}
            </form>

        </div>
    );
}

export default EditForm;