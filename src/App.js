import React, { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectionScreen from "./screens/connection/ConnectionScreen";
import AppScreen from "./screens/app/AppScreen";

const App = () => {
  const callRef = useRef();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ConnectionScreen callRef={callRef} />,
    },
    {
      path: "/app",
      element: <AppScreen callRef={callRef} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
