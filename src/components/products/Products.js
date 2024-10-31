import React from 'react';
import Product from "./Product";
import "./Products.css";

export default function Products({ productList }) {  

    return (
        <div>
            <h1>Products</h1>
            <div className="productList">
                {productList.map((product) => (
                    <Product
                        product={product} 
                    />
                ))}
            </div>
        </div>
    );
}
