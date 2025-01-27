import type React from "react";
import { useContext, useMemo } from "react";
import "./SystemMonitorWidget.css";
import { Cpu, MemoryStickIcon, AlignJustify } from "lucide-react";
import InformationLineAndBar from "./InformationLineAndBar";
import InformationLine from "./InformationLine";
import { IntervalInformationContext } from "../App";

interface DisplayInformation {
  cpu: number;
  processes: number;
  memoryUsed: number;
  memoryTotal: number;
}

const SystemMonitorWidget: React.FC = () => {
  const intervalInformation = useContext(IntervalInformationContext);
  const displayInformation = useMemo((): DisplayInformation => {
    const cpu = intervalInformation?.currentLoad.currentLoad || 0;
    const memoryUsed = (intervalInformation?.mem.used ?? 0) * 1e-9;
    const memoryTotal = (intervalInformation?.mem.free ?? 0) * 1e-9 + memoryUsed || 0;
    const processes = intervalInformation?.processes.list.length || 0;

    return { cpu, processes, memoryUsed, memoryTotal };
  }, [intervalInformation]);

  return (
    <div className="wrapper w-full p-6 rounded-lg">
      <h2 className="mb-4 font-bold">System Monitor</h2>
      <InformationLineAndBar
        value={displayInformation.cpu}
        total={displayInformation.cpu}
        label="CPU"
        symbol="%"
        Icon={Cpu}
      />
      <InformationLineAndBar
        value={displayInformation.memoryUsed}
        total={(displayInformation.memoryUsed / displayInformation.memoryTotal) * 100 || 0}
        label="Memory"
        symbol="GB"
        Icon={MemoryStickIcon}
      />
      <InformationLine value={displayInformation.processes} label="Processes" Icon={AlignJustify} />
    </div>
  );
};

export default SystemMonitorWidget;
