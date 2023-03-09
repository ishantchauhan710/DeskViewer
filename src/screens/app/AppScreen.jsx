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

const AppScreen = ({ callRef }) => {
  const videoRef = useRef();
  const [remoteConnecting, setRemoteConnecting] = useState(true);
  const dispatch = useDispatch();

  const showSessionDialog = useSelector(
    (state) => state.connection.showSessionDialog
  );

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
  }, []);

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
