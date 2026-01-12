import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Главная</h1>
      <p className={styles.text}>
        Это простой блог на React + react-router-dom. Перейдите к списку статей.
      </p>

      <button
        type="button"
        className={styles.button}
        onClick={() => navigate("/posts")}
      >
        Перейти к статьям
      </button>
    </section>
  );
}