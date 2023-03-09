import React, { useEffect, useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectionScreen from "./screens/connection/ConnectionScreen";
import AppScreen from "./screens/app/AppScreen";
import io from "socket.io-client";

const App = () => {
  const callRef = useRef();

  // Socket
  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.emit("join", "DATA: ishant");

    socket.on("connect_error", (e) => {
      console.log("Socket connection error, retrying..." + e);
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }, []);

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
