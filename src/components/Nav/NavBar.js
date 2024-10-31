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
import { Badge } from '@mui/material';
export default function NavBar(prop) {
  const { wishList } = prop;
  const arrayLength = wishList.length;
  return (
    <nav>
      <img src={logo} alt="logo" className="logo" />
      <ul className="navList">
        <Link to="/Home"> <HomeIcon sx={{ color: "black" }} /></Link>
        <Link to="Products"> <SportsEsportsIcon sx={{ color: "black" }} /></Link>

        <Link to="About"><InfoIcon sx={{ color: "black" }} /></Link>
        <Badge badgeContent={arrayLength} color="primary">
          <Link to="/wishList"><FavoriteIcon sx={{ color: "black" }} /></Link></Badge>
        <Link to="/Cart"><ShoppingBasketIcon sx={{ color: "black" }} /></Link>
        <Link to="/login"> <Avatar alt="user icon" src={user} /></Link>
      </ul>

    </nav>
  )
}
