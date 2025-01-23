import { BrowserWindow } from "electron";
import * as system from "systeminformation";

export function getPooledInformation(mainWindow: BrowserWindow) {
  setInterval(() => {
    console.log("Getting polled system information...");
    mainWindow.webContents.send("pooled-information", {});
  }, 2500);
}

export function getStaticInformation() {
  return getSystemData();
}

async function getSystemData() {
  // define all values, you want to get back
  const staticData = {
    cpu: "*",
    osInfo: "platform, release, arch",
    graphics: "controllers, displays",
    mem: "total, free, used",
  };

  try {
    const result = await system.get(staticData);
    return result;
  } catch (e) {
    console.log(e);
  }
}
