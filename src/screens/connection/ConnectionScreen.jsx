import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import SessionInfo from "../../components/SessionInfo";
import { useDispatch, useSelector } from "react-redux";
import { Peer } from "peerjs";
import {
  setRemoteConnectionId,
  setSessionMode,
  setSessionStartTime,
  setShowSessionDialog,
  setUserConnectionId,
} from "../../states/connectionSlice";
import { toast, ToastContainer } from "react-toastify";

const ConnectionScreen = ({ callRef }) => {
  const [remoteConnecting, setRemoteConnecting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const peerInstance = useRef(null);

  const showSessionDialog = useSelector(
    (state) => state.connection.showSessionDialog
  );

  const handleCopied = (e) => {
    navigator.clipboard.writeText(e.target.value);
    setShowCopied(true);
  };

  useEffect(() => {
    if (showCopied) {
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }
  }, [showCopied]);

  useEffect(() => {
    const max = 9999999999;
    const min = 1000000000;
    const uid = Math.floor(Math.random() * (max - min + 1)) + min;

    setUserId(uid);
    dispatch(setUserConnectionId(uid));

    const peerOptions = {
      host: "127.0.0.1",
      port: 5000,
      path: "/peerjs",
      config: {
        iceServers: [
          { url: "stun:stun01.sipphone.com" },
          { url: "stun:stun.ekiga.net" },
          { url: "stun:stunserver.org" },
          { url: "stun:stun.softjoys.com" },
          { url: "stun:stun.voiparound.com" },
          { url: "stun:stun.voipbuster.com" },
          { url: "stun:stun.voipstunt.com" },
          { url: "stun:stun.voxgratia.org" },
          { url: "stun:stun.xten.com" },
          {
            url: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            url: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
        ],
      },
    };

    //FOR CUSTOM SERVER: const peer = new Peer(uid,peerOptions);
    const peer = new Peer(uid);

    // Receive call
    peer.on("call", (call) => {
      if (window.confirm("Incoming call from " + call.peer) === true) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then((mediaStream) => {
            // Answer call with screen's display data stream
            call.answer(mediaStream);
            dispatch(setSessionMode(0));
            dispatch(setRemoteConnectionId(call.peer));
            dispatch(setSessionStartTime(new Date()));
            dispatch(setShowSessionDialog(true));

            // FOR PLAYING AUDIO OF REMOTE
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
    console.log(`Id: ${userId}\nRemote: ${remoteId}`);

    if (!remoteId || remoteId.length < 10) {
      alert("Invalid Remote ID");
      return;
    } else if (!remoteId.match(/^\d+$/)) {
      alert("Remote ID cannot be a string");
      return;
    } else if (parseInt(remoteId) === parseInt(userId)) {
      alert("User ID and Remote ID cannot be same");
      return;
    }

    setRemoteConnecting(true);

    // Do not share your video and audio if you are connecting to remote
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        // Make call to remote
        const call = peerInstance.current.call(remoteId, mediaStream);

        callRef.current = call;
        navigate("/app");
      });
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
            {showCopied && (
              <span className="ml-1 text-green-700 text-xs">(Copied)</span>
            )}
          </div>
          <input
            type="text"
            placeholder="XXXXXXXXXX"
            value={userId}
            readOnly
            className="w-full text-xl block overflow-hidden rounded-md text-gray-900 border border-gray-200 px-3 py-2 shadow-sm focus:outline-none cursor-pointer"
            title="Click here to copy"
            onClick={handleCopied}
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
            onChange={(e) => {
              setRemoteId(e.target.value);
              dispatch(setRemoteConnectionId(e.target.value));
            }}
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
