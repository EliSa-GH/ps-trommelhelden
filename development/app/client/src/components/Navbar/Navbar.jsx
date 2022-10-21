import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavItems from "./NavItems/NavItems";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <Logo />
        <NavItems />
      </nav>
    </div>
  );
};

export default Navbar;
