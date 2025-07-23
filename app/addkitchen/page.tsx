"use client";

import { useState } from "react";

export default function AddKitchenPage() {
  const [name, setName] = useState("");
  const [maker, setMaker] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newKitchen = {
      name,
      maker,
      price: Number(price),
      description,
      location,
      imageUrl,
    };

    try {
      const res = await fetch("/api/kitchens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKitchen),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add kitchen");
      }

      const result = await res.json();
      alert("Kitchen added successfully!");
      console.log("Result:", result);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add kitchen.");
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-violet-800 mb-6">Add New Kitchen</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kitchen Name</label>
            <input
              type="text"
              placeholder="e.g. Modern Luxe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maker</label>
            <input
              type="text"
              placeholder="e.g. Classic Interiors"
              value={maker}
              onChange={(e) => setMaker(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              placeholder="e.g. EGP 45,000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              placeholder="Describe the style, material, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="e.g. Cairo"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-700 text-white py-3 rounded-md font-semibold hover:bg-violet-800 transition"
          >
            Submit Kitchen
          </button>
        </form>
      </div>
    </div>
  );
}
