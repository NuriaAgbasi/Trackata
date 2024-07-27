import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

const DeletedInventoryPopup = ({ onClose }) => {
  const [deletedInventory, setDeletedInventory] = useState([]);

  useEffect(() => {
    fetchDeletedItems();
  }, []);

  const fetchDeletedItems = async () => {
    const { data, error } = await supabase
      .from("deleted_inventory")
      .select("*");
    if (error) {
      console.error("Error fetching deleted items:", error);
    } else {
      setDeletedInventory(data);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <div className="max-w-xl w-full">
            <div className="bg-white p-10 rounded-md shadow-md">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 close inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:outline-none"
              >
                &times;
              </button>
              <h5 className="mb-6 mt-10 text-xl font-medium text-primary">
                Deleted Inventory
              </h5>
              <ol>
                {deletedInventory.length > 0 ? (
                  deletedInventory.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item.name} - {item.stock} - ${item.price}
                    </li>
                  ))
                ) : (
                  <li>No deleted inventory items.</li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletedInventoryPopup;
