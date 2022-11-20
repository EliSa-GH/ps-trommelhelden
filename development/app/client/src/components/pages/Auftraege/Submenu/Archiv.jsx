import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import Table from "../../../Table/Table";
import Progress from "../../../Progress/Progress";
import { getErlAuftraege, deleteAuftrag } from "../../../../actions/auftraege";

const Archiv = () => {
  const [AufNr, setAufNr] = useState([]);

  const navigate = useNavigate();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleDelete = () => {
    dispatch(deleteAuftrag(AufNr));
    navigate(0);
  };

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
              onClick={handleDelete}
            >
              <h3>Delete</h3>
            </Button>
          </Box>
        </>
      ) : (
        <Progress />
      )}
    </Box>
  );
};

export default Archiv;
