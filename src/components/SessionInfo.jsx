import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const SessionInfo = () => {
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="w-1/2 bg-white rounded-sm">
        <div className=" bg-green-600 text-white text-7xl py-7 flex flex-col items-center justify-center">
          <BsFillCheckCircleFill />
          <div className="text-2xl font-bold mt-4">Session Started</div>
        </div>

        <div className="px-10">
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <tbody className="divide-y divide-gray-200 text-center">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    User Connection Id
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    9876543210
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Remote Connection Id
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    9876543210
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Session Started
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    04 Jan, 18:30:21
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Time Elapsed
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    01:23:45
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end my-4">
            <button className="inline-block rounded border border-red-600 bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-500 focus:outline-none ">
              End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
