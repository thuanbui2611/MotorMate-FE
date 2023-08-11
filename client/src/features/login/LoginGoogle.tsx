import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export default function LoginGoogle() {
  const handleError = () => {
    console.log("Login fail");
  };
  const handleSuccess = (response: CredentialResponse) => {
    console.log("clientId:", response.clientId);
    console.log("credential:", response.credential);
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
