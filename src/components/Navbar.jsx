import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <NavLink to='/'>
                Matches
            </NavLink>

            <NavLink to='/table'>
                Table
            </NavLink>
        </div>
    )
}

export default Navbar