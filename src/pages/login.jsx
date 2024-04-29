import React, { useState } from "react";


// You should have a login page that takes in a username, and password
// When the user clicks continue, you should store the username and password in the state
// you should have a signup page that takes in a username, email, and password
// users should be able to navigate between the login and signup page
const Login = ({ onContinue }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    onContinue(formData);
  };

  return (
    <div>
      <h1>Create User</h1>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default Login;
