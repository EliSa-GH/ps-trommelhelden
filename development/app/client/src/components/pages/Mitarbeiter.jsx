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
  getMitarbeiter,
  deleteMitarbeiter,
  createMitarbeiter,
  editMitarbeiter,
} from "../../actions/mitarbeiter";
import Progress from "../Progress/Progress";

const Mitarbeiter = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMitarbeiter, setSelectedMitarbeiter] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Create Kunden Dialog Funktions
   */
  //START

  const [mDetails, setmDetails] = React.useState({
    mID: "",
    mName: "",
    mVorname: "",
    mBirthday: "",
    mJob: "",
    mSalary: "",
    mPLace: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setmDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSelectedMitarbeiter([{ ...selectedMitarbeiter[0], [name]: value }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mDetails);

    if (mDetails.mBirthday !== "") {
      dispatch(createMitarbeiter(mDetails));
    } else {
      alert("xxx");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  //END
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
        deleteMitarbeiter(
          selectedMitarbeiter.map((mitarbeiter) => mitarbeiter.MitID)
        )
      );
      navigate(0);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editMitarbeiter(selectedMitarbeiter[0]));
    console.log(selectedMitarbeiter);
    handleClose(true);
    //navigate(0)
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
            <Box
              display="flex"
              justifyContent="left"
              sx={{
                width: "90%",
                margin: "auto",
              }}
            >
              <h1>Mitarbeiter</h1>
            </Box>
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
              <div className="MitarbeiterCreate">
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  disabled={
                    selectedMitarbeiter.length > 0 ||
                    selectedMitarbeiter.length >= 2
                  }
                >
                  <h3>Mitarbeiter anlegen</h3>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Mitarbeiter anlegen</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      type="number"
                      margin="dense"
                      name="mID"
                      label="Mitarbeiternummer"
                      fullWidth
                      variant="standard"
                      value={Table.MitID}
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="mName"
                      label="Name"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="mVorname"
                      label="Vorname"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="date"
                      margin="dense"
                      name="mBirthday"
                      //label="Birthday"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="mJob"
                      label="Job"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="mSalary"
                      label="Stundensatz"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                    <TextField
                      autoFocus
                      type="text"
                      margin="dense"
                      name="mPlace"
                      label="Einsatzort"
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
                  selectedMitarbeiter.length <= 0 ||
                  selectedMitarbeiter.length >= 2
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
      {selectedMitarbeiter.length > 0 ? (
        <>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Mitarbeiter bearbeiten</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                margin="dense"
                id="MitID"
                name="MitID"
                label="Mitarbeiternummer"
                type="number"
                fullWidth
                variant="standard"
                value={selectedMitarbeiter[0].MitID}
                disabled
              />
              <TextField
                margin="dense"
                id="MitName"
                name="MitName"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={selectedMitarbeiter[0].MitName}
                onChange={handleChangeEdit}
              />
              <TextField
                margin="dense"
                id="MitVorname"
                name="MitVorname"
                label="Vorname"
                type="text"
                fullWidth
                variant="standard"
                value={selectedMitarbeiter[0].MitVorname}
                onChange={handleChangeEdit}
              />
              <TextField
                margin="dense"
                id="MitGebDat"
                name="MitGebDat"
                label="Geburtsdatum"
                type="date"
                fullWidth
                variant="standard"
                value={selectedMitarbeiter[0].MitGebDat}
                onChange={handleChangeEdit}
              />
              <TextField
                margin="dense"
                id="MitJob"
                name="MitJob"
                label="Job"
                type="text"
                fullWidth
                variant="standard"
                value={selectedMitarbeiter[0].MitJob}
                onChange={handleChangeEdit}
              />

              <TextField
                margin="dense"
                id="MitStundensatz"
                name="MitStundensatz"
                label="Stundensatz"
                type="number"
                fullWidth
                variant="standard"
                value={selectedMitarbeiter[0].MitStundensatz}
                onChange={handleChangeEdit}
              />

              <TextField
                margin="dense"
                id="MitEinsatzOrt"
                name="MitEinsatzOrt"
                label="Einsatzort"
                type="text"
                fullWidth
                variant="standard"
                value={selectedMitarbeiter[0].MitEinsatzort}
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
                Zu löschende Mitarbeiternummer(n):
                {selectedMitarbeiter.map(
                  (mitarbeiter) => ` [${mitarbeiter.MitID}] `
                )}
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
        </>
      ) : (
        false
      )}
    </Box>
  );
};

export default Mitarbeiter;
