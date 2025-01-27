import { useEffect, useState } from "react";
import "./App.css";
import SystemMonitorWidget from "./components/SystemMonitorWidget";
import { createContext } from "react";
export const IntervalInformationContext = createContext<DynamicData | null>(null);

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
      <IntervalInformationContext.Provider value={intervalInformation}>
        <SystemMonitorWidget />
      </IntervalInformationContext.Provider>
    </>
  );
}

export default App;
