import React from "react";
import ReusableOnloading from "../components/rusableonloading";
import "../pages/onLoading/onLoading.css";
import SideBar from "../pages/sideBarFolder/sideBar/sideBar";

const Hello = ({ username }) => {
  return (
    <div>
      <ReusableOnloading
        content={
          <div className="loading-screen">
            <div className="secured">
              <h1>Hello {username}!</h1>
              <p>Welcome to Stocks</p>
            </div>
          </div>
        }
        time={2000}
      >
        <SideBar />
      </ReusableOnloading>
    </div>
  );
};

export default Hello;
