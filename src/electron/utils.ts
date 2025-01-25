import path from "path";
import { app, ipcMain, WebContents } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "dist-electron/preload.cjs"
  );
}

// Type-safe IPC handle wrapper
export function ipcMainHandle<Key extends keyof EventMapping>(
  key: Key,
  handler: () => EventMapping[Key] | Promise<EventMapping[Key]>
) {
  ipcMain.handle(key, () => handler());
}

// Type-safe WebContents send wrapper
export function ipcWebContentsSend<Key extends keyof EventMapping>(
  key: Key,
  webContents: WebContents,
  data: EventMapping[Key]
) {
  webContents.send(key, data);
}
