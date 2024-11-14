import React from 'react'
import NavBar from '../components/Nav/NavBar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout(prop) {
  const { wishList, isAuthenticated ,isAdminAuthenticated  } = prop;

  return (
    <div>
      <NavBar wishList={wishList}
       isAuthenticated={isAuthenticated}
      isAdminAuthenticated={isAdminAuthenticated} />
  <Outlet/>
  <Footer/>
      </div>
  )
}
