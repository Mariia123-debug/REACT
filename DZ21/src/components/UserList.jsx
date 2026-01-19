import { useSelector } from "react-redux";
import styles from "./UserList.module.css";

export default function UserList() {
  const users = useSelector((state) => state.users.list);

  return (
    <ul className={styles.list}>
      {users.map((u) => (
        <li key={u.id} className={styles.item}>
          <div className={styles.name}>{u.name}</div>
          <div className={styles.row}>Email: {u.email}</div>
          <div className={styles.row}>City: {u.city}</div>
        </li>
      ))}
    </ul>
  );
}