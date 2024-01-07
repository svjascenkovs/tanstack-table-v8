"use client";

import React, { useMemo } from "react";
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

  // 1. Create table instance
  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(), // Now we have access to all the rows
  });

  return (
    <>
      <Link href="/" className="self-start">
        Back
      </Link>
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
