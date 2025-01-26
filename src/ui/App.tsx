import { useEffect, useMemo, useState } from "react";
import "./App.css";
import SystemMonitorWidget from "./components/SystemMonitorWidget";

function App() {
  const [intervalInformation, setIntervalInformation] = useState<DynamicData | null>(null);
  const displayInformation = useMemo((): DisplayInformation => {
    const cpu = intervalInformation?.currentLoad.currentLoad || 0;
    const memoryUsed = (intervalInformation?.mem.used ?? 0) * 1e-9;
    const memoryTotal = (intervalInformation?.mem.free ?? 0) * 1e-9 + memoryUsed || 0;

    return { cpu, gpu: 0, memoryUsed, memoryTotal };
  }, [intervalInformation]);

  useEffect(() => {
    const unsubscribe = window.electronAPI.getIntervalInformation((data) => {
      console.log(data);
      setIntervalInformation(data);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <SystemMonitorWidget displayInformation={displayInformation} />
    </>
  );
}

export default App;
