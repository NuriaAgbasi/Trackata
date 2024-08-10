import React, { useState } from "react";
import ThankYouForVerifying from "../../pages/thankYouForVerifying";
import "./enterCode.css";

const EnterCode = () => {
  const [numberValues, setNumberValues] = useState(["", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = (e) => {
    e.preventDefault();
    setIsVerified(true);
  };

  const handleInputChange = (index, value) => {
    let numericValue = value.replace(/\D/g, "");
    numericValue = numericValue.slice(0, 1);
    const newNumberValues = [...numberValues];
    newNumberValues[index] = numericValue;
    setNumberValues(newNumberValues);
  };

  return (
    <div>
      {isVerified ? (
        <ThankYouForVerifying />
      ) : (
        <form onSubmit={handleVerification} className="enter-code2">
          <div>
            <h2 className="h2">Verify Your Email</h2>
          </div>
          <label className="enter-code-label">
            Enter your verification code
          </label>
          <div className="input-container">
            {numberValues &&
              numberValues.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  minLength="1"
                  maxLength="1"
                  name={`numericInput${index}`}
                  value={value}
                  x
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  required
                  className="verification-input"
                />
              ))}
          </div>
          <button type="submit" className="button">
            Verify
          </button>
        </form>
      )}
    </div>
  );
};

export default EnterCode;
