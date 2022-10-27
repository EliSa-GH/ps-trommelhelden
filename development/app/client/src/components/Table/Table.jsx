import React from "react";

const Table = ({ tableHeadings, tableData }) => {
  return (
    <table>
      <thead>
        <tr>
          {tableHeadings.map((heading) => {
            return <th key={heading}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => {
          return (
            <tr key={index}>
              {tableHeadings.map((key, index) => {
                return <td key={index}>{row[key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
