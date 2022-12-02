import React from 'react'
import {Link} from 'react-router-dom'
import { DropDown } from './DropDown'
import { LogInWrapper } from './LogInWrapper'

export const NavBar = () => {

  return (
    <nav className="w-100 flex j-between align-center sticky-top nav-bg">
        <div className="flex align-center">
            <Link className="m-1" to="/"><img className='nav-logo' src="/img/logo_transparent.png" alt="Logo" /></Link>
            <DropDown/>
        </div>
        <LogInWrapper/>
    </nav>
  )
}