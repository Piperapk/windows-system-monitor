import { useEffect, useState } from "react";
import "./App.css";
import SystemMonitorWidget from "./components/SystemMonitorWidget";

function App() {
  const [intervalInformation, setIntervalInformation] = useState<DynamicData | null>(null);

  useEffect(() => {
    const unsubscribe = window.electronAPI.getIntervalInformation((data) => {
      console.log(data);
      setIntervalInformation(data);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <SystemMonitorWidget intervalInformation={intervalInformation} />
    </>
  );
}

export default App;
