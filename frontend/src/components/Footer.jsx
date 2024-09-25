import logo from "../assets/bruinlogo.png";
import linkedin from '../assets/linkedin.png';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png'
import './css/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="logo-container">
        <img src={logo} className="logo" />
        <span style={{color: "white"}} className="brand-name">Bruin Business
        <span className="footer-bottom">
        Copyright © 2024 Bruin Business LLC or any affiliates. All rights
        reserved.
        </span>
        </span>
        <div className="socials-container">
          <a
            href="https://www.linkedin.com/company/bruin-business/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} style={{ cursor: 'pointer' }} className="logo"/>
          </a>
          <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
          >
            <img src={facebook} style={{ cursor: 'pointer' }} className="logo"/>
          </a>
          <a
              href="https://www.instagram.com/bruinbusiness/"
              target="_blank"
              rel="noopener noreferrer"
          >
            <img src={instagram} style={{ cursor: 'pointer' }} className="logo"/>
          </a>
        </div>
      </div>
    </footer>
  );
}
