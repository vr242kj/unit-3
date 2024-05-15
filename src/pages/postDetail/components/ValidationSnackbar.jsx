import {useDispatch, useSelector} from "react-redux";
import {useIntl} from "react-intl";
import Snackbar from "../../../components/Snackbar";
import {toggleErrorSnackbar, toggleSuccessSnackbar} from "../actions/postDetail";


function ValidationSnackbar() {
    const dispatch = useDispatch();
    const { successSnackbarOpen, errorSnackbarOpen } = useSelector(({ postDetail }) => postDetail);
    const { formatMessage } = useIntl();

    return (
        <>
            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => dispatch(toggleSuccessSnackbar())}
                message={formatMessage({ id: 'successfully' })}
            />
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => dispatch(toggleErrorSnackbar())}
                message={formatMessage({ id: 'error' })}
            />
        </>
    );
}

export default ValidationSnackbar;
