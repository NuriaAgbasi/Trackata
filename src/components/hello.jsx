import React from "react";
import ReusableOnloading from "../reusablecomponents/rusableonloading";
import "../styling/Onloading.css";
import SideNav from "./sidebar/sidebar";

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
        <SideNav />
      </ReusableOnloading>
    </div>
  );
};

export default Hello;
