import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import sideBarData from "./sideBarData";
import { GiHamburgerMenu } from "react-icons/gi";
import Footer from "../../home/footer";
import Navbar from "./navbar";
import { useAuth } from "../../../contexts/AuthContext";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div
          className={`bg-white dark:bg-gray-800 ${
            isOpen ? "w-64" : isMobile ? "w-16" : "w-64"
          } transition-width duration-300 ease-in-out shadow-md`}
        >
          <div className="flex items-center justify-between p-4">
            <h1
              className={`text-xl font-bold ${
                isOpen || !isMobile
                  ? "text-gray-800 dark:text-white"
                  : "text-white"
              }`}
            >
              Stocks
            </h1>
            <div
              className="text-3xl cursor-pointer text-gray-800 dark:text-white"
              onClick={toggleSidebar}
            >
              <GiHamburgerMenu />
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-800 dark:text-white">
              {user ? `Welcome, ${user.teamName}!` : "Welcome, Guest!"}
            </p>
          </div>
          <nav>
            <ul className="text-gray-800 dark:text-white">
              {sideBarData.map((item, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={item.path}
                    className="flex items-center py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-200 dark:hover:bg-gray-700"
                    activeClassName="bg-blue-200 dark:bg-gray-700"
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span
                      className={`${
                        isOpen || !isMobile ? "block" : "hidden"
                      } text-sm`}
                    >
                      {item.title}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex-grow">
          <Navbar isOpen={isOpen} />
          {children}
        </div>
      </div>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      {isMobile && isOpen && (
        <div
          className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 w-64 transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } z-50 shadow-md`}
        >
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Stocks
            </h1>
            <div
              className="text-3xl cursor-pointer text-gray-800 dark:text-white"
              onClick={toggleSidebar}
            >
              <GiHamburgerMenu />
            </div>
          </div>
          <nav>
            <ul className="text-gray-800 dark:text-white">
              {sideBarData.map((item, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={item.path}
                    className="flex items-center py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-200 dark:hover:bg-gray-700"
                    activeClassName="bg-blue-200 dark:bg-gray-700"
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span className="text-sm">{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Sidebar;
