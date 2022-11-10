import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ tableHeadings, tableData, id }) => {
  const columns = tableHeadings.map((heading) => {
    return { field: heading, headerName: heading, width: 200 };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row`${id}`}
      />
    </div>
  );
};

export default Table;
