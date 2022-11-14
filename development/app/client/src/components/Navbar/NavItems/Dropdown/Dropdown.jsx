import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Button, Fade } from "@mui/material";

import "./Dropdown.css";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          marginRight: "30px",
          cursor: "pointer",
          color: "#616161",
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Aufträge
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose} component={Link} to="/auftraege">
          Deine Aufträge
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/offen">
          Offene Aufträge
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/anlegen">
          Auftrag anlegen
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/archiv">
          Archiv
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;
