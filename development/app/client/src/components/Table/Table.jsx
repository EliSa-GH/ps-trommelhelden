import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { nanoid } from "@reduxjs/toolkit";

const Table = ({ tableHeadings, tableData }) => {
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
        getRowId={(row) => nanoid()}
      />
    </Box>
  );
};

export default Table;
