import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

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
        <Table tableHeadings={getHeadings(kunden)} tableData={kunden} />
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

export default Kunden;
