
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import styles from "./Posts.module.css";

export default function Posts() {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Список статей</h1>

      <ul className={styles.list}>
        {posts.map((p) => (
          <li key={p.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <h3 className={styles.postTitle}>{p.title}</h3>
              <Link className={styles.link} to={`/posts/${p.id}`}>
                Читать
              </Link>
            </div>
            <p className={styles.excerpt}>{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}