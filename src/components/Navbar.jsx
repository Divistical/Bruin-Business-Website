import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href='/home'><div className="logo-container">
        <div className="image-placeholder"></div>
        <span className="brand-name">Bruin Business</span>
      </div></a>
      
      <ul className="nav-items">
        <a href='/home'><li className="nav-item">Home</li></a>
        <a href='/about'><li className="nav-item">About</li></a>
        <a href='/team'><li className="nav-item">Team</li></a>
        <a href='/projects'><li className="nav-item">Projects</li></a>
        <a href='/contact'><li className="nav-item">Contact</li></a>
        <a href='/join'><li className="nav-item">Join Us</li></a>
      </ul>
    </nav>
  );
};
