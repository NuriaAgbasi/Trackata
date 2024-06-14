import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSignIn = () => {
    // Simulated authentication
    if (name === "admin" && password === "password") {
      localStorage.setItem("userLoggedIn", true);
      history.push("/create-team");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
