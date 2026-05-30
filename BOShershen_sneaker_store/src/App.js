import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles.css";
import Header from "./components/header/Header";
import HomePage from "./components/HomePage";
import BrandPage from "./components/BrandPage";
import initialProducts from "./data/initialProducts";
import ProductPage from "./components/ProductPage/ProductPage";
import { AuthProvider } from "./components/AuthContext";
import AuthGuard from "./components/AuthGuard";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";

export default function App() {
  const [products, setProducts] = useState(() => {
    const storageProducts = JSON.parse(localStorage.getItem("products"));
    return Array.isArray(storageProducts) ? storageProducts : initialProducts;
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AuthProvider>
        <Router>
          <Header
            search={search}
            setSearch={(value) => {
              setSearch(value);
            }}
          />
          <Routes>
            <Route
              path="/"
              element={<HomePage products={searchedProducts} />}
            />
            <Route
              path="/:brandName"
              element={
                <BrandPage products={searchedProducts} search={search} />
              }
            />
            <Route
              path="/:brandName/:productId"
              element={<ProductPage products={products} />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <AuthGuard>
                  <AdminPage
                    products={searchedProducts}
                    setProducts={setProducts}
                  />
                </AuthGuard>
              }
            />
            <Route path="/403" element={<Forbidden />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            {/* <Route
              path="*"
              element={<h1>Шершень збентежений, якась невідома помилка</h1>}
            /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
