import React from 'react';
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    isUserDataLoading,
    isAuthenticated,
    element,
    shouldCheckAdmin,
    isAdminAuthenticated
}) {
    if (isUserDataLoading) {
        return <div>Loading...</div>;
    }

    console.log("isAuthenticated:", isAuthenticated);
    console.log("isAdminAuthenticated:", isAdminAuthenticated);
    console.log("shouldCheckAdmin:", shouldCheckAdmin);

    if (shouldCheckAdmin) {
        return isAdminAuthenticated ? element : <Navigate to="/" />; 
    }

    return isAuthenticated ? element : <Navigate to="/Login" />;
}
