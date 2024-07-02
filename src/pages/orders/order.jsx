import React, { useState, useEffect, useCallback } from "react";
import Salesstate from "../sales/salesstate";
import Background from "../../components/background.tsx";
import ClearLogsModal from "./clearlogsmodal.tsx";

function Orders() {
  const { salesLog, items, setSalesLog } = Salesstate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSalesLog, setFilteredSalesLog] = useState(salesLog);
  const [searchError, setSearchError] = useState("");
  const [clearError, setClearError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const defaultPrices = items.reduce((acc, item) => {
    acc[item.name] = item.price;
    return acc;
  }, {});

  const groupedSalesLog = filteredSalesLog.reduce((acc, sale) => {
    const date = sale.date;
    acc[date] = acc[date] || [];
    acc[date].push(sale);
    return acc;
  }, {});

  const filterSalesLog = useCallback(() => {
    const filteredSales = salesLog.filter(
      (sale) =>
        sale.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.date === searchQuery
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

  const handleClearLogs = (clearByDate, clearPassword) => {
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

    const newSalesLog = salesLog.filter((sale) => new Date(sale.date) !== date);

    if (newSalesLog.length === salesLog.length) {
      setClearError("No logs found for the specified date.");
    } else {
      setSalesLog(newSalesLog);
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
        <div className="relative w-full max-w-sm sm:max-w-xl">
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
          <div className="overflow-y-auto">
            {Object.keys(groupedSalesLog)
              .sort(
                (a, b) =>
                  getFullDateTime(b, groupedSalesLog[b][0].time) -
                  getFullDateTime(a, groupedSalesLog[a][0].time)
              )
              .map((date, dateIndex) => (
                <React.Fragment key={dateIndex}>
                  <h2 className="text-lg text-gray-900 dark:text-white font-medium mb-2 mt-4">
                    {date}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light text-gray-900 dark:text-white">
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
                        {groupedSalesLog[date]
                          .sort(
                            (a, b) =>
                              getFullDateTime(b.date, b.time) -
                              getFullDateTime(a.date, a.time)
                          )
                          .map((sale, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200 dark:border-gray-700"
                            >
                              <td className="px-4 py-2">{index}</td>
                              <td className="px-4 py-2">{sale.time}</td>
                              <td className="px-4 py-2">{sale.customer}</td>
                              <td className="px-4 py-2">{sale.quantity}</td>
                              <td className="px-4 py-2">{sale.product}</td>
                              <td className="px-4 py-2">
                                {sale.price || defaultPrices[sale.product]}
                              </td>
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
