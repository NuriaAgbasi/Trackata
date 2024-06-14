import React from "react";
import InventoryForm from "./inventoryForm.tsx";
import InventoryTable from "./inventoryTable.jsx";
import { CiSquarePlus } from "react-icons/ci";
import Background from "../../components/background.tsx";
import Inventorystate from "./inventorystate.jsx";

function Inventory() {
  const {
    setAddStockPopup,
    addStockpop,
    handleAddItem,
    handleClosePopup,
    items,
    setItems,
    handleRemoveStock,
    handleEditStock,
  } = Inventorystate();
  return (
    <div>
      <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Inventory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Overview of your Inventory
          </p>
        </header>
        <button
          type="button"
          data-twe-ripple-init
          data-twe-ripple-color="light"
          onClick={() => setAddStockPopup(true)}
          className="inline-block mb-5 bg-teal-300 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        >
          <div className="flex">
            <CiSquarePlus />
            Add New Item
          </div>
        </button>
        <br />
        {addStockpop && (
          <div
            style={{
              position: "absolute",
              zIndex: 9999,
            }}
          >
            <div>
              <InventoryForm
                onAddItem={handleAddItem}
                handleClosePopup={handleClosePopup}
              />
            </div>
          </div>
        )}
        <InventoryTable
          items={items}
          setItems={setItems}
          onRemoveStock={handleRemoveStock}
          onEditStock={handleEditStock}
        />
      </Background>
    </div>
  );
}

export default Inventory;
