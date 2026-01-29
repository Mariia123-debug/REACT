import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import { assetUrl } from "../../api/assets";
import styles from "./SmartProductsList.module.css";

// =====================
// cart (localStorage) — единый ключ как в Header
// =====================
const CART_KEY = "petshop_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // ✅ чтобы Header сразу обновил badge в этой же вкладке
  window.dispatchEvent(new Event("cart:updated"));
}

// =====================
// helpers
// =====================
function formatPrice(n) {
  return `$${n}`;
}

export default function SmartProductsList({
  title,
  breadcrumbs = [],
  products = [],
  status = "success",
  error = "",
  showReset = true,
}) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("default");

  // корзина из localStorage
  const [cart, setCart] = useState(() => readCart());

  // =====================
  // cart sync
  // =====================
  useEffect(() => {
    const sync = () => setCart(readCart());

    // обновление в этой вкладке (мы диспатчим в writeCart)
    window.addEventListener("cart:updated", sync);
    // обновление между вкладками
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cart:updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // =====================
  // cart helpers/actions
  // =====================
  const isInCart = (id) => cart.some((x) => Number(x.id) === Number(id));

  // toggle: Add -> Added (черная) и обратно (синяя) + удаление
  const toggleCart = (id) => {
    setCart((prev) => {
      const exists = prev.some((x) => Number(x.id) === Number(id));

      const next = exists
        ? prev.filter((x) => Number(x.id) !== Number(id)) // удалить полностью
        : [...prev, { id: Number(id), qty: 1 }]; // добавить 1 шт

      writeCart(next);
      return next;
    });
  };

  // =====================
  // filter + sort (ТОЛЬКО ПО price)
  // =====================
  const filteredProducts = useMemo(() => {
    let list = [...products];

    const minN = min !== "" ? Number(min) : null;
    const maxN = max !== "" ? Number(max) : null;

    if (minN !== null) list = list.filter((p) => Number(p.price) >= minN);
    if (maxN !== null) list = list.filter((p) => Number(p.price) <= maxN);

    if (sort === "asc") list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "desc") list.sort((a, b) => Number(b.price) - Number(a.price));

    return list;
  }, [products, min, max, sort]);

  const onReset = () => {
    setMin("");
    setMax("");
    setSort("default");
  };

  // =====================
  // render
  // =====================
  return (
    <section className={styles.page}>
      {/* breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className={styles.breadcrumbs}>
          <Breadcrumbs>
            {breadcrumbs.map((b, i) =>
              b.to ? (
                <Link key={i} to={b.to} className={styles.crumbLink}>
                  {b.label}
                </Link>
              ) : (
                <Typography key={i}>{b.label}</Typography>
              )
            )}
          </Breadcrumbs>
        </div>
      )}

      {/* header */}
      <div className={styles.headerRow}>
        <h1 className={styles.title}>{title}</h1>
        
      </div>

      {/* controls */}
      <div className={styles.controls}>
        <div className={styles.priceFilter}>
          <span>Price</span>
          <input
            type="number"
            placeholder="from"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>

        <div className={styles.sort}>
          <span>Sorted</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">by default</option>
            <option value="asc">price ↑</option>
            <option value="desc">price ↓</option>
          </select>
        </div>
        </div>

       

      {/* grid */}
      <div className={styles.productsGrid}>
        {filteredProducts.map((p) => {
          const discont = Number(p.discont_price);
          const hasDiscount = discont > 0;

          const price = hasDiscount ? discont : Number(p.price);
          const added = isInCart(p.id);

          return (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className={styles.productCard}
            >
              <div className={styles.productImgWrap}>
                <img
                  className={styles.productImg}
                  src={assetUrl(p.image)}
                  alt={p.title}
                />

                <button
                  className={`${styles.cartBtnOnImg} ${
                    added ? styles.cartBtnAdded : styles.cartBtnAdd
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCart(p.id);
                  }}
                >
                  {added ? "Added" : "Add to cart"}
                </button>
              </div>

              <div className={styles.productBody}>
                <div className={styles.productTitle}>{p.title}</div>

                <div className={styles.priceRow}>
                  <div className={styles.price}>{formatPrice(price)}</div>

                  {hasDiscount && (
                    <div className={styles.oldPrice}>
                      {formatPrice(Number(p.price))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {status === "loading" && <div>Loading…</div>}
      {status === "error" && <div>Error: {error}</div>}
    </section>
  );
}
