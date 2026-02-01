import React from "react";

import snapchatLogo from "../assets/snapchat.png";
import facebookLogo from "../assets/facebook.png";
import xLogo from "../assets/x.png";

import styles from "../Contacts.module.css";

const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Пока без логики отправки (в задании не требуется)
  };

  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <h1 className={styles.title}>Контакты</h1>

        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.label}>Телефон:</span>{" "}
            <a className={styles.link} href="tel:+436641234567">
              +43 664 123 45 67
            </a>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Email:</span>{" "}
            <a className={styles.link} href="mailto:info@example.com">
              info@example.com
            </a>
          </li>
        </ul>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Имя"
            required
          />
          <input
            className={styles.input}
            type="text"
            name="message"
            placeholder="Сообщение"
            required
          />

          <button className={styles.button} type="submit">
            Отправить
          </button>
        </form>
      </div>

      <div className={styles.right}>
        <p className={styles.socialTitle}>Найдите нас на:</p>

        <div className={styles.socialRow}>
          <a
            className={styles.socialLink}
            href="https://www.snapchat.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Snapchat"
          >
            <img className={styles.socialIcon} src={snapchatLogo} alt="Snapchat" />
          </a>

          <a
            className={styles.socialLink}
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img className={styles.socialIcon} src={facebookLogo} alt="Facebook" />
          </a>

          <a
            className={styles.socialLink}
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
          >
            <img className={styles.socialIcon} src={xLogo} alt="X" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
