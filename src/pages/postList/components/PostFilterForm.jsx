import {useDispatch, useSelector} from "react-redux";
import {useIntl} from "react-intl";
import {fetchPosts, setFilters} from "../actions/postList";


function PostFilterForm() {
    const dispatch = useDispatch();
    const filters = useSelector(({ postList }) => postList.filters);
    const { formatMessage } = useIntl();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(fetchPosts());
        }}>
            <label>
                {formatMessage({ id: 'username' })}
                <input
                    type="text"
                    name="username"
                    value={filters.username}
                    onChange={(e) =>
                        dispatch(setFilters({ ...filters, username: e.target.value }))}
                />
            </label>
            <label>
                {formatMessage({ id: 'email' })}
                <input
                    type="text"
                    name="email"
                    value={filters.email}
                    onChange={(e) =>
                        dispatch(setFilters({ ...filters, email: e.target.value }))}
                />
            </label>
            <button type="submit">{formatMessage({ id: 'search' })}</button>
        </form>
    );
}

export default PostFilterForm;
