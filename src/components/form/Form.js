import React, { useContext, useEffect, useRef, useState } from 'react';
// import { createPost, updatePost } from '../../actions/posts';
import { API } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DataContext from '../../context/ContextProvider';

const Form = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [tags, setTags] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState({started: false, pc: 0})
    const [msg, setMsg] = useState();
    const titleRef = useRef(null);
    const messageRef = useRef(null);
    const tagsRef = useRef(null);
    const selectedFileRef = useRef(null);
    // const [postData, setPostData] = useState({ 
    //     title: '', message: '', tags: ''
    // });
    const { currentId, setPostData } = useContext(DataContext);

    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector(state => currentId ? 
        state.posts.posts.find((post) => post._id === currentId) : null)
    ;
    
    useEffect(() => {
        if (post) {
           setPostData(post)
        }
    }, [post]);

    const clear = () => {
        titleRef.current.value = '';
        messageRef.current.value = '';
        tagsRef.current.value = '';
        selectedFileRef.current.value = '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile || !title || !message) {
            setMsg("All field required");
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('message', message);
        formData.append('tags', tags);
        formData.append('selectedFile', selectedFile);

        try {
            setMsg("Uploading...");
            setProgress(prevState => {
                return {...prevState, started: true}
            });
            const res = await API.post('/posts', formData, {
                onUploadProgress: (progressEvent) => {
                    setProgress(prevState => {
                        return {...prevState, pc: progressEvent.progress * 100}
                    })
                }, 
                headers: {
                    "Custom-Header": "value"
                }
            })
            setMsg("Upload Successful")
            // console.log(res.data);
            clear();
            navigate('/');
        } catch (error) {
            setMsg("Upload failed");
            // console.error(error);
        }        
    }

    if (!user?.result?.name) {
        return (
            <div className='form-con'>
                <h3>
                    Please sign in to create your own post and like other people's post.
                </h3>
            </div>
        );
    }

    return (
        <div className='form-con'>
            <form 
                autoComplete='off'
                noValidate
                onSubmit={handleSubmit}
                encType='multipart/form-data'
            >
                <h2>Create a Post</h2>
                <div className='form-group'>
                    <input  
                        className='form-control'
                        placeholder='Title'
                        type='text'
                        ref={titleRef}
                        // name='title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='form-group with-textarea'>
                    <label className='form-label'></label>
                    <textarea  
                        className='form-control'
                        placeholder='Message'
                        ref={messageRef}
                        // name='message'
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>               
                <div className='form-group'>
                    <input  
                        className='form-control'
                        placeholder='Tags'
                        type='text'
                        ref={tagsRef}
                        multiple={true}
                        onChange={(e) => setTags(e.target.value.split(','))}
                    />
                </div>
                <div className='form-group form-img'>
                    <label className='img-label'>Image</label>
                    <input 
                        type='file'
                        multiple={false}
                        // name='selectedFile'
                        // id='selectedFile'
                        ref={selectedFileRef}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </div>
                <div className='form-group'>
                    <input  
                        className='form-btn'
                        type='submit'
                        value="Submit Post"
                    />
                </div>
                <div className='form-group'>
                    <button className='form-btn-clear' type='button' onClick={clear}>Clear</button>
                </div>

                <div className="progress-bar-msg">
                    {progress && <progress max='100' value={progress.pc}></progress> }
                    {msg && <span>{msg}</span> }
                </div>

            </form>
        </div>
    );
}

export default Form;