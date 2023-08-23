import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import agentTest from "../../app/api/agentTest";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { signInByGoogle } from "./AccountSlice";
import { useState } from "react";
import Loading from "../../app/components/Loading";

export default function LoginGoogle() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleError = () => {
    console.log("Login fail");
  };
  const handleSuccess = async (response: CredentialResponse) => {
    setLoading(true);
    try {
      const data = await dispatch(
        signInByGoogle(response.credential as string)
      );
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
