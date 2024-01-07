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

export const columnDef = [
  // accessorKey un header ir definēti lauki, tie nav pašizdomāti
  // accessorKey value jākorelē ar to kas ir datos, bet header var norādīt jebkādu tekstu.
  {
    // id nummurs
    accessorKey: "id",
    // Headera nosaukums tabulā. Brīvi izvēlēts
    header: "ID nummurs",
  },
  {
    // Merging data
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Vārds",
  },
  // {
  //   accessorKey: "first_name",
  //   header: "Vārds",
  // },
  // {
  //   accessorKey: "last_name",
  //   header: "Uzvārds",
  // },
  {
    accessorKey: "email",
    header: "E-pasts",
  },
  {
    accessorKey: "date",
    header: "Datums",
  },
];
