import React from "react";
import "./SortBlockStyle.css";

const SortBlock = () => {
  return (
    <div className="sortBlockAboveProducts">
      <div className="sort-container">
        <span className="items-count">0 Items</span>
        <div className="dropdown">
          <button className="dropdown-button">
            <span className="selected-option">Choose</span>
            <div className="arrow">
              <img
                className="arrow-img"
                src="/images/IconsAndLogo/arrows-down.png"
                alt=""
              />
            </div>
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item">Now Trending</li>
            <li className="dropdown-item">Best Sellers</li>
            <li className="dropdown-item">Price (Low - High)</li>
            <li className="dropdown-item">Price (High - Low)</li>
            <li className="dropdown-item">Top Rated</li>
            <li className="dropdown-item">Newest</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortBlock;
