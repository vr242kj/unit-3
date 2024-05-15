import * as ActionTypes from '../constants/actionTypes.js';
import axios from 'axios';

export const setPosts = (paginatedPosts) => ({
    type: ActionTypes.SET_POSTS,
    payload: paginatedPosts,
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

export const setDeleteConfirmationClose = () => ({
    type: ActionTypes.SET_DELETE_CONFIRMATION_CLOSE
});

export const toggleDeleteSuccessSnackbar = () => ({
    type: ActionTypes.TOGGLE_DELETE_SUCCESS_SNACKBAR
});

export const setDeleteErrorMessage = (message) => ({
    type: ActionTypes.SET_DELETE_ERROR_MESSAGE,
    payload: message,
});

export const fetchPosts = () => (dispatch, getState) => {
    const { currentPage, postsPerPage, filters } = getState().postList;
    let url = 'https://jsonplaceholder.typicode.com/users';
    let request = (filters.username || filters.email) ? axios.post(url, filters) : axios.get(url);

    request
        .then(res => {
            const totalPagesCount = Math.ceil(res.length / postsPerPage);
            dispatch(setTotalPages(totalPagesCount));

            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = Math.min(startIndex + postsPerPage, res.length);
            const paginatedPosts = res.slice(startIndex, endIndex);
            dispatch(setPosts(paginatedPosts));
        })
        .catch(error => {
            console.error('Error fetching or sending data:', error);
        });
};

export const deletePost = (formatMessage) => async (dispatch, getState) => {
    const { selectedPost } = getState().postList;

    await axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedPost.id}`)
        .then(async () => {
            dispatch(toggleDeleteSuccessSnackbar());
            dispatch(setDeleteConfirmationClose());
            await fetchPosts();
        })
        .catch(error => {
            dispatch(setDeleteErrorMessage(formatMessage({ id: 'errorDuringDelete' })));
            console.error('Error deleting post:', error);
        });
};
