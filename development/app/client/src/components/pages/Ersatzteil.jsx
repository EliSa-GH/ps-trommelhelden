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
  Typography, } from "@mui/material";

import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';

import { useNavigate } from "react-router-dom";
import {
  getErsatzteil,
  deleteErsatzteil,
  createErsatzteil,
} from "../../actions/ersatzteil";
import Progress from "../Progress/Progress";

const Ersatzteil = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedErsatzteil, setSelectedErsatzteil] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [details, setDetails] = React.useState({
    EtID: 0,
    EtBezeichnung: "",
    EtPreis: "",
    EtAnzLager: "",
    EtHersteller: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
      return {...prev, [name]: value}
    }) 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    dispatch(createErsatzteil(details))
    handleClose(true);
    navigate(0)
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
    if (selectedErsatzteil.length > 0) {
      dispatch(
        deleteErsatzteil(selectedErsatzteil.map((ersatzteil) => ersatzteil.EtID))
      );
      navigate(0);
    }
  };

  useEffect(() => {
    dispatch(getErsatzteil());
  }, [dispatch]);

  const ersatzteil = useSelector((state) => state.ersatzteil);

  console.log(ersatzteil);
  return (
    <Box>
      <Box>
        {ersatzteil.length > 0 ? (
          <Box>
            <Table
              tableHeadings={getHeadings(ersatzteil)}
              tableData={ersatzteil}
              rowID="EtID"
              setSelectedErsatzteil={setSelectedErsatzteil}
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
              <div className="ErsatzteilCreate">
                  <Button variant="contained"
                    onClick={handleClickOpen}>
                <h3>Ersatzteil anlegen</h3>
              </Button>
              <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ersatzteil anlegen</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              type="text"
              margin="dense"
              name="EtID"
              label="Ersatzteilnummer"
              fullWidth
              variant="standard"
              value={Table.EtID}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="text"
              margin="dense"
              name="EtBezeichnung"
              label="Bezeichnung"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="number"
              margin="dense"
              name="EtPreis"
              label="Preis"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="number"
              margin="dense"
              name="EtAnzLager"
              label="Anzahl Lager"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="text"
              margin="dense"
              name="EtHersteller"
              label="Hersteller"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Abbruch</Button>
            <Button onClick={handleSubmit}>Speichern</Button>
          </DialogActions>
        </Dialog>
              </div>
          

              <Button variant="contained">
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
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Löschen</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Zu löschende Ersatzteilnummer(n):
            {selectedErsatzteil.map((ersatzteil) => ` [${ersatzteil.EtID}] `)} ?
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
      </Dialog>
    </Box>
  );
};

export default Ersatzteil;
