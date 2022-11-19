import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, CircularProgress } from "@mui/material";

import Table from "../Table/Table";
import { getMitarbeiter } from "../../actions/mitarbeiter";

const Mitarbeiter = () => {
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMitarbeiter());
  }, [dispatch]);

  const mitarbeiter = useSelector((state) => state.mitarbeiter);
  return (
    <>
      {mitarbeiter.length > 0 ? (
        <Table
          tableHeadings={getHeadings(mitarbeiter)}
          tableData={mitarbeiter}
          rowID="MitID"
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
    </>
  );
};

export default Mitarbeiter;
