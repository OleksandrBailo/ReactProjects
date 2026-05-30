import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>404 - Шершунь не зміг знайти сторінку</h1>
      <p>На жаль, такої сторінки не існує.</p>
      <button onClick={() => navigate(-1)}>Повернутись назад</button>
    </div>
  );
};

export default NotFound;
