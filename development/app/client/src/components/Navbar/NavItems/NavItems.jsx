import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import Dropdown from "./Dropdown/Dropdown";
import "./NavItems.css";

const NavItems = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* <Typography
        sx={{
          marginRight: "30px",
          cursor: "pointer",
          color: "#616161",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Aufträge
      </Typography> */}
      <Dropdown />
      <Typography
        sx={{
          marginRight: "30px",
          cursor: "pointer",
          color: "#616161",
          fontSize: "20px",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "none",
        }}
        component={Link}
        to="/kunden"
      >
        Kunden
      </Typography>
      <Typography
        sx={{
          marginRight: "30px",
          cursor: "pointer",
          color: "#616161",
          fontSize: "20px",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "none",
        }}
        component={Link}
        to="/mitarbeiter"
      >
        Mitarbeiter
      </Typography>
      <Typography
        sx={{
          marginRight: "30px",
          cursor: "pointer",
          color: "#616161",
          fontSize: "20px",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "none",
        }}
        component={Link}
        to="/bericht"
      >
        Bericht
      </Typography>
    </Box>
  );
};

export default NavItems;
