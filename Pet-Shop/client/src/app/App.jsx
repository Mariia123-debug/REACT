import { Routes, Route } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductPage from "../pages/Product/ProductPage";
import CartPage from "../pages/Cart/CartPage";
import SaleProductsPage from "../pages/Products/SaleProductsPage";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import AllProductsPage from "../pages/Products/AllProductsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="products" element={<AllProductsPage />} />
        <Route path="products/sale" element={<SaleProductsPage />} />
         <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoryPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}