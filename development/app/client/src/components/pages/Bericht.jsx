import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBerichte } from "../../actions/bericht";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import Progress from "../Progress/Progress";

const Bericht = () => {
  const [etAnzahl, setEtAnzahl] = useState("");
  const [hasError, setHasError] = useState([]);
  const dispatch = useDispatch();

  const handleClose = () => {
    setHasError([]);
  };

  const berichte = useSelector((state) => state.berichte);
  return (
    <Box>
      <h1 style={{ margin: "10px 100px" }}> Bericht</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Snackbar
          sx={{ marginTop: "75px" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={
            hasError.filter((error) => error.reason === "keinErsatzteil")
              .length > 0 &&
            hasError.filter((error) => error.reason === "keinErsatzteil")[0]
              .value
          }
          autoHideDuration={2000}
          onClose={handleClose}
          message={`Kein Ersatzteil wurde mehr als ${etAnzahl} mal bestellt!`}
        />
        <Snackbar
          sx={{ marginTop: "75px" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={
            hasError.filter((error) => error.reason === "inValidInput").length >
              0 &&
            hasError.filter((error) => error.reason === "inValidInput")[0].value
          }
          autoHideDuration={2000}
          onClose={handleClose}
          message="Eingabe muss Nummer sein!"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (/^\d+$/.test(etAnzahl) === false) {
              setHasError((prev) => {
                return [...prev, { reason: "inValidInput", value: true }];
              });
              return;
            }
            dispatch(getBerichte(etAnzahl)).then((res) => {
              if (res.message && res.message.length > 0) {
                setHasError((prev) => {
                  return [...prev, { reason: "keinErsatzteil", value: true }];
                });
              }
            });
            console.log(berichte);
          }}
        >
          <TextField
            fullWidth
            required
            label="Anzahl"
            sx={{ marginBottom: "20px" }}
            onChange={(e) => setEtAnzahl(e.target.value)}
            value={etAnzahl}
          />
        </form>
      </Box>

      <Box sx={{ width: "50%", margin: "0 auto" }}>
        {berichte.length > 0 ? (
          berichte.map((bericht, index) => {
            return (
              <Card key={index} sx={{ margin: "10px" }}>
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">
                      {bericht.EtID} - {bericht.EtBezeichnung}{" "}
                    </Typography>
                    <Typography variant="h6">
                      Summe: {bericht.Summe}{" "}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexFlow: "wrap",
                      border: 1,
                      margin: "5px",
                      padding: "10px",
                    }}
                  >
                    {JSON.parse(bericht.AuftragList).map((auftrag) => (
                      <Box
                        sx={{
                          padding: "0 30px",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "20%",
                        }}
                      >
                        <strong>{auftrag.AufNr}</strong> -
                        <div>{auftrag.Anzahl}</div> |
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Progress />
        )}
      </Box>
    </Box>
  );
};

export default Bericht;
