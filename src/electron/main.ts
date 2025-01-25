import { app, BrowserWindow } from "electron";
import path from "path";
import { getPreloadPath, ipcMainHandle, isDev } from "./utils.js";
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

  ipcMainHandle("static-information", () => {
    return getStaticInformation();
  });
});
