import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  const getNavClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>Simple Blog</div>

        <nav className={styles.nav}>
          <NavLink to="/" className={getNavClass} end>
            Home
          </NavLink>
          <NavLink to="/posts" className={getNavClass}>
            Posts
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>DZ11 • React Router</footer>
    </div>
  );
}