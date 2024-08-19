/* eslint-disable no-unused-vars */
import Main from "../component/layout/main";
import Energy from "../component/fragment/mainEnergy";
import Dashboard from "../component/fragment/mainDashboard";
import Plant from "../component/fragment/mainPlant";
import Power from "../component/fragment/mainPower";
import Report from "../component/fragment/mainReport";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/plant",
    element: <Plant />,
  },
  {
    path: "/energy",
    element: <Energy />,
  },
  {
    path: "/power",
    element: <Power />,
  },
  {
    path: "/report",
    element: <Report />,
  },
]);

function HomePage() {
  return (
    <>
      <Main>
        <RouterProvider router={router} />
      </Main>
    </>
  );
}

export default HomePage;
