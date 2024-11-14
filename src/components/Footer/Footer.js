import React from 'react';
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <ul className="footer-links">
          <h4>Quick Links</h4>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>FAQ</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div className="footer-section">
        <ul className="footer-links">
          <h4>About Us</h4>
          <li>Our Story</li>
          <li>Careers</li>
          <li>Press Releases</li>
          <li>Blog</li>
        </ul>
      </div>

      <div className="footer-section">
        <ul className="footer-links">
          <h4>Customer Service</h4>
          <li>Shipping Information</li>
          <li>Return Policy</li>
          <li>Order Tracking</li>
          <li>Support</li>
        </ul>
      </div>

      
    </footer>
  );
}
