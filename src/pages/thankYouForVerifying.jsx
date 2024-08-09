import React from "react";
import ReusableVerify from "../components/Verify/reusableVerify";
import CreateUser from "../pages/createUser";
import { BrowserRouter } from "react-router-dom";

const ThankYouForVerifying = () => {
  const handleVerification = () => {
    console.log("Thank you for verifying");
  };

  return (
    <BrowserRouter>
      <div>
        <ReusableVerify
          buttonText="Click to Continue"
          title="Verified!!"
          message="Yahoo! You have successfully verified your account."
          onVerification={handleVerification}
          content={<CreateUser />}
        />
      </div>
    </BrowserRouter>
  );
};

export default ThankYouForVerifying;
