// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            maxime optio soluta beatae sint, minus, impedit facilis dolor
            tempore esse qui numquam iste enim? Nobis velit ex reiciendis
            maiores blanditiis quasi hic ipsa, repudiandae aut sint, illum
            suscipit. Beatae ratione ut dolorum quidem libero veniam magnam,
            excepturi saepe dicta numquam!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-right">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-012-456-5895</li>
            <li>contact@sunil.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Tomato.com All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
