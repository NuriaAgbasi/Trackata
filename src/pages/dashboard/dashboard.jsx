import React from "react";
import Background from "../../components/background";
import Cards from "./cards";
import Inventorystate from "../inventoryManagement/inventorystate";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";

function Dashboard() {
  const { items, calculateTotalProfit, calculateTotalCapital } =
    Inventorystate();

  const totalProfit = calculateTotalProfit();
  const totalCapital = calculateTotalCapital();

  return (
    <div>
      <Background>
        <h1 className="text-4xl font-extrabold dark:text-white">Dashboard</h1>
        <div className="flex space-x-4">
          <Cards title="Total Products" cardContent={items.length}>
            <MdOutlineShoppingBag />
          </Cards>
          <Cards
            title="Total Profit"
            cardContent={`N${totalProfit.toFixed(2)}`}
          >
            <GiProfit />
          </Cards>
          <Cards
            title="Total Capital"
            cardContent={`N${totalCapital.toFixed(2)}`}
          >
            <TbMoneybag />
          </Cards>
        </div>
        <div></div>
      </Background>
    </div>
  );
}

export default Dashboard;
