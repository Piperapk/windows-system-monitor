import { Systeminformation } from "systeminformation";

declare global {
  type DynamicData = {
    currentLoad: Systeminformation.CurrentLoadData;
    mem: Systeminformation.MemData;
    processes: Systeminformation.ProcessesData;
  };

  type StaticData = {
    cpu: Systeminformation.CpuData;
    osInfo: Systeminformation.OsData;
    graphics: Systeminformation.GraphicsData;
    mem: Systeminformation.MemData;
  };

  type EventMapping = {
    "interval-information": DynamicData;
    "static-information": StaticData;
  };

  type UnsubscribeFunction = () => void;

  interface Window {
    electronAPI: {
      getIntervalInformation: (callback: (data: DynamicData) => void) => UnsubscribeFunction;
      getStaticInformation: () => Promise<StaticData>;
    };
  }
}
