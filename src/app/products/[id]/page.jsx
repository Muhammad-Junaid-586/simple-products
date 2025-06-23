"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm(props) {
  const id = props.params.id;
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      const res = data.data;

      setName(res.name || "");
      setPrice(res.price || "");
      setCategory(res.category || "");
      setDiscount(res.discount || "");
      setDescription(res.description || "");
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, category, discount, description }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("✅ Product updated successfully!");
      } else {
        setMessage(result.error || "❌ Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("❌ An error occurred while updating the product.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        alert("✅ Product deleted successfully.");
        router.push("/"); // Redirect to homepage (or product list)
      } else {
        alert("❌ Failed to delete product: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ An error occurred while deleting the product.");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto space-y-6 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit the Product</h1>

      {message && (
        <p className="text-center text-sm font-medium text-blue-600">
          {message}
        </p>
      )}

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Product Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Price ($)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Discount (%)
        </label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="flex items-center justify-between space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Update Product
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Delete Product
        </button>
      </div>
    </form>
  );
}
