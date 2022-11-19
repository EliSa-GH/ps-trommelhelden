import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, CircularProgress, Button } from "@mui/material";

import Table from "../../../Table/Table";
import { getErlAuftraege } from "../../../../actions/auftraege";

const Archiv = () => {
  const [AufNr, setAufNr] = useState([]);
  console.log(AufNr);

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getErlAuftraege());
  }, [dispatch]);

  const erlAuftraege = useSelector((state) => state.auftraege);

  return (
    <Box>
      {erlAuftraege.length > 0 ? (
        <>
          <Table
            tableHeadings={getHeadings(erlAuftraege)}
            tableData={erlAuftraege}
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

export default Archiv;
