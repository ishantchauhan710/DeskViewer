import React, { useEffect, useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectionScreen from "./screens/connection/ConnectionScreen";
import AppScreen from "./screens/app/AppScreen";
import io from "socket.io-client";

const App = () => {
  const callRef = useRef();
  const socket = io("http://127.0.0.1:5000");

  // Socket connection
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("connect_error", (e) => {
      console.log("Socket connection error, retrying..." + e);
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });


    socket.on("mousemove", (event) => {
      //console.log(`Mousemove: x=${event.x} y=${event.y}`);
    });

    socket.on("mousedown", (event) => {
      console.log(`Mouse down: ${event.button}`);
    });

    
    socket.on("scroll", (event) => {
      console.log(`Scroll: ${event.scroll}`);
    });

    

    


  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ConnectionScreen callRef={callRef} socket={socket} />,
    },
    {
      path: "/app",
      element: <AppScreen callRef={callRef} socket={socket} />,
    },
  ]);
  return socket && <RouterProvider router={router} />;
};

export default App;
