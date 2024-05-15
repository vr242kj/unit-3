import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {useIntl} from "react-intl";
import * as pages from "../../../constants/pages";
import {postPost, putPost, setEditedPost, setValidationErrors} from "../actions/postDetail";
import Grid from "../../../components/Grid";
import Button from "../../../components/Button";
import useChangePage from "../../../misc/hooks/useChangePage";


function PostDetailForm({ handleEditToggle }) {
    const dispatch = useDispatch();
    const changePage = useChangePage();
    const { id } = useParams();
    const location = useLocation();
    const { formatMessage } = useIntl();
    const { post, editedPost, validationErrors, createMode } = useSelector(({ postDetail }) => postDetail);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            if (location.pathname === `/${pages.secretPage}/${pages.newPostPage}`) {
                dispatch(postPost(changePage));
            } else {
                dispatch(putPost(id, location));
            }
        }
    };

    const validateFields = () => {
        const errors = {};

        if (!editedPost.name || editedPost.name.trim() === '') {
            errors.name = formatMessage({ id: 'nameRequired' });
        }

        if (!editedPost.username || editedPost.username.trim() === '') {
            errors.username = formatMessage({ id: 'usernameRequired' });
        }

        if (!editedPost.email || !isValidEmail(editedPost.email)) {
            errors.email = formatMessage({ id: 'validEmail' });
        }

        if (!/^[\d-+]+$/.test(editedPost.phone)) {
            errors.phone = formatMessage({ id: 'validPhone' });
        }

        if (!/^(https?:\/\/)?([\w\d]+\.)+[\w\d]{2,}(\/.*)?$/.test(editedPost.website)) {
            errors.website = formatMessage({ id: 'validWebpage' });
        }

        setValidationErrors(errors);
        dispatch(setValidationErrors(errors))
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
                        <Button onClick={handleEditToggle}>{formatMessage({ id: 'cancel' })}</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default PostDetailForm;
