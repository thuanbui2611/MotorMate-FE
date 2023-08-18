import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import agentTest from "../../app/api/agentTest";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { signInByGoogle } from "./AccountSlice";

export default function LoginGoogle() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleError = () => {
    console.log("Login fail");
  };
  const handleSuccess = async (response: CredentialResponse) => {
    try {
      const data = await dispatch(
        signInByGoogle(response.credential as string)
      );
      history.push("/");
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
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
