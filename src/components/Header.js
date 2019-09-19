import React from "react";
import { NavLink } from "react-router-dom";

//Styles
import logo from "../assets/logo-arkix.png";
import "../styles/Header.css";

const Header = () => {
  return (
    <nav>
      <div className="header_logo">
        <NavLink to="/employees">
          <img src={logo} alt="logo-arkix" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
