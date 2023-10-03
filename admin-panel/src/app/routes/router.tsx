import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import DefaultLayout from "../layout/DefaulLayout";
import Chart from "../../pages/Chart";
import FormElements from "../../pages/Form/FormElements";
import FormLayout from "../../pages/Form/FormLayout";
import Profile from "../../pages/Profile";
import Settings from "../../pages/Settings";
import Tables from "../../pages/Tables";
import Alerts from "../../pages/UiElements/Alerts";
import Buttons from "../../pages/UiElements/Buttons";
import Brand from "../../pages/brand";
import Transactions from "../../pages/transactions";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Products from "../../pages/products";
import SignIn from "../../pages/account/SignIn";
import Collection from "../../pages/collection";
import ModelVehicle from "../../pages/modelVehicle";
import VehiclesPage from "../../pages/vehicles";
import VehiclePending from "../../pages/vehicles/VehiclePending";
import VehicleDenied from "../../pages/vehicles/VehicleDenied";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "products", element: <Products /> },
          { path: "collections", element: <Collection /> },
          { path: "brand", element: <Brand /> },
          { path: "transactions", element: <Transactions /> },
          { path: "model-vehicles", element: <ModelVehicle /> },
          { path: "vehicles", element: <VehiclesPage /> },
          { path: "vehicles/pending", element: <VehiclePending /> },
          { path: "vehicles/deny", element: <VehicleDenied /> },
          { path: "profile", element: <Profile /> },
          { path: "forms/form-elements", element: <FormElements /> },
          { path: "forms/form-layout", element: <FormLayout /> },
          { path: "tables", element: <Tables /> },
          { path: "settings", element: <Settings /> },
          { path: "chart", element: <Chart /> },
          { path: "ui/alerts", element: <Alerts /> },
          { path: "ui/buttons", element: <Buttons /> },
          { path: "ui/buttons", element: <Buttons /> },
        ],
      },

      { path: "login", element: <SignIn /> },
      // { path: 'not-found', element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
