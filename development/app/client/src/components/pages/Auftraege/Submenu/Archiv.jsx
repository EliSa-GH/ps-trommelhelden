import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, CircularProgress } from "@mui/material";

import Table from "../../../Table/Table";
import { getErlAuftraege } from "../../../../actions/auftraege";

const Archiv = () => {
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getErlAuftraege());
  }, [dispatch]);

  const erlAuftraege = useSelector((state) => state.auftraege);

  return (
    <>
      {erlAuftraege.length > 0 ? (
        <Table
          tableHeadings={getHeadings(erlAuftraege)}
          tableData={erlAuftraege}
          RowID="AufNr"
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

export default Archiv;
