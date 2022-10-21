import React, { useState } from "react";
import { Link } from "react-router-dom";

import { navItemsList } from "./navItemsList";
import Dropdown from "./Dropdown/Dropdown";
import "./NavItems.css";

const NavItems = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div>
      <ul className="nav-list">
        {navItemsList.map((item) => {
          if (item.title === "Auftraege") {
            return (
              <li
                key={item.id}
                onMouseEnter={() => setDropdown(!dropdown)}
                onMouseLeave={() => setDropdown(!dropdown)}
                className={item.className}
              >
                {dropdown && <Dropdown />}
                <Link to={item.path}>{item.title} </Link>
              </li>
            );
          }
          return (
            <li key={item.id} className={item.className}>
              <Link to={item.path}>{item.title} </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavItems;
