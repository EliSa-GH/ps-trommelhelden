import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavItems from "./NavItems/NavItems";

const Navbar = () => {
  return (
    <div>
      <AppBar elevation={0} sx={{ backgroundColor: "white" }} position="sticky">
        <Toolbar>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            {/* Logo */}
            <Box>
              <Logo />
            </Box>
            <NavItems />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
