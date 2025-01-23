const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electronAPI", {
  sendIntervalData: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("static-information", (_, data) => {
      callback(data);
    });
  },
  getStaticInformation: () =>
    electron.ipcRenderer.invoke("onGetStaticInformation"),
});
