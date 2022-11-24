import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const AuftragForm = ({
  selectedAuftraege,
  setSelectedAuftraege,
  open,
  setOpen,
}) => {
  const { Aufnr, MitID, KunNr, AufDat, ErlDat, Dauer, Anfahrt, Beschreibung } =
    selectedAuftraege[0];
  const [value, setValue] = useState({
    AufDat: dayjs(AufDat),
    ErlDat: dayjs(ErlDat),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAuftraege([{ ...selectedAuftraege[0], [name]: value }]);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
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
                    inputFormat="DD/MM/YYYY"
                    value={value.AufDat}
                    onChange={(newValue) => {
                      setValue({ ...value, AufDat: newValue });
                      setSelectedAuftraege([
                        {
                          ...selectedAuftraege[0],
                          AufDat: newValue.$d.toLocaleDateString("pt-PT"),
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
                    inputFormat="DD/MM/YYYY"
                    value={value.ErlDat}
                    onChange={(newValue) => {
                      setValue({ ...value, ErlDat: newValue });
                      setSelectedAuftraege([
                        {
                          ...selectedAuftraege[0],
                          ErlDat: newValue.$d.toLocaleDateString("pt-PT"),
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
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => console.log(selectedAuftraege)}
              variant="contained"
              sx={{ margin: "5px" }}
            >
              Confirm
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ margin: "5px" }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AuftragForm;
