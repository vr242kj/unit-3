import React from 'react';
import DialogActionsMUI from '@mui/material/DialogActions';

function DialogActions({
 children
}) {
    return (
        <DialogActionsMUI>
            {children}
        </DialogActionsMUI>
    );
}

export default DialogActions;
