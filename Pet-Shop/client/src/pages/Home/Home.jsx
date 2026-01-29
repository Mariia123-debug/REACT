import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import CategoryCard from "../../shared/ui/CategoryCard/CategoryCard";
import { assetUrl } from "../../shared/api/assets";
import { fetchAllCategories } from "../../shared/api/categoriesApi";

import SaleSection from "./SaleSection";
import styles from "./Home.module.css";

const DISCOUNT_KEY = "petshop_discount_request";

// =====================
// helpers
// =====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Home() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // discount form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [formError, setFormError] = useState("");
  const [discountSent, setDiscountSent] = useState(false);

  // =====================
  // load categories
  // =====================
  useEffect(() => {
    setLoading(true);

    fetchAllCategories()
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error(e);
        setError(e?.message || "Request error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =====================
  // 4 random categories
  // =====================
  const random4Categories = useMemo(() => {
    return shuffle(categories).slice(0, 4);
  }, [categories]);

  // =====================
  // discount submit
  // =====================
  const onGetDiscount = () => {
    const n = name.trim();
    const p = phone.trim();
    const em = email.trim();

    if (!n || !p || !em) {
      setFormError("Please fill in all fields.");
      return;
    }

    setFormError("");

    const payload = {
      name: n,
      phone: p,
      email: em,
      status: 200,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(DISCOUNT_KEY, JSON.stringify(payload));
    setDiscountSent(true);
  };

  return (
    <div className={styles.page}>
      {/* HERO  */}
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
  Amazing Discounts on&nbsp;Pets Products!
                 </h1>

              <button
                className={styles.heroBtn}
                type="button"
                onClick={() => navigate("/products/sale")}
              >
                Check out
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Categories</h2>

              <button
                type="button"
                className={styles.sectionLink}
                onClick={() => navigate("/categories")}
              >
                All categories
              </button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className={styles.error}>{error}</div>}

            {!loading && !error && (
              <div className={styles.categoriesGrid}>
                {random4Categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/categories/${c.id}`}
                    className={styles.categoryLink}
                  >
                    <CategoryCard title={c.title} image={assetUrl(c.image)} />
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* DISCOUNT  */}
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.discount}>
            <h2 className={styles.discountTitle}>5% off on the first order</h2>

            <div className={styles.discountContent}>
              <div className={styles.discountImage} aria-hidden="true" />

              <form
                className={styles.discountForm}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {formError && (
                  <div className={styles.formError}>{formError}</div>
                )}

                <button
                  className={`${styles.discountBtn} ${
                    discountSent ? styles.discountBtnSent : ""
                  }`}
                  type="button"
                  onClick={onGetDiscount}
                  disabled={discountSent}
                >
                  {discountSent ? "Request sent" : "Get a discount"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>

      {/* SALE */}
      <div className={styles.container}>
        <div className={styles.inner}>
          <SaleSection />
        </div>
      </div>
    </div>
  );
}