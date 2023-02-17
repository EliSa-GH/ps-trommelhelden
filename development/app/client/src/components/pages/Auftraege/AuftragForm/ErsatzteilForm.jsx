import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Box,
  Button,
  Typography,
  TextField,
  ButtonGroup,
} from "@mui/material";
import { getErsatzteil } from "../../../../actions/ersatzteil";
import { createMontage } from "../../../../actions/montage";

const ErsatzteilForm = ({ Aufnr, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getErsatzteil());
  }, [dispatch]);
  const ersatzteil = useSelector((store) => store.ersatzteil);

  const [ersatzteile, setErsatzteile] = useState([]);

  const increase = (index) => {
    const newErsatzteile = [...ersatzteile];
    newErsatzteile[index].EtAnz++;
    setErsatzteile(newErsatzteile);
  };

  const decrease = (index) => {
    const newErsatzteile = [...ersatzteile];
    if(--newErsatzteile[index].EtAnz > 0) {
      newErsatzteile[index].EtAnz--;
    } else {
      newErsatzteile[index].EtAnz = 1;
    }
    setErsatzteile(newErsatzteile);
  };

  const handleRequest = () => {
    dispatch(createMontage(Aufnr, ersatzteile));
    navigate(0);
  };
  return (
    <Box
      sx={{
        width: "500px",
        height: "100%",
        minHeight: "300px",
        margin: "10px",
      }}
    >
      <Box
        sx={{
          width: "500px",
          height: "80%",
          minHeight: "240px",
          margin: "10px",
        }}
      >
        <Autocomplete
          multiple
          options={ersatzteil.map(
            (option) => option.EtID + " - " + option.EtBezeichnung
          )}
          sx={{ width: "480px", margin: "10px" }}
          onChange={(event, value) => {
            const newErsatzteile = value.map((v) => ({
              EtID: v.split(" - ")[0],
              EtBezeichnung: v.split(" - ")[1],
              EtAnz: 1,
            }));
            setErsatzteile(newErsatzteile);
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Ersatzteile" />
          )}
        />
        {ersatzteile.length > 0 &&
          ersatzteile.map((ersatzteil, index) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              key={index}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0 10px",
                    width: "300px",
                    fontSize: "20px",
                  }}
                >
                  {ersatzteil.EtID} - {ersatzteil.EtBezeichnung}{" "}
                </Typography>
              </Box>
              <Box sx={{ padding: "10px" }}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button onClick={() => decrease(index)}>-</Button>
                  <Button disabled>{ersatzteile[index].EtAnz}</Button>
                  <Button onClick={() => increase(index)}>+</Button>
                </ButtonGroup>
              </Box>
            </Box>
          ))}
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="end">
        <Button
          variant="contained"
          sx={{ margin: "5px" }}
          onClick={handleRequest}
        >
          Anfordern
        </Button>
        <Button variant="contained" sx={{ margin: "5px" }} onClick={onClose}>
          Abbrechen
        </Button>
      </Box>
    </Box>
  );
};

export default ErsatzteilForm;
