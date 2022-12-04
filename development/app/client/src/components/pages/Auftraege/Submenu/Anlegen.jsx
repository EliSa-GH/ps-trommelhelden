import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography } from "@mui/material";

import AuftragForm from "../AuftragForm/AuftragForm";
import { createAuftrag } from "../../../../actions/auftraege";
import { getKunden } from "../../../../actions/kunden";

const Anlegen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getKunden());
  }, [dispatch]);
  const kunden = useSelector((state) => state.kunden);
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

  const handleCreate = () => {
    if (selectedAuftraege[0].KunNr !== "") {
      dispatch(createAuftrag(selectedAuftraege[0]));
    } else {
      alert("Bitte Kundennummer eingeben!");
    }
  };
  console.log(selectedAuftraege[0]);

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
          kunden={kunden}
          disable={true}
        />
        <Box display="flex" justifyContent="right">
          <Button
            onClick={handleCreate}
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
