import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export const Layout = ({children}) => {
  return (
    <div >
        <NavBar/>
        {children}
        <ScrollToTop/>
        <Footer/>
    </div>
  )
}
