import React from 'react'
import { Button } from "@mui/material";
import { Link} from "react-router-dom";
import CartItem from './CartItem';
export default function CartList(prop) {
  
     const { cartList, setCartList } = prop;

 

  if (cartList.length === 0) {
    return (
      <div>
        <h1> Cart is empty</h1>
        <Button>
          <Link to="/products"> Check out our new games</Link>
        </Button>
      </div>
    );
  }
  return (
    <div>
      <h1> Cart </h1>
      {cartList.map((cart) => {
        return (
          <CartItem
            key={cart.videoGameInfoId}
            cart={cart}
            cartList={cartList}
            setCartList={setCartList}
          />
        );
      
      })}
    </div>
  );
}
      
