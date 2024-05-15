import React from 'react';
import ListMUI from '@mui/material/List';

function List({
 children
}) {
    return (
        <ListMUI>
            {children}
        </ListMUI>
    );
}

export default List;