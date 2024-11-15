import React from 'react';
import Products from "../components/Products/Products";
import Form from "../components/Form/Form";
import PriceRangeForm from "../components/products/PriceRangeForm";
import { Container, Box } from '@mui/material';
import './ProductPage.css';

export default function ProductPage({
  products,
  setUserInput,
  userInput,
  setMinPrice,
  setMaxPrice,
  cartList,
  setCartList,
  wishList,
  setWishList,
}) {
  return (
    <Container className="product-page" maxWidth="lg">
      <Box className="form-section" sx={{ mb: 4 }}>
        <Form setUserInput={setUserInput} />
      </Box>
      <Box className="price-range-section" sx={{ mb: 4 }}>
        <PriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </Box>
      <Box className="products-section">
        <products productList={products}
          userInput={userInput}
          cartList={cartList}
          setCartList={setCartList}
          wishList={wishList}
          setWishList={setWishList}
        />
      </Box>
    </Container>
  );
}
