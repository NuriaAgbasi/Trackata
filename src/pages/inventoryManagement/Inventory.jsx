import React, { useState } from "react";
import InventoryForm from "./inventoryForm";
import InventoryTable from "./inventoryTable.jsx";
import useLocalStorage from "../../components/localStorage.ts";
import { Button, Typography } from "@material-tailwind/react";
import { CiSquarePlus } from "react-icons/ci";

function Inventory() {
  const [items, setItems] = useLocalStorage("inventoryItems", []);
  const [addStockpop, setAddStockPopup] = useState(false);

  const handleClosePopup = () => {
    setAddStockPopup(false);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleRemoveStock = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleEditStock = (index, newStock, newPrice) => {
    console.log("Editing item at index:", index);
    console.log("New stock:", newStock);
    console.log("New price:", newPrice);

    const updatedItems = [...items];
    updatedItems[index].stock = newStock;
    updatedItems[index].price = newPrice;
    console.log("Updated items:", updatedItems);

    setItems(updatedItems);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Typography color="blue-gray" className="" variant="h4">
          Inventory Page
        </Typography>
        <Button onClick={() => setAddStockPopup(true)}>
          <div className="flex">
            <CiSquarePlus />
            Add New Item
          </div>
        </Button>
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
    </div>
  );
}

export default Inventory;
