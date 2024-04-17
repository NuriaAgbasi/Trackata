import React, { useState } from "react";
import "./verify.css";

const ReusableVerify = ({
  buttonText,
  title,
  message,
  verificationContent,
  content,
}) => {
  const [ifButtonClicked, setIfButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIfButtonClicked(true);
  };

  return (
    <div>
      {ifButtonClicked ? (
        verificationContent ? (
          verificationContent
        ) : (
          content
        )
      ) : (
        <div className="verify-container">
          <h2>{title}</h2>
          <p>{message}</p>
          <button onClick={handleButtonClick}>{buttonText}</button>
        </div>
      )}
    </div>
  );
};

export default ReusableVerify;
