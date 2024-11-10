import React from 'react';
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(prop) {
    const { isUserDataLoading, isAuthenticated, element, decodedToken, shouldCheckAdmin, isAdminAuthenticated } = prop;

    if (isUserDataLoading) {
        return <div>Loading...</div>;
    }

    if (shouldCheckAdmin) {
        return isAuthenticated && decodedToken.role === "SystemAdmin" ? element : <Navigate to="/login" />;
    }

    return isAuthenticated ? element : <Navigate to="/Login" />;
}
