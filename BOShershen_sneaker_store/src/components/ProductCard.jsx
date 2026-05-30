import React from "react";
import { Link } from "react-router-dom";
import img from "../";

const ProductCard = ({ product }) => (
  <div className="product">
    <Link to={`/${product.brand}/${product.id}`}>
      <img src={product.images[0]} alt={product.name} />
      <div className="nameProduct">{product.name}</div>
    </Link>
    <div className="sizeProduct">Size: {product.sizeCM}</div>
    <div className="colorProduct">Color: {product.color}</div>
    <div className="priceProduct">₴ {product.priceUA}</div>
  </div>
);

export default ProductCard;
