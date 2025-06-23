import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between space-x-8">
        <Link
          href="/"
          className="text-gray-700 font-semibold hover:text-blue-600 transition"
        >
          Products
        </Link>

        <Link
          href="/addproduct"
          className="font-semibold bg-black hover:bg-white hover:outline-1 text-white px-4 py-4 rounded-full  hover:text-blue-600 transition"
        >
          Add Product
        </Link>
      </div>
    </nav>
  );
}
