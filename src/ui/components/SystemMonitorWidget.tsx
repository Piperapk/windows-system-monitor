import type React from "react";
import "./SystemMonitorWidget.css";

interface Props {
  displayInformation: DisplayInformation;
}

const SystemMonitorWidget: React.FC<Props> = ({ displayInformation }) => {
  const renderProgressBar = (value: number, total: number, label: string, symbol: string) => (
    <div className="progress-container">
      <div className="progress-header">
        <span>{label}</span>
        <span>
          {value.toFixed(1)}
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
      {renderProgressBar(displayInformation.cpu || 0, displayInformation.cpu || 0, "CPU", "%")}
      {renderProgressBar(displayInformation.gpu, displayInformation.gpu, "GPU", "%")}
      {renderProgressBar(
        displayInformation.memoryUsed || 0,
        (displayInformation.memoryUsed / displayInformation.memoryTotal) * 100 || 0,
        "Memory",
        " GB"
      )}
    </div>
  );
};

export default SystemMonitorWidget;
