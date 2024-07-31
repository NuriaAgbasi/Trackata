import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sales from "../pages/sales/sales";
import HomePage from "../pages/home/homePage";
import Orders from "../pages/orders/order";
import Inventory from "../pages/inventoryManagement/Inventory";
import Sidebar from "../pages/sideBarFolder/sideBar/sideBar";
import Profile from "../pages/profile";
import Dashboard from "../pages/dashboard/dashboard";
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../pages/ProtectedRoute';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import SettingsPage from '../pages/SettingsPage';
import EditInventory from '../pages/inventoryManagement/EditInventory';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const MainRoutes = ({ isSidebarOpen }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
      <div className="flex h-screen">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1">
          <nav className="bg-teal-200 p-4 flex justify-between items-center">
            <div className="text-white">Trackata</div>
            <button
              onClick={toggleSidebar}
              className="text-white md:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
              <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/inventoryManagement/edit/:id" element={<EditInventory />} />
            </Routes>
          </main>
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainRoutes isSidebarOpen={isSidebarOpen} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
