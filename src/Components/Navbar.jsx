import React from 'react'
import { Link } from 'react-router-dom'
import logo from "./logo.png"
// import {ImSearch} from "react-icons/im";
import { BsSearch } from "react-icons/bs";


function Navbar() {
  return (
    <nav className='navbar'>
    <img src={logo} alt="" />
    <div>
    <Link to="/">Home</Link>
        <Link  to="/tvshows">TV Shows </Link>
        <Link  to="/movies">Movies</Link>
        <Link  to="/recent">Recently Added</Link>
        <Link  to="/mylist">My List</Link>
    </div>   
    <BsSearch />
    </nav>
  )
}

export default Navbar
