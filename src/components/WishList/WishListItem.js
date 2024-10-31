import React from "react";
import "./WishListItem.css"; 

export default function WishListItem(prop) {
    const { item } = prop;
    return (
        <div className="wishList-item"> 
            <img src={item.image_url} alt={item.name} /> 
            <div className="wishList-item-details"> 
                <p className="wishList-item-name">{item.name}</p> 
                <p className="wishList-item-price">{item.price}</p>
            </div>
        </div>
    );
}
