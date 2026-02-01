import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Contacts from "./components/Contacts"; // или ./components/Contacts если там index.js

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" replace />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}