import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

import { getKunden } from "../../actions/kunden";
import Table from "../Table/Table";

const Kunden = () => {
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKunden());
  }, [dispatch]);

  const kunden = useSelector((state) => state.kunden);
  return (
    <>
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
    </>
  );
};

export default Kunden;
