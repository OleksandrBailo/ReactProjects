import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./ProductPageStyle.module.css";

const ProductPage = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  return (
    <main className={styles.main}>
      <div className={styles.product}>
        <div className={styles.img}>
          <div className={styles.slider}>
            {product.images.map((image, index) => (
              <div className={styles.slide} key={index}>
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.detail}>
          <Breadcrumbs />
          <div className={styles.nameProduct} id="productName">
            {product.name}
          </div>
          <div className={styles.brandProduct} id="productBrand">
            {product.brand}
          </div>
          <div className={styles.sizeProduct}>
            Size: <span id="productSize">{product.sizeCM}cm</span>
          </div>
          <div className={styles.colorProduct}>
            Color: <span id="productColor">{product.color}</span>
          </div>
          <div className={styles.priceRating}>
            <div className={styles.price}>
              ₴ <span id="productPrice">{product.priceUA}</span>
            </div>
            {/* <div className={styles.ratingSummury}>
              <div
                className={styles.starsSummury}
                style={{ "--rating": 4.3 }}
              ></div>
              <span className={styles.ratingValueSummury}>4.3 (15)</span>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
