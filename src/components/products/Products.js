import React from 'react';
import Product from "./Product";
import "./Products.css";

export default function Products({ productList, cartList,
    setCartList, wishList, setWishList }) {  

    return (
        <div>
            <h1>Products</h1>
            <div className="productList">
                {productList.videoGamesInfos.map((product) => (
                    <Product
                        product={product} 
                        cartList={cartList}
                        setCartList={setCartList}
                        wishList={wishList}
                        setWishList={setWishList}
                    />
                ))}
            </div>
        </div>
    );
}
