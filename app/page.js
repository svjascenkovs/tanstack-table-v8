import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Here are few tables:</h1>
      <Link href="/first-table" className="text-green-600">
        First Table
      </Link>
      <Link href="/second-table" className="text-green-600">
        Second Table
      </Link>
      <Link href="/third-table" className="text-green-600">
        Third Table
      </Link>
    </main>
  );
}
