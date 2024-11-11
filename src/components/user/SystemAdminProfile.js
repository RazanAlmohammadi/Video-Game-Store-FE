import React from 'react';
import Button from "@mui/material/Button";
import './SystemAdminProfile.css';  
import { useNavigate } from "react-router-dom";

export default function SystemAdminProfile({ systemAdminData, setSystemAdminData, isLoading }) {
    const navigate = useNavigate();
    //const token = localStorage.getItem("token");
    if (isLoading) {
        return <h1> System admin loading</h1>
    }
    function logOutHandler() {
        localStorage.removeItem("token");
        setSystemAdminData(null);
        alert("Logged out successfully.");
        navigate("/login"); 
    }
   

    console.log(systemAdminData, "from admin profile");

    return (
        <div className="profile-container">
            <h1 className="profile-header">System Admin Profile</h1>
            <div className="profile-section">
              
                <div className="profile-picture">
                    <img className="profile-img"
                        src={systemAdminData.profilePicturePath || "https://via.placeholder.com/150"}
                        alt={systemAdminData.personName}
                    />
                </div>

                
                <p className="profile-info">Email: {systemAdminData.personEmail}</p>
                <p className="profile-info">Name: {systemAdminData.personName}</p>
                <p className="profile-info">Phone: {systemAdminData.personPhoneNumber}</p>
                <p className="profile-info">Person ID: {systemAdminData.personId}</p>

              
                <div className="permissions">
                    <h4>Permissions:</h4>
                    <ul>
                        <li>Manage Customers: {systemAdminData.manageCustomers ? "Yes" : "No"}</li>
                        <li>Manage Employees: {systemAdminData.manageEmployees ? "Yes" : "No"}</li>
                        <li>Manage Games: {systemAdminData.manageGames ? "Yes" : "No"}</li>
                        <li>Manage Stores: {systemAdminData.manageStores ? "Yes" : "No"}</li>
                        <li>Manage System Admins: {systemAdminData.manageSystemAdmins ? "Yes" : "No"}</li>
                    </ul>
                </div>
            </div>

        
            <Button variant="contained" color="error" className="logout-button" onClick={logOutHandler}>
                Log Out
            </Button>
        </div>
    );
}
