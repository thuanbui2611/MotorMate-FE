import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Loader from "./app/components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/store/ConfigureStore";
import { fetchUserFromToken } from "./pages/account/AccountSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserFromToken()).finally(() => setLoading(false));
  }, [dispatch, user?.token]);
  return loading ? (
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
      />
      <Outlet />
    </>
  );
}

export default App;
