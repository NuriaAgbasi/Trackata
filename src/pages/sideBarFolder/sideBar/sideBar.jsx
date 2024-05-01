import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import sideBarData from "./sideBarData";
import "./sideBar.css";
import Footer from "../../home/footer";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="flex">
        <div
          style={{ width: isOpen ? "200px" : "50px" }}
          className="bg-black text-white h-screen w-48 transition-all duration-100"
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
              className="flex text-2xl ml-12"
            >
              <FaBars onClick={toggle} />
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
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Sidebar;
