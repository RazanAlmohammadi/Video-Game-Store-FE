import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WishListItem.css';

export default function WishListItem(prop) {
    const { item } = prop;
    const navigate = useNavigate();


    const goToGameDetailPage = () => {
        navigate(`/Products/${item.videoGameInfoId}`);
    };

    return (
        <div className="wishList-item" onClick={goToGameDetailPage}>
            <img src={item.gamePicturePath} alt={item.gameName} />
            <div className="wishList-item-details">
                <p className="wishList-item-name">{item.gameName}</p>
                <p className="wishList-item-price">${item.videoGameVersions[0].price}</p>
            </div>
        </div>
    );
}
