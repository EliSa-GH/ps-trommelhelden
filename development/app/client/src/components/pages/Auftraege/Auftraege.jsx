import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table/Table";
import { TextField, Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getNewAuftraege, deleteAuftrag } from "../../../actions/auftraege";
import Progress from "../../Progress/Progress";

const Auftraege = () => {
  const [selectedAuftraege, setSelectedAuftraege] = useState([
    {
      Aufnr: 0,
      MitID: 0,
      KunNr: 0,
      AufDat: "",
      ErlDat: "",
      Dauer: 0,
      Anfahrt: 0,
      Beschreibung: "",
    },
  ]);
  const [MitID, setMitID] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleDelete = () => {
    dispatch(deleteAuftrag(selectedAuftraege.map((auftrag) => auftrag.Aufnr)));
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
            dispatch(getNewAuftraege(MitID));
          }}
        >
          <TextField
            fullWidth
            required
            label="Employee's ID"
            sx={{ marginBottom: "20px" }}
            onChange={(e) => setMitID(e.target.value)}
            value={MitID}
          />
        </form>
      </Box>
      {auftraege.length > 0 && getHeadings(auftraege).length > 5 ? (
        <>
          <Table
            tableHeadings={getHeadings(auftraege)}
            tableData={auftraege}
            rowID="Aufnr"
            setSelectedAuftraege={setSelectedAuftraege}
          />
          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            marginRight={12}
          >
            <Button
              {...(selectedAuftraege.length > 1
                ? { disabled: true }
                : { disabled: false })}
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
