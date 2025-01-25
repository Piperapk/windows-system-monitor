import { BrowserWindow } from "electron";
import * as system from "systeminformation";
import { StaticData } from "../../types.js";

const POOLING_RATE = 2500;

export function getIntervalInformation(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const dynamicData = {
      currentLoad: "currentLoad",
      mem: "free, used",
      processes: "list",
    };

    const result = await system.get(dynamicData);
    mainWindow.webContents.send("interval-information", result);
  }, POOLING_RATE);
}

export async function getStaticInformation(): Promise<StaticData> {
  const staticData = {
    cpu: "*",
    osInfo: "platform, release, arch",
    graphics: "controllers, displays",
    mem: "total",
  };

  try {
    const result = await system.get(staticData);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
