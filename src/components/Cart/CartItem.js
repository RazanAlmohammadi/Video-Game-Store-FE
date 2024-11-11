import React from 'react';
import { Button } from "@mui/material";

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
        <div>
            <p>Name: {cart.gameName}</p>
            <p>Price: {cart.videoGameVersions[0].price}</p>

            <Button
                variant="contained"
                onClick={() => increaseProductQuantity(cart.videoGameInfoId)}
            >
                +
            </Button>
            <p>Quantity: {cart.quantity}</p>
            <Button
                variant="contained"
                onClick={() => decreaseProductQuantity(cart.videoGameInfoId)}
            >
                -
            </Button>

            <Button
                variant="contained"
                onClick={() => removeProduct(cart.videoGameInfoId)}
            >
                Delete
            </Button>
        </div>
    );
}
