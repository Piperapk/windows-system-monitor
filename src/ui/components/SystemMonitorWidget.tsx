import type React from "react";
import { useMemo } from "react";
import "./SystemMonitorWidget.css";
import { Cpu, MemoryStickIcon, AlignJustify } from "lucide-react";

interface DisplayInformation {
  cpu: number;
  processes: number;
  memoryUsed: number;
  memoryTotal: number;
}

interface Props {
  intervalInformation: DynamicData | null;
}

const SystemMonitorWidget: React.FC<Props> = ({ intervalInformation }) => {
  const displayInformation = useMemo((): DisplayInformation => {
    const cpu = intervalInformation?.currentLoad.currentLoad || 0;
    const memoryUsed = (intervalInformation?.mem.used ?? 0) * 1e-9;
    const memoryTotal = (intervalInformation?.mem.free ?? 0) * 1e-9 + memoryUsed || 0;
    const processes = intervalInformation?.processes.list.length || 0;

    return { cpu, processes, memoryUsed, memoryTotal };
  }, [intervalInformation]);

  const renderProgressBar = (
    value: number,
    total: number,
    label: string,
    symbol: string,
    Icon: React.ElementType
  ) => (
    <div className="mb-5">
      <div className="flex justify-start text-sm font-semibold">
        <Icon className="mt-0.5" size={16} />
        <span>{label}</span>
        <span>
          {value.toFixed(0)}
          {symbol}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="h-full bg-slate-700 transition-all ease-in"
          style={{ width: `${total}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="wrapper w-full p-6 rounded-lg">
      <h2 className="mb-4 font-bold">System Monitor</h2>
      {renderProgressBar(displayInformation.cpu, displayInformation.cpu, "CPU", "%", Cpu)}
      {renderProgressBar(
        displayInformation.memoryUsed,
        (displayInformation.memoryUsed / displayInformation.memoryTotal) * 100 || 0,
        "Memory",
        "GB",
        MemoryStickIcon
      )}
      {renderProgressBar(
        displayInformation.processes,
        displayInformation.processes,
        "Processes",
        "",
        AlignJustify
      )}
    </div>
  );
};

export default SystemMonitorWidget;
