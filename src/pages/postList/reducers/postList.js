import * as ActionTypes from '../constants/actionTypes';
import storage, {keys} from "../../../misc/storage";

const initialState = {
    posts: [],
    selectedPost: {},
    hoveredEntityIndex: null,
    totalPages: 1,
    postsPerPage: 3,
    filters: JSON.parse(storage.getItem(keys.POST_SEARCH_FILTERS)) || {},
    currentPage: parseInt(storage.getItem(keys.CURRENT_PAGE)) || 1,
    deleteConfirmationOpen: false,
    deleteSuccessSnackbarOpen: false,
    deleteErrorMessage: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case ActionTypes.SET_HOVERED_ENTITY_INDEX:
            return {
                ...state,
                hoveredEntityIndex: action.payload,
            };
        case ActionTypes.SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload,
            };
        case ActionTypes.SET_FILTERS:
            storage.setItem(keys.POST_SEARCH_FILTERS, JSON.stringify(action.payload))
            return {
                ...state,
                filters: action.payload,
            };
        case ActionTypes.SET_CURRENT_PAGE:
            storage.setItem(keys.CURRENT_PAGE, action.payload)
            return {
                ...state,
                currentPage: action.payload,
            };
        case ActionTypes.SET_DELETE_CONFIRMATION_OPEN:
            return {
                ...state,
                selectedPost: action.payload,
                deleteConfirmationOpen: true,
            };
        case ActionTypes.SET_DELETE_CONFIRMATION_CLOSE:
            return {
                ...state,
                selectedPost: {},
                deleteConfirmationOpen: false,
                deleteErrorMessage: ''
            };
        case ActionTypes.TOGGLE_DELETE_SUCCESS_SNACKBAR:
            return {
                ...state,
                deleteSuccessSnackbarOpen: !state.deleteSuccessSnackbarOpen,
            };
        case ActionTypes.SET_DELETE_ERROR_MESSAGE:
            return {
                ...state,
                deleteErrorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;