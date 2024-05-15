import React from 'react';
import ListItemMUI from '@mui/material/ListItem';

function ListItem({
 children,
 key,
 onMouseEnter,
 onMouseLeave
}) {
    return (
        <ListItemMUI
            key={key}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </ListItemMUI>
    );
}

export default ListItem;