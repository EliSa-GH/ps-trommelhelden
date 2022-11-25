import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Progress = () => {
  return (
    <Box
      height="100px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size="75px" thickness={5} />
    </Box>
  );
};

export default Progress;
