import React, { useState } from "react";
import PleaseVerifyEmail from "./pleaseverifyemail";
import ReusableCreate from "../reusablecomponents/reusablecreate";

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = () => {
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
      {registrationSuccess ? (
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
