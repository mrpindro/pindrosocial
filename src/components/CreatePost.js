import React from 'react';
import Form from './form/Form';
import useTitle from '../hooks/useTitle';

const CreatePost = () => {
    useTitle('Pindro Social: Create Post');
    
    return (
        <div className='main-con'>
            <Form />
        </div>
    );
}

export default CreatePost;