import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react'; // New import for search bar

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (<li className="search-bar">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button onClick={handleSearchSubmit}>Search</button>
      </li>)}
      {auth.isLoggedIn && (
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
        
      </li>
      )}
      {auth.isLoggedIn && (
      <li>
        <NavLink to="/songs" exact>
          ALL SONGS
        </NavLink>
      </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/albums">ALBUMS</NavLink> {/* New NavLink for Albums page */}
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/performers">PERFORMERS</NavLink> {/* New NavLink for Albums page */}
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/friends">FRIENDS</NavLink> {/* New NavLink for Albums page */}
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY RATED SONGS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD SONGS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/recommendations">RECOMMENDATIONS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/analysis">ANALYSIS</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
