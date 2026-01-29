import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { assetUrl } from "../../shared/api/assets";
import axiosClient from "../../shared/api/axiosClient";

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function getDiscountPercent(price, discountPrice) {
  if (!price || !discountPrice) return null;
  if (discountPrice >= price) return null;
  return Math.round(((price - discountPrice) / price) * 100);
}

function buildFakeThumbs(imagePath, count = 5) {
  if (!imagePath) return [];
  return Array.from({ length: count }, () => imagePath);
}

const CART_KEY = "petshop_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: { items } }));
}

function getQtyFromCart(productId) {
  const cart = readCart();
  const found = cart.find((x) => Number(x.id) === Number(productId));
  return found ? Number(found.qty || 0) : 0;
}

function setQtyInCart(productId, newQty) {
  const cart = readCart();
  const id = Number(productId);

  const next = Array.isArray(cart) ? [...cart] : [];
  const idx = next.findIndex((x) => Number(x.id) === id);

  if (newQty <= 0) {
    if (idx >= 0) next.splice(idx, 1);
    writeCart(next);
    return;
  }

  const item = { id, qty: newQty };
  if (idx >= 0) next[idx] = { ...next[idx], ...item };
  else next.push(item);

  writeCart(next);
}

export default function ProductPage() {
  const { id } = useParams();
  const productId = Number(id);

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setStatus("loading");
        setError("");

        const res = await axiosClient.get("/products/all");
        const data = Array.isArray(res.data) ? res.data : res.data?.data;
        const list = Array.isArray(data) ? data : [];

        if (!ignore) {
          setProducts(list);
          setStatus("success");
        }
      } catch (e) {
        if (!ignore) {
          setStatus("error");
          setError(e?.message || "Failed to load product");
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const product = useMemo(
    () => products.find((p) => Number(p.id) === productId) || null,
    [products, productId]
  );

  // при появлении product — обновляем qty
  useEffect(() => {
    if (!product) return;
    setQty(getQtyFromCart(product.id));
  }, [product]);

  // синхронизация если корзина менялась извне
  useEffect(() => {
    if (!product) return;

    const sync = () => setQty(getQtyFromCart(product.id));

    window.addEventListener("cart:updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cart:updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [product]);

  if (status === "loading") return <div className={styles.state}>Loading…</div>;
  if (status === "error") return <div className={styles.state}>Error: {error}</div>;
  if (!product) return <div className={styles.state}>Product not found.</div>;

  const title = product.title ?? product.name ?? "Product";
  const description = product.description ?? product.desc ?? "";

  const price = toNumber(product.price);
  const discountPrice = toNumber(product.discont_price);
  const hasDiscount = discountPrice != null && discountPrice > 0 && price != null;

  const finalPrice = hasDiscount ? discountPrice : price;
  const oldPrice = hasDiscount ? price : null;
  const discountPercent = hasDiscount ? getDiscountPercent(price, discountPrice) : null;

  const mainImage = product.image ?? "";
  const thumbs = buildFakeThumbs(mainImage, 4);
  const displayImage = thumbs[activeThumb] ?? mainImage;

  const isInCart = qty > 0;

  const decQty = () => {
    const next = Math.max(0, qty - 1);
    setQty(next);
    setQtyInCart(product.id, next);
  };

  const incQty = () => {
    const next = qty + 1;
    setQty(next);
    setQtyInCart(product.id, next);
  };

  // ✅ toggle: Added повторно → remove + вернуться в начальное состояние
  const onToggleAdd = () => {
    if (isInCart) {
      setQty(0);
      setQtyInCart(product.id, 0);
    } else {
      setQty(1);
      setQtyInCart(product.id, 1);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.crumbLink}>
          Main page
        </Link>
        <span className={styles.crumbSep}>/</span>
        <span className={styles.crumbCurrent}>{title}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {thumbs.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.thumbBtn} ${idx === activeThumb ? styles.thumbActive : ""}`}
                onClick={() => setActiveThumb(idx)}
                aria-label={`Preview ${idx + 1}`}
              >
                <img className={styles.thumbImg} src={assetUrl(img)} alt="" />
              </button>
            ))}
          </div>

          <div className={styles.mainImageWrap}>
            {displayImage ? (
              <img className={styles.mainImage} src={assetUrl(displayImage)} alt={title} />
            ) : (
              <div className={styles.noImg}>No image</div>
            )}
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.priceBlock}>
            <div className={styles.priceRow}>
              {finalPrice != null && <div className={styles.price}>${finalPrice}</div>}
              {oldPrice != null && <div className={styles.oldPrice}>${oldPrice}</div>}
              {discountPercent != null && (
                <div className={styles.discountPill}>-{discountPercent}%</div>
              )}
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.qty}>
              <button type="button" className={styles.qtyBtn} onClick={decQty} aria-label="Decrease">
                –
              </button>
              <div className={styles.qtyValue}>{qty}</div>
              <button type="button" className={styles.qtyBtn} onClick={incQty} aria-label="Increase">
                +
              </button>
            </div>

            <button
              type="button"
              className={`${styles.addBtn} ${isInCart ? styles.addedBtn : ""}`}
              onClick={onToggleAdd}
            >
              {isInCart ? "Added" : "Add to cart"}
            </button>
          </div>

          {description && (
            <div className={styles.descBlock}>
              <div className={styles.descTitle}>Description</div>
              <p className={styles.desc}>{description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
