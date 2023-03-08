import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectionScreen from "./screens/connection/ConnectionScreen";
import AppScreen from "./screens/app/AppScreen";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ConnectionScreen />,
    },
    {
      path: "/app",
      element: <AppScreen />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
