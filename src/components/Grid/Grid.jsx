import React from 'react';
import GridMUI from '@mui/material/Grid';

function Grid({
 children,
 container,
 item,
 spacing,
 xs
}) {
    return (
        <GridMUI
            container={container}
            item={item}
            spacing={spacing}
            xs={xs}
        >
            {children}
        </GridMUI>
    );
}

export default Grid;