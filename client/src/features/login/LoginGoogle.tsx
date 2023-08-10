import { useState } from "react";
import GoogleLogin from "react-google-login";

export default function LoginGoogle() {
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID as string);
  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem("loginData")
  //     ? JSON.parse(localStorage.getItem("loginData") as string)
  //     : null
  // );
  const handleFailure = (result: any) => {
    alert("Something error");
  };

  const handleLogin = (googleData: any) => {
    console.log("handle login:" + googleData);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("loginData");
  //   setLoginData(null);
  // };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </>
  );
}
