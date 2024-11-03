import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import notfound from "../../Images/not_found.jpg";
import './ProductDetail.css';
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from "@mui/material/Button";

export default function ProductDetail() {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `http://localhost:5125/api/v1/VideoGamesInfo/${productId}`;

    function fetchProductDetail() {
        axios
            .get(url)
            .then((response) => {
                setProductDetail(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error");
                setLoading(false); 
            });
    }

    useEffect(() => {
        fetchProductDetail();
    }, [productId]);

    if (loading) {
        return (
            <div className="progress">
                <CircularProgress />
                <Typography variant="h6">Loading product details...</Typography>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return (
            <div>
                <img className="error" src={notfound} alt="404 Not Found" />
                <Typography variant="h6">Oops! Something went wrong. Please try again later.</Typography>
            </div>
        );
    }

    if (!productDetail) {
        return <div>Product not found.</div>;
    }
    console.log(productDetail);
    return (
        <div className="product-detail">
            <img src={productDetail.gamePicturePath || notfound} alt={`Image of ${productDetail.gameName}`} />
            <div className="product-detail-info">
                <h2>{productDetail.gameName}</h2>
                <p>Description: {productDetail.description}</p>
                <Typography component="legend">User Rating</Typography>
                <Rating
                    name="product-rating"
                    value={productDetail.totalRating}
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" sx={{ color: "pink" }} />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    readOnly
                />
            </div>
        </div>
    );
}
