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
    <Background>
      <h4 className="mb-2 mt-0 text-2xl text-white font-medium leading-tight">
        Orders Log
      </h4>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="mb-4 justify-between flex">
                <input
                  type="text"
                  placeholder="Search by product name or date..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="bg-blue input input-bordered w-full "
                />
                <button
                  onClick={handleSearch}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  Search
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-red-500 transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-red-600 focus:bg-red-700 focus:shadow-red-600 focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-red-700 motion-reduce:transition-none"
                >
                  Clear Logs
                </button>
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
              <div className="max-h-[695px] overflow-y-auto">
                {Object.keys(groupedSalesLog)
                  .sort(
                    (a, b) =>
                      getFullDateTime(b, groupedSalesLog[b][0].time) -
                      getFullDateTime(a, groupedSalesLog[a][0].time)
                  )
                  .map((date, dateIndex) => (
                    <React.Fragment key={dateIndex}>
                      <h2 className="text-lg text-white font-medium mb-2 mt-4">
                        {date}
                      </h2>
                      <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                        <thead className="border-b text-white border-neutral-200 font-medium dark:border-white/10">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              Order Id
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Time
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Customer
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-4">
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
                                className="border-b text-white border-neutral-200 dark:border-white/10"
                              >
                                <td className="px-6 py-4">{index}</td>
                                <td className="px-6 py-4">{sale.time}</td>
                                <td className="px-6 py-4">{sale.customer}</td>
                                <td className="px-6 py-4">{sale.quantity}</td>
                                <td className="px-6 py-4">{sale.product}</td>
                                <td className="px-6 py-4">
                                  {sale.price || defaultPrices[sale.product]}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default Orders;
