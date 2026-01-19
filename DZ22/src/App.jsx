import Quote from "./components/Quote";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Random Quote</h1>
      <Quote />
    </div>
  );
}
