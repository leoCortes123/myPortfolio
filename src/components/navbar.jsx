import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.module.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Leonardo Cortes
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/about">About Me</Link>
          </li>
          <li>
            <Link to="/myJourney">My Journey</Link>
          </li>
          <li>
            <Link to="/contact">Contact Me</Link>
          </li>
          <li>
            <Link to="/city">City</Link>
          </li>
        </ul>
        <div className="menu-icon">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
