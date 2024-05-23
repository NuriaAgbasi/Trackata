import React from "react";
import InventoryForm from "./inventoryForm";
import InventoryTable from "./inventoryTable.jsx";
import { CiSquarePlus } from "react-icons/ci";
import Background from "../../components/background.jsx";
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
      <Background>
        <div className="flex justify-between">
          <h4 className="text-blue-gray-50 mb-2 mt-0 text-2xl font-medium leading-tight ">
            Inventory Page
          </h4>
          <button
            type="button"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            onClick={() => setAddStockPopup(true)}
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            <div className="flex">
              <CiSquarePlus />
              Add New Item
            </div>
          </button>
        </div>
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
