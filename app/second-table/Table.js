"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import dataJSON from "../data.json";
import Link from "next/link";

function Table() {
  const [sorting, setSorting] = useState([]);

  // 2. To escape unecessary rerenders
  const finalColumnDef = useMemo(() => columnDef, []);
  const finalData = useMemo(() => dataJSON, []);

  // 1. Create table instance
  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(), // Now we have access to all the rows
    getSortedRowModel: getSortedRowModel(), // Now we can sort table
    // Binding local state to table state.
    state: {
      // Inside the table we have state called "sorting" which we bind to our local state.
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <Link href="/" className="self-start">
        Back
      </Link>
      <p>
        Merging Headers (dzim., v., uzv. ) | Grouping Headers (e-pasts un
        datums) | Sorting Columns (click column) | Formating Cells (datums
        kolonna)
      </p>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerElement) => {
            return (
              // create row
              <tr key={headerElement.id}>
                {headerElement.headers.map((columnElement) => {
                  return (
                    // create column element
                    <th
                      key={columnElement.id}
                      colSpan={columnElement.colSpan}
                      // Add this handler to handle sorting
                      onClick={columnElement.column.getToggleSortingHandler()}
                    >
                      {/* Adjusted with .placeholder ternary so that we dont see other placeholders */}
                      {columnElement.placeholderId
                        ? null
                        : flexRender(
                            columnElement.column.columnDef.header,
                            columnElement.getContext()
                          )}
                      {/* Code for up and down sorting. columnElement.column.getIsSorted() returns "asc" or "desc" string */}
                      {
                        { asc: " -UP", desc: " -DOWN" }[
                          columnElement.column.getIsSorted() ?? null
                        ]
                      }
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
