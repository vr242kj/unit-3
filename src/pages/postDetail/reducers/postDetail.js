import * as ActionTypes from '../constants/actionTypes';

const initialState = {
    editMode: false,
    createMode: false,
    post: {},
    editedPost: {},
    successSnackbarOpen: false,
    errorSnackbarOpen: false,
    validationErrors: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_POST:
            return {
                ...state,
                post: action.payload,
            };
        case ActionTypes.SET_EDITED_POST:
            return {
                ...state,
                editedPost: action.payload,
            };
        case ActionTypes.SET_VALIDATION_ERROR:
            return {
                ...state,
                validationErrors: action.payload,
            };
        case ActionTypes.TOGGLE_CREATE_MODE:
            return {
                ...state,
                createMode: !state.createMode
            };
        case ActionTypes.TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: !state.editMode
            };
        case ActionTypes.TOGGLE_SUCCESS_SNACKBAR:
            return {
                ...state,
                successSnackbarOpen: !state.successSnackbarOpen
            };
        case ActionTypes.TOGGLE_ERROR_SNACKBAR:
            return {
                ...state,
                errorSnackbarOpen: !state.errorSnackbarOpen
            };
        default:
            return state;
    }
};

export default reducer;