import React from "react";
import Form from "react-bootstrap/Form";
import classes from "./AddProductModalStyle.module.css";

const AddProductModal = ({
  newProduct,
  setNewProduct,
  onClose,
  onSubmit,
  isEditing,
}) => (
  <div className={classes.modalOverlay} onClick={onClose}>
    <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
      <h2>{isEditing ? "Змінити товар" : "Новий товар"}</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Назва"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Артикул"
          value={newProduct.article}
          onChange={(e) =>
            setNewProduct({ ...newProduct, article: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Бренд"
          value={newProduct.brand}
          onChange={(e) =>
            setNewProduct({ ...newProduct, brand: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Колір"
          value={newProduct.color}
          onChange={(e) =>
            setNewProduct({ ...newProduct, color: e.target.value })
          }
          required
        />
        <div className={classes.inputRow}>
          <input
            type="number"
            placeholder="Розмір (CM)"
            value={newProduct.sizeCM}
            onChange={(e) =>
              setNewProduct({ ...newProduct, sizeCM: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Ціна (UAH)"
            value={newProduct.priceUA}
            onChange={(e) =>
              setNewProduct({ ...newProduct, priceUA: e.target.value })
            }
            required
          />
        </div>

        <Form.Control
          style={{ marginBottom: "10px" }}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            const readers = files.map((file) => {
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
              });
            });

            Promise.all(readers).then((imagesBase64) => {
              setNewProduct((prev) => ({
                ...prev,
                images: imagesBase64,
              }));
            });
          }}
          required={!isEditing && newProduct.images.length === 0}
        />

        {newProduct.images.length > 0 && (
          <div className={classes.imagePreviews}>
            {newProduct.images.map((img, i) => (
              <div key={i} className={classes.previewWrapper}>
                <img
                  src={img}
                  alt={`preview ${i}`}
                  className={classes.previewImage}
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit">{isEditing ? "Зберегти зміни" : "Додати"}</button>
      </form>
    </div>
  </div>
);

export default AddProductModal;
