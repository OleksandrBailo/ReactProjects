import React from "react";
import Form from "react-bootstrap/Form";
import "./SearchFilterSortStyle.css";

const SearchFilterSort = ({ sortField, setSortField, setSortOrder, items }) => {
  const sortChanger = (e) => {
    if (e.target.value == "priceUAasc" || e.target.value == "priceUAdesc") {
      setSortOrder(e.target.value);
      setSortField(e.target.value);
    } else setSortField(e.target.value);
  };

  return (
    <div className="controls">
      <div className="sortControls">
        <div className="sortItem">
          <span className="items-count">{items} Items</span>
          <select
            id="sortField"
            value={sortField}
            onChange={(e) => sortChanger(e)}
            className="select"
          >
            <option value="name">Назва</option>
            <option value="priceUAasc">Price (low - high)</option>
            <option value="priceUAdesc">Price (high - low)</option>
            <option value="brand">Бренд</option>
            <option value="color">Колір</option>
            <option value="sizeCM">Розмір (CM)</option>
          </select>
        </div>

        {/* <div className="sortItem">
          <label htmlFor="sortOrder">Напрямок сортування:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select"
          >
            <option value="asc">За зростанням</option>
            <option value="desc">За спаданням</option>
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default SearchFilterSort;
