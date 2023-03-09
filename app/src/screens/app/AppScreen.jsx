import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SessionInfo from "../../components/SessionInfo";
import SessionLoading from "../../components/SessionLoading";
import {
  setSessionMode,
  setSessionStartTime,
  setShowSessionDialog,
} from "../../states/connectionSlice";

import { ImConnection } from "react-icons/im";

const AppScreen = ({ callRef, socket }) => {
  const videoRef = useRef();
  const [remoteConnecting, setRemoteConnecting] = useState(true);
  const dispatch = useDispatch();

  const showSessionDialog = useSelector(
    (state) => state.connection.showSessionDialog
  );

  const userId = useSelector((state) => state.connection.userConnectionId);
  const remoteId = useSelector((state) => state.connection.remoteConnectionId);

  useEffect(() => {
    // When call is accepted
    callRef.current.on("stream", function (remoteStream) {
      setRemoteConnecting(false);
      dispatch(setSessionMode(1));
      dispatch(setSessionStartTime(new Date()));
      dispatch(setShowSessionDialog(true));
      videoRef.current.srcObject = remoteStream;
      videoRef.current.play();
    });

    callRef.current.on("close", function () {
      alert("Connection closed");
      console.log("Closed");
    });

    callRef.current.on("error", function () {
      alert("Connection error");
      console.log("Error");
    });
  }, []);

  // Handling key press
  useEffect(() => {
    if (socket) {
      // -------- GET MOUSE CURSOR COORDINATES -------
      let mousePos = null;
      // Whenever user moves cursor, save its coordinates in a variable
      document.addEventListener("mousemove", (e) => {
        mousePos = e;
      });

      // Every 100ms delay, share coordinates with connected user
      setInterval(() => {
        if (mousePos) {
          socket.emit("mousemove", {
            userId: userId,
            remoteId: remoteId,
            event: { x: mousePos.pageX, y: mousePos.pageY },
          });
        }
        //console.log("Socket sent" + mousePos.pageX)
      }, 100);

      // const handleEsc = (event) => {
      //   if (event.keyCode === 27) {
      //     console.log(`Event emitted by ${userId} to ${remoteId}`);
      //     // Send event to server which will share it with remote
      //     socket.emit("event", {
      //       userId: userId,
      //       remoteId: remoteId,
      //       event: "Escape key pressed",
      //     });
      //   }
      // };

      // window.addEventListener("keydown", handleEsc);

      // return () => {
      //   window.removeEventListener("keydown", handleEsc);
      // };
    }
  }, [socket]);

  return (
    <div className="h-screen bg-gray-700">
      <video ref={videoRef} style={{ width: "100vw", height: "100vh" }} />
      <button
        onClick={() => dispatch(setShowSessionDialog(true))}
        class="fixed flex items-center justify-center text-xl right-0 mt-5 mr-10 top-0 text-white px-4 w-auto h-12 bg-sky-600 rounded-full hover:bg-sky-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
      >
        <ImConnection />
        <span className="ml-2 text-lg">Session Info</span>
      </button>
      {/* {remoteConnecting && <SessionLoading />} */}
      {showSessionDialog && <SessionInfo />}
    </div>
  );
};

export default AppScreen;
