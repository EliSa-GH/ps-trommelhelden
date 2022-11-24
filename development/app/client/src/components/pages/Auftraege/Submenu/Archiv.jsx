import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import Table from "../../../Table/Table";
import Progress from "../../../Progress/Progress";
import { getErlAuftraege, deleteAuftrag } from "../../../../actions/auftraege";
import AuftragForm from "../AuftragForm/AuftragForm";

const Archiv = () => {
  const [selectedAuftraege, setSelectedAuftraege] = useState([{}]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const getHeadings = (data) => {
    return Object.keys(data[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log(selectedAuftraege);
  };

  const handleDelete = () => {
    dispatch(deleteAuftrag(selectedAuftraege.map((auftrag) => auftrag.Aufnr)));
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
            setSelectedAuftraege={setSelectedAuftraege}
          />
          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            marginRight={12}
          >
            <Button
              {...(selectedAuftraege.length !== 1
                ? { disabled: true }
                : { disabled: false })}
              sx={{ height: "60px", width: "200px", marginRight: "10px" }}
              variant="contained"
              onClick={handleClickOpen}
            >
              <h3>Edit</h3>
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
      {open && (
        <AuftragForm
          selectedAuftraege={selectedAuftraege}
          setSelectedAuftraege={setSelectedAuftraege}
          open={open}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export default Archiv;
