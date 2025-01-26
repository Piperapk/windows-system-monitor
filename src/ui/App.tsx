import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = window.electronAPI.getIntervalInformation((data) => {
      console.log(data);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
