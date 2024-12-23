import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CardActions, Collapse, IconButton, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Link} from "react-router-dom";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function UserOrderHistory() {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [gameNames, setGameNames] = useState({});
    const [paymentMethods, setPaymentMethods] = useState([]);

    const handleExpandClick = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const fetchGameName = async (videoGameVersionId) => {
        try {
            const versionResponse = await axios.get(`https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesVersion/${videoGameVersionId}`);
            const videoGameInfoId = versionResponse.data.videoGameInfoId;
            const gameInfoResponse = await axios.get(`https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${videoGameInfoId}`);
            return gameInfoResponse.data.gameName;
        } catch (err) {
            console.error('Error fetching game name:', err);
            setError('Error fetching game name');
        }
    };

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Order', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrderList(response.data);

                const paymentResponse = await axios.get('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Payment');
                setPaymentMethods(paymentResponse.data);

                const gameNamesMap = {};
                for (let order of response.data) {
                    for (let game of order.orderedGames) {
                        if (!gameNamesMap[game.videoGameVersionID]) {
                            const gameName = await fetchGameName(game.videoGameVersionID);
                            gameNamesMap[game.videoGameVersionID] = gameName;
                        }
                    }
                }
                setGameNames(gameNamesMap);
                setLoading(false);
            } catch (err) {
               
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);

    const getPaymentMethodName = (paymentId) => {
        const payment = paymentMethods.find((method) => method.paymentId === paymentId);
        return payment ? payment.paymentMethod : 'Unknown';
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}><CircularProgress /></div>;
    if (error) return <div>Error: {error}</div>;

    
    if (orderList.length === 0) {
        return (
            <div style={{ textAlign: 'center', paddingBottom: '200px',paddingTop:'100px', fontSize: '1.5rem', color: 'white' }}>
                <p>You haven't placed any orders yet.</p>
                <p>Explore our amazing collection of games and make your first purchase!</p>
                <Button variant="contained"  style={{ backgroundColor: '#a6cf92', color: '#FFFFFF' }}>
                    <Link to="/products" >Check out our new games</Link>
                </Button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Your Order History</h1>
            {orderList.map((order) => (
                <Card key={order.orderId} sx={{ marginTop: '20px', backgroundColor: '#f5f5f5' }}>
                    <CardContent>
                        <p><strong>Order Date:</strong> {(order.orderDate)}</p>
                        <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                    </CardContent>
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expandedOrder === order.orderId}
                            onClick={() => handleExpandClick(order.orderId)}
                            aria-expanded={expandedOrder === order.orderId}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expandedOrder === order.orderId} timeout="auto" unmountOnExit>
                        <CardContent>
                            {order.orderedGames && order.orderedGames.length > 0 ? (
                                order.orderedGames.map((game) => (
                                    <div key={game.id} style={{ marginBottom: '10px' }}>
                                        <p><strong>Game Name:</strong> {gameNames[game.videoGameVersionID] || <CircularProgress size={14} />}</p>
                                        <p><strong>Quantity:</strong> {game.quantity}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No games found in this order.</p>
                            )}
                            <p><strong>Payment Method:</strong> {getPaymentMethodName(order.paymentId)}</p>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </div>
    );
}
