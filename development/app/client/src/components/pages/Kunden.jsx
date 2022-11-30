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
    getKunden,
    deleteKunde,
    createKunde,
  } from "../../actions/kunden";
  import Progress from "../Progress/Progress";

  const Kunden = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedKunde, setSelectedKunde] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Create Kunden Dialog Funktions
     */
    //START
    
    const [details, setDetails] = React.useState({
      kKunnr: 0,
      kName: "",
      kStreet: "",
      kZipcode: "",
      kCity: "",
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
      dispatch(createKunde(details))
      handleClose(true);
      navigate(0)
    };
  
      const handleClickOpen = () => {
        setOpen(true);
      };
    
  
  // END 
    
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
              <div className="KundenCreate">
                  <Button variant="contained"
                    onClick={handleClickOpen}>
                <h3>Kunde anlegen</h3>
              </Button>
              <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create new customer</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              type="number"
              margin="dense"
              name="kKunnr"
              label="Kundennummer"
              fullWidth
              variant="standard"
              value={Table.KunNr}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="text"
              margin="dense"
              name="kName"
              label="Name"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="text"
              margin="dense"
              name="kStreet"
              label="Street"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="number"
              margin="dense"
              name="kZipcode"
              label="Zip Code"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              type="text"
              margin="dense"
              name="kCity"
              label="City"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save & Exit</Button>
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
