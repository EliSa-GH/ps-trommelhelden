import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const Table = ({ tableHeadings, tableData, id }) => {
  const columns = tableHeadings.map((heading) => {
    if (heading === "Beschreibung") {
      return {
        field: heading,
        headerName: heading,
        width: 500,
      };
    } else {
      return {
        field: heading,
        headerName: heading,
        flex: 1,
        minWidth: 100,
      };
    }
  });

  return (
    <Box
      sx={{
        height: 400,
        width: "90%",
        margin: "auto",
      }}
    >
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => (id === "AufNr" ? row.Aufnr : row.KunNr)}
      />
    </Box>
  );
};

export default Table;
