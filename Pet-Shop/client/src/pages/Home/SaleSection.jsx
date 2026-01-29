import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../shared/api/axiosClient";
import styles from "./Home.module.css";

const PRODUCTS_URL = "/products/all";

// =====================
// helpers
// =====================
function shuffle(arr) {
  // Fisher–Yates
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SaleSection() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setStatus("loading");
        setError("");

        const res = await axiosClient.get(PRODUCTS_URL);
        const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];

        if (!ignore) {
          setItems(data);
          setStatus("success");
        }
      } catch (e) {
        if (!ignore) {
          setStatus("error");
          setError(e?.message || "Request failed");
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // берём только товары со скидкой и случайные 4
  const saleItems = useMemo(() => {
    const discounted = items.filter((p) => Number(p.discont_price) > 0);
    return shuffle(discounted).slice(0, 4);
  }, [items]);

  return (
    <section className={styles.saleSection}>
      <div className={styles.saleHeader}>
        <h2 className={styles.saleTitle}>Sale</h2>

        {/* ✅ переход на страницу всех скидок */}
        <button
          type="button"
          className={styles.saleLink}
          onClick={() => navigate("/products/sale")}
        >
          All sales
        </button>
      </div>

      {status === "loading" && (
        <div className={styles.saleEmpty}>Loading...</div>
      )}

      {status === "error" && (
        <div className={styles.saleEmpty}>Error: {error}</div>
      )}

      {status === "success" && (
        <div className={styles.saleGrid}>
          {saleItems.map((p) => {
            const title = p.title ?? p.name ?? "Product";

            const price = Number(p.price) || 0;
            const discontPrice = Number(p.discont_price) || 0;

            const discountPercent =
              price > 0 && discontPrice > 0
                ? Math.round((1 - discontPrice / price) * 100)
                : null;

            const imgSrc = p.image ? `http://localhost:3333${p.image}` : "";

            const goToProduct = () => navigate(`/products/${p.id}`);

            return (
              <article
                className={styles.card}
                key={p.id}
                role="link"
                tabIndex={0}
                onClick={goToProduct}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToProduct();
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.cardImgWrap}>
                  {imgSrc ? (
                    <img
                      className={styles.cardImg}
                      src={imgSrc}
                      alt={title}
                      draggable="false"
                    />
                  ) : (
                    <div className={styles.cardImgFallback}>No image</div>
                  )}

                  {discountPercent !== null && (
                    <span className={styles.cardBadge}>
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.cardName}>{title}</p>

                  <div className={styles.cardPriceRow}>
                    <span className={styles.cardPrice}>
                      ${discontPrice}
                    </span>

                    {/* показываем старую цену только если есть скидка */}
                    {discontPrice > 0 && price > 0 && discontPrice < price && (
                      <span className={styles.cardOldPrice}>${price}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
