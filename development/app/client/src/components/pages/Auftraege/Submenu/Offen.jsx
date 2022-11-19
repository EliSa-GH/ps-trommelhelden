import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../Table/Table";
import {
  getOffenAuftraege,
  deleteAuftrag,
} from "../../../../actions/auftraege";
import { getMitarbeiter } from "../../../../actions/mitarbeiter";

const Offen = () => {
  const [open, setOpen] = useState(false);
  const [mitID, setMitID] = useState("");
  const [AufNr, setAufNr] = useState([]);

  console.log(AufNr);
  const dispatch = useDispatch();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleChange = (event) => {
    setMitID(Number(event.target.value) || "");
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteAuftrag(AufNr));
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
              setAufNr={setAufNr}
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
                <Button onClick={handleClose}>Ok</Button>
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
                  onClick={handleClickOpen}
                  sx={{
                    ...(AufNr.length > 1
                      ? { display: "none" }
                      : { disabled: false }),
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
                >
                  <h3 onClick={handleDelete}>Delete</h3>
                </Button>
              </Box>
            </Box>
          </>
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
      </Box>
    </Box>
  );
};

export default Offen;
