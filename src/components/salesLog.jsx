import React from "react";

const SalesLog = ({ salesLog }) => {
  return (
    <div>
      <h2>Sales Log</h2>
      {salesLog &&
        salesLog.map((entry, index) => (
          <div key={index}>
            <p>Item: {entry.itemName}</p>
            <p>Quantity Sold: {entry.quantitySold}</p>
            <p>Timestamp: {entry.timestamp}</p>
          </div>
        ))}
    </div>
  );
};

export default SalesLog;
