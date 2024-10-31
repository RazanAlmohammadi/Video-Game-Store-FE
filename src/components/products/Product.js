import React, { useState } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";

export default function Product(prop) {
    const { product } = prop;
    
    console.log("Product prop:", product);

    return (
        <div className="product-container">
            <div className="product-title">
                {product.gameName}
            </div>
            <img className="product-image" src={product.gamePicturePath} alt={product.gameName} />
          <div className="product-rating">
                Rating: {product.totalRating}
            </div>
            <div className="button-container">
                <Button
                    variant="contained"
                    color="error"
                    className="btn"
                    component={Link}
                    to={`/Products/${product.videoGameInfoId}`}
                >
                    More Details
                </Button>
                </div>
            
        </div>
    );
}
