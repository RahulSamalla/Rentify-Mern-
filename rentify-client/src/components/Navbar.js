import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/seller-dashboard">Seller Dashboard</NavLink>
      <NavLink to="/properties">Properties</NavLink>
    </nav>
  );
};

export default Navbar;
