import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getKunden, deleteKunde, editKunde } from "../../actions/kunden";
import Table from "../Table/Table";
import Progress from "../Progress/Progress";



const Kunden = () => {
  const [KunNr, setKunNr] = useState([]);
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKunden());
  }, [dispatch]);

  const handleDelete = () => {
    
    if(KunNr != "")
    {
      //alert(KunNr);
      dispatch(deleteKunde(KunNr));
      navigate(0);
    }
    else{
      //alert("leer");
    }
  };

  const handleEdit = () => {
     dispatch(editKunde(KunNr));
       navigate(0);
   };

  const kunden = useSelector((state) => state.kunden);
  return (
    <>
      {kunden.length > 0 ? (
        <Box>
          <Table
          tableHeadings={getHeadings(kunden)}
          tableData={kunden}
          rowID="KunNr"
          setKunNr={setKunNr}
          />
          <Box
            display="flex"
            justifyContent="right"
            alignItems="right"
            sx={{
              width: "90%",
              margin: "auto",
              '& button': { m: 1 }
            }}
          >
            <Button
              variant="contained"
            >
              <h3>Kunde anlegen</h3>
            </Button>
            <Button variant="outlined" onClick={handleClickOpen}>
            Bearbeiten
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kunde Bearbeiten</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
            value= {KunNr}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleClose}>Übernehmen</Button>
        </DialogActions>
      </Dialog>
            <Button
              variant="contained"
              onClick={handleDelete}
            >
              <h3>Löschen</h3>
            </Button>
          </Box>
        </Box>
      ) : (
        <Progress />
      )}
    </>
  );
};

export default Kunden;
