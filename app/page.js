import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <h1>Here are few tables:</h1>
      <br />
      <Link href="/first-table" className="text-green-600">
        First Table (Simple table)
      </Link>
      <Link href="/second-table" className="text-green-600">
        Second Table (Merging, Sorting, Grouping, Formating cells)
      </Link>
      <Link href="/third-table" className="text-green-600">
        Third Table (Filtering)
      </Link>
      <Link href="/fourth-table" className="text-green-600">
        Fourth Table (Pagination)
      </Link>
      <Link href="/fifth-table" className="text-green-600">
        Fifth Table (Selecting Rows)
      </Link>
      <Link href="/sixt-table" className="text-green-600">
        Sixt Table (Column Ordering, Column Hiding)
      </Link>
    </main>
  );
}
