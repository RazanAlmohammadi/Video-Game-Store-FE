import React from 'react';
import WishListItem from './WishListItem';

export default function WishList({ wishList }) {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '20px auto',
    },
    heading: {
      fontSize: '2em',
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: '1.2em',
      color: '#777',
      marginTop: '20px',
    },
  };

  if (wishList.length === 0) {
    return <p style={styles.emptyMessage}>Your wishlist is waiting for some love. Start adding your favorite games!</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Wish List</h1>
      {wishList.map((item) => (
        <WishListItem key={item.videoGameInfoId} item={item} />
      ))}
    </div>
  );
}
