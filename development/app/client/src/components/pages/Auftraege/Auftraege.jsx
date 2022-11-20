import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table/Table";
import { TextField, Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getNewAuftraege, deleteAuftrag } from "../../../actions/auftraege";
import Progress from "../../Progress/Progress";

const Auftraege = () => {
  const [AufNr, setAufNr] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewAuftraege(100));
  }, [dispatch]);

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleDelete = () => {
    dispatch(deleteAuftrag(AufNr));
    navigate(0);
  };

  const handleEdit = () => {};

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

export default Auftraege;
