import React, { useState } from "react";
import { useNavigate } from "react-router";
import Hello from "../pages/hello";
import ReusableCreate from "../components/Create/reusablecreate";

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
      navigate("/hello", { state: { username: formData.username } });
    }
  };

  return (
    <div>
      {registrationSuccess ? (
        <div>
          <Hello username={formData.username} />
        </div>
      ) : (
        <ReusableCreate
          name="User"
          formData={formData}
          error={error}
          handleInputChange={handleInputChange}
          handleRegistration={handleRegistration}
          username={formData.username} // Pass username here
        />
      )}
    </div>
  );
};

export default CreateUser;
