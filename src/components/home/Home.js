import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import background from "../../Videos/background.mp4";

export default function Home() {
    
    return (
        <div className="home-container">
            {/* Video Background Section */}
            <div className="video-section">
                <div className="section-inner">
                    <video className="background-video" autoPlay muted loop>
                        <source src={background} type="video/mp4" />
                    </video>
                    <div className="home-content">
                        <h1>Welcome to Our Game Site</h1>
                        <h3>Explore the latest games and updates</h3>
                        <Button variant="contained" className="btn">Get Started</Button>
                    </div>
                </div>
            </div>

            {/* Promo Banner Section */}
            <div className="promo-banner-section">
                <div className="promo-banner">
                    Special Promotion: Get 20% off on all new games!
                </div>
            </div>

           
          
        </div>

    );
}
