import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import Background from "../../components/background.tsx";

function Sales() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const product = items.find((item) => item.name === selectedProduct);
    if (product) {
      setPrice(product.price || 0);
    }
  }, [selectedProduct, items]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 10000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const fetchItems = async () => {
    const { data, error } = await supabase.from("inventory").select("*");
    if (error) {
      console.error("Error fetching items:", error);
    } else {
      setItems(data);
    }
  };

  const handleSellStock = async () => {
    try {
      const product = items.find((item) => item.name === selectedProduct);
      if (!product) {
        setError("Selected product does not exist in inventory.");
        return;
      }

      const newQuantity = product.stock - quantitySold;
      if (newQuantity < 0) {
        setError("Not enough stock available.");
        return;
      }

      const { error: updateError } = await supabase
        .from("inventory")
        .update({ stock: newQuantity })
        .eq("id", product.id);

      if (updateError) {
        console.error("Error updating inventory:", updateError);
        setError("Error updating inventory.");
        return;
      }

      const { error: insertError } = await supabase.from("sales").insert([
        {
          product_id: product.id,
          quantity: quantitySold,
          price: price,
          customer_name: customerName,
        },
      ]);

      if (insertError) {
        console.error("Error inserting sale:", insertError);
        setError("Error inserting sale.");
        return;
      }

      setSuccessMessage("Sale recorded successfully.");
      setSelectedProduct("");
      setQuantitySold("");
      setCustomerName("");
    } catch (error) {
      console.error("Error during sale transaction:", error);
      setError("Error during sale transaction.");
    }
  };

  return (
    <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Sales Page
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Make Profits here
        </p>
      </header>
      <div>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <select
              className="select mb-3 w-full max-w-xs bg-white"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="default">Pick a Product</option>
              {items.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity Sold"
              value={quantitySold}
              onChange={(e) => setQuantitySold(e.target.value)}
              className="bg-white mb-3 input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-white mb-3 input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white input input-bordered w-full max-w-xs"
            />
            <button
              type="button"
              onClick={handleSellStock}
              className="my-4 ml-28 inline-block rounded bg-teal-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
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
        </div>
      </div>
    </Background>
  );
}

export default Sales;
