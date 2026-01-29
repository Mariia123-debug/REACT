import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import notFoundImg from "../../assets/images/404.png";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Место под картинку */}
        <div className={styles.imageBox}>
          {/* позже сюда можно вставить img */}
          <img src={notFoundImg} alt="Page not found" />
        </div>

        <h1>Page Not Found</h1>
        <p>Sorry, the page you requested could not be found.</p>

        <button onClick={() => navigate("/")} className={styles.button}>
          Go Home
        </button>
      </div>
    </div>
  );
}
