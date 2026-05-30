import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
      <button
        key={pageNum}
        className={`paginationBtn ${pageNum === currentPage ? "active" : ""}`}
        onClick={() => onPageChange(pageNum)}
      >
        {pageNum}
      </button>
    ))}
  </div>
);

export default Pagination;
