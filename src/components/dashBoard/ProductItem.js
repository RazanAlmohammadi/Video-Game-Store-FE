import React from 'react'

export default function ProductItem(prop) {
    const { product} = prop;
    return (
        <div>
            <p> {product.gameName}</p>
            //<p> {product.price}</p>
          
        </div>
    );
}

