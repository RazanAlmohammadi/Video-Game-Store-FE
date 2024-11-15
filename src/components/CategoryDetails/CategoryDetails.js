import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoryDetail.css';

export default function CategoryDetail() {
    const { categoryName } = useParams();
    const [categoryDetails, setCategoryDetails] = useState(null);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(`  http://localhost:5125/api/v1/Categories/${categoryName}`);
                const categoryData = response.data[0];
                setCategoryDetails(categoryData);
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchCategoryDetails();
    }, [categoryName]);

    return (
        <div className="category-detail-container">
            {categoryDetails ? (
                <div>
                    <h2>{categoryDetails.categoryName} Games</h2>
                    {categoryDetails.videoGameInfos && categoryDetails.videoGameInfos.length > 0 ? (
                        <div className="games-list">
                            {categoryDetails.videoGameInfos.map((game) => (
                                <div key={game.videoGameInfoId} className="game-item">
                                    <Link to={`/Products/${game.videoGameInfoId}`}>
                                        <img src={game.gamePicturePath} alt={game.gameName} className="game-image" />
                                        <h3>{game.gameName}</h3>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-games-message">No games available for this category.</p>
                    )}
                </div>
            ) : (
                <p>Loading category details...</p>
            )}
        </div>
    );
}
