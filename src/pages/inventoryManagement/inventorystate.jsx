import { useState } from "react";
import useLocalStorage from "../../components/localStorage.ts";

function Inventorystate() {
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
    const updatedItems = [...items];
    updatedItems[index].stock = newStock;
    updatedItems[index].price = newPrice;
    console.log("Updated items:", updatedItems);

    setItems(updatedItems);
  };
  return {
    items,
    setItems,
    setAddStockPopup,
    addStockpop,
    handleEditStock,
    handleRemoveStock,
    handleAddItem,
    handleClosePopup,
  };
}

export default Inventorystate;
