import React, { useEffect, useRef, useState } from "react";
import SessionLoading from "../../components/SessionLoading";

const AppScreen = ({ callRef }) => {
  const videoRef = useRef();
  const [remoteConnecting, setRemoteConnecting] = useState(true);

  useEffect(() => {
    // When call is accepted
    callRef.current.on("stream", function (remoteStream) {
      setRemoteConnecting(false);
      videoRef.current.srcObject = remoteStream;
      videoRef.current.play();
    });
  }, []);

  return (
    <div className="h-screen bg-gray-700">
      {remoteConnecting && <SessionLoading />}
      <video ref={videoRef} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
};

export default AppScreen;
