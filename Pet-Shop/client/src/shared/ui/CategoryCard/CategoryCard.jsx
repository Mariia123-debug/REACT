import styles from './CategoryCard.module.css';

export default function CategoryCard({ title, image }) {
  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={image} alt={title} />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </article>
  );
}