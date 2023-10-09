import { Outlet } from "react-router-dom";
import "./app/assets/css/styles.css";
import "./app/assets/css/custom.css";
// import "flowbite";
import { useAppDispatch, useAppSelector } from "./app/store/ConfigureStore";
import { useEffect, useState } from "react";
import {
  fetchUserFromToken,
  getUserDetails,
} from "./pages/account/AccountSlice";
import { ToastContainer } from "react-toastify";
import Loading from "./app/components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserFromToken());
    if (user?.token) {
      dispatch(getUserDetails()).then(() => setLoading(false));
    }
    setLoading(false);
  }, [dispatch, user?.token]);

  return loading ? (
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
      />
      <Outlet />
    </>
  );
}

export default App;
