import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import {useNavigate} from "react-router-dom"

//Button and Dialog Field
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { getKunden, createKunde } from "../../actions/kunden";
import Table from "../Table/Table"; 

const Kunden = () => {
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getKunden());
  }, [dispatch]);

  const [open, setOpen ] = React.useState(false);
  
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
  
    const handleClose = () => {
      setOpen(false);
    };

  const kunden = useSelector((state) => state.kunden);

  return (
    <div>
      <div>
      {kunden.length > 0 ? (
        <Table
          tableHeadings={getHeadings(kunden)}
          tableData={kunden}
          rowID="KunNr"
        />
      ) : (
        <Box
          height="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size="75px" thickness={5} />
        </Box>
      )}
      </div>
      <div>
        <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            marginRight={4.5}
          >
            <Button
              //sx={{ height: "60px", width: "200px", marginRight: "10px" }}
              variant="contained"
              onClick={handleClickOpen}
            >
              <h3>Create Customer</h3>
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

      </Box>
      </div>
    </div>
  );
};

export default Kunden;
