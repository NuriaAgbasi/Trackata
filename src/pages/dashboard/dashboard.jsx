import React from "react";
import Background from "../../components/background.tsx";
import Cards from "./cards";
import Inventorystate from "../inventoryManagement/inventorystate.jsx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import LineChart from "./linechart/linechart.tsx";

function Dashboard() {
  const { items, calculateTotalProfit, calculateTotalCapital } =
    Inventorystate();

  const totalProfit = calculateTotalProfit();
  const totalCapital = calculateTotalCapital();

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
      </div>
      <div className="mt-8 w-1/2">
        {" "}
        <LineChart />
      </div>
    </Background>
  );
}

export default Dashboard;
