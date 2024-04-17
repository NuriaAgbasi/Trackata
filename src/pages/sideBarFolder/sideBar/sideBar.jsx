import React, { useState } from "react";
import CreateUser from "../../createUser";
import Navbar from "../../../components/navbar";
const SideBar = ({ username }) => {
  const [logoutButton, setLogoutButton] = useState(false);

  const Logoutbutton = () => {
    return setLogoutButton(true);
  };

  return (
    <div className="">
      {logoutButton ? (
        <CreateUser />
      ) : (
        <div className="relative">
          <div className="">
            <Navbar />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
