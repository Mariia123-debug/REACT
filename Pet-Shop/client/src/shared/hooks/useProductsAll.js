import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient"; // если axiosClient в src/shared/api

export default function useProductsAll() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setStatus("loading");
        setError("");

        const res = await axiosClient.get("/products/all");
        const data = Array.isArray(res?.data) ? res.data : [];

        if (!alive) return;
        setProducts(data);
        setStatus("success");
      } catch (e) {
        if (!alive) return;
        setStatus("error");
        setError(e?.message || "Failed to load products");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { products, status, error };
}
