import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h2 className={styles.title}>Contact</h2>

          <div className={styles.info}>
            <div className={styles.card}>
              <div className={styles.label}>Phone</div>
              <div className={styles.value}>+49 30 915-88492</div>
            </div>

            <div className={styles.card}>
              <div className={styles.label}>Socials</div>

              <div className={styles.icons}>
                <Link
                  to="/not-existing-page"
                  className={styles.iconLink}
                  aria-label="Instagram"
                >
                  <span
                    className={`${styles.icon} ${styles.iconInstagram}`}
                  />
                </Link>

                <Link
                  to="/not-existing-page"
                  className={styles.iconLink}
                  aria-label="WhatsApp"
                >
                  <span
                    className={`${styles.icon} ${styles.iconWhatsapp}`}
                  />
                </Link>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.label}>Address</div>
              <div className={styles.value}>
                Wallstraße 9-13, 10179 Berlin, Deutschland
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.label}>Working Hours</div>
              <div className={styles.value}>24 hours a day</div>
            </div>
          </div>

          <div className={styles.map} aria-label="Map" />
        </div>
      </div>
    </footer>
  );
}
