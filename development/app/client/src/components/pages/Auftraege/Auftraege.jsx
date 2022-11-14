import React, { useState, useEffect } from "react";

import Table from "../../Table/Table";
import { Button, TextField, Box } from "@mui/material";

const Auftraege = () => {
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const [employeeID, setEmployeeID] = useState(100);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/auftraege")
      .then((res) => res.json())
      .then((data) => {
        //wait for data from server
        console.log(data);
        setData(data);
      });
  }, []);
  if (data)
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
              setEmployeeID(e.target[0].value);
            }}
          >
            <TextField fullWidth required label="Employee's ID" />
            <Button fullWidth variant="contained">
              Submit
            </Button>
          </form>
        </Box>

        {
          <Table
            tableHeadings={getHeadings(data)}
            tableData={data.filter(
              (filterArray) => filterArray.MitID === employeeID
            )}
            id={"AufNr"}
          />
        }
      </Box>
    );
};

export default Auftraege;
