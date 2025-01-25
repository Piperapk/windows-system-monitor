/// <reference path="../../types.d.ts" />

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getIntervalInformation: (callback) => {
    ipcRendererOn("interval-information", (result) => {
      callback(result);
    });
  },
  getStaticInformation: () => ipcRendererInvove("static-information"),
} satisfies Window["electronAPI"]);

function ipcRendererOn<Key extends keyof EventMapping>(
  key: Key,
  callback: (result: EventMapping[Key]) => void
) {
  return ipcRenderer.on(key, (_event, result) => {
    callback(result);
  });
}

function ipcRendererInvove<Key extends keyof EventMapping>(
  key: Key
): Promise<EventMapping[Key]> {
  return ipcRenderer.invoke(key);
}
