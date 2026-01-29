import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";
import { assetUrl } from "../../shared/api/assets";
import axiosClient from "../../shared/api/axiosClient";

const CART_KEY = "petshop_cart";
const ORDERS_KEY = "petshop_orders";

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = JSON.parse(raw || "");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function writeCart(items) {
  writeLS(CART_KEY, items);
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: { items } }));
}

function normalizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => ({
      id: Number(x?.id),
      qty: Number(x?.qty || 0),
    }))
    .filter((x) => Number.isFinite(x.id) && x.qty > 0);
}

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => normalizeCart(readLS(CART_KEY, [])));
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  // form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  // modal
  const [successOpen, setSuccessOpen] = useState(false);

  // show message when form is valid but cart is empty
  const [emptyCartMsg, setEmptyCartMsg] = useState(false);

  useEffect(() => {
    const sync = () => setCart(normalizeCart(readLS(CART_KEY, [])));
    sync();

    window.addEventListener("cart:updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cart:updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
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
          setError(e?.message || "Failed to load products");
        }
      }
    }

    loadProducts();
    return () => {
      ignore = true;
    };
  }, []);

  const cartLines = useMemo(() => {
    const byId = new Map(products.map((p) => [Number(p.id), p]));

    return cart
      .map((c) => {
        const p = byId.get(Number(c.id));
        if (!p) return null;

        const basePrice = toNumber(p.price);
        const discountPrice = toNumber(p.discont_price);
        const hasDiscount =
          discountPrice != null && discountPrice > 0 && basePrice != null;

        const unitPrice = hasDiscount ? discountPrice : basePrice;
        const oldPrice = hasDiscount ? basePrice : null;

        return {
          id: Number(p.id),
          qty: c.qty,
          title: p.title ?? p.name ?? "Product",
          image: p.image ?? "",
          unitPrice: unitPrice ?? 0,
          oldPrice,
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  // auto-hide "cart is empty" message when cart becomes non-empty
  useEffect(() => {
    if (cartLines.length > 0) setEmptyCartMsg(false);
  }, [cartLines.length]);

  const totalItems = useMemo(
    () => cartLines.reduce((sum, x) => sum + Number(x.qty || 0), 0),
    [cartLines]
  );

  const totalPrice = useMemo(
    () => cartLines.reduce((sum, x) => sum + x.qty * x.unitPrice, 0),
    [cartLines]
  );

  const updateQty = (id, nextQty) => {
    const next = cart
      .map((x) => (x.id === id ? { ...x, qty: nextQty } : x))
      .filter((x) => Number(x.qty || 0) > 0);

    writeCart(next);
  };

  const removeItem = (id) => {
    const next = cart.filter((x) => x.id !== id);
    writeCart(next);
  };

  const isValid = name.trim() && phone.trim() && email.trim();

  const onOrder = () => {
    setTouched(true);

    // if form is valid but cart is empty => show message
    if (isValid && cartLines.length === 0) {
      setEmptyCartMsg(true);
      return;
    }

    // if form invalid => highlight fields via touched/inputError
    if (!isValid) return;

    setEmptyCartMsg(false);

    const ordersPrev = readLS(ORDERS_KEY, []);
    const orders = Array.isArray(ordersPrev) ? ordersPrev : [];

    const order = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      createdAt: new Date().toISOString(),
      customer: { name: name.trim(), phone: phone.trim(), email: email.trim() },
      items: cartLines,
      totalItems,
      totalPrice,
      status: 200,
    };

    orders.push(order);
    writeLS(ORDERS_KEY, orders);

    // показываем модалку, корзину чистим ПОСЛЕ закрытия
    setSuccessOpen(true);

    setName("");
    setPhone("");
    setEmail("");
    setTouched(false);
  };

  const closeSuccessModal = () => {
    setSuccessOpen(false);

    // очищаем корзину ПОСЛЕ закрытия модалки
    writeCart([]);
    setCart([]); // важно: мгновенно обновить UI
  };

  if (status === "loading") return <div className={styles.page}>Loading…</div>;
  if (status === "error")
    return <div className={styles.page}>Error: {error}</div>;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Shopping cart</h1>

      <div className={styles.layout}>
        {/* LEFT */}
        <div className={styles.list}>
          {cartLines.length === 0 ? (
            <div className={styles.empty}>Cart is empty</div>
          ) : (
            cartLines.map((item) => {
              const hasOld =
                item.oldPrice != null &&
                Number(item.oldPrice) > Number(item.unitPrice);

              const goToProduct = () => navigate(`/products/${item.id}`);

              return (
                <article key={item.id} className={styles.card}>
                  {/* кликабельная зона (картинка + контент) */}
                  <div
                    className={styles.clickArea}
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
                    <div className={styles.imageWrap}>
                      <img
                        className={styles.image}
                        src={assetUrl(item.image)}
                        alt={item.title}
                        draggable="false"
                      />
                    </div>

                    <div className={styles.content}>
                      <div className={styles.topRow}>
                        <div className={styles.name} title={item.title}>
                          {item.title}
                        </div>

                        <button
                          className={styles.remove}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                          aria-label="Remove"
                          type="button"
                        >
                          ✕
                        </button>
                      </div>

                      <div className={styles.bottomRow}>
                        <div className={styles.qtyRow}>
                          <button
                            className={styles.qtyBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQty(item.id, item.qty - 1);
                            }}
                            aria-label="Decrease"
                            type="button"
                          >
                            –
                          </button>

                          <div className={styles.qty}>{item.qty}</div>

                          <button
                            className={styles.qtyBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQty(item.id, item.qty + 1);
                            }}
                            aria-label="Increase"
                            type="button"
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.prices}>
                          <div className={styles.price}>${item.unitPrice}</div>
                          {hasOld && (
                            <div className={styles.oldPrice}>
                              ${item.oldPrice}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* конец кликабельной зоны */}
                </article>
              );
            })
          )}
        </div>

        {/* RIGHT */}
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order details</h2>

          <div className={styles.row}>{totalItems} items</div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <input
            className={`${styles.input} ${
              touched && !name.trim() ? styles.inputError : ""
            }`}
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (emptyCartMsg) setEmptyCartMsg(false);
            }}
          />

          <input
            className={`${styles.input} ${
              touched && !phone.trim() ? styles.inputError : ""
            }`}
            placeholder="Phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (emptyCartMsg) setEmptyCartMsg(false);
            }}
          />

          <input
            className={`${styles.input} ${
              touched && !email.trim() ? styles.inputError : ""
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emptyCartMsg) setEmptyCartMsg(false);
            }}
          />

          <button className={styles.orderBtn} onClick={onOrder} type="button">
            Order
          </button>

          {emptyCartMsg && (
            <div className={styles.formError}>
              Cart is empty. Add products to place an order.
            </div>
          )}

          {successOpen && (
            <div className={styles.modalOverlay} role="dialog" aria-modal="true">
              <div className={styles.modal}>
                <button
                  className={styles.modalClose}
                  onClick={closeSuccessModal}
                  aria-label="Close"
                  type="button"
                >
                  ✕
                </button>

                <div className={styles.modalTitle}>Congratulations!</div>
                <div className={styles.modalText}>
                  Your order has been successfully placed on the website.
                  <br />
                  A manager will contact you shortly to confirm your order.
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
