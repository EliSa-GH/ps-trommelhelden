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

import { useNavigate } from "react-router-dom";
import {
  getKunden,
  deleteKunde,
} from "../../actions/kunden";
import Progress from "../Progress/Progress";

const Kunden = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedKunde, setSelectedKunde] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
      dispatch(
        deleteKunde(selectedKunde.map((kunden) => kunden.KunNr))
      );
      navigate(0);
    }
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
            <Button variant="contained">
              <h3>Kunde anlegen</h3>
            </Button>
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
            Zu löschende Kundennummer(n):
            {selectedKunde.map((kunden) => ` [${kunden.KunNr}] `)} ?
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

export default Kunden;
