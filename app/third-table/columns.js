"use client";
import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

// DATA SAMPLE

// {
//   "id": 1,
//   "first_name": "Gianna",
//   "last_name": "Clayfield",
//   "email": "gclayfield0@cnn.com",
//   "gender": "Female",
//   "ip_address": "51.86.94.151",
//   "phone": "2278414042",
//   "date": "6/11/2023"
// }

// https://tanstack.com/table/v8/docs/api/features/filters

export const columnDef = [
  // accessorKey un header ir definēti lauki, tie nav pašizdomāti
  // accessorKey value jākorelē ar to kas ir datos, bet header var norādīt jebkādu tekstu.
  {
    // id nummurs
    accessorKey: "id",
    // Headera nosaukums tabulā. Brīvi izvēlēts
    header: "ID nummurs",
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "first_name",
    header: "Vārds",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "last_name",
    header: "Uzvārds",
  },
  {
    accessorKey: "email",
    header: "E-pasts",
    enableColumnFilter: false,
  },
  {
    accessorKey: "date",
    header: "Datums",
    enableColumnFilter: false,
  },
];
