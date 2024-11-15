import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import background from "../../Videos/background.mp4";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

export default function Home() {
    const [trendingGames, setTrendingGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('  http://localhost:5125/api/v1/Categories');
                setCategories(response.data);
                setTotalPages(Math.ceil(response.data.length / 2));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const getCategoriesForCurrentPage = () => {
        const startIndex = (currentPage - 1) * 2;
        return categories.slice(startIndex, startIndex + 2);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('  http://localhost:5125/api/v1/VideoGamesInfo');
                const games = response.data.videoGamesInfos;

                console.log("Fetched games:", games);

                // Ensure games is an array before filtering
                if (Array.isArray(games)) {
                    const trending = games
                        .filter(game => game.totalRating >= 4.5)
                        .sort((a, b) => b.totalRating - a.totalRating)
                        .slice(0, 4);
                    setTrendingGames(trending);
                } else {
                    console.error("Unexpected data format for games:", games);
                }
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);


    return (
        <div className="home-container">
            <div className="video-section">
                <div className="section-inner">
                    <video className="background-video" autoPlay muted loop>
                        <source src={background} type="video/mp4" />
                    </video>
                    <div className="home-content">
                        <h1>Welcome to Our Game Site</h1>
                        <h3>Explore the latest games and updates</h3>
                        <Link to="/Products">
                            <Button variant="contained" style={{ backgroundColor: '#736ced', color: '#FFFFFF' }}>
                                Explore Now
                            </Button>

                        </Link>
                    </div>
                </div>
            </div>


            <div className="promo-banner-section">
                <div className="promo-banner">
                    Special Promotion: Get 20% off on all new games!
                </div>
            </div>


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


                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                />
            </div>


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
