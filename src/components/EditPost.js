import React, { useEffect, useState } from 'react'
import EditForm from './form/EditForm';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';

const EditPost = () => {
    const [currentId, setCurrentId ] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId])

    return (
        <div className='main-con'>
            <EditForm currentId={currentId} setCurrentId={setCurrentId} />
        </div>
    );
}

export default EditPost;