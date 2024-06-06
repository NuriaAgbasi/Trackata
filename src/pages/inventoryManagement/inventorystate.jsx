import { useState, useEffect } from "react";
import useLocalStorage from "../../components/localStorage.ts";
import { format, parseISO } from "date-fns";

function Inventorystate() {
  const [items, setItems] = useLocalStorage("inventoryItems", []);
  const [addStockpop, setAddStockPopup] = useState(false);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [error, setError] = useState("");

  const resetFields = () => {
    setName("");
    setStock("");
    setPrice("");
    setCostPrice("");
    setError("");
  };

  const handleClosePopup = () => {
    setAddStockPopup(false);
  };

  const handleAddItem = (newItem) => {
    const newItemWithDate = {
      ...newItem,
      createdAt: new Date().toISOString(),
    };
    setItems([...items, newItemWithDate]);
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

  const calculateProfit = () => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(price);

    if (isNaN(cp) || isNaN(sp)) {
      setError("Invalid cost price or sale price.");
      return;
    }

    if (cp > sp) {
      setError("Cost price is higher than sale price. No profit can be made.");
      return;
    }

    const profit = sp - cp;
    setError("");
    return profit;
  };

  const handleSaveItem = () => {
    const profit = calculateProfit();
    if (profit !== undefined) {
      const newItemWithDate = {
        name,
        stock: parseInt(stock, 10),
        price: parseFloat(price),
        costPrice: parseFloat(costPrice),
        profit,
        createdAt: new Date().toISOString(),
      };
      handleAddItem(newItemWithDate);
      resetFields();
      handleClosePopup();
    }
  };

  const calculateTotalProfit = () => {
    return items.reduce((total, item) => total + item.profit * item.stock, 0);
  };

  const calculateTotalCapital = () => {
    return items.reduce(
      (total, item) => total + item.costPrice * item.stock,
      0
    );
  };

  const calculateDailyProfits = () => {
    const profitsByDate = {};

    items.forEach((item) => {
      const date = format(parseISO(item.createdAt), "yyyy-MM-dd");
      const dailyProfit = item.profit * item.stock;
      if (profitsByDate[date]) {
        profitsByDate[date] += dailyProfit;
      } else {
        profitsByDate[date] = dailyProfit;
      }
    });

    return profitsByDate;
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
    name,
    setName,
    stock,
    setStock,
    price,
    setPrice,
    costPrice,
    setCostPrice,
    error,
    setError,
    resetFields,
    handleSaveItem,
    calculateTotalProfit,
    calculateTotalCapital,
    calculateDailyProfits,
  };
}

export default Inventorystate;
