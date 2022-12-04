import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";

const AuftragForm = ({
  selectedAuftraege,
  setSelectedAuftraege,
  kunden,
  disable,
}) => {
  const { Aufnr, MitID, KunNr, AufDat, ErlDat, Dauer, Anfahrt, Beschreibung } =
    selectedAuftraege[0];

  const navigate = useNavigate();
  useEffect(() => {
    if (AufDat === "") {
      setSelectedAuftraege([
        {
          ...selectedAuftraege[0],
          AufDat: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
  }, [AufDat]);

  const kundenList = kunden.map((kunde) => kunde.KunNr + " - " + kunde.KunName);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAuftraege([{ ...selectedAuftraege[0], [name]: value }]);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Box margin={1}>
          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Mitarbeiter ID"
              name="MitID"
              sx={{ width: "290px", margin: "5px" }}
              value={MitID}
              onChange={handleChange}
            />
            {disable ? (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={kundenList}
                sx={{ width: "290px", margin: "5px" }}
                onChange={(e, value) => {
                  setSelectedAuftraege([
                    { ...selectedAuftraege[0], KunNr: value.split(" - ")[0] },
                  ]);
                }}
                noOptionsText={
                  <Button
                    onMouseDown={() => {
                      navigate("/kunden");
                    }}
                  >
                    <Typography sx={{ fontSize: "10px" }}>
                      Keine Kunden gefunden?
                      <br /> Klicken Sie hier um einen Kunden zu erstellen
                    </Typography>
                  </Button>
                }
                renderInput={(params) => {
                  return <TextField {...params} label="Kundenname" required />;
                }}
              />
            ) : (
              <TextField
                disabled={disable}
                label="Kundennummer"
                name="KunNr"
                sx={{ width: "290px", margin: "5px" }}
                value={KunNr}
                onChange={handleChange}
              />
            )}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField
              disabled={disable}
              type="date"
              label="Auftragsdatum"
              name="AufDat"
              sx={{ width: "290px", margin: "5px" }}
              value={AufDat}
              onChange={handleChange}
            />
            <TextField
              disabled={disable}
              type="date"
              label="Erlösedatum"
              name="ErlDat"
              sx={{ width: "290px", margin: "5px" }}
              InputLabelProps={{ shrink: true }}
              value={ErlDat}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Dauer"
              name="Dauer"
              sx={{ width: "290px", margin: "5px" }}
              value={Dauer || ""}
              onChange={handleChange}
            />
            <TextField
              label="Anfahrt"
              name="Anfahrt"
              sx={{ width: "290px", margin: "5px" }}
              value={Anfahrt || ""}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField
              fullWidth
              label="Bechreibung"
              name="Beschreibung"
              sx={{ width: "590px", margin: "5px" }}
              value={Beschreibung || ""}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AuftragForm;
