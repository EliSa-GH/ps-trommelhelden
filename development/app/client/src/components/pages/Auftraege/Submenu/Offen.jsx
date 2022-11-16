import React, { useEffect } from "react";

import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../Table/Table";
import { getAuftraege } from "../../../../actions/auftraege";

const Offen = () => {
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuftraege());
  }, [dispatch]);

  const auftraege = useSelector((state) => state.auftraege);

  return (
    <>
      {auftraege.length > 0 ? (
        <Table
          tableHeadings={getHeadings(auftraege)}
          tableData={auftraege.filter(
            (filterArray) => filterArray.MitID === null
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
    </>
  );
};

export default Offen;
