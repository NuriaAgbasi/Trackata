import React, { useEffect, useState } from "react";
import PleaseVerifyEmail from "../pages/pleaseVerifyEmail";
import ReusableCreate from "../components/Create/reusablecreate";
// import Cookies from "js-cookie";
import SideBar from "./sideBarFolder/sideBar/sideBar";

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [visited, setVisited] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // useEffect(() => {
  //   const checkCookie = () => {
  //     if (Cookies.get()) {
  //       setVisited(true);
  //     }
  //   };
  //   checkCookie();
  // }, []);
  const handleRegistration = () => {
    // Cookies.set(formData.username, formData.password);
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.reEnterPassword
    ) {
      setError("Please fill in all fields.");
    } else if (formData.password !== formData.reEnterPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      setRegistrationSuccess(true);
    }
  };

  return (
    <div>
      {visited ? (
        <SideBar />
      ) : registrationSuccess ? (
        <PleaseVerifyEmail />
      ) : (
        <ReusableCreate
          name="Team"
          formData={formData}
          error={error}
          handleInputChange={handleInputChange}
          handleRegistration={handleRegistration}
        />
      )}
    </div>
  );
};

export default CreateTeam;
