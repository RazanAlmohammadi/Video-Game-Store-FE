import React from 'react'
import ProductDetails from "../components/ProductDetail/ProductDetail"
export default function ProductDetail({ products ,
  cartList, setCartList  }) {
  return <div className="product-detail-container">
    <ProductDetails
      products={products}
      cartList={cartList}
      setCartList={setCartList} />
  </div>
}
