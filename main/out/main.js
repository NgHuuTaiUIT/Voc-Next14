"use strict";
// Main File for Electron
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const serve = require("electron-serve");
function handleSetTitle(event, title) {
    const webContents = event.sender;
    const win = electron_1.BrowserWindow.fromWebContents(webContents);
    if (win !== null) {
        win.setTitle(title);
    }
}
// Loading Screen
let splash;
const createSplashScreen = () => {
    /// create a browser window
    splash = new electron_1.BrowserWindow(Object.assign({
        width: 200,
        height: 100,
        /// remove the window frame, so it will become a frameless window
        frame: false,
    }));
    splash.setResizable(false);
    console.log(__dirname);
    splash.loadURL("file://" + __dirname + "/../splash/index.html");
    splash.on("closed", () => (splash = null));
    splash.webContents.on("did-finish-load", () => {
        if (splash) {
            splash.show();
        }
    });
};
// run renderer
const isProd = process.env.NODE_ENV !== "development";
if (isProd) {
    serve({ directory: "out" });
}
else {
    electron_1.app.setPath("userData", `${electron_1.app.getPath("userData")} (development)`);
}
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            devTools: !isProd,
        },
        show: false,
    });
    // Expose URL
    if (isProd) {
        win.loadURL("app://./home.html");
    }
    else {
        // const port = process.argv[2];
        win.loadURL("http://localhost:3000/");
    }
    win.webContents.on("did-finish-load", () => {
        /// then close the loading screen window and show the main window
        if (splash) {
            splash.close();
        }
        win.maximize();
        win.show();
    });
};
electron_1.app.whenReady().then(() => {
    electron_1.ipcMain.on("set-title", handleSetTitle);
    createSplashScreen();
    // createWindow();
    setTimeout(() => {
        createWindow();
    }, 2000);
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
