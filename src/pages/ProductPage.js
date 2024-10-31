import React from 'react';
import Products from "../components/Products/Products";


export default function ProductPage({ products }) {

  return (
    <div>
      <Products productList={products} />
    </div>
  );
}
