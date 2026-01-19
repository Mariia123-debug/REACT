import UserList from "./components/UserList";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DZ21 — Users</h1>
      <p className={styles.subtitle}>
        Redux Toolkit + useSelector + CSS Modules
      </p>

      <UserList />
    </div>
  );
}