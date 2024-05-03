import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../pages/sideBarFolder/sideBar/sideBar";
import Sales from "../pages/sales/sales";
import HomePage from "../pages/home/homePage";
import Orders from "../pages/orders/order";
import Inventory from "../pages/inventoryManagement/Inventory";
import SideBar from "../pages/sideBarFolder/sideBar/sideBar";
import Teams from "../pages/teams";
import Profile from "../pages/profile";
import useTodoState from "../components/useTodoState";
import TodoList from "../pages/addStock/todoList";
import AddStock from "../pages/addStock/addStock";

//TODO: The first page a users should see is a Login/Signup page
const App = () => {
  const { todos, NumberofStock, price, removeTodo } = useTodoState();
  return (
    <>
      <Router>
        <SideBar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<TodoList
              todos={todos}
              removeTodo={removeTodo}
              NumberofStock={NumberofStock}
              Price={price}
            />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </SideBar>
      </Router>
    </>
  )
};

export default App;
