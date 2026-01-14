import User from "./User.jsx";
import UserForm from "./UserForm.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h1>User State (Redux)</h1>
      <User />
      <UserForm />
    </div>
  );
}