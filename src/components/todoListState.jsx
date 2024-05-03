import React, { useState } from "react";
import useTodoState from "./useTodoState.jsx";

const TodoListState = ({
  todos,
  removeTodo,
  NumberofStock,
  Price,
  children,
}) => {
  const { setPrice, setNumberofStock } = useTodoState();
  const [editPopup, setEditPopup] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedStock, setEditedStock] = useState("");
  const [restockAmount, setRestockAmount] = useState("");
  const [salesPopup, setSalesPopup] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [salesLog, setSalesLog] = useState([]);

  const openEditPopup = (todo) => {
    const stockItem = NumberofStock.find((stock) => stock.id === todo.id);
    const PriceofItem = Price.find((stock) => stock.id === todo.id);
    setEditedName(todo.text);
    setEditedPrice(PriceofItem ? PriceofItem.text : "");
    setEditedStock(stockItem ? stockItem.text : "");
    setEditPopup(todo.id);
  };

  const handleRestock = () => {
    const amount = parseInt(restockAmount);
    if (!isNaN(amount)) {
      const updatedStock = NumberofStock.map((stock) => {
        if (stock.id === editPopup) {
          return { ...stock, text: (parseInt(stock.text) + amount).toString() };
        }
        return stock;
      });
      const updatedPrice = Price.map((stock) => {
        if (stock.id === editPopup) {
          return { ...stock, text: editedPrice };
        }
        return stock;
      });
      setNumberofStock(updatedStock);
      setPrice(updatedPrice);
      setRestockAmount("");
      closeEditPopup();
    }
  };

  const openSoldPopup = (todo) => {
    const stockItem = NumberofStock.find((stock) => stock.id === todo.id);
    setEditedName(todo.text);
    setEditedStock(stockItem ? stockItem.text : "");
    setSelectedItemId(todo.id);
    setSalesPopup(true);
  };

  const handleSales = (salesAmount) => {
    const selectedItem = todos.find((todo) => todo.id === selectedItemId);
    const updatedStock = NumberofStock.map((stock) => {
      if (stock.id === selectedItemId) {
        return {
          ...stock,
          text: (parseInt(stock.text) - salesAmount).toString(),
        };
      }
      return stock;
    });

    // Update sales log
    const newSalesLogEntry = {
      itemName: selectedItem.text,
      quantitySold: salesAmount,
      timestamp: new Date().toLocaleString(), // Current timestamp
    };
    setSalesLog([...salesLog, newSalesLogEntry]);

    // Update stock
    setNumberofStock(updatedStock);
    setSalesPopup(false);
  };

  const closeEditPopup = () => {
    setEditPopup(null);
  };

  const closeSalesPopup = () => {
    setSalesPopup(false);
  };

  return (
    <>
      {children({
        todos,
        removeTodo,
        NumberofStock,
        Price,
        editPopup,
        editedName,
        editedPrice,
        editedStock,
        restockAmount,
        salesPopup,
        setEditedPrice,
        selectedItemId,
        salesLog,
        openEditPopup,
        handleRestock,
        openSoldPopup,
        handleSales,
        setRestockAmount,
        closeEditPopup,
        closeSalesPopup,
      })}
    </>
  );
};

export default TodoListState;
