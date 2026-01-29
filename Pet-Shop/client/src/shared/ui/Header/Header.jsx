import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshCount } from "../../../features/cart/cartSlice";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector((state) => state.cart.count);

  useEffect(() => {
    const sync = () => dispatch(refreshCount());

    // initial sync (на случай если localStorage уже заполнен)
    sync();

    window.addEventListener("cart:updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cart:updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logoLink} aria-label="Pet Shop home">
          <img className={styles.logo} src="/icons/logo.svg" alt="Pet Shop" />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to="/"
            end
          >
            Main Page
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to="/categories"
          >
            Categories
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to="/products"
            end
          >
            All products
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to="/products/sale"
          >
            All sales
          </NavLink>
        </nav>

        <button
          type="button"
          className={styles.cartBtn}
          onClick={() => navigate("/cart")}
          aria-label="Open cart"
        >
          <img className={styles.cartIcon} src="/icons/bag.svg" alt="" />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
