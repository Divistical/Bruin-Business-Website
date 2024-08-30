import React from 'react';
import logo from '../assets/bruinlogo.png'
import './Navbar.css';
import Overlay from './Overlay';

export default function Navbar() {
  return (
    <Overlay>
      <nav className="navbar">
        <a href='/home'>
          <div className="logo-container">
            <img src={logo} className='logo' alt="Bruin Business Logo"/>
            <span className="brand-name">Bruin Business</span>
          </div>
        </a>
        
        <ul className="nav-items">
          <a href='/home'><li className="nav-item">Home</li></a>
          <a href='/about'><li className="nav-item">About</li></a>
          <a href='/team'><li className="nav-item">Team</li></a>
          <a href='/projects'><li className="nav-item">Projects</li></a>
          <a href='/contact'><li className="nav-item">Contact</li></a>
          <div className="dropdown">
            <span className="nav-item dropbtn">Join Us</span>
            <div className="dropdown-content">
              <a href="/join-business">For Businesses</a>
              <a href="/join-student">For Students</a>
            </div>
          </div>
          <a href='/admin-login'><li className='nav-item'>Admin Login</li></a>
        </ul>
      </nav>
    </Overlay>
  );
};
