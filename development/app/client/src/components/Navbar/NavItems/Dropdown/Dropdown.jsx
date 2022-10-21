import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auftragDropdown } from "./DropdownList";
import "./Dropdown.css";

const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div>
      <ul
        className={dropdown ? "submenu clicked" : "submenu"}
        onClick={() => {
          setDropdown(!dropdown);
        }}
      >
        {auftragDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                onClick={() => {
                  setDropdown(!dropdown);
                }}
                className={item.className}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
