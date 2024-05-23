import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sales from "../pages/sales/sales";
import HomePage from "../pages/home/homePage";
import Orders from "../pages/orders/order";
import Inventory from "../pages/inventoryManagement/Inventory";
import SideBar from "../pages/sideBarFolder/sideBar/sideBar";
import Teams from "../pages/teams";
import Profile from "../pages/profile";
import Dashboard from "../pages/dashboard/dashboard";


//TODO: The first page a users should see is a Login/Signup page
const App = () => {
  return (
    <>
      <Router>
        <SideBar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </SideBar>
      </Router>
    </>
  )
};

export default App;
