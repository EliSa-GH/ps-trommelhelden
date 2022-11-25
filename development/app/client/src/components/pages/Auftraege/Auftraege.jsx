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
import { getNewAuftraege, deleteAuftrag } from "../../../actions/auftraege";
import Progress from "../../Progress/Progress";
import AuftragForm from "./AuftragForm/AuftragForm";

const Auftraege = () => {
  const [selectedAuftraege, setSelectedAuftraege] = useState([]);
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
    dispatch(deleteAuftrag(selectedAuftraege.map((auftrag) => auftrag.Aufnr)));
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
          }}
        >
          <TextField
            fullWidth
            required
            label="Employee's ID"
            sx={{ marginBottom: "20px" }}
            onChange={(e) => setMitID(e.target.value)}
            value={MitID}
          />
        </form>
      </Box>
      {auftraege.length > 0 && getHeadings(auftraege).length > 5 ? (
        <>
          <Table
            tableHeadings={getHeadings(auftraege)}
            tableData={auftraege}
            rowID="Aufnr"
            setSelectedAuftraege={setSelectedAuftraege}
          />
          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            marginRight={12}
          >
            <Button
              {...(selectedAuftraege.length !== 1
                ? { disabled: true }
                : { disabled: false })}
              sx={{ height: "60px", width: "200px", marginRight: "10px" }}
              variant="contained"
              onClick={handleOpenEdit}
            >
              <h3>Edit</h3>
            </Button>
            <Button
              sx={{ height: "60px", width: "200px", marginLeft: "10px" }}
              variant="contained"
              onClick={handleOpenDelete}
            >
              <h3>Delete</h3>
            </Button>
          </Box>
        </>
      ) : (
        <Progress />
      )}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <AuftragForm
            selectedAuftraege={selectedAuftraege}
            setSelectedAuftraege={setSelectedAuftraege}
          />
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
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you want to delete these job(s) with number:
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
    </Box>
  );
};

export default Auftraege;
