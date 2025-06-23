import Link from 'next/link';
import React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`  // Production
  : 'http://localhost:3000';              // Local dev

export const getData = async () => {
  const response = await fetch(`${baseUrl}/api/products`);
  const data = await response.json();
  return data.data;
};


const ProductCard = ({ product }) => {
  const { name, price, category, discount, description, _id } = product;

  const priceNum = Number(price) || 0;
  const discountNum = Number(discount) || 0;
  const discountedPrice = discountNum
    ? (priceNum - (priceNum * discountNum) / 100).toFixed(2)
    : priceNum.toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 flex flex-col overflow-hidden border border-transparent hover:border-blue-400">
      {/* Product Image placeholder */}
      <div className="h-48  bg-gradient-to-tr from-blue-100 to-blue-300 flex items-center justify-center text-6xl font-bold text-blue-600 select-none">
        {name ? name.charAt(0).toUpperCase() : "P"}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-semibold mb-1 text-gray-900 truncate" title={name}>
          {name || 'Unnamed Product'}
        </h2>

        <p className="text-sm text-indigo-600 font-medium mb-3 uppercase tracking-wide">
          {category || 'Uncategorized'}
        </p>

        <p className="text-gray-700 text-base mb-6 flex-grow line-clamp-4 whitespace-normal">
          {description || 'No description available.'}
        </p>

        <div className="mt-auto flex items-center justify-between">
          {discountNum > 0 ? (
            <div className="flex items-baseline space-x-3">
              <span className="text-gray-400 line-through text-lg">${priceNum.toFixed(2)}</span>
              <span className="text-green-600 font-extrabold text-3xl">${discountedPrice}</span>
              <span className="bg-green-100 block text-green-800 text-xs font-semibold px-3 py-1 rounded-full select-none">
                {discountNum}% OFF
              </span>
            </div>
          ) : (
            <span className="text-gray-900 font-extrabold text-3xl">${priceNum.toFixed(2)}</span>
          )}

          <Link href={`/products/${_id}`}>
            <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Page = async () => {
  const products = await getData();

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 text-xl font-semibold">No products found.</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-16 text-gray-900 drop-shadow-md">
        Products Catalog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Page;
