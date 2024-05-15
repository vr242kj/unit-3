import React from 'react';
import ListItemButtonMUI from '@mui/material/ListItemButton';

function ListItemButton({
 children,
 component,
 to
}) {
    return (
        <ListItemButtonMUI
            component={component}
            to={to}
        >
            {children}
        </ListItemButtonMUI>
    );
}

export default ListItemButton;