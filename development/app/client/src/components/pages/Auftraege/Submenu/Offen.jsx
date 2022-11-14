import React from "react";

import Table from "../../../Table/Table";
import auftraege from "../../../../json/auftrag.json";

const Offen = () => {
  //const sliceArray = auftraege.slice(0, 500);
  const getHeadings = () => {
    return Object.keys(auftraege[0]);
  };
  return (
    <Table
      tableHeadings={getHeadings()}
      tableData={auftraege.filter(
        (filterArray) => filterArray.ErlDat == null && filterArray.MitID == null
      )}
      id={"AufNr"}
    />
  );
};

export default Offen;
