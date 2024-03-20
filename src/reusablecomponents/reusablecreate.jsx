import React from "react";
import "../styling/Create.css";
import MyImg from "../image/4c6cf289-374c-44ad-9776-80d0d589604b.jpeg";

const ReusableCreate = ({
  name,
  formData,
  error,
  handleInputChange,
  handleRegistration,
}) => {
  return (
    <div className={`All ${error ? "error-active" : ""}`}>
      <div className="both">
        <div className="All">
          <div className="stocks-create">
            <h3 id="Stocks">Stocks</h3>
            <h1 id="create-name">Create a {name}</h1>
          </div>
          <div className="inputs">
            <div className="allinputs">
              <input
                type="text"
                name="username"
                placeholder={`${name}Name`}
                value={formData.username}
                onChange={handleInputChange}
                id="username"
              />

              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleInputChange}
                id="email"
              />

              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleInputChange}
                id="password"
              />

              <input
                type="password"
                name="reEnterPassword"
                placeholder="Re-enter password"
                value={formData.reEnterPassword}
                onChange={handleInputChange}
                id="reEnterPassword"
              />
            </div>

            {error && <p id="error">{error}</p>}
          </div>
          <hr />
          <div className="terms-of-service-container">
            <p className="terms-of-service">
              By creating an account, you agree to our terms of use and privacy
              Notice
            </p>
          </div>
          <hr />
          <div className="login-container">
            <p className="login-p">
              Already have an account?{" "}
              <a id="login-a" href="/">
                Login
              </a>
            </p>
          </div>

          <button onClick={handleRegistration} className="Continue">
            Continue
          </button>
        </div>
        <div className="image-container">
          <img id="image" src={MyImg} alt="People working" />
        </div>
      </div>
    </div>
  );
};

export default ReusableCreate;
