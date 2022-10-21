import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
import logoImg from "../../../images/logo.png";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={logoImg}></img>
      <div className="logoText">
        <h2>
          <span>T</span>
          ROMMEL
        </h2>
        <br />
        <h2 className="belowText">
          <span>H</span>
          ELDEN
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
