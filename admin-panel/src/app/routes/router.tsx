import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import DefaultLayout from "../layout/DefaulLayout";
import Profile from "../../pages/Profile";
import Settings from "../../pages/Settings";
import Brand from "../../pages/brand";
import Transactions from "../../pages/transactions";
import SignIn from "../../pages/account/SignIn";
import Collection from "../../pages/collection";
import ModelVehicle from "../../pages/modelVehicle";
import VehiclesPage from "../../pages/vehicles";
import VehiclePending from "../../pages/vehicles/VehiclePending";
import VehicleDenied from "../../pages/vehicles/VehicleDenied";
import ColorPage from "../../pages/color";
import UsersPage from "../../pages/users";
import BlogPage from "../../pages/blog";
import TransactionDetail from "../../pages/transactions/TransactionDetail";
import NotFound from "../errors/NotFound";
import RequireAuth from "./RequireAuth";
import ServerErrors from "../errors/ServerErrors";
import BlogCategory from "../../pages/blogCategory";
import Dashboard from "../../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth roles={["Admin", "Staff"]} />,
        children: [
          {
            element: <DefaultLayout />,
            children: [
              { path: "", element: <Dashboard /> },
              { path: "dashboard", element: <Dashboard /> },
              { path: "collections", element: <Collection /> },
              { path: "brand", element: <Brand /> },
              { path: "transactions", element: <Transactions /> },
              {
                path: "transactions/:parentOrderId",
                element: <TransactionDetail />,
              },
              { path: "model-vehicles", element: <ModelVehicle /> },
              { path: "colors", element: <ColorPage /> },
              { path: "vehicles", element: <VehiclesPage /> },
              { path: "vehicles/pending", element: <VehiclePending /> },
              { path: "vehicles/deny", element: <VehicleDenied /> },
              { path: "users", element: <UsersPage /> },
              { path: "profile", element: <Profile /> },
              { path: "blog", element: <BlogPage /> },
              { path: "blog/category", element: <BlogCategory /> },
              { path: "settings", element: <Settings /> },
            ],
          },
        ],
      },

      { path: "login", element: <SignIn /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerErrors /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
