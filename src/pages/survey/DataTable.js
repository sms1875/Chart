// DataTable.js
import React, { useState } from 'react';

const DataTable = ({ data, onDataChange }) => {
  const [tableData, setTableData] = useState(data);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex].data[colIndex] = value;
    setTableData(newData);
    onDataChange(newData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          {data.map((item, index) => (
            <th key={index}>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data[0].data.map((_, rowIndex) => (
          <tr key={rowIndex}>
            <td>{data[0].data[rowIndex]}</td>
            {tableData.map((item, colIndex) => (
              <td key={colIndex}>
                <input
                  type="text"
                  value={item.data[rowIndex]}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
