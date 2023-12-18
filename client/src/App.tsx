import { Outlet } from "react-router-dom";
import "./app/assets/css/styles.css";
import "./app/assets/css/custom.css";
import { useAppDispatch, useAppSelector } from "./app/store/ConfigureStore";
import { useCallback, useEffect, useState } from "react";
import {
  fetchUserFromToken,
  getUserDetails,
} from "./pages/account/AccountSlice";
import { ToastContainer } from "react-toastify";
import Loading from "./app/components/Loading";
import { getCartAsync } from "./pages/cart/CartSlice";
import { useJsApiLoader } from "@react-google-maps/api";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.account.user);
  const userDetail = useAppSelector((state) => state.account.userDetail);
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      if (!user?.token) {
        await dispatch(fetchUserFromToken());
      } else {
        if (!userDetail) {
          await dispatch(getUserDetails());
        } else {
          await dispatch(getCartAsync(userDetail.id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userDetail, user?.token]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  // useEffect(() => {
  //   dispatch(fetchUserFromToken());
  //   if (user?.token) {
  //     dispatch(getUserDetails()).then(() => setLoading(false));
  //   }
  //   setLoading(false);
  // }, [dispatch, user?.token]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
    language: "vi",
    region: "VN",
  });

  return loading && !isLoaded ? (
    <Loading />
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
