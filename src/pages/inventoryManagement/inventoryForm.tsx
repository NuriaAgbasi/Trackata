import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import Alert from "../../components/Alert.tsx";

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
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [sales_price, setSales_price] = useState("");
  const [cost_price, setCost_price] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !stock || !sales_price || !cost_price) {
      setFormError("Please fill in all the fields correctly.");
      setAlertMessage("Please fill in all the fields correctly.");
      setAlertType("error");
      return;
    }
    if (parseFloat(cost_price) >= parseFloat(sales_price)) {
      setFormError("Cost Price cannot exceed or be equals to Sales Price.");
      setAlertMessage("Cost Price cannot exceed or be equal to Sales Price.");
      setAlertType("error");
      return;
    }
    const { data, error } = await supabase.from("inventory").insert([
      {
        name,
        stock: parseFloat(stock),
        sales_price: parseFloat(sales_price),
        cost_price: parseFloat(cost_price),
      },
    ]);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
      setAlertMessage("Error occurred while adding the item.");
      setAlertType("error");
    } else {
      setFormError(null);
      setAlertMessage("Item added successfully!");
      setAlertType("success");
      console.log("success");
      handleClosePopup();
    }
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
                  value={sales_price}
                  onChange={(e) => setSales_price(e.target.value)}
                  placeholder="Price"
                  className="bg-teal-300 text-white input input-bordered w-full"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={cost_price}
                  onChange={(e) => setCost_price(e.target.value)}
                  placeholder="Cost Price"
                  className="bg-teal-300 text-white input input-bordered w-full"
                />
              </div>
              <br />
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-56 bg-green-500 mr-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
              >
                Add Item
              </button>
              {formError && <p className="error">{formError}</p>}
            </div>
          </div>
        </div>
      </div>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
    </div>
  );
};

export default InventoryForm;
