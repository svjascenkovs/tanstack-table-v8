"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import dataJSON from "../data.json";
import Link from "next/link";

// Šo var atkomentēt zemāk, ja grib izmantot "min" un "max" filtrus uz number datiem.
import FilterFunction from "./FilterFunction";

function Table() {
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  // 2. To escape unecessary rerenders
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDef, []);
  const defaultColumn = useMemo(() => {
    return {
      youtubeProperty: "hello world",
    };
  }, []);

  // 1. Create table instance
  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    defaultColumn: defaultColumn,
    getCoreRowModel: getCoreRowModel(), // Now we have access to all the rows
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      columnFilters: columnFilters,
    },
    onGlobalFilterChanged: setFiltering,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <>
      <Link href="/" className="self-start">
        Back
      </Link>
      <p>
        Global filtering (iekš columns.js var arī atslēgt īpašām kolonnām
        &quot;enableGlobalFilter&quot;) | Column filtering (iestatās iekš
        columns.js &quot;enableColumnFilter&quot;)
        <a
          href="https://tanstack.com/table/v8/docs/api/features/filters"
          className="text-blue-500"
        >
          Filters Dokumentācija
        </a>
        | Default Column
      </p>
      <input
        type="text"
        placeholder="GLOBAL FILTER"
        value={filtering}
        className="border-2 border-green-300"
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerElement) => {
            return (
              // create row
              <tr key={headerElement.id}>
                {headerElement.headers.map((columnElement) => {
                  console.log(
                    "Our default property: ",
                    columnElement.column.columnDef.youtubeProperty
                  );
                  return (
                    // create column element
                    <th key={columnElement.id} colSpan={columnElement.colSpan}>
                      {columnElement.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            columnElement.column.columnDef.header,
                            columnElement.getContext()
                          )}
                          {/* getCanFilter iestatās iekš "columns.js" faila */}
                          {columnElement.column.getCanFilter() ? (
                            <div>
                              {/* <FilterFunction
                                column={columnElement.column}
                                table={tableInstance}
                              /> */}
                              <input
                                type="text"
                                className="text-black"
                                value={
                                  columnElement.column.getFilterValue() || ""
                                }
                                onChange={(e) => {
                                  columnElement.column.setFilterValue(
                                    e.target.value
                                  );
                                }}
                              />
                            </div>
                          ) : null}
                        </>
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
