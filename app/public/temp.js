const electron = require("electron");
const { desktopCapturer } = require("electron");

var captureScreens = () => {
  desktopCapturer.getSources(
    {
      types: ["screen"],
    },
    (error, sources) => {
      if (error) console.error(error);

      sources.forEach((source) => {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: source.id,
                minWidth: 640,
                maxWidth: 640,
                minHeight: 320,
                maxHeight: 320,
              },
            },
          })
          .then((stream) => {
            const video = document.getElementById("video");

            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video.play();
            };
          })
          .catch((error) => console.error(error));
      });
    }
  );
};

document.getElementById("captureScreens").onclick = captureScreens;
