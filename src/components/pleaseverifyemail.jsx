import React from "react";
import EnterCode from "./entercode";
import ReusableVerify from "../reusablecomponents/reusableverify";

const PleaseVerifyEmail = () => {
  const handleVerification = () => {
    console.log("Verifying email...");
  };

  return (
    <div>
      <ReusableVerify
        buttonText="Verify Email"
        title="Verify email"
        message="Thanks for signing up. We just need to verify your Email address."
        onVerification={handleVerification}
        content={<EnterCode />}
      />
    </div>
  );
};

export default PleaseVerifyEmail;
