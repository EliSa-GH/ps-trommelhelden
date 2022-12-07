import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const Table = ({
  tableHeadings,
  tableData,
  rowID,
  setSelectedAuftraege,
  setSelectedKunde,
  setSelectedMitarbeiter,
  setSelectedErsatzteil,
  setKunNr,
  setMitID,
  setEtID,
}) => {
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
  const rows = tableData;

  return (
    <Box
      sx={{
        height: 400,
        width: "90%",
        margin: "auto",
      }}
    >
      {rowID === "Aufnr" ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.Aufnr}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.Aufnr)
            );
            setSelectedAuftraege(selectedRowData);
          }}
        />
      ) : rowID === "KunNr" ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.KunNr}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.KunNr)
            );
            setSelectedKunde(selectedRowData);
          }}
        />
      ) : rowID === "MitID" ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.MitID}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.MitID)
            );
            setSelectedMitarbeiter(selectedRowData);
          }}
        />
      ) : rowID === "EttID" ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.EtID}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.MitID)
            );
            setSelectedErsatzteil(selectedRowData);
          }}
        />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.KunNr}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.KunNr)
            );
            const selectedKunNr = selectedRowData.map((row) => row.KunNr);
            setKunNr(selectedKunNr);
          }}
        />
      )}
    </Box>
  );
};

export default Table;
