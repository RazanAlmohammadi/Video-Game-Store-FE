import React from "react";


export default function WishListItem(prop) {
    const { item } = prop;
    return (
        <div className="wishList-item">
            <img src={item.gamePicturePath} alt={item.gameName} />
            <div className="wishList-item-details">
                <p className="wishList-item-name">{item.gameName}</p>
                <p className="wishList-item-price">{item.videoGameVersions[0].price}</p>
            </div>
        </div>
    );
}
