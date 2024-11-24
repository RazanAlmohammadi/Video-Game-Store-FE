import React from 'react';
import { Button, Typography, Box } from "@mui/material";
import './CartItem.css';  // Import the CSS file

export default function CartItem(prop) {
    const { cart, cartList, setCartList } = prop;

    function increaseProductQuantity(videoGameInfoId) {
        const newCartList = cartList.map((item) => {
            if (item.videoGameInfoId === videoGameInfoId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartList(newCartList);
    }

    function decreaseProductQuantity(videoGameInfoId) {
        const newCartList = cartList.map((item) => {
            if (item.quantity === 1) {
                return item;
            }
            if (item.videoGameInfoId === videoGameInfoId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartList(newCartList);
    }

    function removeProduct(videoGameInfoId) {
        setCartList(cartList.filter((cartItem) => cartItem.videoGameInfoId !== videoGameInfoId));
    }

    return (
        <div className="cart-item-container">
            <div className="cart-item-image">
                <img src={cart.gamePicturePath} alt={cart.gameName} className="cart-item-image" />
            </div>

            <div className="cart-item-details">
                <Typography variant="h6" className="cart-item-name">{cart.gameName}</Typography>
                <Typography variant="body1" className="cart-item-price">Price: ${cart.videoGameVersions[0].price}</Typography>
            </div>

            <div className="cart-item-actions">
                <Button
                    className="cart-item-button"
                    variant="contained" style={{ backgroundColor: '#a6cf92', color: '#FFFFFF' }}
                    onClick={() => increaseProductQuantity(cart.videoGameInfoId)}
                >
                    +
                </Button>
                <Typography variant="body1" className="cart-item-button">
                    Quantity: {cart.quantity}
                </Typography>
                <Button
                    className="cart-item-button"
                    variant="contained" style={{ backgroundColor: '#a6cf92', color: '#FFFFFF' }}
                    onClick={() => decreaseProductQuantity(cart.videoGameInfoId)}
                >
                    -
                </Button>
                <Button
                    className="delete-button"
                    variant="outlined"
                    onClick={() => removeProduct(cart.videoGameInfoId)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}
