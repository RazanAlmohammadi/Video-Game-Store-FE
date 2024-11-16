import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import notfound from "../../Images/not_found.jpg";
import './ProductDetail.css';
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from "@mui/material/Button";
import { Box, Paper } from "@mui/material";

export default function ProductDetail({ cartList, setCartList }) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${productId}`;

    useEffect(() => {
        fetchProductDetail();
    }, [productId]);

    // Fetch product detail
    const fetchProductDetail = () => {
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
    };

    // Add product to cart
    const addToCart = (product) => {
        const isInclude = cartList.some((item) => item.videoGameInfoId === product.videoGameInfoId);
        if (!isInclude) {
            setCartList([...cartList, { ...product, quantity: 1 }]);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="progress">
                <CircularProgress />
                <Typography variant="h6" color="textSecondary">Loading product details...</Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <img className="error" src={notfound} alt="404 Not Found" />
                <Typography variant="h6" color="error">Oops! Something went wrong. Please try again later.</Typography>
            </div>
        );
    }

    if (!productDetail) {
        return <div>Product not found.</div>;
    }

    return (
        <Box className="product-detail">
            <Paper elevation={4} className="product-detail-container">

                <Button
                    onClick={handleBack}
                    variant="contained"
                    style={{ position: 'absolute', left: 30, top: 30, backgroundColor: '#a6cf92', color: '#FFFFFF' }}
                >
                    &#8592; Back
                </Button>

                <Box className="product-detail-content">
                    <img
                        src={productDetail.gamePicturePath || notfound}
                        alt={`Image of ${productDetail.gameName}`}
                        className="product-image"
                    />
                    <Box className="product-detail-info">
                        <Typography variant="h4" gutterBottom className="product-name">{productDetail.gameName}</Typography>
                        <Typography variant="body1" paragraph>{productDetail.description}</Typography>

                        <Box className="rating-cart-container">
                            <Box>
                                <Typography variant="h6" component="legend">User Rating</Typography>
                                <Rating
                                    name="product-rating"
                                    value={productDetail.totalRating}
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" sx={{ color: "pink" }} />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    readOnly
                                />
                            </Box>
                            <Button
                                onClick={() => addToCart(productDetail)}
                                variant="contained"
                                style={{ backgroundColor: '#a6cf92', color: '#FFFFFF', marginTop: 0 }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
