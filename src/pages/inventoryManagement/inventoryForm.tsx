import React from "react";
import Inventorystate from "./inventorystate.jsx";

interface InventoryFormProps {
  onAddItem: (item: {
    name: string;
    stock: number;
    price: number;
    costPrice: number;
    profit: number;
  }) => void;
  handleClosePopup: () => void;
}

const InventoryForm = ({ onAddItem, handleClosePopup }: InventoryFormProps) => {
  const {
    name,
    setName,
    stock,
    setStock,
    price,
    setPrice,
    costPrice,
    setCostPrice,
    error,
    setError,
    resetFields,
  } = Inventorystate();

  const calculateProfit = (): number | undefined => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(price);

    if (isNaN(cp) || isNaN(sp)) {
      setError("Invalid cost price or sale price.");
      return undefined;
    }

    if (cp > sp) {
      setError("Cost price is higher than sale price. No profit can be made.");
      return undefined;
    }

    const profit = sp - cp;
    setError("");
    return profit;
  };

  const handleAddItem = () => {
    if (!name || !stock || !price || !costPrice) {
      setError("Please input all fields");
      return;
    }
    if (
      isNaN(Number(stock)) ||
      isNaN(Number(price)) ||
      isNaN(Number(costPrice))
    ) {
      setError("Please enter valid numbers for stock, price, and cost price");
      return;
    }

    const profit = calculateProfit();
    if (profit === undefined) {
      return;
    }

    const newItem = {
      name,
      stock: parseInt(stock, 10),
      price: parseFloat(price),
      costPrice: parseFloat(costPrice),
      profit,
    };

    onAddItem(newItem);
    resetFields();
    handleClosePopup();
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
              <h4 className="text-teal-200 mb-6 mt-10 ml-40 text-2xl font-medium leading-tight">
                Create A New Item
              </h4>
              <div className="relative mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="bg-teal-300 text-white input input-bordered w-full"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Number of Stock"
                  className="bg-teal-300 text-white input input-bordered w-full"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="bg-teal-300 text-white input input-bordered w-full"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="Cost Price"
                  className="bg-teal-300 text-white input input-bordered w-full"
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
};

export default InventoryForm;
