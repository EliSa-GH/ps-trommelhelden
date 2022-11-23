import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getKunden, deleteKunde } from "../../actions/kunden";
import Table from "../Table/Table";
import Progress from "../Progress/Progress";

const Kunden = () => {
  const [KunNr, setKunNr] = useState([]);

  const navigate = useNavigate();
  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKunden());
  }, [dispatch]);

  const handleDelete = () => {
    
    if(KunNr != "")
    {
      //alert(KunNr);
      dispatch(deleteKunde(KunNr));
      //navigate(0);
    }
    else{
      //alert("leer");
    }
  };

  const kunden = useSelector((state) => state.kunden);
  return (
    <>
      {kunden.length > 0 ? (
        <Box>
          <Table
          tableHeadings={getHeadings(kunden)}
          tableData={kunden}
          rowID="KunNr"
          setKunNr={setKunNr}
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
              <h3>Kunde anlegen</h3>
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

export default Kunden;
