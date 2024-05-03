import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import sideBarData from "./sideBarData";
import "./sideBar.css";
import Footer from "../../home/footer";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    const arrowIcon = document.querySelector(".arrow-icon");
    arrowIcon.classList.toggle("rotate-180");
  };
  return (
    <>
      <div className="flex">
        <div
          style={{ width: isOpen ? "200px" : "50px" }}
          className=" bg-indigo-600 text-white h-screen w-48 transition-all duration-100"
        >
          <div className="flex items-center py-5 px-4">
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className="text-3xl"
            >
              Stocks
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="flex text-2xl ml-12 transition-transform transform rotate-0 arrow-icon "
            >
              <IoIosArrowDropleftCircle onClick={toggle} />
            </div>
          </div>
          {sideBarData.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link flex items-center text-white py-2 px-3 gap-4 transition-all duration-500 hover:bg-lightskyblue hover:text-black"
              activeclassName="active"
            >
              <div className="text-base">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className=" text-base"
              >
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
        <main className="relative">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Sidebar;
