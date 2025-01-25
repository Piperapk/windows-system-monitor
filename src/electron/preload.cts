const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getIntervalInformation: (callback) => {
    return ipcRendererOn("interval-information", (result) => {
      callback(result);
    });
  },
  getStaticInformation: () => ipcRendererInvove("static-information"),
} satisfies Window["electronAPI"]);

function ipcRendererOn<Key extends keyof EventMapping>(
  key: Key,
  callback: (result: EventMapping[Key]) => void
) {
  const wrapperCallback = (_event: Electron.IpcRendererEvent, result: any) => callback(result); // Electron event type returns any
  ipcRenderer.on(key, wrapperCallback); // Rub subscribe
  return () => ipcRenderer.off(key, wrapperCallback); // Return unsubscribe function
}

function ipcRendererInvove<Key extends keyof EventMapping>(key: Key): Promise<EventMapping[Key]> {
  return ipcRenderer.invoke(key);
}
