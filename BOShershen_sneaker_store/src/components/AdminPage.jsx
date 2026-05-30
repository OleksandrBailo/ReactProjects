import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AddProductModal from "./AddProductModal/AddProductModal";

const AdminPage = ({ products, setProducts }) => {
  const { username } = useAuth();

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
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Ви впевнені, що хочете видалити товар?");
    if (confirmed) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };
  const handleEdit = (product) => {
    setNewProduct({ ...product });
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      sizeCM: parseFloat(newProduct.sizeCM),
      priceUA: parseFloat(newProduct.priceUA),
    };

    let updatedProducts;

    if (editingProduct) {
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...productToAdd, id: p.id } : p
      );
    } else {
      updatedProducts = [
        ...products,
        { ...productToAdd, id: crypto.randomUUID() },
      ];
    }

    setProducts(updatedProducts);
    setNewProduct(newProductIdle);
    setEditingProduct(null);
    setShowModal(false);
  };

  const handleModalClose = () => {
    const confirmClose = window.confirm(
      "All unsaved changes will be lost. Close?"
    );
    if (!confirmClose) return;
    setShowModal(false);
    setNewProduct(newProductIdle);
    setEditingProduct(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const isDirty =
        JSON.stringify(newProduct) !== JSON.stringify(newProductIdle);
      if (showModal && isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [newProduct, showModal]);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <div className="addProductBtnBox">
        <button className="addProductBtn" onClick={() => setShowModal(true)}>
          Додати товар
        </button>
      </div>
      {showModal && (
        <AddProductModal
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          isEditing={editingProduct}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Price</th>
            <th>Color</th>
            <th>SizeCM</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="productsTable">
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td className="nameProduct">{product.name}</td>
              <td>{product.brand}</td>
              <td className="img">
                <img src={product.images[0]} alt={product.name} width="60" />
              </td>
              <td className="priceProduct">{product.priceUA} грн</td>
              <td>{product.color}</td>
              <td>{product.sizeCM} см</td>
              <td className="action-buttons">
                <input
                  className="edit"
                  type="button"
                  value="Редагувати"
                  onClick={() => handleEdit(product)}
                />
                <input
                  className="delete"
                  type="button"
                  value="Видалити"
                  onClick={() => handleDelete(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
