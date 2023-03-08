import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import SessionInfo from "../../components/SessionInfo";
import { useDispatch, useSelector } from "react-redux";
import { setShowSessionDialog } from "../../states/connectionSlice";
import { Peer } from "peerjs";

const ConnectionScreen = () => {
  const [remoteConnecting, setRemoteConnecting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("1234567890");
  const [remoteId, setRemoteId] = useState("1234567890");
  const peerInstance = useRef(null);

  const showSessionDialog = useSelector(
    (state) => state.connection.showSessionDialog
  );

  useEffect(() => {
    const max = 9999999999;
    const min = 1000000000;
    const uid = Math.floor(Math.random() * (max - min + 1)) + min;

    setUserId(uid);
    const peer = new Peer(uid);

    // Receive call
    peer.on("call", (call) => {
      if (window.confirm("Incoming call from") === true) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then((mediaStream) => {
            // Answer call with screen's display data stream
            call.answer(mediaStream);

            // FOR AUDIO
            // call.on("stream", function (remoteStream) {
            //   remoteVideoRef.current.srcObject = remoteStream;
            //   remoteVideoRef.current.play();
            // });
          });
      }
    });

    peerInstance.current = peer;
  }, []);

  const connect = () => {
    if (!remoteId || remoteId.length < 10) {
      alert("Invalid Remote ID");
      return;
    }
    setRemoteConnecting(true);

    // Do not share your video and audio if you are connecting to remote
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((mediaStream) => {
        // Make call to remote
        const call = peerInstance.current.call(remoteId, mediaStream);

        // When call is accepted
        call.on("stream", (remoteStream) => {
          alert("Accepted");
        });
      });

    //navigate("/app");
    //dispatch(setShowSessionDialog(true));
  };

  return (
    <div className="h-screen flex">
      <div className="bg-sky-500 text-white basis-1/2 flex items-center justify-center">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img
            src="/img/deskviewer_logo_transparent.png"
            className="w-1/2"
            alt="logo"
          />
          <div className="font-semibold text-3xl mt-4">DeskViewer</div>
          <div className="font-regular text-md">Version 1.0</div>
        </div>
      </div>
      <div className="bg-white basis-1/2 flex flex-col items-center justify-center">
        <div className="w-9/12">
          <div className="w-full text-md font-regular text-gray-700">
            Your Connection Id
          </div>
          <input
            type="text"
            placeholder="XXXXXXXXXX"
            value={userId}
            disabled
            className="w-full text-xl block overflow-hidden rounded-md text-gray-900 border border-gray-200 px-3 py-2 shadow-sm"
          />
        </div>

        <div className="w-9/12 mt-5">
          <div className="w-full text-md font-regular text-gray-700">
            Remote Connection Id
          </div>
          <input
            type="text"
            placeholder="9876543210"
            className="w-full text-xl block overflow-hidden rounded-md text-gray-900 border border-gray-200 px-3 py-2 shadow-sm focus:outline-none"
            value={remoteId}
            onChange={(e) => setRemoteId(e.target.value)}
          />
        </div>
        <div className="w-9/12 mt-6">
          <button
            onClick={() => connect()}
            disabled={remoteConnecting}
            className="w-full flex items-center justify-center text-center rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white enabled:hover:bg-red-500 enabled:cursor-pointer focus:outline-none disabled:bg-gray-400 disabled:border-gray-400"
          >
            <span className={remoteConnecting ? "mr-2" : ""}>
              {remoteConnecting ? "Connecting" : "Connect"}
            </span>
            {remoteConnecting && <Loading />}
          </button>
        </div>
      </div>
      {showSessionDialog && <SessionInfo />}
    </div>
  );
};

export default ConnectionScreen;
