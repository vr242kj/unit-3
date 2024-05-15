import {useDispatch, useSelector} from "react-redux";
import {useIntl} from "react-intl";
import Snackbar from "../../../components/Snackbar";
import {handleSnackbarClose} from "../actions/postDetail";


const ValidationSnackbar = () => {
    const dispatch = useDispatch();
    const { successSnackbarOpen, errorSnackbarOpen } = useSelector(({ postDetail }) => postDetail);
    const { formatMessage } = useIntl();

    return (
        <>
            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => dispatch(handleSnackbarClose())}
                message={formatMessage({ id: 'successfully' })}
            />
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => dispatch(handleSnackbarClose())}
                message={formatMessage({ id: 'error' })}
            />
        </>
    );
};

export default ValidationSnackbar;
