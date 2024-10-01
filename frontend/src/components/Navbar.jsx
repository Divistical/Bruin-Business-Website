import React, { useState } from 'react';
import logo from '../assets/bruinlogo.png';
import './css/Navbar.css';
import Overlay from './Overlay';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdownMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Overlay>
      <nav className="navbar">
        <a href='/home'>
          <div className="logo-container">
            <img src={logo} className='logo' alt="Bruin Business Logo" />
            <span className="brand-name">Bruin Business</span>
          </div>
        </a>

        {/* Hamburger Menu for Mobile */}
        <button className="hamburger" onClick={toggleMobileMenu}>
          &#9776;
        </button>

        {/* Navigation Items */}
        <ul className={`nav-items ${isMobileMenuOpen ? "mobile show" : ""}`}>
          <a href='/home'><li className="nav-item">Home</li></a>
          <a href='/about'><li className="nav-item">About</li></a>
          <a href='/team'><li className="nav-item">Team</li></a>
          <a href='/projects'><li className="nav-item">Projects</li></a>
          <a href='/contact'><li className="nav-item">Contact</li></a>
          
          {/* Dropdown for "Join Us" */}
          <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
            <li 
              className="nav-item" 
              onClick={toggleDropdownMenu}
            >
              Join Us
            </li>
            <div className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
              <a href="/join-business">For Businesses</a>
              <a href="/join-student">For Students</a>
            </div>
          </div>

          <a href='/admin-login'><li className='nav-item'>Admin Login</li></a>
        </ul>
      </nav>
    </Overlay>
  );
}
