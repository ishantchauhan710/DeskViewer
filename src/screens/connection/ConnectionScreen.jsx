import React from "react";

const ConnectionScreen = () => {
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
          <div className="text-md font-regular text-gray-700">
            Your Connection Id
          </div>
          <input
            type="text"
            placeholder="XXXXXXXXXX"
            value="9876543210"
            disabled
            className="text-xl block overflow-hidden rounded-md text-gray-900 border border-gray-200 px-3 py-2 shadow-sm"
          />
        </div>

        <div className="w-9/12 mt-5">
          <div className="text-md font-regular text-gray-700">
            Remote Connection Id
          </div>
          <input
            type="text"
            placeholder="9876543210"
            className="text-xl block overflow-hidden rounded-md text-gray-900 border border-gray-200 px-3 py-2 shadow-sm focus:outline-none"
          />

          <div class="w-full text-center mt-5 inline-block rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-red-500 focus:outline-none cursor-pointer">
            Connect
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionScreen;
