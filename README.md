![](screenshots/intro1.png)
# DeskViewer
**DeskViewer** is a cross platform remote desktop controlling application that allows users to access and control a remote computer from anywhere in the world

## About :dart:
DeskViewer is a desktop app where once you enter the remote device's connection id you will start receiving the screen video and audio of the remote device on your computer. And once you start moving your mouse or pressing keystrokes on your keyboard, the changes will automatically be reflected in the remote's computer
 
## Demo
Since the build size for .exe, .app and linux executable file exceeds over 200Mb, I have not uploaded the executable files in this repository. However, I have shared a video demo of this project in the link below. Additionally, I have also explained how you can easily generate an executable file of this project for windows, mac and linux!

## Video Demo 
[Here](https://www.youtube.com/watch?v=OgqYnuOS-W0) is a short video on how to use DeskViewer

## Blog :writing_hand:
https://ishantchauhan.hashnode.dev/deskviewer-how-i-created-and-debugged-a-remote-desktop-application

## DeskViewer Features :fire:
- **Screen Sharing** - User can share his screen video and audio to a remote user
- **Screen Control** - Remote user can in return control the keyboard and mouse of connected user

## :camera_flash: Screenshots :computer:
|   |   |   |
|---|---|---|
|![](screenshots/screen2.jpg) | ![](screenshots/screen6.jpg)
|![](screenshots/screen3.jpg) |![](screenshots/screen4.jpg) 

## Built Using :bulb:
- **Electron** - For building the desktop application
- **PeerJs** - For transmitting screen video in realtime
- **Socket.io** - For emitting mouse and keyboard events
- **RobotJs** - For triggering mouse movement and keystrokes on remote device
- **NodeJs** - For creating a custom P2P server along with websockets
- **React** - For reusing design components
- **Redux Toolkit** - For handling react states
- **TailwindCSS** - For designing use interface

## Running Project :memo:
![](screenshots/deskviewer_working.png)
To implementing P2P connection for sharing screen, you can use the default peer server provided by the peerjs library. However, sometimes I have noticed that the peer server does not respond correctly and cause websocket connection to fail. Therefore I have implemented a custom peer server along with websocket connections in the backend.

If you want to run this project on your computer, you need to first setup the backend and the desktop application. To do so, follow the below instructions:

1. Open VSCode editor and in terminal, write the following commands:
```
git clone https://github.com/ishantchauhan710/DeskViewer.git
cd DeskViewer
ls
```

2. First we need to setup the server. So in terminal, write:
```
cd server
npm install
npm start
```
3. This will start the node server. You should see **Server started** in your terminal

4. Now we need to setup the desktop app. So, open a new terminal, navigate to app folder and write:
```
npm install
npm start
```
5. This will run the react code. But remember that you **won't be able to run this code in a browser** since DeskViewer is a **desktop app** and not a web app
6. To run the electron desktop app, create 2 new terminals in the app folder and in both of them, write:
```
npx electronmon .
```
7. Now you should see 2 desktop apps being launched :)

## Generating EXE / APP / Linux Executable Files :memo:
1. To generate an executable file depending upon your platform, open electron.js file and there, comment the following line
```
win.loadURL("http://localhost:3000")
```
2. Then uncomment the following line
```
win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`)
```
3. Open terminal in the app folder and write:
```
npm run build 
npx electron-packager .
```
4. This will build a .exe/.app/linux executable file depending on your operating system. To generate an executable file for some other platform, use the command below:
```
npx electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]
```

### Note :bangbang:
- I have commented the robot.js functions in electron.js file inside the app folder. This is because if you uncomment them and run 2 instances of this app on a same computer, you won't be able to control your mouse
- I have only tested this application on linux, if you want to create an executable file for windows or mac systems, you need to make few more changes in the electron configuration files. You can refer to [electron-packager](https://www.npmjs.com/package/electron-packager) for that
- Currently the app uses getDisplayMedia() to share the audio of device however if you want to transmit the audio of user using microphone, you can make use of the getUserMedia() method

## Contact
For any queries, you can mail me at developerishant710@gmail.com
