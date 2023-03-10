const path = require("path");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

const { desktopCapturer, ipcMain } = require("electron");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win
    .loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    )
    .then(() => {
      console.log("Window loaded");
      desktopCapturer
        .getSources({ types: ["screen"] })
        .then(async (sources) => {
          for (const source of sources) {
            // TODO: Add if condition for multiple sources
            console.log("Sources available: " + source.id);
            console.log("Source id sent: " + source.id);
            win.webContents.send("SET_SOURCE", source.id);
          }
        });
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
