import React, { useState } from "react";

function InventoryForm({ onAddItem, handleClosePopup }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = () => {
    if (!name || !stock || !price || !costPrice) {
      setError("Please input all fields");
      return;
    }
    if (isNaN(stock) || isNaN(price) || isNaN(costPrice)) {
      setError("Please enter valid numbers for stock, price, and cost price");
      return;
    }

    const newItem = {
      name,
      stock: parseInt(stock),
      price: parseFloat(price),
      costPrice: parseFloat(costPrice),
    };

    onAddItem(newItem);
    setName("");
    setStock("");
    setPrice("");
    setCostPrice("");
    setError("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <div className="max-w-xl w-full">
            <div className="bg-white p-10 rounded-md shadow-md">
              <button
                type="button"
                onClick={handleClosePopup}
                className="bg-red-600 close inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
              >
                &times;
              </button>
              <h4 className="text-blue mb-6 mt-10 ml-40 text-2xl font-medium leading-tight">
                Create A New Item
              </h4>
              <div className="relative mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Number of Stock"
                  className="input input-bordered w-full"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="input input-bordered w-full"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="Cost Price"
                  className="input input-bordered w-full"
                />
              </div>
              <br />
              <button
                type="button"
                onClick={handleAddItem}
                className="ml-56 bg-green-500 mr-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
              >
                Add Item
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryForm;
