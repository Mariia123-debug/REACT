import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { posts } from "../data/posts";
import styles from "./Post.module.css";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = useMemo(() => posts.find((p) => p.id === id), [id]);

  if (!post) {
    return (
      <section className={styles.card}>
        <h1 className={styles.title}>Статья не найдена</h1>
        <p className={styles.text}>Попробуйте вернуться к списку статей.</p>
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate("/posts")}
        >
          К списку статей
        </button>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.text}>{post.content}</p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate(-1)}
        >
          Назад
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => navigate("/posts")}
        >
          Все статьи
        </button>
      </div>
    </section>
  );
}



