"use client";

import Link from "next/link";

export default function EditButton({ productId }) {
  return (
    <Link
      href={`/products/${productId}/edit`}
      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Edit
    </Link>
  );
}
