import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

import AuftragForm from "../AuftragForm/AuftragForm";
import {
  createAuftrag,
  createAuftragWithoutTrigger,
  getAllAuftraege,
} from "../../../../actions/auftraege";
import { getKunden } from "../../../../actions/kunden";
import { useNavigate } from "react-router-dom";

const Anlegen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getKunden());
    dispatch(getAllAuftraege());
  }, [dispatch]);
  const kunden = useSelector((state) => state.kunden);
  const auftraege = useSelector((state) => state.auftraege);
  const [selectedAuftraege, setSelectedAuftraege] = useState([
    {
      Aufnr: "",
      MitID: "",
      KunNr: "",
      AufDat: "",
      ErlDat: "",
      Dauer: "",
      Anfahrt: "",
      Beschreibung: "",
    },
  ]);
  const [withTrigger, setWithTrigger] = useState(true);

  const handleCreate = async () => {
    if (selectedAuftraege[0].KunNr !== "") {
      if (withTrigger) {
        const start = new Date().getTime();

        dispatch(createAuftrag(selectedAuftraege[0]));

        const end = new Date().getTime();
        const time = end - start;
        console.log(
          "start: " + start + ", end: " + end + ", total time: " + time
        ); /* navigate(0); */
      } else {
        const start = new Date().getTime();

        dispatch(getAllAuftraege()).then(() => {
          return auftraege;
        });
        const newAufnr =
          auftraege.length > 0 &&
          (await auftraege[auftraege.length - 1].Aufnr) + 1;
        selectedAuftraege[0].Aufnr = newAufnr;
        dispatch(createAuftragWithoutTrigger(selectedAuftraege[0]));

        const end = new Date().getTime();
        const time = end - start;
        console.log(
          "start: " + start + ", end: " + end + ", total time: " + time
        );
        /* navigate(0);  */
      }
    } else {
      alert("Bitte Kundennummer eingeben!");
    }
  };

  return (
    <Box
      marginTop="50px"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="500px"
        sx={{
          border: "1px solid #000",
          borderRadius: "7px",
          margin: "10px",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ margin: "10px" }}>
            Auftrag anlegen
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={withTrigger}
                onChange={() => setWithTrigger(!withTrigger)}
              />
            }
            label="Mit Trigger: "
            labelPlacement="start"
            sx={{ margin: "10px" }}
          />
        </Box>
        <AuftragForm
          selectedAuftraege={selectedAuftraege}
          setSelectedAuftraege={setSelectedAuftraege}
          kunden={kunden}
          disable={true}
        />
        <Box display="flex" justifyContent="right">
          <Button
            onClick={handleCreate}
            sx={{ height: "60px", width: "200px", margin: " 0 10px 10px" }}
            variant="contained"
          >
            Anlegen
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Anlegen;
