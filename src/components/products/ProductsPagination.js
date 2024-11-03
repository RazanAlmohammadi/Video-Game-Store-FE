import React from 'react'
import Pagination from "@mui/material/Pagination";

export default function ProductsPagination({ page, handleChange, count }) {
   
    return (
        <div>
            <Pagination count={count} page={page} onChange={handleChange} />
        </div>
    )
}