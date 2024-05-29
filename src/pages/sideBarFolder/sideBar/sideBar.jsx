import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import sideBarData from "./sideBarData";
import Footer from "../../home/footer";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "./navbar";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex">
        <div
          className={`bg-indigo-600 text-white h-screen transition-all duration-100 ${
            isOpen ? "w-48" : "w-12"
          }`}
        >
          <div className="flex items-center py-5 px-4">
            <h1 className={`text-3xl ${isOpen ? "block" : "hidden"}`}>
              Stocks
            </h1>
            <div
              className={`flex text-2xl ${
                isOpen ? "ml-12" : "ml-0"
              } arrow-icon`}
            >
              <GiHamburgerMenu onClick={toggle} />
            </div>
          </div>
          {sideBarData.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="flex items-center text-white py-2 px-3 gap-4 transition-all duration-500 hover:bg-blue-300 hover:text-black no-underline"
              activeclassname="active"
            >
              <div className="text-base">{item.icon}</div>
              <div className={`text-base ${isOpen ? "block" : "hidden"}`}>
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="flex-grow">
          <Navbar isOpen={isOpen} />
          <main className="relative">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sidebar;
