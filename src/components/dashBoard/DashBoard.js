import React from 'react';
import { Link } from "react-router-dom";
import { ShoppingCart, People } from '@mui/icons-material'; 
import { Card, CardContent, Typography } from '@mui/material';  

export default function DashBoard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      <div style={styles.cardsContainer}>
       
        <Card style={styles.card}>
          <CardContent style={styles.cardContent}>
            <ShoppingCart style={styles.icon} />
            <Typography variant="h6" style={styles.cardTitle}>
              <Link to="/product-dashboard" style={styles.link}>Products</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage your products here.
            </Typography>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardContent style={styles.cardContent}>
            <People style={styles.icon} />
            <Typography variant="h6" style={styles.cardTitle}>
              <Link to="/userManagement-Dashboard" style={styles.link}>Users</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage your users here.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '40px',
    textAlign: 'center',
    minHeight: '60vh',
  },
  header: {
    color: '#333',
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    width: '200px',
    padding: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  cardContent: {
    textAlign: 'center',
  },
  icon: {
    fontSize: '40px',
    color: '#a6cf92',
    marginBottom: '10px',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    transition: 'color 0.3s ease-in-out',
  },
};
