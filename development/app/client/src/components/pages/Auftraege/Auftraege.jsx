import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table/Table";
import { TextField, Box, CircularProgress, Button } from "@mui/material";

import { getNewAuftraege } from "../../../actions/auftraege";

const Auftraege = () => {
  const [AufNr, setAufNr] = useState([]);
  console.log(AufNr);
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  const dispatch = useDispatch();

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
            dispatch(getNewAuftraege(e.target[0].value));
          }}
        >
          <TextField
            fullWidth
            required
            label="Employee's ID"
            sx={{ marginBottom: "20px" }}
          />
        </form>
      </Box>
      {auftraege.length > 0 ? (
        <>
          <Table
            tableHeadings={getHeadings(auftraege)}
            tableData={auftraege}
            rowID="Aufnr"
            setAufNr={setAufNr}
          />
          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            marginRight={12}
          >
            <Button
              {...(AufNr.length > 1 ? { disabled: true } : { disabled: false })}
              sx={{ height: "60px", width: "200px", marginRight: "10px" }}
              variant="contained"
            >
              <h3 onClick={handleEdit}>Edit</h3>
            </Button>
            <Button
              sx={{ height: "60px", width: "200px", marginLeft: "10px" }}
              variant="contained"
            >
              <h3 onClick={handleDelete}>Delete</h3>
            </Button>
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
  );
};

export default Auftraege;
