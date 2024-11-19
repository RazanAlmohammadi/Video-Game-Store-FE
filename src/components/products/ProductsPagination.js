import React from "react";
import Pagination from "@mui/material/Pagination";

export default function ProductsPagination({ page, handleChange, count }) {
    const styles = {
        paginationWrapper: {
            margin: "20px auto",
            textAlign: "center",
        },
    };

    return (
        <div style={styles.paginationWrapper}>
            <Pagination count={count} page={page} onChange={handleChange} color="secondary" />
        </div>
    );
}
