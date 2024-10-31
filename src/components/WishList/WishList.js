import React from "react";
import WishListItem from "./WishListItem";
import "./WishListItem.css"; 

export default function WishList({ wishList }) {
    if (wishList.length === 0) {
        return <p>The wish list is empty.</p>;
    }

    return (
        <div className="wishList-container">
            <h1 className="wishList-title">WishList</h1> 
            {wishList.map((item) => {
                return <WishListItem key={item.id} item={item} />; 
            })}
        </div>
    );
}
