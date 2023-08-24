import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useAppDispatch } from "../store/ConfigureStore";
import { signInByGoogle } from "../../pages/account/AccountSlice";
import { useState } from "react";
import Loading from "./Loading";

export default function LoginGoogle() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleError = () => {
    console.log("Login fail");
  };
  const handleSuccess = async (response: CredentialResponse) => {
    setLoading(true);
    try {
      await dispatch(signInByGoogle(response.credential as string));
    } catch (error) {
      console.log("Error:", error);
    }
    setLoading(false);
  };
  if (loading) return <Loading />;

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
