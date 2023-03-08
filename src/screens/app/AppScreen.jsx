import React, { useEffect, useRef, useState } from "react";

const AppScreen = ({ callRef }) => {
  const videoRef = useRef();

  useEffect(() => {
    callRef.current.on("stream", function (remoteStream) {
      //alert("Accepted");
      //console.log("Stream" + remoteStream);
      videoRef.current.srcObject = remoteStream;
      videoRef.current.play();
    });
  }, []);

  return (
    <div className="h-screen bg-gray-700">
      <video ref={videoRef} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
};

export default AppScreen;
