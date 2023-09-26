import * as api from '../api';
import { 
    FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_POST, FETCH_BY_SEARCH, 
    START_LOADING, END_LOADING, COMMENT 
} from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, numberOfPages, currentPages } } = await api.fetchPosts(page);
        // console.log(data)
    
        dispatch({ type: FETCH_ALL, payload: { 
            data, numberOfPages, currentPages
        } });
        dispatch({ type: END_LOADING });
    } catch(error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
    
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch(error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostBySearch(searchQuery);
    
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch(error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        // navigate(`/post/${data._id}`);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const postComment = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.postComment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}
