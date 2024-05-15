import React from 'react';
import PaginationMUI from '@mui/material/Pagination';

function Pagination({
 children,
 count,
 page,
 onChange
}) {
    return (
        <PaginationMUI
            count={count}
            page={page}
            onChange={onChange}
        >
            {children}
        </PaginationMUI>
    );
}

export default Pagination;
