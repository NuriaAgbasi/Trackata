import React, { useState } from "react";
import { FaBell, FaRegUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-indigo-400 text-white flex items-center justify-between px-4 py-2 transition-all duration-100 relative">
      <form className="relative w-full max-w-2xl mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoIosSearch className="text-black" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-neutral-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </form>
      <div className="flex items-center">
        <FaBell className="text-2xl mx-4 cursor-pointer" />
        <div className="relative">
          <IoIosArrowDown
            className="text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <FaRegUserCircle className="w-6 h-6 mr-2" />
                  User
                </div>
                <div className="font-medium truncate">user@gmail.com</div>
              </div>
              <hr />
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <a
                    href="/profile"
                    className="flex items-center  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <CiUser className="w-5 h-5 mr-2" />
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <FaCog className="w-5 h-5 mr-2" />
                    Account Settings
                  </a>
                </li>
              </ul>
              <hr />
              <div className="py-2">
                <a
                  href="/logout"
                  className="flex items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <FaSignOutAlt className="w-5 h-5 mr-2" />
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
