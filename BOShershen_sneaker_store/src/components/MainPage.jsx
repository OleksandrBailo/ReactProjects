import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import AddProductModal from "./AddProductModal/AddProductModal";
import Pagination from "./Pagination";
import SearchFilterSort from "./SearchFilterSort/SearchFilterSort";
import initialProducts from "../data/initialProducts";
import Header from "./header/Header";

const MainPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    const storageProducts = JSON.parse(localStorage.getItem("products"));
    return Array.isArray(storageProducts) ? storageProducts : initialProducts;
  });

  const [showModal, setShowModal] = useState(false);
  const newProductIdle = {
    name: "",
    article: "",
    brand: "",
    color: "",
    sizeCM: "",
    priceUA: "",
    images: [],
  };
  const [newProduct, setNewProduct] = useState(newProductIdle);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("priceUAasc");

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const selected = brandName || "all";
  const setSelected = (value) => {
    navigate(value === "all" ? "/" : `/brand/${value}`);
    setCurrentPage(1);
  };

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
    (product) =>
      (selected === "all" ||
        product.brand.toLowerCase().includes(selected.toLowerCase())) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: crypto.randomUUID(),
      ...newProduct,
      sizeCM: parseFloat(newProduct.sizeCM),
      priceUA: parseFloat(newProduct.priceUA),
    };
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    setNewProduct(newProductIdle);
    setShowModal(false);
  };
  return (
    <>
      {/* <Header
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        setSelected={(value) => {
          setSelected(value);
          setCurrentPage(1);
        }}
      /> */}
      <div className="shop container">
        {/* <div className="addProductBtnBox">
          <button className="addProductBtn" onClick={() => setShowModal(true)}>
            Додати товар
          </button>
        </div> */}

        <SearchFilterSort
          selected={selected}
          setSelected={(value) => {
            setSelected(value);
            setCurrentPage(1);
          }}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          items={filteredProducts.length}
        />

        <ProductList products={currentProducts} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {showModal && (
          <AddProductModal
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
