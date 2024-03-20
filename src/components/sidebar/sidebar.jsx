import React, { useState } from "react";
import "../../styling/sidebar.css";
import SideBarLink from "./sidebarlink";
import Home from "./home";
import AddStock from "./AddStock";
import Settings from "./Settings";
import Image from "../../image/download.jpeg";
import StockInsights from "./Stockinsights";

const SideBar = ({ username }) => {
  const [selectedNav, setSelectedNav] = useState("home");
  const [logoutButton, setLogoutButton] = useState(false);

  const Logoutbutton = () => {
    return setLogoutButton(true);
  };

  function handleSelect(selectedButton) {
    setSelectedNav(selectedButton.toLowerCase());
  }

  let selectedContent = <p>Loading...</p>;
  switch (selectedNav) {
    case "home":
      selectedContent = <Home />;
      break;
    case "addstock":
      selectedContent = <AddStock />;
      break;
    case "stockinsights":
      selectedContent = <StockInsights />;
      break;
    case "settings":
      selectedContent = <Settings />;
      break;
    default:
      selectedContent = <p>Content not found</p>;
  }

  return (
    <div>
      {logoutButton ? (
        "HI"
      ) : (
        <div className="sidenav">
          <div id="heading">Stocks</div>
          <div id="Username">
            <img src={Image} alt="default" id="image" />
            <p> hi {username}</p>
          </div>
          <div id="Link">
            <SideBarLink
              isSelected={selectedNav === "home"}
              onSelect={() => handleSelect("home")}
            >
              Home
            </SideBarLink>
            <SideBarLink
              isSelected={selectedNav === "addstock"}
              onSelect={() => handleSelect("addstock")}
            >
              <div id="text"> Add Stock</div>
            </SideBarLink>
            <SideBarLink
              isSelected={selectedNav === "stockinsights"}
              onSelect={() => handleSelect("stockinsights")}
            >
              Stock Insights
            </SideBarLink>
            <SideBarLink
              isSelected={selectedNav === "settings"}
              onSelect={() => handleSelect("settings")}
            >
              Settings
            </SideBarLink>
          </div>
          <menu id="selectedContent">{selectedContent}</menu>
          <button onClick={Logoutbutton} id="Logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
