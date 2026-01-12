import Filter from "./components/Filter";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>User Filter (Redux)</h1>
      <Filter />
      <UserList />
    </div>
  );
}
