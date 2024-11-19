import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./NavBar.css";
import logo from "../../Images/logo.jpg";
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Avatar from "@mui/material/Avatar";
import user from "../../Images/user-icon.png";
import Button from '@mui/material/Button';
import LineAxisIcon from '@mui/icons-material/LineAxis';

export default function NavBar({ isAuthenticated, isAdminAuthenticated }) {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <nav>
      <img src={logo} alt="logo" className="logo" />
      <div className="navList-container">
        <ul className="navList">
          <li><Link to="/Home" className={getLinkClass("/Home")}><HomeIcon sx={{ color: "white" }} /></Link></li>
          <li><Link to="/Products" className={getLinkClass("/Products")}><SportsEsportsIcon sx={{ color: "white" }} /></Link></li>
          <li><Link to="/wishList" className={getLinkClass("/wishList")}><FavoriteIcon sx={{ color: "white" }} /></Link></li>
          <li><Link to="/Cart" className={getLinkClass("/Cart")}><ShoppingBasketIcon sx={{ color: "white" }} /></Link></li>
          <li><Link to="/About" className={getLinkClass("/About")}><InfoIcon sx={{ color: "white" }} /></Link></li>
          {isAuthenticated && !isAdminAuthenticated && (
            <li><Link to="/order-history"><LineAxisIcon sx={{ color: "white" }} /> </Link></li>
          )}
          {isAdminAuthenticated && (
            <li><Link to="/Dashboard"><LineAxisIcon sx={{ color: "white" }} /> </Link></li>
          )}
        </ul>
      </div>

      <div className="auth-links">
        {isAuthenticated && !isAdminAuthenticated ? (

          <Link to="/UserProfile">
            <Avatar alt="user icon" src={user} />
          </Link>
        ) : isAdminAuthenticated ? (

          <Link to="/SystemAdminProfile">
            <Avatar alt="admin icon" src={user} />
          </Link>
        ) : (

          <>
            <Link to="/SignUp">
              <Button
                variant="contained"
                style={{ backgroundColor: '#a6cf92', color: '#FFFFFF' }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/Login">
              <Button
                variant="contained"
                style={{ backgroundColor: '#a6cf92', color: '#FFFFFF' }}
              >
                Log In
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
