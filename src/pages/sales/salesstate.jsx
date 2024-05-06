import { useState } from "react";
import Inventorystate from "../inventoryManagement/inventorystate";
import useLocalStorage from "../../components/localStorage.ts";

function Salesstate() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState(null);
  const [salesLog, setSalesLog] = useLocalStorage("salesLog", []);
  const { items, setItems } = Inventorystate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSellStock = () => {
    const product = items.find((item) => item.name === selectedProduct);

    if (!product) {
      setError(`Product "${selectedProduct}" not found.`);
      return;
    }

    if (!customerName) {
      setError("Input the customer name");
      return;
    }

    const remainingStock = product.stock - parseInt(quantitySold);
    if (remainingStock < 0) {
      setError(
        `The number of stock for the "${product.name}" product is ${product.stock}.`
      );
      return;
    }
    const updatedItems = items.map((item) =>
      item.name === selectedProduct ? { ...item, stock: remainingStock } : item
    );
    setItems(updatedItems);

    const saleDate = new Date();
    const saleTime = saleDate.toLocaleTimeString();
    const newSale = {
      date: saleDate.toLocaleDateString(),
      time: saleTime,
      product: selectedProduct,
      quantity: parseInt(quantitySold),
      customer: customerName,
    };
    setSalesLog([...salesLog, newSale]);

    setSelectedProduct("");
    setQuantitySold("");
    setCustomerName("");
    setError(null);
    setSuccessMessage("Sale has been initiated.");

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 10000);
    return () => clearTimeout(timer);
  };
  return {
    selectedProduct,
    setSelectedProduct,
    quantitySold,
    setQuantitySold,
    error,
    setError,
    salesLog,
    setSalesLog,
    successMessage,
    setSuccessMessage,
    customerName,
    setCustomerName,
    handleSellStock,
    items,
    setItems,
  };
}

export default Salesstate;
