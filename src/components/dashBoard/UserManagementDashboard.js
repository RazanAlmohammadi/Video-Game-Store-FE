import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./UserManagementDashboard.css";

export default function UserManagementDashboard() {
    const [users, setUsers] = useState([]);
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); 
    const limit = 5;
    const navigate = useNavigate();

    const fetchUsers = async (page) => {
        const offset = page * limit;
        const token = localStorage.getItem("token");

        try {
            setLoading(true);
            const response = await axios.get(
                `https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Customer`,
                {
                    params: { offset, limit },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUsers(response.data.customers);
            setTotalUserCount(response.data.totalCount);
        } catch (error) {
            setError(error);
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const deleteUser = async (personId) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/SystemAdmin?personid=${personId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("User deleted");
            fetchUsers(currentPage);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const columns = [
        { field: "personName", headerName: "Name", width: 200 },
        { field: "personEmail", headerName: "Email", width: 200 },
        { field: "age", headerName: "Age", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="outlined" color="error"
                    onClick={() => deleteUser(params.row.personId)}
                >
                    Delete
                </Button>
            ),
            
        },
    ];

    const handlePageChange = (params) => {
        setCurrentPage(params.page); 
    };

    return (
        <div className="dashboard-container">
            <Button
                onClick={handleBack}
                variant="contained"
                style={{
                    backgroundColor: "#a6cf92",
                    color: "#FFFFFF",
                    marginBottom: "20px",
                }}
            >
                &#8592; Back
            </Button>
            <h1>User Dashboard</h1>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={limit}
                rowCount={totalUserCount}
                pagination
                paginationMode="server"
                onPageChange={handlePageChange}
                getRowId={(row) => row.personId}
                autoHeight
                disableSelectionOnClick
                loading={loading}
            />
            
        </div>
    );
}
