import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import "./UserManagementDashboard.css";
export default function UserManagementDashboard() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [stores, setStores] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 2;
    const navigate = useNavigate();
    // Fetch users
    const fetchUsers = async (page) => {
        const offset = (page - 1) * limit;
        const token = localStorage.getItem('token');

        try {
            setLoading(true);
            const response = await axios.get(`https://video-game-store-fe.onrender.com/api/v1/Customer`, {
                params: { offset, limit },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data.customers);
            setTotalUserCount(response.data.totalCount);
        } catch (error) {
            setError(error);
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    console.log(users)
    const handleBack = () => {
        navigate(-1);
    };
    // Delete user
    const deleteUser = async (personId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`https://video-game-store-fe.onrender.com/api/v1/SystemAdmin/${personId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('User deleted:', response.data);
            fetchUsers(currentPage);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const fetchStoresAndPayments = async () => {
        const token = localStorage.getItem('token');

        try {
            const [storeResponse, paymentResponse] = await Promise.all([
                axios.get('https://video-game-store-fe.onrender.com/api/v1/Store', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get('https://video-game-store-fe.onrender.com/api/v1/Payment', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            setStores(storeResponse.data);
            setPaymentMethods(paymentResponse.data);
        } catch (error) {
            console.error('Error fetching stores or payment methods:', error);
            setError(error);
        }
    };

    // Fetch all orders
    const fetchOrders = async () => {
        const token = localStorage.getItem('token');

        try {
            setLoading(true);
            const response = await axios.get('https://video-game-store-fe.onrender.com/api/v1/Order/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedOrders = response.data;


            const ordersWithDetails = fetchedOrders.map((order) => {
                const store = stores.find((s) => s.storeId === order.storeId) || { name: 'Unknown Store' };
                const paymentMethod = paymentMethods.find((p) => p.paymentId === order.paymentId) || { name: 'Unknown Payment Method' };

                return {
                    ...order,
                    storeName: store.location,

                    paymentMethod: paymentMethod.paymentMethod,
                };
            });

            setOrders(ordersWithDetails);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
        fetchStoresAndPayments();
    }, []);

    useEffect(() => {
        fetchUsers(currentPage);
        const fetchData = async () => {
            await fetchStoresAndPayments();
            await fetchOrders();
        };
        fetchData();
    }, [currentPage]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const totalUserPages = Math.ceil(totalUserCount / limit);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="dashboard-container">
            <Button
                onClick={handleBack}
                variant="contained"
                style={{
                    backgroundColor: '#a6cf92',
                    color: '#FFFFFF',
                    marginleft: '400px',
                }}
            >
                &#8592; Back
            </Button>
            <div className="dashboard-section">
                <h1>User Dashboard</h1>
                <p>Total Users: {totalUserCount}</p>
                <div className="card-container">
                    {users.map((user) => (
                        <div className="card" key={user.personId}>
                            <h3>{user.personName}</h3>
                            <p>Email: {user.personEmail}</p>
                            <p>Age: {user.age}</p>
                            <button onClick={() => deleteUser(user.personId)}>Delete</button>
                        </div>
                    ))}
                </div>

                <div className="pagination-container">
                    {Array.from({ length: totalUserPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dashboard-section">
                <h1>Order Dashboard</h1>
                <p>Total Orders: {orders.length}</p>
                <div className="card-container">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div className="card" key={order.orderId}>

                                <p>Store Location: {order.storeName}</p>
                                <p>Total Price: ${order.totalPrice}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                <p>Order Date: {(order.orderDate).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No orders available.</p>
                    )}
                </div>

            </div>
        </div>
    );
}