// src/pages/Category/CategoryPage.jsx
// Route: /categories/:id

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { axiosClient } from "../../shared/api/axiosClient";
import SmartProductsList from "../../shared/components/SmartProductsList/SmartProductsList";

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = Number(id);

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const [categoryName, setCategoryName] = useState("Category");
  const [productsAll, setProductsAll] = useState([]);

  // =====================
  // helpers
  // =====================
  const getCategoryId = (c) => Number(c.id ?? c.categoryId ?? c.category_id ?? 0);

  const getCategoryTitle = (c) =>
    c.title ?? c.name ?? c.categoryName ?? c.category_name ?? "Category";

  const getProductCategoryId = (p) =>
    Number(p.categoryId ?? p.category_id ?? p.category ?? p.catId ?? p.cat_id ?? 0);

  // =====================
  // load categories + products
  // =====================
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setStatus("loading");
        setError("");

        // categories (for title)
        const catRes = await axiosClient.get("/categories/all");
        const catData = Array.isArray(catRes.data) ? catRes.data : catRes.data?.data;
        const cats = Array.isArray(catData) ? catData : [];

        const currentCat = cats.find((c) => getCategoryId(c) === categoryId);
        const catTitle = currentCat ? getCategoryTitle(currentCat) : "Category";

        // products
        const prodRes = await axiosClient.get("/products/all");
        const prodData = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data?.data;
        const products = Array.isArray(prodData) ? prodData : [];

        if (!ignore) {
          setCategoryName(catTitle);
          setProductsAll(products);
          setStatus("success");
        }
      } catch (e) {
        if (!ignore) {
          setStatus("error");
          setError(e?.message || "Failed to load data");
        }
      }
    }

    if (Number.isFinite(categoryId) && categoryId > 0) load();

    return () => {
      ignore = true;
    };
  }, [categoryId]);

  // =====================
  // products only for this category
  // =====================
  const productsByCategory = useMemo(() => {
    return productsAll.filter((p) => getProductCategoryId(p) === categoryId);
  }, [productsAll, categoryId]);

  return (
    <SmartProductsList
      title={categoryName}
      breadcrumbs={[
        { to: "/", label: "Main page" },
        { to: "/categories", label: "Categories" },
        { label: categoryName },
      ]}
      status={status}
      error={error}
      products={productsByCategory}
      showReset={true}
    />
  );
}
