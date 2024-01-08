"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import dataJSON from "../data.json";
import Link from "next/link";

function Table() {
  // 2. To escape unecessary rerenders
  const finalColumnDef = useMemo(() => columnDef, []);
  const finalData = useMemo(() => dataJSON, []);

  const [columnOrder, setColumnOrder] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState([]);

  // 1. Create table instance
  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(), // Now we have access to all the rows
    state: {
      columnOrder: columnOrder,
      columnVisibility: columnVisibility,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <>
      <Link href="/" className="self-start">
        Back
      </Link>
      <p>Column Ordering | Column Hiding</p>
      <label>
        <input
          type={"checkbox"}
          checked={tableInstance.getIsAllColumnsVisible()}
          onChange={tableInstance.getToggleAllColumnsVisibilityHandler()}
        />{" "}
        Toggle All
      </label>
      <br />
      {tableInstance.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id}>
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{" "}
              {column.id}
            </label>
          </div>
        );
      })}
      {/* Funkcijā padodam secīgi kā vēlamies redzēt kolonnas. Ja ierakstam vienu, tad to rādīs kā pirmo, bet pārējos tā kā ir columns.js failā. Tādā secībā */}
      <button onClick={() => setColumnOrder(["date", "email", "id"])}>
        {"<Change ORDER>"}
      </button>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerElement) => {
            return (
              // create row
              <tr key={headerElement.id}>
                {headerElement.headers.map((columnElement) => {
                  return (
                    // create column element
                    <th key={columnElement.id} colSpan={columnElement.colSpan}>
                      {flexRender(
                        columnElement.column.columnDef.header,
                        columnElement.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowElement) => {
            return (
              <tr key={rowElement.id}>
                {rowElement.getVisibleCells().map((cellElement) => {
                  return (
                    <td key={cellElement.id}>
                      {flexRender(
                        cellElement.column.columnDef.cell,
                        cellElement.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
