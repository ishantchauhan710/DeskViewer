import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setShowSessionDialog } from "../states/connectionSlice";
import moment from "moment";

const SessionInfo = () => {
  const dispatch = useDispatch();

  const closeSession = () => {
    dispatch(setShowSessionDialog(false));
  };

  const userId = useSelector((state) => state.connection.userConnectionId);
  const remoteId = useSelector((state) => state.connection.remoteConnectionId);
  const sessionStart = useSelector(
    (state) => state.connection.sessionStartTime
  );

  const [timeElapsed, setTimeElapsed] = useState(false);

  const formatNumber = (num) => {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = moment.duration(
        moment(new Date()).diff(moment(sessionStart))
      );
      const seconds = formatNumber(duration.seconds());
      const minutes = formatNumber(duration.minutes());
      const hours = formatNumber(duration.hours());

      const timeDiff = `${hours}:${minutes}:${seconds}`;
      setTimeElapsed(timeDiff);
    }, 1000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div className="fixed flex items-center justify-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="w-1/2 bg-white rounded-sm">
        <div className=" bg-green-600 text-white text-7xl py-7 flex flex-col items-center justify-center">
          <BsFillCheckCircleFill />
          <div className="text-2xl font-bold mt-4">Session Started</div>
        </div>

        <div className="px-5">
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <tbody className="divide-y divide-gray-200 text-center">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    User Connection Id
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {userId}
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Remote Connection Id
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {remoteId}
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Session Started
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(sessionStart).format("MMMM Do, h:mm:ss a")}
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Time Elapsed
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {timeElapsed}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end my-4">
            <button
              onClick={() => closeSession()}
              className="inline-block rounded border border-red-600 bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-500 focus:outline-none "
            >
              End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
