import { useCallback, useMemo, useState } from "react";
import UserList from "./UserList.jsx";

const userList = [
  { id: 1, name: "Anna" },
  { id: 2, name: "Michael" },
  { id: 3, name: "Olena" },
  { id: 4, name: "John" },
  { id: 5, name: "Maria" },
  { id: 6, name: "Andreas" },
  { id: 7, name: "Gudrun" },
];

export default function App() {
  console.count("App render");

  const [filter, setFilter] = useState("");

  // 1) Мемоизируем функцию фильтрации
  const filterUsers = useCallback((text) => {
    const normalized = text.trim().toLowerCase();
    if (!normalized) return userList;

    return userList.filter((u) =>
      u.name.toLowerCase().includes(normalized)
    );
  }, []);

  // 2) Мемоизируем результат фильтрации
  const filteredUsers = useMemo(() => {
    return filterUsers(filter);
  }, [filter, filterUsers]);

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1>Filter Users (useMemo + useCallback)</h1>

      <input
        type="text"
        placeholder="Type to filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #d0d0d0",
          marginBottom: 14,
        }}
      />

      <UserList users={filteredUsers} />
    </div>
  );
}