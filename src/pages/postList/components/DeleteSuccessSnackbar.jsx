import {useDispatch, useSelector} from "react-redux";
import {useIntl} from "react-intl";
import Snackbar from "../../../components/Snackbar";
import {setDeleteSuccessSnackbarOpen} from "../actions/postList";


const DeleteSuccessSnackbar = () => {
    const dispatch = useDispatch();
    const deleteSuccessSnackbarOpen = useSelector(({ postList }) => postList.deleteSuccessSnackbarOpen);
    const { formatMessage } = useIntl();

    return (
        <Snackbar
            open={deleteSuccessSnackbarOpen}
            autoHideDuration={3000}
            onClose={() => dispatch(setDeleteSuccessSnackbarOpen(false))}
            message={formatMessage({ id: 'successDeleteMessage' })}
        />
    );
};

export default DeleteSuccessSnackbar;