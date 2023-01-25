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
  Snackbar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import {
  getNewAuftraege,
  deleteAuftrag,
  editAuftrag,
} from "../../../actions/auftraege";
import Progress from "../../Progress/Progress";
import AuftragForm from "./AuftragForm/AuftragForm";
import ErsatzteilForm from "./AuftragForm/ErsatzteilForm";

const Auftraege = () => {
  const [selectedAuftraege, setSelectedAuftraege] = useState([]);
  const [isEnter, setIsEnter] = useState(false);
  const [hasError, setHasError] = useState([]);
  const [MitID, setMitID] = useState("");
  const [openRequest, setOpenRequest] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleOpenRequest = () => {
    if (selectedAuftraege[0].Ersatzteil === null) {
      setOpenRequest(true);
    } else {
      alert("Dieser Auftrag hat bereits ein Ersatzteil angefordert!");
    }
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
    setOpenRequest(false);
    setHasError([]);
  };

  const handleEdit = () => {
    dispatch(editAuftrag(selectedAuftraege));
    navigate(0);
  };

  const handleDelete = () => {
    if (selectedAuftraege.length > 0) {
      dispatch(
        deleteAuftrag(selectedAuftraege.map((auftrag) => auftrag.Aufnr))
      );
      navigate(0);
    }
  };

  const auftraege = useSelector((state) => (isEnter ? state.auftraege : []));

  return (
    <Box>
      <h1 style={{ margin: "10px 100px" }}> Deine Aufträge</h1>

      <Snackbar
        sx={{ marginTop: "75px" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={
          hasError.filter((error) => error.reason === "Kein Auftrag").length >
            0 &&
          hasError.filter((error) => error.reason === "Kein Auftrag")[0].value
        }
        autoHideDuration={2000}
        onClose={handleClose}
        message="Kein Auftrag wurde gefunden!"
      />
      <Snackbar
        sx={{ marginTop: "75px" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={
          hasError.filter((error) => error.reason === "MitID").length > 0 &&
          hasError.filter((error) => error.reason === "MitID")[0].value
        }
        autoHideDuration={2000}
        onClose={handleClose}
        message="MitID muss 3 Nummer sein!"
      />

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
            if (/^\d{3}$/.test(MitID) === false) {
              setHasError((prev) => {
                return [...prev, { reason: "MitID", value: true }];
              });
              return;
            }
            setIsEnter(true);
            dispatch(getNewAuftraege(MitID)).then((res) => {
              if (res.message) {
                setIsEnter(false);
                setHasError((prev) => {
                  return [...prev, { reason: "Kein Auftrag", value: true }];
                });
              }
            });
          }}
        >
          <TextField
            error={MitID.length > 3}
            helperText={
              MitID.length > 3
                ? "Mitarbeiter-ID muss 3 Zeichen lang sein!"
                : "Bitte die Mit-ID eingeben"
            }
            fullWidth
            required
            label="Mitarbeiter-ID"
            sx={{ marginBottom: "20px" }}
            onChange={(e) => setMitID(e.target.value)}
            value={MitID}
          />
        </form>
      </Box>
      {auftraege.length > 0 ? (
        <>
          <Box
            display="flex"
            justifyContent="left"
            sx={{
              width: "90%",
              margin: "auto",
            }}
          ></Box>
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
              onClick={handleOpenRequest}
            >
              <h3>Ersatzteil anfordern</h3>
            </Button>
            <Button
              {...(selectedAuftraege.length !== 1
                ? { disabled: true }
                : { disabled: false })}
              variant="contained"
              onClick={handleOpenEdit}
            >
              <h3>Bearbeiten</h3>
            </Button>
            <Button variant="contained" onClick={handleOpenDelete}>
              <h3>Löschen</h3>
            </Button>
          </Box>
        </>
      ) : (
        isEnter && <Progress />
      )}

      {/* Spare part request Dialog */}
      <Dialog open={openRequest} onClose={handleClose}>
        <DialogTitle>
          Ersatzteil für den Auftrag [
          {selectedAuftraege.length > 0 && selectedAuftraege[0].Aufnr}]
          anfordern
        </DialogTitle>
        <DialogContent>
          <ErsatzteilForm
            Aufnr={selectedAuftraege.length > 0 && selectedAuftraege[0].Aufnr}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>
          Auftrag [{selectedAuftraege.length > 0 && selectedAuftraege[0].Aufnr}]
          bearbeiten
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

      {/* Delete Dialog */}
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
