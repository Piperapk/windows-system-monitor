const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getIntervalInformation: (callback: (data: any) => void) => {
    ipcRenderer.on("interval-information", (_event, result) => {
      callback(result);
    });
  },
  getStaticInformation: () => ipcRenderer.invoke("static-information"),
});
