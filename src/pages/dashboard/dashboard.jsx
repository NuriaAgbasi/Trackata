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
    <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Overview of your business performance
        </p>
      </header>
      <main>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Cards
            title="Total Products"
            cardContent={items.length}
            icon={<MdOutlineShoppingBag className="w-8 h-8" />}
          />
          <Cards
            title="Total Profit"
            cardContent={`N${totalProfit.toFixed(2)}`}
            icon={<GiProfit className="w-8 h-8" />}
          />
          <Cards
            title="Total Capital"
            cardContent={`N${totalCapital.toFixed(2)}`}
            icon={<TbMoneybag className="w-8 h-8" />}
          />
          <Cards
            title="Total Sales"
            cardContent={totalSales}
            icon={<MdOutlineAttachMoney className="w-8 h-8" />}
          />
        </section>
        <section className="">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
            <div className="rounded-lg overflow-hidden">
              <ProfitChart />
            </div>
          </div>
        </section>
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
            <MostSoldProduct />
          </div>
        </section>
      </main>
    </Background>
  );
}

export default Dashboard;
