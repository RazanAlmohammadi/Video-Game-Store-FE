import React from 'react'
import CartList from '../components/Cart/CartList';
export default function CartPage(prop) {
    const { cartList, setCartList } = prop;
    return <div><CartList
        cartList={cartList}
        setCartList={setCartList} /></div>;

}
