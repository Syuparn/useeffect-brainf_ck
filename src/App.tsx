import { useEffect, useState } from "react";
import { useBrain } from "./hooks/brain";

function App() {
  const [source, setSource] = useState("");
  const [inputStr, setInputStr] = useState("");
  const [brain, runBrain] = useBrain();

  return (
    <div className="App">
      <h1>Brainf*ck Interpreter Powered by UseEffect</h1>
      <div>
        <h2>Source</h2>
        <input
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
        <h2>Input</h2>
        <input
          value={inputStr}
          onChange={(event) => setInputStr(event.target.value)}
        />
      </div>
      <br />
      <button onClick={() => runBrain(source, inputStr)}>Run!</button>
      <h2>Result</h2>
      <p>{new TextDecoder().decode(brain.output)}</p>
    </div>
  );
}

export default App;
