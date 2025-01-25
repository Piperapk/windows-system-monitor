import path from "path";
import { app, ipcMain } from "electron";
import { EventMapping } from "../../types.js";

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
export function ipcHandle<Key extends keyof EventMapping>(
  key: Key,
  handler: () => EventMapping[Key] | Promise<EventMapping[Key]>
) {
  ipcMain.handle(key, () => handler());
}
