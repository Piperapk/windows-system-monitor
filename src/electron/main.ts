import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetPath, getPreloadPath, getRendererPath, ipcMainHandle, isDev } from "./utils.js";
import { getStaticInformation, getIntervalInformation } from "./resources.js";

if (!isDev()) {
  Menu.setApplicationMenu(null);
}

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
    resizable: false,
    maximizable: false,
    useContentSize: true,
    width: 250,
    height: 230,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getRendererPath());
  }

  setupAPI(mainWindow);
  setupTray(mainWindow);
  setupMinimizeAndClose(mainWindow);
});

function setupAPI(mainWindow: BrowserWindow) {
  getIntervalInformation(mainWindow);

  ipcMainHandle("static-information", () => {
    return getStaticInformation();
  });
}

export function setupTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssetPath(), "iconTray.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        mainWindow.show();
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("System Monitor");
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    mainWindow.show();
  });
  tray.on("click", () => {
    mainWindow.show();
  });
}

function setupMinimizeAndClose(mainWindow: BrowserWindow) {
  let isQuitting = false;

  mainWindow.on("close", (event) => {
    // Only quit the app when the user explicitly closes the window otherwise minimize it
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      // To support macOS specific behavior
      if (app.dock) {
        app.dock.hide();
      }
    }
  });

  mainWindow.on("show", () => {
    isQuitting = false;
  });

  app.on("before-quit", () => {
    isQuitting = true;
  });
}
