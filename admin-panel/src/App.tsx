import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Loader from "./app/components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/store/ConfigureStore";
import { fetchUserFromToken } from "./pages/account/AccountSlice";
import { useJsApiLoader } from "@react-google-maps/api";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserFromToken()).finally(() => setLoading(false));
  }, [dispatch, user?.token]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
    language: "vi",
    region: "VN",
  });

  return loading && !isLoaded ? (
    <Loader />
  ) : (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 999999 }}
      />
      <Outlet />
    </>
  );
}

export default App;
