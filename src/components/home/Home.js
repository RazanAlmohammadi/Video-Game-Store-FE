import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import background from "../../Videos/background.mp4";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination'; // Import MUI Pagination component

export default function Home() {
    const [trendingGames, setTrendingGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(0); // Track total pages for pagination

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5125/api/v1/Categories');
                setCategories(response.data); // Set categories directly
                setTotalPages(Math.ceil(response.data.length / 2)); // Calculate total pages (2 categories per page)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); // Fetch categories once on component mount

    // Get categories for the current page
    const getCategoriesForCurrentPage = () => {
        const startIndex = (currentPage - 1) * 2;
        return categories.slice(startIndex, startIndex + 2); // Return 2 categories per page
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5125/api/v1/VideoGamesInfo');
                const games = response.data;

                // Filter and sort for trending games
                const trending = games
                    .filter(game => game.totalRating >= 4.5) // Example filter for high-rated games
                    .sort((a, b) => b.totalRating - a.totalRating) // Sort by rating descending
                    .slice(0, 4); // Limit to top 5
                setTrendingGames(trending);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);

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
                        <Link to="/Products">
                            <Button variant="contained">Explore Now</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Promo Banner Section */}
            <div className="promo-banner-section">
                <div className="promo-banner">
                    Special Promotion: Get 20% off on all new games!
                </div>
            </div>

            {/* Categories Section */}
            <div className="categories-section">
                <h2>Categories</h2>
                <div className="categories-list">
                    {getCategoriesForCurrentPage().map((category) => (
                        <div key={category.categoryId} className="category-item">
                            <Link to={`/categories/${category.categoryName}`}>
                                <h3>{category.categoryName}</h3>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Pagination for Categories */}
                <Pagination
                    count={totalPages} // Total number of pages
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                />
            </div>

            {/* Trending Games Section */}
            <div className="trending-games-section">
                <h2>Trending Games</h2>
                <div className="trending-games">
                    {trendingGames.map((game) => (
                        <div key={game.videoGameInfoId} className="game-card">
                            <Link to={`/Products/${game.videoGameInfoId}`}>
                                <div className="game-image-container">
                                    <img src={game.gamePicturePath} alt={game.gameName} className="game-image" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
