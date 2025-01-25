const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getIntervalInformation: (callback) => {
    ipcRenderer.on("interval-information", (_event, result) => {
      callback(result);
    });
  },
  getStaticInformation: () => ipcRenderer.invoke("static-information"),
} satisfies Window["electronAPI"]);
