import logo from "../assets/bruinlogo.png";
import './css/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="logo-container">
        <img src={logo} className="logo" />
        <span style={{color: "white"}}className="brand-name">Bruin Business</span>
      </div>
      <div className="footer-bottom">
        Copyright © 2024 Bruin Business LLC or any affiliates. All rights
        reserved.
      </div>
    </footer>
  );
}
