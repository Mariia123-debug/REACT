import { useEffect, useState } from "react";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    const value = inputValue.trim();
    if (!value) return;

    setItems((prev) => [...prev, value]);
    setInputValue("");
  };

  // НАМЕРЕННАЯ ОШИБКА (из задания)
  //useEffect(() => {
    // eslint-disable-next-line no-console
    //console.log("Компонент ListItems обновлен");
  //}, [items]);

  useEffect(() => {
 
  console.log("Компонент ListItems смонтирован");
}, []);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>List Items</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите элемент"
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}