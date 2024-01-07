"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <>
      <Link href="/" className="self-start">
        Back
      </Link>
      <p>Pagination (defaults to 10 items) | Next & Previous</p>
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
      <div className="self-start">
        <button
          onClick={() => {
            tableInstance.setPageIndex(0);
          }}
        >
          {"<<"}
        </button>
        <p className="inline"> | </p>
        <button
          disabled={!tableInstance.getCanPreviousPage()}
          onClick={() => {
            tableInstance.previousPage();
          }}
        >
          Previous Page
        </button>
        <p className="inline"> | </p>
        <button
          disabled={!tableInstance.getCanNextPage()}
          onClick={() => {
            tableInstance.nextPage();
          }}
        >
          Next Page
        </button>
        <p className="inline"> | </p>
        <button
          onClick={() => {
            tableInstance.setPageIndex(tableInstance.getPageCount() - 1);
          }}
        >
          {">>"}
        </button>
      </div>
      <br />
      <div className="self-start">
        <ul>
          <li>
            You are on page number:{" "}
            {tableInstance.options.state.pagination.pageIndex + 1}
          </li>
          <li>Total pages: {tableInstance.getPageCount()}</li>
        </ul>
      </div>
      <br />
      <div className="self-start border-2 border-black">
        <input
          type="number"
          placeholder="Go to page"
          max={tableInstance.getPageCount()}
          onChange={(e) => tableInstance.setPageIndex(e.target.value - 1)}
        />
      </div>
      <br />
      <p className="self-start">
        Page size: {tableInstance.options.state.pagination.pageSize}
      </p>
      <select
        className="self-start border-2 border-black"
        value={tableInstance.options.state.pagination.pageSize}
        onChange={(e) => tableInstance.setPageSize(e.target.value)}
      >
        {[10, 15, 25, 50].map((pageSizeEl) => {
          return (
            <option key={pageSizeEl} value={pageSizeEl}>
              {pageSizeEl}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Table;
