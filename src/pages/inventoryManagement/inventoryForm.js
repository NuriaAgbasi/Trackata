import React, { useState } from "react";

function InventoryForm({ onAddItem, handleClosePopup }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = () => {
    if (!name || !stock || !price) {
      setError("Please input all fields");
      return;
    }
    if (isNaN(stock) || isNaN(price)) {
      setError("Please enter valid numbers for stock and price");
      return;
    }

    const newItem = {
      name: name,
      stock: parseInt(stock),
      price: parseFloat(price)
    };

    onAddItem(newItem);
    setName("");
    setStock("");
    setPrice("");
    setError("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full px-4">
        <div className=" grid h-screen place-items-center">
          <div className="max-w-xl w-full">

            <div className="bg-white p-10 rounded-md shadow-md">
              <button
                type="button"
                onClick={handleClosePopup}
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className=" bg-red-600 close inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                &times;
              </button>
              <h4 className=" text-blue mb-6 mt-10 ml-40  text-2xl font-medium leading-tight">
                Create A New Item
              </h4>
              <div className="relative mb-3" data-twe-input-wrapper-init>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input input-bordered w-full bg-blue " />
              </div>
              <br />
              <div className="relative mb-3" data-twe-input-wrapper-init>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Number of Stock" className="input input-bordered w-full bg-blue" />
              </div>
              <br />
              <div className="relative mb-3" data-twe-input-wrapper-init>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="input input-bordered w-full bg-blue " />
              </div>
              <br />
              <button
                type="button"
                onClick={handleAddItem}
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className=" ml-56 bg-green-500 mr-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-green-300 hover:shadow-primary-2 focus:bg-green-200 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
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
