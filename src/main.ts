import { app, BrowserWindow } from "electron";
import { updateElectronApp } from "update-electron-app";

import path from "path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    autoHideMenuBar: true,
    title: "sand0 - Una mejor manera de manejar ads",
    icon: path.join(__dirname, "assets", "icon"),
  });

  mainWindow.loadFile("src/loader.html");

  setTimeout(() => {
    mainWindow.loadURL("https://sand0.com/dashboard?platform=desktop");
    // mainWindow.loadURL("http://localhost:3000/dashboard?platform=desktop");
  }, 1000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  updateElectronApp({
    notifyUser: true,
    updateInterval: "1 hour",
    logger: require("electron-log"),
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
