import React, { useEffect, useState } from "react";
import Table from "../Table/Table";

const Kunden = () => {
  const [data, setData] = useState();

  const getHeadings = (data) => {
    return Object.keys(data.response[0]);
  };
  useEffect(() => {
    
    fetch("/kunden")
      .then((res) => res.json())
      .then((data) => {
        //wait for data from server
        setData(data);
      });
  }, []);
  if (data)
    return (
      <Table tableHeadings={getHeadings(data)} tableData={data.response} />
    );
};

export default Kunden;
