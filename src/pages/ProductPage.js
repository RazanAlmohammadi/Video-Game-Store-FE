import React from 'react';
import Products from "../components/Products/Products";
import Form from "../components/Form/Form";
import PriceRangeForm from "../components/Products/PriceRangeForm";
export default function ProductPage({ products, setUserInput, userInput, setMinPrice,
  setMaxPrice, cartList,setCartList, wishList, setWishList, }) {
  return (
    <div>
      <Form setUserInput={setUserInput} />
      <PriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      <Products productList={products} userInput={userInput} cartList={cartList}
        setCartList={setCartList} wishList={wishList} setWishList={setWishList} />
    </div>
  );
}
