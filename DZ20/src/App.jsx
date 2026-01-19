import UserList from "./components/UserList";

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 16 }}>
      <h1>DZ20 — Users (useSelector)</h1>
      <UserList />
    </div>
  );
}