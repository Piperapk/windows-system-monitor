import path from "path";
import { app, ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from "url";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getPreloadPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "dist-electron/preload.cjs");
}

export function getRendererPath() {
  return path.join(app.getAppPath(), "dist-react/index.html");
}

export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
}

// Type-safe IPC handle wrapper
export function ipcMainHandle<Key extends keyof EventMapping>(
  key: Key,
  handler: () => EventMapping[Key] | Promise<EventMapping[Key]>
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

// Type-safe WebContents send wrapper
export function ipcWebContentsSend<Key extends keyof EventMapping>(
  key: Key,
  webContents: WebContents,
  data: EventMapping[Key]
) {
  webContents.send(key, data);
}

// Event validation - currently only checks if the event is coming from the renderer index.html
export function validateEventFrame(frame: WebFrameMain | null) {
  if (!frame) {
    console.error("No event frame found");
    return;
  }
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }
  if (frame.url !== pathToFileURL(getRendererPath()).toString()) {
    throw new Error("Malicious event");
  }
}
