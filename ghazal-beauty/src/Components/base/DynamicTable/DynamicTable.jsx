import React from "react";

export function DynamicTable({ titles, rows }) {
  return (
    <table className="border-separate rounded-2xl text-center overflow-hidden">
      <thead className="bg-purple-300 font-semibold">
        <tr>
          {titles.map((title, index) => (
            <th key={index} className="p-3">
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((rowData, rowIndex) => (
          <tr
            key={rowIndex}
            className={
              rowIndex % 2 === 0 ? "bg-purple-200" : "bg-purple-100"
            }
          >
            {rowData.map((cellData, colIndex) => (
              <td key={colIndex} className="p-3 align-middle">
                {/* Check if cellData is a string or a React component */}
                {typeof cellData === "string" ? (
                  cellData
                ) : (
                  <div className="vertical-flex gap-3 justify-center">
                    {cellData}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
