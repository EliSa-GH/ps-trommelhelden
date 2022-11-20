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
  const [mitID, setMitID] = useState("");
  const [AufNr, setAufNr] = useState([]);

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
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleAssign = () => {
    dispatch(setAuftragMitarbeiter(AufNr, mitID));
    navigate(0);
  };

  const handleDelete = () => {
    dispatch(deleteAuftrag(AufNr));
    navigate(0);
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
                  onClick={handleDelete}
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
    </Box>
  );
};

export default Offen;
