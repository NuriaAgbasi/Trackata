import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import sideBarData from "./sideBarData";
import { useAuth } from "../../../contexts/AuthContext";

function Sidebar({ isOpen, toggleSidebar }) {
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && e.target.closest(".sidebar") === null) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white text-black border-r z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto sidebar`}
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold mb-4"></h2>
          <div className="mb-6">
            <p className="text-md font-bold text-black bg-teal-50 p-2 rounded-md shadow-md shadow-black">
              {user ? `Welcome, ${user.teamName}!` : "Welcome, Guest!"}
            </p>
          </div>
          <ul className="space-y-2">
            {sideBarData.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center py-2 px-4 rounded-md transition-colors duration-300 bg-teal-200"
                      : "flex items-center py-2 px-4 rounded-md transition-colors duration-300"
                  }
                >
                  <div className="mr-3">{item.icon}</div>
                  <span className="text-sm">{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={logout}
          className="mt-6 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
