import React from "react";
import ProductList from "./ProductList";

const HomePage = ({ products }) => {
  return (
    <div className="container">
      <h2>All products</h2>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
