import { useSelector } from "react-redux";

export default function UserList() {
  const users = useSelector((state) => state.users.list);

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id} style={{ marginBottom: 10 }}>
          <strong>{u.name}</strong>
          <div>Email: {u.email}</div>
          <div>City: {u.city}</div>
        </li>
      ))}
    </ul>
  );
}