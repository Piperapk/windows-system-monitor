import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath, isDev } from "./utils.js";
import { getStaticInformation, getIntervalInformation } from "./resources.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }

  getIntervalInformation(mainWindow);

  ipcMain.handle("static-information", () => {
    return getStaticInformation();
  });
});
