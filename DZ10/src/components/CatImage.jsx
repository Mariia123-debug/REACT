import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CatImage.module.css";

export default function CatImage() {
  const [catUrl, setCatUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCat = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );

      const url = response.data?.[0]?.url;
      if (!url) throw new Error("No image");

      setCatUrl(url);
    } catch (err) {
      setError("Не удалось загрузить изображение кошки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Random Cat</h2>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.imageBox}>
        {loading && <p className={styles.loading}>Loading...</p>}

        {!loading && catUrl && (
          <img
            src={catUrl}
            alt="Random cat"
            className={styles.image}
          />
        )}
      </div>

      <button
        className={styles.button}
        onClick={fetchCat}
        disabled={loading}
        type="button"
      >
        {loading ? "Loading..." : "Load new cat"}
      </button>
    </div>
  );
}