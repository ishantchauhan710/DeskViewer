const path = require("path");
const { app, BrowserWindow } = require("electron");
const robot = require("robotjs");
const { desktopCapturer, ipcMain } = require("electron");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    icon: __dirname + "/img/deskviewer_logo_256.png",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win
    .loadURL("http://localhost:3000")

    //win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`)
    .then(() => {
      console.log("Window loaded, URL: " + win.webContents.getURL());
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

// --------- HANDLE KEYBOARD AND MOUSE EVENTS -------

//robot.moveMouseSmooth(100, 180);
//robot.mouseClick();
//robot.scrollMouse(0, -200);
//robot.keyTap("command")

ipcMain.on("mousemove", (event, args) => {
  //console.log(`Mousemove: x=${args.x} y=${args.y}`);
  //robot.moveMouseSmooth(args.x, args.y);
});

ipcMain.on("mousedown", (event, args) => {
  //console.log(`Mouse down: ${args.button}`);
  //robot.mouseClick();
});

ipcMain.on("scroll", (event, args) => {
  //console.log(`Scroll: ${args.scroll}`);
  //robot.scrollMouse(0, args.scroll);
});

ipcMain.on("keydown", (event, args) => {
  //console.log(`Key pressed: ${args.keyCode}`);
  //robot.keyTap("command");
});
