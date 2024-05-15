import * as pages from "../../../constants/pages";
import * as ActionTypes from '../constants/actionTypes.js';
import axios from "axios";


export const setPost = (post) => ({
    type: ActionTypes.SET_POST,
    payload: post
});

export const setEditedPost = (editedPost) => ({
    type: ActionTypes.SET_EDITED_POST,
    payload: editedPost
});

export const setValidationErrors = (error) => ({
    type: ActionTypes.SET_VALIDATION_ERROR,
    payload: error
});

export const toggleCreateMode = () => ({
    type: ActionTypes.TOGGLE_CREATE_MODE
});

export const toggleEditMode = () => ({
    type: ActionTypes.TOGGLE_EDIT_MODE
});

export const toggleSuccessSnackbar = () => ({
    type: ActionTypes.TOGGLE_SUCCESS_SNACKBAR
});

export const toggleErrorSnackbar = () => ({
    type: ActionTypes.TOGGLE_ERROR_SNACKBAR
});


export const fetchPostById = (id, location) => async (dispatch, getState) => {
    if (location.pathname === `/${pages.secretPage}/${pages.newPostPage}`) {
        dispatch(toggleCreateMode());
    } else {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                dispatch(setPost(res));
            })
            .catch(error => {
                console.error('Error fetching post by id:', error);
            })
    }
};

export const postPost = (changePage) => async (dispatch, getState) => {
    const { editedPost } = getState().postDetail;

    axios.post(`https://jsonplaceholder.typicode.com/users`, editedPost)
        .then((res) => {
            dispatch(toggleCreateMode())
            setEditedPost({});
            dispatch(toggleSuccessSnackbar())
            let newId = res.id;
            changePage({pathname: `/secret/posts/${newId}`});
        })
        .catch(error => {
            dispatch(toggleErrorSnackbar())
            console.error('Error sending data:', error);
        });
};

export const putPost = (id, location) => async (dispatch, getState) => {
    const { editedPost } = getState().postDetail;

    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, editedPost)
        .then((res) => {
            dispatch(fetchPostById(id, location))
            dispatch(toggleEditMode())
            dispatch(setEditedPost({}))
            dispatch(toggleSuccessSnackbar())
        })
        .catch(error => {
            dispatch(toggleErrorSnackbar())
            console.error('Error putting data:', error);
        });
};