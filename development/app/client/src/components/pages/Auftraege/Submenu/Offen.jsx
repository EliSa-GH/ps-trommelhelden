import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Table from "../../../Table/Table";
import Progress from "../../../Progress/Progress";

import {
  getOffenAuftraege,
  deleteAuftrag,
  setAuftragMitarbeiter,
} from "../../../../actions/auftraege";
import { getMitarbeiter } from "../../../../actions/mitarbeiter";

const Offen = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [mitID, setMitID] = useState("");
  const [selectedAuftraege, setSelectedAuftraege] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleChange = (event) => {
    setMitID(Number(event.target.value) || "");
    handleClickOpen();
  };

  const handleClickOpen = () => {
    if (selectedAuftraege.length > 0) {
      setOpen(true);
    }
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
    setOpenDelete(false);
  };

  const handleAssign = () => {
    dispatch(
      setAuftragMitarbeiter(
        (selectedAuftraege.map((auftrag) => auftrag.Aufnr), mitID)
      )
    );
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

  useEffect(() => {
    dispatch(getOffenAuftraege());
    dispatch(getMitarbeiter());
  }, [dispatch]);

  const offenAuftraege = useSelector((state) => state.auftraege);
  const mitarbeiter = useSelector((state) => state.mitarbeiter);
  return (
    <Box>
      <Box>
        {offenAuftraege.length > 0 ? (
          <>
            <Table
              tableHeadings={getHeadings(offenAuftraege)}
              tableData={offenAuftraege}
              rowID="Aufnr"
              setSelectedAuftraege={setSelectedAuftraege}
            />{" "}
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogContent>
                <Typography variant="h6">
                  Are you sure to select employee with ID - {mitID} for this
                  job?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAssign}>Ok</Button>
              </DialogActions>
            </Dialog>
            <Box
              display="flex"
              justifyContent="right"
              alignItems="center"
              marginRight={12}
            >
              <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormControl
                  disabled={selectedAuftraege.length === 0}
                  onClick={handleClickOpen}
                  sx={{
                    m: 1,
                    minWidth: 120,
                  }}
                >
                  <InputLabel id="demo-dialog-select-label">
                    Mitarbeiter
                  </InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={mitID}
                    onChange={handleChange}
                    input={<OutlinedInput label="Mitarbeiter" />}
                    sx={{ height: "60px", width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {mitarbeiter.map(({ MitID, MitName, MitVorname }) => (
                      <MenuItem value={MitID} key={MitID}>
                        {MitID} - {MitName} {MitVorname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Button
                  sx={{ height: "60px", width: "200px" }}
                  variant="contained"
                  onClick={handleOpenDelete}
                >
                  <h3>Delete</h3>
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Progress />
        )}
      </Box>
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

export default Offen;
