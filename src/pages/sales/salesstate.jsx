import { useState, useEffect } from "react";
import Inventorystate from "../inventoryManagement/inventorystate.jsx";
import useLocalStorage from "../../components/localStorage.ts";

function Salesstate() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [salesLog, setSalesLog] = useLocalStorage("salesLog", []);
  const { items, setItems } = Inventorystate();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (items.length > 0) {
      setSelectedProduct(items[0].name);
      const product = items.find((item) => item.name === items[0].name);
      setPrice(product ? product.price : 0);
    }
  }, [items]);

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
    if (!quantitySold || parseInt(quantitySold) <= 0) {
      setError("Please input a valid quantity of the product");
      return;
    }
    const remainingStock = product.stock - parseInt(quantitySold);
    if (remainingStock < 0) {
      setError(
        `The number of stock for the "${product.name}" product is ${product.stock}.`
      );
      return;
    }

    const priceToUse = price || product.price;
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
      price: priceToUse,
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

  const calculateDailyProfits = () => {
    const profits = {};

    salesLog.forEach((sale) => {
      const saleDate = sale.date;
      const saleProfit = sale.price * sale.quantity;

      if (isNaN(saleProfit)) {
        console.log("Invalid sale data for date", saleDate, ":", sale);
      }

      if (!profits[saleDate]) {
        profits[saleDate] = 0;
      }
      profits[saleDate] += saleProfit;
    });

    console.log("Daily Profits:", profits);

    return Object.entries(profits).map(([date, profit]) => ({
      date,
      profit,
    }));
  };

  const getTotalSales = () => {
    return salesLog.length;
  };

  const getTopFourProfitableProducts = () => {
    const productProfits = {};

    salesLog.forEach((sale) => {
      const saleProfit = sale.price * sale.quantity;

      if (!productProfits[sale.product]) {
        productProfits[sale.product] = 0;
      }
      productProfits[sale.product] += saleProfit;
    });

    const sortedProducts = Object.entries(productProfits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return sortedProducts.map(([product, profit]) => ({ product, profit }));
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
    price,
    setPrice,
    calculateDailyProfits,
    getTotalSales,
    getTopFourProfitableProducts,
  };
}

export default Salesstate;
