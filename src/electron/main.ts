import { app, BrowserWindow } from "electron";
import {
  getPreloadPath,
  getRendererPath,
  ipcMainHandle,
  isDev,
} from "./utils.js";
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
    mainWindow.loadFile(getRendererPath());
  }

  getIntervalInformation(mainWindow);

  ipcMainHandle("static-information", () => {
    return getStaticInformation();
  });
});
