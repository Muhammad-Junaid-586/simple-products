'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    discount: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          category: form.category,
          discount: parseFloat(form.discount),
          description: form.description,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Product added successfully!');
        router.push('/'); // Redirect to home or product list
      } else {
        alert('Failed to add product: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
            Price ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            value={form.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Discount */}
        <div>
          <label htmlFor="discount" className="block text-gray-700 font-semibold mb-2">
            Discount (%)
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={form.discount}
            onChange={handleChange}
            placeholder="Enter discount percentage"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            required
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
