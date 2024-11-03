import React from 'react'
import NavBar from '../components/Nav/NavBar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
    <div>
      <NavBar />
  <Outlet/>
  <Footer/>
      </div>
  )
}
