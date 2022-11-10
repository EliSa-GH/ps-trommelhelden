import React from "react";

import Table from "../../Table/Table";
import auftraege from "../../../json/auftrag.json";

const Auftraege = () => {
  const getHeadings = () => {
    return Object.keys(auftraege[0]);
  };

  return (
    <Table tableHeadings={getHeadings()} tableData={auftraege} id="AufNr" />
  );
};

export default Auftraege;
