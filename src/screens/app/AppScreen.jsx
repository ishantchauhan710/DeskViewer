import React, { useEffect, useRef } from "react";

const AppScreen = ({ callRef }) => {
  const videoRef = useRef();

  useEffect(() => {
    callRef.current.on("stream", async function (remoteStream) {
      //alert("Accepted");
      videoRef.current.srcObject = remoteStream;
      return videoRef.current.play();
    });
  }, []);

  return (
    <div className="h-screen bg-gray-700">
      <video ref={videoRef} style={{ width: "100vw", height: "60vh" }} />
    </div>
  );
};

export default AppScreen;
