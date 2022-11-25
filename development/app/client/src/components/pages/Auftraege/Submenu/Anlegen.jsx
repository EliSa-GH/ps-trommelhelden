import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AuftragForm from "../AuftragForm/AuftragForm";

const Anlegen = () => {
  const [selectedAuftraege, setSelectedAuftraege] = useState([
    {
      Aufnr: "",
      MitID: "",
      KunNr: "",
      AufDat: "",
      ErlDat: "",
      Dauer: "",
      Anfahrt: "",
      Beschreibung: "",
    },
  ]);

  const handleClick = () => {};

  return (
    <Box
      marginTop="50px"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="500px"
        sx={{
          border: "1px solid #000",
          borderRadius: "7px",
          margin: "10px",
        }}
      >
        <Typography variant="h5" sx={{ margin: "10px" }}>
          Auftrag anlegen
        </Typography>
        <AuftragForm
          selectedAuftraege={selectedAuftraege}
          setSelectedAuftraege={setSelectedAuftraege}
        />
        <Box display="flex" justifyContent="right">
          <Button
            onClick={handleClick}
            sx={{ height: "60px", width: "200px", margin: " 0 10px 10px" }}
            variant="contained"
          >
            Anlegen
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Anlegen;
