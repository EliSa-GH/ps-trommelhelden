import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Table from "../Table/Table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";

import { useNavigate } from "react-router-dom";
import {
  getKunden,
  deleteKunde,
  createKunde,
  editKunde,
} from "../../actions/kunden";
import Progress from "../Progress/Progress";

const Kunden = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedKunde, setSelectedKunde] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = React.useState({
    KunNr: "",
    KunName: "",
    KunStrasse: "",
    KunPlz: "",
    KunOrt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setSelectedKunde([{ ...selectedKunde[0], [name]: value }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createKunde(details));
    handleClose(true);
    //navigate(0)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = (reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
    setOpenDelete(false);
  };

  const handleDelete = () => {
    if (selectedKunde.length > 0) {
      dispatch(deleteKunde(selectedKunde.map((kunden) => kunden.KunNr)));
      navigate(0);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editKunde(selectedKunde[0]));
    handleClose(true);
    //navigate(0)
  };

  useEffect(() => {
    dispatch(getKunden());
  }, [dispatch]);

  const kunden = useSelector((state) => state.kunden);
  return (
    <Box>
      <Box>
        {kunden.length > 0 ? (
          <Box>
            <Box
              display="flex"
              justifyContent="left"
              sx={{
                width: "90%",
                margin: "auto",
              }}
            >
              <h1>Kunden</h1>
            </Box>
            <Table
              tableHeadings={getHeadings(kunden)}
              tableData={kunden}
              rowID="KunNr"
              setSelectedKunde={setSelectedKunde}
            />
            <Box
              display="flex"
              justifyContent="right"
              alignItems="right"
              sx={{
                width: "90%",
                margin: "auto",
                "& button": { m: 1 },
              }}
            >
              <div className="KundenCreate">
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  disabled={
                    selectedKunde.length > 0 || selectedKunde.length >= 2
                  }
                >
                  <h3>Kunde anlegen</h3>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Kunde anlegen</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      type="number"
                      margin="dense"
                      name="KunNr"
                      label="Kundennummer"
                      fullWidth
                      variant="standard"
                      value={Table.KunNr}
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="KunName"
                      label="Name"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="KunStrasse"
                      label="Street"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="number"
                      margin="dense"
                      name="KunPlz"
                      label="Zip Code"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="KunOrt"
                      label="City"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Abbruch</Button>
                    <Button onClick={handleSubmit}>Anlegen</Button>
                  </DialogActions>
                </Dialog>
              </div>

              <Button
                variant="contained"
                onClick={handleClickOpen}
                disabled={
                  selectedKunde.length <= 0 || selectedKunde.length >= 2
                }
              >
                <h3>Bearbeiten</h3>
              </Button>
              <Button variant="contained" onClick={handleOpenDelete}>
                <h3>Löschen</h3>
              </Button>
            </Box>
          </Box>
        ) : (
          <Progress />
        )}
      </Box>
      {selectedKunde.length > 0 ? (
        <>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Kunde bearbeiten</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                margin="dense"
                id="KunNr"
                name="KunNr"
                label="Kundennummer"
                type="number"
                fullWidth
                variant="standard"
                value={selectedKunde[0].KunNr}
                disabled
              />
              <TextField
                margin="dense"
                id="KunName"
                name="KunName"
                label="Kundenname"
                type="text"
                fullWidth
                variant="standard"
                value={selectedKunde[0].KunName}
                onChange={handleChangeEdit}
              />
              <TextField
                margin="dense"
                id="KunOrt"
                name="KunOrt"
                label="Kundenort"
                type="text"
                fullWidth
                variant="standard"
                value={selectedKunde[0].KunOrt}
                onChange={handleChangeEdit}
              />
              <TextField
                margin="dense"
                id="KunPlz"
                name="KunPlz"
                label="Postleitzahl"
                type="text"
                fullWidth
                variant="standard"
                value={selectedKunde[0].KunPlz}
                onChange={handleChangeEdit}
                inputProps={{ maxLength: 5 }}
              />
              <TextField
                margin="dense"
                id="KunStrasse"
                name="KunStrasse"
                label="Straße"
                type="text"
                fullWidth
                variant="standard"
                value={selectedKunde[0].KunStrasse}
                onChange={handleChangeEdit}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Abbrechen</Button>
              <Button onClick={handleEdit}>Speichern</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Löschen</DialogTitle>
            <DialogContent>
              <Typography variant="h6">
                Zu löschende Kundennummer(n):
                {selectedKunde.map((kunden) => ` [${kunden.KunNr}] `)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  sx={{ margin: "5px" }}
                >
                  Löschen
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{ margin: "5px" }}
                >
                  Abbruch
                </Button>
              </Box>
            </DialogActions>
          </Dialog>{" "}
        </>
      ) : (
        false
      )}
    </Box>
  );
};

export default Kunden;
