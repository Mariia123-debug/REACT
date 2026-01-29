import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import axiosClient from "../../shared/api/axiosClient";
import { assetUrl } from "../../shared/api/assets";
import styles from "./CategoriesPage.module.css";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setStatus("loading");
        setError("");

        const res = await axiosClient.get("/categories/all");
        const data = Array.isArray(res?.data) ? res.data : [];

        if (!alive) return;

        setCategories(data);
        setStatus("success");
      } catch (e) {
        if (!alive) return;
        setStatus("error");
        setError(e?.message || "Failed to load categories");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        {/* breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" className={styles.crumbLink}>
              Main page
            </Link>
            <Typography className={styles.crumbCurrent}>Categories</Typography>
          </Breadcrumbs>
        </div>

        {/* header */}
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Categories</h1>
        </div>

        {/* states */}
        {status === "loading" && <div className={styles.state}>Loading…</div>}
        {status === "error" && <div className={styles.state}>Error: {error}</div>}

        {/* grid */}
        {status === "success" && categories.length > 0 && (
          <div className={styles.grid}>
            {categories.map((c) => {
              const id = c.id;
              const title = c.title ?? c.name ?? "Category";
              const img = c.image;

              return (
                <Link key={id} to={`/categories/${id}`} className={styles.card}>
                  <div className={styles.imgWrap}>
                    {img ? (
                      <img
                        className={styles.img}
                        src={assetUrl(img)}
                        alt={title}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.noImg}>No image</div>
                    )}
                  </div>

                  <div className={styles.body}>
                    <div className={styles.cardTitle}>{title}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {status === "success" && categories.length === 0 && (
          <div className={styles.state}>No categories found.</div>
        )}
      </div>
    </section>
  );
}
