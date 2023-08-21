import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import DefaultLayout from "../layout/DefaulLayout";
import Calendar from "../pages/Calendar";
import Chart from "../pages/Chart";
import FormElements from "../pages/Form/FormElements";
import FormLayout from "../pages/Form/FormLayout";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Tables from "../pages/Tables";
import Alerts from "../pages/UiElements/Alerts";
import Buttons from "../pages/UiElements/Buttons";
import ECommerce from "../pages/Dashboard/ECommerce";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "", element: <ECommerce /> },
          { path: "home", element: <ECommerce /> },
          { path: "calender", element: <Calendar /> },
          { path: "profile", element: <Profile /> },
          { path: "forms/form-elements", element: <FormElements /> },
          { path: "forms/form-layout", element: <FormLayout /> },
          { path: "tables", element: <Tables /> },
          { path: "settings", element: <Settings /> },
          { path: "chart", element: <Chart /> },
          { path: "ui/alerts", element: <Alerts /> },
          { path: "ui/buttons", element: <Buttons /> },
        ],
      },
      {},
    ],
  },
]);
