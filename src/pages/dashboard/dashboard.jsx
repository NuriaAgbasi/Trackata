import React, { useState } from "react";
import Background from "../../components/background";
import Cards from "./cards";
import Inventorystate from "../inventoryManagement/inventorystate";
import { MdOutlineShoppingBag } from "react-icons/md";

function Dashboard() {
  const { items } = Inventorystate();

  return (
    <div>
      <Background>
        <h1>Dashboard</h1>
        <div className="flex space-x-4">
          <Cards title="Total Products" cardContent={items.length}>
            <MdOutlineShoppingBag />
          </Cards>
          <Cards titlecontent="Total Products" />
          <Cards titlecontent="Total Products" />
        </div>
        <div></div>
      </Background>
    </div>
  );
}

export default Dashboard;
