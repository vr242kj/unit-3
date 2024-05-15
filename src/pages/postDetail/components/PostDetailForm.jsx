import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {useIntl} from "react-intl";
import {
    postPost,
    putPost,
    setEditedPost,
    setValidationErrors,
    toggleCreateMode,
    toggleEditMode
} from "../actions/postDetail";
import Grid from "../../../components/Grid";
import Button from "../../../components/Button";
import useChangePage from "../../../misc/hooks/useChangePage";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";


function PostDetailForm() {
    const dispatch = useDispatch();
    const changePage = useChangePage();
    const { id } = useParams();
    const location = useLocation();
    const { formatMessage } = useIntl();
    const { post, editedPost, validationErrors, createMode } = useSelector(({ postDetail }) => postDetail);
    const isValidName = (name) => name && name.trim() !== '';
    const isValidUsername = (username) => username && username.trim() !== '';
    const isValidEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const isValidPhone = (phone) => /^\d+(-\d+)*$/.test(phone);
    const isValidWebsite = (website) => /^(https?:\/\/)?(\w+\.)+\w{2,}(\/.*)?(\/\?.+)?$/.test(website);

    const validateFields = () => {
        const { name, username, email, phone, website } = editedPost;
        const errors = {};

        if (!isValidName(name)) errors.name = formatMessage({ id: 'nameRequired' });
        if (!isValidUsername(username)) errors.username = formatMessage({ id: 'usernameRequired' });
        if (!isValidEmail(email)) errors.email = formatMessage({ id: 'validEmail' });
        if (!isValidPhone(phone)) errors.phone = formatMessage({ id: 'validPhone' });
        if (!isValidWebsite(website)) errors.website = formatMessage({ id: 'validWebpage' });

        dispatch(setValidationErrors(errors));
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            if (createMode) {
                dispatch(postPost(changePage));
            } else {
                dispatch(putPost(id, location));
            }
        }
    };

    const handleCancelButton = () => {
        if (createMode) {
            dispatch(toggleCreateMode())
            handleGoBack();
        } else {
            dispatch(setValidationErrors({}))
            dispatch(setEditedPost({}))
            dispatch(toggleEditMode())
        }
    };

    const handleGoBack = () => {
        changePage({pathname: pageURLs[pages.postListPage]});
    };

    return (
        <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {["name", "username", "email", "phone", "website"].map((field) => (
                        <Grid item xs={12} key={field}>
                            <label>
                                {formatMessage({ id: field })}:
                                <input
                                    type="text"
                                    name={field}
                                    placeholder={post[field]}
                                    value={editedPost[field]}
                                    onChange={(e) =>
                                        dispatch(setEditedPost({ ...editedPost, [field]: e.target.value }))}
                                />
                            </label>
                            {validationErrors[field] && <span style={{ color: 'red' }}
                                                              className="error">{validationErrors[field]}</span>}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <button type="submit">{createMode ?
                            formatMessage({ id: 'create' }) : formatMessage({ id: 'save' })}</button>
                        <Button onClick={handleCancelButton}>{formatMessage({ id: 'cancel' })}</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}

export default PostDetailForm;
