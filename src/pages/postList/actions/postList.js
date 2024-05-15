import * as ActionTypes from '../constants/actionTypes.js';
import axios from 'axios';

export const setPosts = (paginatedPosts) => ({
    type: ActionTypes.SET_POSTS,
    payload: paginatedPosts,
});

export const setSelectedPost = (post) => ({
    type: ActionTypes.SET_SELECTED_POST,
    payload: post,
});

export const setHoveredEntityIndex = (index) => ({
    type: ActionTypes.SET_HOVERED_ENTITY_INDEX,
    payload: index,
});

export const setTotalPages = (totalPages) => ({
    type: ActionTypes.SET_TOTAL_PAGES,
    payload: totalPages,
});

export const setFilters = (filters) => ({
    type: ActionTypes.SET_FILTERS,
    payload: filters,
});

export const setCurrentPage = (currentPage) => ({
    type: ActionTypes.SET_CURRENT_PAGE,
    payload: currentPage,
});

export const setDeleteConfirmationOpen = (open) => ({
    type: ActionTypes.SET_DELETE_CONFIRMATION_OPEN,
    payload: open,
});

export const setDeleteSuccessSnackbarOpen = (open) => ({
    type: ActionTypes.SET_DELETE_SUCCESS_SNACKBAR_OPEN,
    payload: open,
});

export const setDeleteErrorMessage = (message) => ({
    type: ActionTypes.SET_DELETE_ERROR_MESSAGE,
    payload: message,
});

export const handleCloseDeleteConfirmation = () => ({
    type: ActionTypes.HANDLE_CLOSE_DELETE_CONFIRMATION
});

export const fetchPost = () => async (dispatch, getState) => {
    const postsPerPage = getState().postList.postsPerPage;
    const currentPage = getState().postList.currentPage;
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            const totalPagesCount = Math.ceil(res.length / postsPerPage);
            dispatch(setTotalPages(totalPagesCount));

            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = Math.min(startIndex + postsPerPage, res.length);
            const paginatedPosts = res.slice(startIndex, endIndex);
            dispatch(setPosts(paginatedPosts));
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        })
};

export const deletePost = (formatMessage) => async (dispatch, getState) => {
    const selectedPost = getState().postList.selectedPost;
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedPost.id}`)
        .then(async () => {
            dispatch(setDeleteSuccessSnackbarOpen(true));
            dispatch(handleCloseDeleteConfirmation());
            await fetchPost();
        })
        .catch(error => {
            dispatch(setDeleteErrorMessage(formatMessage({ id: 'errorDuringDelete' })));
            console.error('Error fetching posts:', error);
        });
};

export const fetchPostByFilter = () => async (dispatch, getState) => {
    const currentPage = getState().postList.currentPage;
    const filters = getState().postList.filters;
    const postsPerPage = getState().postList.postsPerPage;

    axios.post('https://jsonplaceholder.typicode.com/users', filters)
        .then((res) => {
            const totalPagesCount = Math.ceil(res.length / postsPerPage);
            dispatch(setTotalPages(totalPagesCount));

            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = Math.min(startIndex + postsPerPage, res.length);
            const paginatedPosts = res.slice(startIndex, endIndex);
            dispatch(setPosts(paginatedPosts));
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
};

