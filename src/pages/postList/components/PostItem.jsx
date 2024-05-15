import ListItem from "../../../components/ListItem";
import {useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import ListItemButton from "../../../components/ListItemButton";
import ListItemText from "../../../components/ListItemText";
import Typography from "../../../components/Typography";
import IconButton from "../../../components/IconButton";
import {setDeleteConfirmationOpen, setHoveredEntityIndex} from "../actions/postList";
import Link from "../../../components/Link";
import * as pages from "../../../constants/pages";


function PostItem({ post }) {
    const dispatch = useDispatch();
    const hoveredEntityIndex = useSelector(({ postList }) => postList.hoveredEntityIndex);
    const { formatMessage } = useIntl();

    return (
        <ListItem
            onMouseEnter={() => dispatch(setHoveredEntityIndex(post.id))}
            onMouseLeave={() => dispatch(setHoveredEntityIndex(null))}
        >
            <ListItemButton component={Link} to={`/${pages.secretPage}/${pages.postListPage}/${post.id}`}>
                <ListItemText
                    primary={<Typography>{formatMessage({ id: 'username' })}: {post.username}</Typography>}
                    secondary={<Typography>{formatMessage({ id: 'email' })}: {post.email}</Typography>}
                />
            </ListItemButton>
            {hoveredEntityIndex === post.id && (
                <IconButton edge="end" onClick={() => dispatch(setDeleteConfirmationOpen(post))}>
                    <span role="img" aria-label="Delete">❌</span>
                </IconButton>
            )}
        </ListItem>
    );
};

export default PostItem;