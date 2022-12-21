import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Alert,
} from "@mui/material";

import Table from "../../../Table/Table";
import Progress from "../../../Progress/Progress";
import {
  getErlAuftraege,
  deleteAuftrag,
  editAuftrag,
} from "../../../../actions/auftraege";
import AuftragForm from "../AuftragForm/AuftragForm";
import ErsatzteilForm from "../AuftragForm/ErsatzteilForm";

const Archiv = () => {
  const [selectedAuftraege, setSelectedAuftraege] = useState([]);
  const [openRequest, setOpenRequest] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
    setOpenRequest(false);
  };

  const handleOpenRequest = () => {
    console.log(selectedAuftraege);
    if (selectedAuftraege[0].Ersatzteil === null) {
      setOpenRequest(true);
    } else {
      alert("Dieser Auftrag hat bereits ein Ersatzteil angefordert!");
    }
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleEdit = () => {
    if (selectedAuftraege.length > 0) {
      dispatch(editAuftrag(selectedAuftraege));
      navigate(0);
    }
  };

  const handleDelete = () => {
    if (selectedAuftraege.length > 0) {
      dispatch(
        deleteAuftrag(selectedAuftraege.map((auftrag) => auftrag.Aufnr))
      );
      navigate(0);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getErlAuftraege());
  }, [dispatch]);

  const erlAuftraege = useSelector((state) => state.auftraege);

  return (
    <Box>
      {erlAuftraege.length > 0 ? (
        <>
          <Box
            display="flex"
            justifyContent="left"
            sx={{
              width: "90%",
              margin: "auto",
            }}
          >
            <h1>Archiv</h1>
          </Box>
          <Table
            tableHeadings={getHeadings(erlAuftraege)}
            tableData={erlAuftraege}
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
              //sx={{ height: "60px", width: "200px", marginRight: "10px" }}

              variant="contained"
              onClick={handleOpenRequest}
            >
              <h3>Ersatzteil anfordern</h3>
            </Button>
            <Button
              {...(selectedAuftraege.length !== 1
                ? { disabled: true }
                : { disabled: false })}
              //sx={{ height: "60px", width: "200px", marginRight: "10px" }}

              variant="contained"
              onClick={handleOpenEdit}
            >
              <h3>Bearbeiten</h3>
            </Button>
            <Button
              //sx={{ height: "60px", width: "200px", marginLeft: "10px" }}
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

      {/* Spare part request Dialog */}
      <Dialog open={openRequest} onClose={handleClose}>
        <DialogTitle>
          Ersatzteil für den Auftrag [
          {selectedAuftraege.length > 0 && selectedAuftraege[0].Aufnr}]{" "}
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
            disable={false}
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
              Abbruch
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
            {selectedAuftraege.map((auftrag) => ` [${auftrag.Aufnr}] `)} ?
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

export default Archiv;
