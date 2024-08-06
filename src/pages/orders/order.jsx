import React, { useState, useEffect, useCallback } from "react";
import supabase from "../../config/supabaseClient";
import Background from "../../components/background.tsx";
import ClearLogsModal from "./clearlogsmodal.tsx";

const Order = () => {
  const [sales, setSales] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchSales = async () => {
      const { data, error } = await supabase
        .from("sales")
        .select("created_at, id, customer_name, quantity, product_id, price")
        .order(sortConfig.key, {
          ascending: sortConfig.direction === "ascending",
        });

      if (error) {
        console.error("Error fetching sales data:", error);
      } else {
        setSales(data);
      }
    };

    fetchSales();
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className=" p-4">
        <h2 className="text-2xl font-bold mb-4">Sales Data</h2>
        <div className=" w-80 overflow-x-auto sm:w-full">
          <table className=" bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th
                  className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                  onClick={() => requestSort("created_at")}
                >
                  Created At
                  {sortConfig.key === "created_at"
                    ? sortConfig.direction === "ascending"
                      ? " 🔼"
                      : " 🔽"
                    : ""}
                </th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Customer Name</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Product ID</th>
                <th className="py-2 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{formatDate(sale.created_at)}</td>
                  <td className="py-2 px-4">{sale.id}</td>
                  <td className="py-2 px-4">{sale.customer_name}</td>
                  <td className="py-2 px-4">{sale.quantity}</td>
                  <td className="py-2 px-4">{sale.product_id}</td>
                  <td className="py-2 px-4">${sale.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Background>
  );
};

export default Order;
