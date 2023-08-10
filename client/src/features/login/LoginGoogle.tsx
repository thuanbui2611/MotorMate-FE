import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function LoginGoogle() {
  const handleError = () => {
    console.log("Login fail");
  };
  const handleSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);
  };
  return (
    <GoogleLogin
      text="signin_with"
      theme="filled_blue"
      shape="circle"
      locale="en"
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}
