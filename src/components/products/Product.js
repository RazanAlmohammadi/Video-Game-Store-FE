import React, { useState }from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { Snackbar } from '@mui/material';
export default function Product(prop) {
    const { product, cartList, setCartList, wishList, setWishList } = prop;
    const [open, setOpen] = useState(false);

    function addToFav(product) {
        const isInclude = wishList.some((item) => item.videoGameInfoId === product.videoGameInfoId);
        if (!isInclude) {
            setWishList([...wishList, product]);
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    console.log("Product prop:", product);
    function addToCart(product) {
        const isInclude = cartList.some((item) => item.videoGameInfoId === product.videoGameInfoId);
        if (!isInclude) {
            setCartList([...cartList, { ...product, quantity: 1 }]);
        }
    }
    console.log(cartList, "cart");
    return (
        <div className="product-container">
            <div className="product-title">
                {product.gameName}
            </div>
            <img className="product-image" src={product.gamePicturePath} alt={product.gameName} />
          <div className="product-rating">
                Rating: {product.totalRating}
            </div>
            <div className ="product-price"> Price: {product.videoGameVersions[0].price}</div>
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
                <Button onClick={() => addToCart(product)}> Add to cart </Button>
                </div>
            <Button
                variant="contained"
                color="error"
                className="btn"
                onClick={() => addToFav(product)}
            >
                Add to fav
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={`A ${product.gameName} is added to the wishlist`}
            />
     
            
        </div>
    );
}
