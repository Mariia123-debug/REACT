import { useState } from "react";
import ValueDisplay from "./ValueDisplay";
import "./App.css";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="app">
      <h1>Current / Previous Value</h1>

      <input
        className="input"
        type="text"
        value={value}
        placeholder="Введите текст..."
        onChange={(e) => setValue(e.target.value)}
      />

      <ValueDisplay value={value} />
    </div>
  );
}
