import React from "react";

import Table from "../../Table/Table";
import auftraege from "../../../json/auftrag.json";

const Auftraege = () => {
  const sliceArray = auftraege.slice(0, 10);

  const getHeadings = () => {
    return Object.keys(sliceArray[0]);
  };

  return <Table tableHeadings={getHeadings()} tableData={sliceArray} />;
};

export default Auftraege;
