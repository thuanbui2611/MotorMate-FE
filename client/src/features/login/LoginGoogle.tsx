import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import agentTest from "../../app/api/agentTest";

export default function LoginGoogle() {
  const handleError = () => {
    console.log("Login fail");
  };
  const handleSuccess = async (response: CredentialResponse) => {
    console.log("clientId:", response.clientId);
    console.log("credential:", response.credential);
    try {
      const data = await agentTest.Account.loginGoogle(response.credential);
      console.log("data:", data);
    } catch (error) {
      console.log("API Error:", error);
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
