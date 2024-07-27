import React, { useState, useEffect, useCallback } from "react";
import supabase from "../../config/supabaseClient";
import Background from "../../components/background.tsx";
import ClearLogsModal from "./clearlogsmodal.tsx";

function Orders() {
  const [salesLog, setSalesLog] = useState([]);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSalesLog, setFilteredSalesLog] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [clearError, setClearError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSales();
    fetchItems();
  }, []);

  const fetchSales = async () => {
    const { data, error } = await supabase.from("sales").select("*");
    if (error) {
      console.error("Error fetching sales:", error);
    } else {
      setSalesLog(data);
      setFilteredSalesLog(data);
    }
  };

  const fetchItems = async () => {
    const { data, error } = await supabase.from("inventory").select("*");
    if (error) {
      console.error("Error fetching items:", error);
    } else {
      setItems(data);
    }
  };

  const filterSalesLog = useCallback(() => {
    const filteredSales = salesLog.filter(
      (sale) =>
        (sale.product &&
          sale.product.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sale.date && sale.date.includes(searchQuery))
    );

    if (filteredSales.length === 0) {
      setSearchError("No matching entries found.");
    } else {
      setSearchError("");
    }

    setFilteredSalesLog(filteredSales);
  }, [salesLog, searchQuery]);

  const handleSearch = () => {
    filterSalesLog();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearLogs = async (clearByDate, clearPassword) => {
    const correctPassword = "yourpassword";
    if (clearPassword !== correctPassword) {
      setClearError("Incorrect password.");
      return;
    }

    const date = new Date(clearByDate);

    if (isNaN(date)) {
      setClearError("Invalid date format.");
      return;
    }

    const { data, error } = await supabase
      .from("sales")
      .delete()
      .eq("date", clearByDate);

    if (error) {
      console.error("Error clearing logs:", error);
      setClearError("Error clearing logs.");
    } else {
      setSalesLog((prevSalesLog) =>
        prevSalesLog.filter((sale) => sale.date !== clearByDate)
      );
      setClearError("");
      setShowModal(false);
    }
  };

  useEffect(() => {
    filterSalesLog();
  }, [salesLog, filterSalesLog]);

  const getFullDateTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };

  return (
    <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <header className="mb-8 sm:mb-12 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Sales History
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-2">
          Keeping Track of your success
        </p>
      </header>
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center w-full">
            <input
              type="text"
              placeholder="Search by product name or date..."
              value={searchQuery}
              onChange={handleInputChange}
              className="bg-white mb-2 sm:mb-0 sm:mr-4 input input-bordered w-full sm:flex-grow"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSearch}
                className="bg-teal-400 rounded px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600"
              >
                Search
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-600 rounded px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-red-500 transition duration-150 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-800"
              >
                Clear Logs
              </button>
            </div>
          </div>
          {searchError && (
            <div className="text-red-500 mb-4">{searchError}</div>
          )}
          <ClearLogsModal
            showModal={showModal}
            setShowModal={setShowModal}
            handleClearLogs={handleClearLogs}
            clearError={clearError}
          />
          <div className="overflow-y-auto max-h-96">
            {Object.keys(
              filteredSalesLog.reduce((acc, sale) => {
                const date = sale.created_at.split("T")[0];
                acc[date] = acc[date] || [];
                acc[date].push(sale);
                return acc;
              }, {})
            )
              .sort(
                (a, b) =>
                  getFullDateTime(
                    b,
                    filteredSalesLog[0].created_at.split("T")[1]
                  ) -
                  getFullDateTime(
                    a,
                    filteredSalesLog[0].created_at.split("T")[1]
                  )
              )
              .map((date, dateIndex) => (
                <React.Fragment key={dateIndex}>
                  <h2 className="text-lg text-gray-900 dark:text-white font-medium mb-2 mt-4">
                    {date}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-xs font-light text-gray-900 dark:text-white">
                      <thead className="border-b border-gray-200 dark:border-gray-700 font-medium">
                        <tr>
                          <th scope="col" className="px-4 py-2">
                            Order Id
                          </th>
                          <th scope="col" className="px-4 py-2">
                            Time
                          </th>
                          <th scope="col" className="px-4 py-2">
                            Customer
                          </th>
                          <th scope="col" className="px-4 py-2">
                            Quantity
                          </th>
                          <th scope="col" className="px-4 py-2">
                            Product
                          </th>
                          <th scope="col" className="px-4 py-2">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSalesLog
                          .filter(
                            (sale) => sale.created_at.split("T")[0] === date
                          )
                          .map((sale, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200 dark:border-gray-700"
                            >
                              <td className="px-4 py-2">{sale.id}</td>
                              <td className="px-4 py-2">
                                {sale.created_at.split("T")[1]}
                              </td>
                              <td className="px-4 py-2">
                                {sale.customer_name}
                              </td>
                              <td className="px-4 py-2">{sale.quantity}</td>
                              <td className="px-4 py-2">{sale.product_id}</td>
                              <td className="px-4 py-2">{sale.price}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </Background>
  );
}

export default Orders;
