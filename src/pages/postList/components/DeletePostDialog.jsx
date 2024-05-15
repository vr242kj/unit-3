import {useDispatch, useSelector} from "react-redux";
import {useIntl} from "react-intl";
import Dialog from "../../../components/Dialog";
import Button from "../../../components/Button";
import DialogActions from "../../../components/DialogActions";
import {deletePost, handleCloseDeleteConfirmation} from "../actions/postList";
import DialogTitle from "../../../components/DialogTitle";
import DialogContent from "../../../components/DialogContent";


function DeletePostDialog() {
    const dispatch = useDispatch();
    const deleteConfirmationOpen = useSelector(({ postList }) => postList.deleteConfirmationOpen);
    const deleteErrorMessage = useSelector(({ postList }) => postList.deleteErrorMessage);
    const { formatMessage } = useIntl();

    return (
        <Dialog open={deleteConfirmationOpen} onClose={() => dispatch(handleCloseDeleteConfirmation())}>
            <DialogTitle>{formatMessage({ id: 'deletePost' })}</DialogTitle>
            <DialogContent>
                <p>{formatMessage({ id: 'areYouSure' })}</p>
                {deleteErrorMessage && <p style={{ color: "red" }}>{deleteErrorMessage}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(deletePost(formatMessage))} color="primary">
                    {formatMessage({ id: 'confirm' })}
                </Button>
                <Button onClick={() => dispatch(handleCloseDeleteConfirmation())} color="primary">
                    {formatMessage({ id: 'cancel' })}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePostDialog;
