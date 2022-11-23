import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { getMitarbeiter, deleteMitarbeiter } from "../../actions/mitarbeiter";
import Progress from "../Progress/Progress";

const Mitarbeiter = () => {
  const [MitID, setMitID] = useState([]);
  
  const navigate = useNavigate();
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMitarbeiter());
  }, [dispatch]);

  const handleDelete = () => {
    
    if(MitID != "")
    {
      //alert(MitID);
      dispatch(deleteMitarbeiter(MitID));
      navigate(0);
    }
    else{
      //alert("leer");
    }
  };

  const mitarbeiter = useSelector((state) => state.mitarbeiter);
  return (
    <>
      {mitarbeiter.length > 0 ? (
        <Box>
          <Table
          tableHeadings={getHeadings(mitarbeiter)}
          tableData={mitarbeiter}
          rowID="MitID"
          setMitID={setMitID}
          />
          <Box
            display="flex"
            justifyContent="right"
            alignItems="right"
            sx={{
              width: "90%",
              margin: "auto",
              '& button': { m: 1 }
            }}
          >
            <Button
              variant="contained"
            >
              <h3>Mitarbeiter anlegen</h3>
            </Button>
            <Button
              variant="contained"
            >
              <h3>Bearbeiten</h3>
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
            >
              <h3>Löschen</h3>
            </Button>
          </Box>
        </Box>
      ) : (
        <Progress />
      )}
    </>
  );
};

export default Mitarbeiter;
