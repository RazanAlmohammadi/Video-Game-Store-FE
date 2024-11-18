import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

export default function OrderManagementDashboard() {
    const [orders, setOrders] = useState([]);
    const [stores, setStores] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchStoresAndPayments = async () => {
        const token = localStorage.getItem('token');
        try {
            const [storeResponse, paymentResponse] = await Promise.all([
                axios.get('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Store', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Payment', {
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

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Order/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Raw Orders Response:', response.data);

            const fetchedOrders = response.data;

            const storeLookup = stores.reduce((acc, store) => {
                acc[store.storeId] = store.location;
                return acc;
            }, {});

            const paymentMethodLookup = paymentMethods.reduce((acc, paymentMethod) => {
                acc[paymentMethod.paymentId] = paymentMethod.paymentMethod;
                return acc;
            }, {});

            const ordersWithDetails = fetchedOrders.map((order) => ({
                ...order,
                storeName: storeLookup[order.storeId] || 'Unknown Store',
                paymentMethod: paymentMethodLookup[order.paymentId] || 'Unknown',
                orderDate: order.orderDate || null, 
            }));


            console.log('Mapped Orders With Details:', ordersWithDetails);
            setOrders(ordersWithDetails);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchStoresAndPayments();
        };

        fetchData();
    }, []);  

    useEffect(() => {
        if (stores.length > 0 && paymentMethods.length > 0) {
            fetchOrders();
        }
    }, [stores, paymentMethods]);  

    if (loading) return <CircularProgress />;  
    if (error) return <p>Error: Something went wrong while fetching the data.</p>;  

    const orderColumns = [
        { field: 'orderId', headerName: 'Order ID', width: 90 },
        { field: 'storeName', headerName: 'Store Location', width: 200 },
        { field: 'totalPrice', headerName: 'Total Price ($)', width: 150 },
        { field: 'paymentMethod', headerName: 'Payment Method', width: 200 },
        {field: 'orderDate',headerName: 'Order Date',width: 200,},
    ];

    return (
        <div className="dashboard-container">
            <Button
                onClick={() => navigate(-1)}
                variant="contained"
                style={{ backgroundColor: '#a6cf92', color: '#FFFFFF', marginBottom: '20px' }}
            >
                &#8592; Back
            </Button>
            <div className="dashboard-section">
                <h1>Order Dashboard</h1>
                <DataGrid
                    rows={orders}
                    columns={orderColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    autoHeight
                    getRowId={(row) => row.orderId}
                />
            </div>
        </div>
    );
}
