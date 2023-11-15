import React from "react";

import { NavLink } from "react-router-dom";

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>All Users</NavLink>   
        </li>
        <li>
            <NavLink to="/u1/songs">My Songs</NavLink>
        </li>
        <li>
            <NavLink to="/songs/new">Add Song</NavLink>
        </li>
        <li>
            <NavLink to="/login">Login</NavLink>
        </li>
        <li>
            <NavLink to="/signup">Sign Up</NavLink>
        </li>
    </ul>
};

export default NavLinks;