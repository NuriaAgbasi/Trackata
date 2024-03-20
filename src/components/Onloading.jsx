import React from "react";
import "../styling/Onloading.css";
import ReusableOnloading from "../reusablecomponents/rusableonloading";
import CreateTeam from "./CreateTeam";

const Onloading = () => {
  return (
    <div>
      <ReusableOnloading
        content={
          <div className="loading-screen">
            <div className="secured">
              <h1>Stocks</h1>
              <p>Your business secured...</p>
            </div>
            <p id="secured">Secured by stocks</p>
          </div>
        }
        time={1000}
      >
        <div>
          <CreateTeam />
        </div>
      </ReusableOnloading>
    </div>
  );
};

export default Onloading;
