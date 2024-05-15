import React from 'react';
import DialogTitleMUI from '@mui/material/DialogTitle';

function DialogTitle({
 children
}) {
    return (
        <DialogTitleMUI>
            {children}
        </DialogTitleMUI>
    );
}

export default DialogTitle;
