import type React from "react";
import { useMemo } from "react";
import "./SystemMonitorWidget.css";

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

  const renderProgressBar = (value: number, total: number, label: string, symbol: string) => (
    <div className="progress-container">
      <div className="progress-header">
        <span>{label}</span>
        <span>
          {value.toFixed(0)}
          {symbol}
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${total}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="system-monitor-widget">
      <h2>System Monitor</h2>
      {renderProgressBar(displayInformation.cpu, displayInformation.cpu, "CPU", "%")}
      {renderProgressBar(
        displayInformation.processes,
        displayInformation.processes,
        "Processes",
        ""
      )}
      {renderProgressBar(
        displayInformation.memoryUsed,
        (displayInformation.memoryUsed / displayInformation.memoryTotal) * 100 || 0,
        "Memory",
        " GB"
      )}
    </div>
  );
};

export default SystemMonitorWidget;
