import React from "react";
import Product from "./Product";
import "./Products.css";

export default function Products({ productList, cartList, setCartList, wishList, setWishList }) {
    return (
        <div className="products-section">
            <h1 className="products-title">Our Games</h1>
            <div className="products-grid">
                {productList.videoGamesInfos.map((product) => (
                    <Product
                        key={product.videoGameInfoId}
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
