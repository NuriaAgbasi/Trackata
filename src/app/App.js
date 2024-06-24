import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sales from "../pages/sales/sales";
import HomePage from "../pages/home/homePage";
import Orders from "../pages/orders/order";
import Inventory from "../pages/inventoryManagement/Inventory";
import SideBar from "../pages/sideBarFolder/sideBar/sideBar";
import Profile from "../pages/profile";
import Dashboard from "../pages/dashboard/dashboard";
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../pages/ProtectedRoute';
import SignUp from '../pages/SignUp';
import SettingsPage from '../pages/SettingsPage'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<MainRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const MainRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <SideBar>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute> <SettingsPage /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </SideBar>
  ) : (
    <Navigate to="/signup" />
  );
};

export default App;
