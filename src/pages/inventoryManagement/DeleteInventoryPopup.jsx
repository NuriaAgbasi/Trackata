import React from "react";

const DeletedInventoryPopup = ({ deletedInventory, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
              <h5 className="mb-6 mt-10 ml-40 text-xl font-medium text-primary">
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
