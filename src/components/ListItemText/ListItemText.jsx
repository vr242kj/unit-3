import React from 'react';
import ListItemTextMUI from '@mui/material/ListItemText';

function ListItemText({
 children,
 primary,
 secondary
}) {
    return (
        <ListItemTextMUI
            primary={primary}
            secondary={secondary}
        >
            {children}
        </ListItemTextMUI>
    );
}

export default ListItemText;