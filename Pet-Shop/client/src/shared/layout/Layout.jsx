import { Outlet } from "react-router-dom";
import Header from "../ui/Header/Header";
import Footer from "../ui/Footer/Footer";
import styles from "./Layout.module.css";

export default function Layout() {
 
  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <div className="inner">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}