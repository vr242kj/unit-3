import {useIntl} from "react-intl";
import Grid from "../../../components/Grid";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";


function PostDetailView({ post, handleGoBack, handleEditToggle }) {
    const { formatMessage } = useIntl();

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h5">{formatMessage({ id: 'detailInfo' })}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleEditToggle}>
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
