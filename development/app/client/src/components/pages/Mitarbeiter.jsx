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
import { getMitarbeiter,
  deleteMitarbeiter,
} from "../../actions/mitarbeiter";
import Progress from "../Progress/Progress";

const Mitarbeiter = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMitarbeiter, setSelectedMitarbeiter] = useState([]);

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
    if (selectedMitarbeiter.length > 0) {
      dispatch(
        deleteMitarbeiter(selectedMitarbeiter.map((mitarbeiter) => mitarbeiter.MitID))
      );
      navigate(0);
    }
  };

  useEffect(() => {
    dispatch(getMitarbeiter());
  }, [dispatch]);


  const mitarbeiter = useSelector((state) => state.mitarbeiter);
  return (
    <Box>
      <Box>
      {mitarbeiter.length > 0 ? (
        <Box>
          <Table
            tableHeadings={getHeadings(mitarbeiter)}
            tableData={mitarbeiter}
            rowID="MitID"
            setSelectedMitarbeiter={setSelectedMitarbeiter}
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
              <h3>Mitarbeiter anlegen</h3>
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
            Zu löschende Mitarbeiternummer(n):
            {selectedMitarbeiter.map((mitarbeiter) => ` [${mitarbeiter.MitID}] `)} ?
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

export default Mitarbeiter;
