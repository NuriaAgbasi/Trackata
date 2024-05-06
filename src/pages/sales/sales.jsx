import React, { useState, useEffect } from "react";
import Background from "../../components/background.jsx";
import Salesstate from "./salesstate.jsx";
function Sales() {
  const {
    selectedProduct,
    setSelectedProduct,
    quantitySold,
    setQuantitySold,
    error,
    customerName,
    setCustomerName,
    successMessage,
    setSuccessMessage,
    handleSellStock,
    items,
  } = Salesstate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 10000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <Background>
      <div>
        <select
          className="select w-full max-w-xs"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option disabled selected>
            Pick a Product
          </option>
          {items.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity Sold"
          value={quantitySold}
          onChange={(e) => setQuantitySold(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          type="button"
          onClick={handleSellStock}
          data-twe-ripple-init
          data-twe-ripple-color="light"
          class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        >
          Sell Stock
        </button>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-2"
            role="alert"
          >
            <strong>Error:</strong> {error}
          </div>
        )}
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mt-2"
            role="alert"
          >
            {successMessage}
          </div>
        )}
      </div>
    </Background>
  );
}

export default Sales;
