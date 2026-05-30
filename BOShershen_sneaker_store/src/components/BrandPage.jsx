import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProductList from "./ProductList";
import SearchFilterSort from "./SearchFilterSort/SearchFilterSort";
import Pagination from "./Pagination";
import Breadcrumbs from "./Breadcrumbs";

const BrandPage = ({ products, search }) => {
  const Brands = ["Nike", "Jordan", "Adidas", "Under Armour"];
  const { brandName } = useParams();
  if (!Brands.includes(brandName)) return <Navigate to="/404" replace />;

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("priceUAasc");

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [brandName, search]);

  const sortedProducts = [...products].sort((a, b) => {
    const fieldA = a[sortField.replace(/(asc|desc)$/, "")];
    const fieldB = b[sortField.replace(/(asc|desc)$/, "")];
    if (typeof fieldA === "string") {
      return sortOrder.endsWith("asc")
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }
    return sortOrder.endsWith("asc") ? fieldA - fieldB : fieldB - fieldA;
  });

  const filteredProducts = sortedProducts.filter(
    (product) => product.brand.toLowerCase() === brandName.toLowerCase()
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <div className="topBrandPage">
        <Breadcrumbs />
        <div className="topBrandPageMain">
          <div className="brandName">{brandName}</div>
          <SearchFilterSort
            sortField={sortField}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            items={filteredProducts.length}
          />
        </div>
      </div>
      <ProductList products={currentProducts} />
      {itemsPerPage < filteredProducts.length && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default BrandPage;
