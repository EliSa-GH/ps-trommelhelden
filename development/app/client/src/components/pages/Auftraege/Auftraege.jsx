import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table/Table";
import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import {
  getNewAuftraege,
  deleteAuftrag,
  editAuftrag,
} from "../../../actions/auftraege";
import Progress from "../../Progress/Progress";
import AuftragForm from "./AuftragForm/AuftragForm";

const Auftraege = () => {
  const [selectedAuftraege, setSelectedAuftraege] = useState([]);
  const [isEnter, setIsEnter] = useState(false);
  const [MitID, setMitID] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const handleDelete = () => {
    if (selectedAuftraege.length > 0) {
      dispatch(
        deleteAuftrag(selectedAuftraege.map((auftrag) => auftrag.Aufnr))
      );
      navigate(0);
    }
  };
  const handleEdit = () => {
    dispatch(editAuftrag(selectedAuftraege));
    navigate(0);
  };

  const auftraege = useSelector((state) => state.auftraege);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(getNewAuftraege(MitID));
            setIsEnter(true);
          }}
        >
          <TextField
            fullWidth
            required
            label="Mitarbeiter-ID"
            sx={{ marginBottom: "20px" }}
            onChange={(e) => setMitID(e.target.value)}
            value={MitID}
          />
        </form>
      </Box>
      {auftraege.length > 0 && isEnter ? (
        <>
          <Box
            display="flex"
            justifyContent="left"
            sx={{
              width: "90%",
              margin: "auto",
            }}
          >
            <h1>Aufträge</h1>
          </Box>
          <Table
            tableHeadings={getHeadings(auftraege)}
            tableData={auftraege}
            rowID="Aufnr"
            setSelectedAuftraege={setSelectedAuftraege}
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
            <Button
              {...(selectedAuftraege.length !== 1
                ? { disabled: true }
                : { disabled: false })}
              variant="contained"
              onClick={handleOpenEdit}
            >
              <h3>Bearbeiten</h3>
            </Button>
            <Button
              variant="contained"
              onClick={handleOpenDelete}
            >
              <h3>Löschen</h3>
            </Button>
          </Box>
        </>
      ) : (
        <Progress />
      )}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>
          [{selectedAuftraege.length > 0 && selectedAuftraege[0].Aufnr}]
        </DialogTitle>
        <DialogContent>
          <AuftragForm
            selectedAuftraege={selectedAuftraege}
            setSelectedAuftraege={setSelectedAuftraege}
            kunden={[]}
          />
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={handleEdit}
              variant="contained"
              sx={{ margin: "5px" }}
            >
              Speichern
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ margin: "5px" }}
            >
              Abbrechen
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Löschen</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Zu löschende Auftragsnummer(n):
            {selectedAuftraege.map((auftrag) => ` [${auftrag.Aufnr}] `)}
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

export default Auftraege;
