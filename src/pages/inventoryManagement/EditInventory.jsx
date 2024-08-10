import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

const EditInventory = ({ onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sales_price, setSales_price] = useState("");
  const [cost_price, setCost_price] = useState("");
  const [formError, setFormError] = useState(null);

  console.log(onClose);

  useEffect(() => {
    const fetchInventory = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("inventory")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        navigate("/inventory", { replace: true });
      } else {
        setSales_price(data.sales_price);
        setCost_price(data.cost_price);
      }
    };
    fetchInventory();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sales_price || !cost_price) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    if (parseFloat(cost_price) >= parseFloat(sales_price)) {
      setFormError("Cost Price cannot exceed or be equal to Sales Price.");
      return;
    }

    const { error } = await supabase
      .from("inventory")
      .update({
        sales_price: parseFloat(sales_price),
        cost_price: parseFloat(cost_price),
      })
      .eq("id", id);

    if (error) {
      setFormError("Error updating inventory item.");
    } else {
      setFormError(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <div className="max-w-xl w-full">
            <div className="bg-white p-10 rounded-md shadow-md relative">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 close inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong absolute top-2 right-2"
              >
                &times;
              </button>
              <h4 className="text-teal-300 mb-6 mt-10 text-2xl font-medium leading-tight text-center">
                Edit
              </h4>
              <div className="relative mb-3">
                <input
                  type="number"
                  value={sales_price}
                  onChange={(e) => setSales_price(e.target.value)}
                  placeholder="Edit Price"
                  className="input input-bordered w-full bg-teal-200"
                />
              </div>
              <br />
              <div className="relative mb-3">
                <input
                  type="number"
                  value={cost_price}
                  onChange={(e) => setCost_price(e.target.value)}
                  placeholder="Edit Cost"
                  className="input input-bordered w-full bg-teal-200"
                />
              </div>
              <br />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-500 mr-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-orange-400 ml-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  Cancel
                </button>
              </div>
              {formError && (
                <p className="error text-red-500 mt-4">{formError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;
