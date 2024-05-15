import {useIntl} from "react-intl";
import Grid from "../../../components/Grid";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {toggleEditMode} from "../actions/postDetail";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import useChangePage from "../../../misc/hooks/useChangePage";


function PostDetailView() {
    const { post } = useSelector(({ postDetail }) => postDetail);
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const changePage = useChangePage();

    const handleGoBack = () => {
        changePage({pathname: pageURLs[pages.postListPage]});
    };

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h5">{formatMessage({ id: 'detailInfo' })}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => dispatch(toggleEditMode())}>
                    <span role="img" aria-label="Edit">✏️️</span>
                </Button>
                <Typography>Id: {post.id}</Typography>
                {["name", "username", "email", "phone", "website"].map((field) => (
                    <Typography key={field}>{formatMessage({ id: field })}: {post[field]}</Typography>
                ))}
                <Grid item xs={12}>
                    <Button onClick={handleGoBack}>{formatMessage({ id: 'back' })}</Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PostDetailView;
