import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const SessionLoading = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed z-10 flex items-center justify-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="w-1/2 z-20 bg-white rounded-sm">
        <div
          className="rounded-2xl border border-sky-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
          role="alert"
        >
          <div className="flex items-center gap-4">
            <span className="shrink-0 rounded-full bg-sky-400 p-2 text-white">
              <Loading />
            </span>

            <p className="font-medium sm:text-lg">Connecting to remote</p>
          </div>

          <p className="mt-4 text-gray-500">
            Please wait while the remote user accepts your connection request.
            Once connection establishes, you will be able to control the remote
            user's device
          </p>

          <div className="mt-6 sm:flex sm:gap-4 flex items-center justify-end">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to close this connection?"
                  ) === true
                ) {
                  navigate("/");
                }
              }}
              className="inline-block w-full rounded-lg bg-sky-500 hover:bg-sky-600 cursor-pointer px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto "
            >
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionLoading;
