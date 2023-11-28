import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useAppDispatch } from "../store/ConfigureStore";
import { signInByGoogle } from "../../pages/account/AccountSlice";
import { useState } from "react";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginGoogle() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleError = () => {
    console.log("Login fail");
  };
  const handleSuccess = async (response: CredentialResponse) => {
    setLoading(true);
    try {
      const result = await dispatch(
        signInByGoogle(response.credential as string)
      );
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
    setLoading(false);
  };
  if (loading)
    return (
      <>
        <div className="fixed inset-0">
          <Loading />
        </div>
      </>
    );

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
