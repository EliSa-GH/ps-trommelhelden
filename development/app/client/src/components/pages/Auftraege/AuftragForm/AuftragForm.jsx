import React, { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const AuftragForm = ({ selectedAuftraege, setSelectedAuftraege }) => {
  const { Aufnr, MitID, KunNr, AufDat, ErlDat, Dauer, Anfahrt, Beschreibung } =
    selectedAuftraege[0];
  useEffect(() => {
    if (AufDat === "") {
      setValue({ ...value, AufDat: dayjs().format("YYYY-MM-DD") });
    }
  }, []);
  const [value, setValue] = useState({
    AufDat: dayjs(AufDat),
    ErlDat: dayjs(ErlDat),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAuftraege([{ ...selectedAuftraege[0], [name]: value }]);
    console.log(selectedAuftraege[0]);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(selectedAuftraege);
        }}
      >
        <Box margin={1}>
          <Box display="flex" justifyContent="space-between">
            <TextField
              required
              label="Auftragsnummer"
              name="Aufnr"
              sx={{ width: "190px", margin: "5px" }}
              value={Aufnr}
              onChange={handleChange}
            />
            <TextField
              required
              label="Mitarbeiter ID"
              name="MitID"
              sx={{ width: "190px", margin: "5px" }}
              value={MitID}
              onChange={handleChange}
            />
            <TextField
              required
              label="Kundennummer"
              name="KunNr"
              sx={{ width: "190px", margin: "5px" }}
              value={KunNr}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Auftragsdatum"
                inputFormat="YYYY-MM-DD"
                value={value.AufDat}
                onChange={(newValue) => {
                  setValue({ ...value, AufDat: newValue });
                  setSelectedAuftraege([
                    {
                      ...selectedAuftraege[0],
                      AufDat: newValue.format("YYYY-MM-DD"),
                    },
                  ]);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: "290px", margin: "5px" }}
                  />
                )}
              />
            </LocalizationProvider>{" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Erlösedatum"
                name="ErlDat"
                inputFormat="YYYY-MM-DD"
                value={value.ErlDat}
                onChange={(newValue) => {
                  setValue({ ...value, ErlDat: newValue });
                  setSelectedAuftraege([
                    {
                      ...selectedAuftraege[0],
                      ErlDat: newValue.format("YYYY-MM-DD"),
                    },
                  ]);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    sx={{ width: "290px", margin: "5px" }}
                  />
                )}
              />
            </LocalizationProvider>
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
