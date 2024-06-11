import React from "react";
import Background from "../../components/background.tsx";
import Cards from "./cards";
import Inventorystate from "../inventoryManagement/inventorystate.jsx";
import { MdOutlineShoppingBag, MdOutlineAttachMoney } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import ProfitChart from "./linechart/linechart.js";
import Salesstate from "../sales/salesstate.jsx";
import MostSoldProduct from "./mostsoldproduct.jsx";

function Dashboard() {
  const { items, calculateTotalProfit, calculateTotalCapital } =
    Inventorystate();
  const { getTotalSales } = Salesstate();
  const totalProfit = calculateTotalProfit();
  const totalCapital = calculateTotalCapital();

  const totalSales = getTotalSales();

  return (
    <Background>
      <h1 className="text-4xl font-extrabold dark:text-white">Dashboard</h1>
      <div className="flex space-x-4">
        <Cards title="Total Products" cardContent={items.length}>
          <MdOutlineShoppingBag />
        </Cards>
        <Cards title="Total Profit" cardContent={`N${totalProfit.toFixed(2)}`}>
          <GiProfit />
        </Cards>
        <Cards
          title="Total Capital"
          cardContent={`N${totalCapital.toFixed(2)}`}
        >
          <TbMoneybag />
        </Cards>
        <Cards title="Total Sales" cardContent={totalSales}>
          <MdOutlineAttachMoney />
        </Cards>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2 rounded-lg shadow-md m-2">
          <div className="rounded-lg overflow-hidden">
            <ProfitChart />
          </div>
        </div>
        <div className="w-1/2 rounded-lg shadow-md m-2 p-4 bg-white dark:bg-gray-800">
          <MostSoldProduct />
        </div>
      </div>
    </Background>
  );
}

export default Dashboard;
