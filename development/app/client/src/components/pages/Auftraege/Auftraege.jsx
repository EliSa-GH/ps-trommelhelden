import React, { useState, useEffect } from "react";

import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table/Table";
import { TextField, Box } from "@mui/material";

import { getAuftraege } from "../../../actions/auftraege";

const Auftraege = () => {
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();
  const [employeeID, setEmployeeID] = useState("");

  useEffect(() => {
    dispatch(getAuftraege());
  }, [dispatch]);

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
          }}
        >
          <TextField
            onChange={(e) => {
              setEmployeeID(e.target.value);
            }}
            value={employeeID}
            fullWidth
            required
            label="Employee's ID"
            sx={{ marginBottom: "20px" }}
          />
        </form>
      </Box>
      {auftraege.length > 0 ? (
        <Table
          tableHeadings={getHeadings(auftraege)}
          tableData={auftraege.filter(
            (filterArray) => filterArray.MitID === employeeID
          )}
        />
      ) : (
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Auftraege;
