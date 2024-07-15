import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="image-placeholder"></div>
        <span className="brand-name">Bruin Business</span>
      </div>
      <ul className="nav-items">
        <li className="nav-item">Home</li>
        <li className="nav-item">About</li>
        <li className="nav-item">Team</li>
        <li className="nav-item">Projects</li>
        <li className="nav-item">Contact</li>
        <li className="nav-item">Join Us</li>
      </ul>
    </nav>
  );
};
