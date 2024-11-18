import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductDashBoard from './ProductDashBoard';
import UserManagementDashboard from './UserManagementDashboard';
import './AdminDashboard.css'; 
import OrderManagementDashboard from './OrderManagementDashboard';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box className="dashboard-container">
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                className="tabs-container"
            >
                <Tab label="Manage Products" className="tab-item" />
                <Tab label="Manage Users" className="tab-item" />
                <Tab label="Manage Orders" className="tab-item" />
            </Tabs>

            <Box className="content-container">
                {activeTab === 0 && <ProductDashBoard />}
                {activeTab === 1 && <UserManagementDashboard />}
           {activeTab === 2 && <OrderManagementDashboard />}  
            </Box>
        </Box>
    );
}
