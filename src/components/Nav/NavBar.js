import React from 'react'
import "./NavBar.css"
import logo from "../../Images/logo.png";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Avatar from "@mui/material/Avatar";
import user from "../../Images/user-icon.png";
import Button from '@mui/material/Button';

import { Badge } from '@mui/material';
export default function NavBar(prop) {
  return (
    <nav>
      <img src={logo} alt="logo" className="logo" />
      <div class="navList-container">
      <ul className="navList">
        <Link to="/Home"> <HomeIcon sx={{ color: "black" }} /></Link>
        <Link to="Products"> <SportsEsportsIcon sx={{ color: "black" }} /></Link>
          <Link to="/wishList"><FavoriteIcon sx={{ color: "black" }} /></Link>
        <Link to="/Cart"><ShoppingBasketIcon sx={{ color: "black" }} /></Link>
         <Link to="About"><InfoIcon sx={{ color: "black" }} /></Link>
        </ul>
      </div>
    
     {/*   <Link to="/login"> <Avatar alt="user icon" src={user} /></Link> */}
     <div>
        <Button variant="contained" color="error" className="btn">Sign In</Button>
        <Button variant="contained" color="error" className="btn">Log In</Button>
      </div>
    </nav>
  )
}
