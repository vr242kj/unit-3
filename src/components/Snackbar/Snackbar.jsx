import React from 'react';
import SnackbarMUI from '@mui/material/Snackbar';

function Snackbar({
 children,
 open,
 autoHideDuration,
 onClose,
 message
}) {
    return (
        <SnackbarMUI
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            message={message}
        >
            {children}
        </SnackbarMUI>
    );
}

export default Snackbar;