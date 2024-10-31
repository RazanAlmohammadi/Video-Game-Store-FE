import React from 'react';
import Button from '@mui/material/Button';
import './Home.css';
import background from "../../Videos/background.mp4";

export default function Home() {
    return (
        <div className="home-container">
            <video autoPlay loop muted preload="auto" className="background-video">
                <source src={background} type="video/mp4" />
            </video>

            {/* Overlay Content */}
            <div className="home-content">
                <h1>Welcome to Our Store!</h1>
                <h3>We're delighted to have you here!</h3>
                <Button variant="contained" color="error" className="btn">Buy Now</Button>
            </div>

            {/* Promo Banner */}
            <div className="promo-banner">
                <p> 🎉 Get 20% off your first purchase! Use code WELCOME20 🎉</p>
            </div>
        </div>
    );
}
