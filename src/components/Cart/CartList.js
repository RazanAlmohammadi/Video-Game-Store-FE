import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from './CartItem';
import './CartList.css';

export default function CartList(prop) {
  const { cartList, setCartList, isAuthenticated } = prop;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [storeName, setStoreName] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [storeNames, setStoreNames] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [authStatus, setAuthStatus] = useState(isAuthenticated || false);

  useEffect(() => {

    if (token && token !== '') {
      setAuthStatus(true);
    }

    // Fetch payment methods and stores
    const fetchData = async () => {
      try {
        const paymentMethodsResponse = await axios.get('  http://localhost:5125/api/v1/Payment');
        setPaymentMethods(paymentMethodsResponse.data);

        const storeNamesResponse = await axios.get('  http://localhost:5125/api/v1/Store');
        setStoreNames(storeNamesResponse.data);
      } catch (error) {
        console.error('Error fetching payment methods or store names:', error);
      }
    };
    fetchData();
  }, [token]);

  const totalPrice = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const orderedGames = cartList.map((item) => ({
    videoGameVersionID: item.videoGameVersions[0]?.videoGameVersionId,
    quantity: item.quantity,
  }));

  const checkOut = async () => {
    if (!authStatus) {
      alert("Please log in to checkout.");
      navigate("/login");
      return;
    }

    const orderPayload = {
      employeeId: 0,
      storeId: storeName,
      paymentId: paymentMethod,
      orderedGames: orderedGames,
    };

    try {
      const response = await axios.post(
        "  http://localhost:5125/api/v1/Order",
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Order is created successfully!");
        navigate("/products");
        setCartList([]);
      }
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
    }
  };

  if (cartList.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <h1 className="empty-cart-title">Oops! Your cart is empty.</h1>
          <p className="empty-cart-description">Looks like you haven't added anything yet. Explore new games!</p>
          <Button variant="contained" className="empty-cart-button">
            <Link to="/products" className="empty-cart-link">Check out our new games</Link>
          </Button>
        </div>
      </div>
    );
  }
  console.log(cartList)
  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cartList.map((cart) => (
        <CartItem key={cart.videoGameInfoId} cart={cart} cartList={cartList} setCartList={setCartList} />
      ))}

      <p className="total-price">Total price: {totalPrice}</p>

      <FormControl fullWidth>
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select labelId="payment-method-label" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} label="Payment Method">
          {paymentMethods.map((method) => (
            <MenuItem key={method.paymentId} value={method.paymentId}>{method.paymentMethod}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="store-name-label">Store Name</InputLabel>
        <Select labelId="store-name-label" value={storeName} onChange={(e) => setStoreName(e.target.value)} label="Store Name">
          {storeNames.map((store) => (
            <MenuItem key={store.storeId} value={store.storeId}>{store.location}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button className="checkout-button" onClick={checkOut}>Checkout</Button>


    </div>

  );
}
