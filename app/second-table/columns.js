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
  // Merging header columns
  {
    accessorFn: (row) => ` ${row.gender} ${row.first_name} ${row.last_name}`,
    header: "Dzimums, Vārds, Uzvārds",
  },
  // Grouping header columns.
  {
    header: "Epasts un datums",
    columns: [
      {
        accessorKey: "email",
        header: "E-pasts",
      },
      {
        accessorKey: "date",
        header: "Datums",
        // Formating cell
        cell: (cell) => {
          const dateValue = cell.getValue(); // atgrieztu "6/11/2023", ja skatās pēc augšējā sample piemēra. Atgriež vērtību.
          return new Date(dateValue).getFullYear();
        },
      },
    ],
  },
];
